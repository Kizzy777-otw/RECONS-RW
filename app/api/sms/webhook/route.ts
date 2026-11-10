import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { saveIncomingSms } from "@/lib/adminData";
import { normalizeSmsPayload } from "@/lib/smsProcessor";
import type { NormalizedSms } from "@/lib/smsProcessor";

export const runtime = "nodejs";

function tokenMatches(candidate: string, expected: string): boolean {
  const left = Buffer.from(candidate);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function POST(request: NextRequest) {
  const expectedToken = process.env.SMS_WEBHOOK_TOKEN;
  if (!expectedToken) {
    return NextResponse.json({ error: "SMS webhook authentication is not configured." }, { status: 503 });
  }
  // Check the shared bearer token before parsing or logging any submitted message data.
  const authorization = request.headers.get("authorization") ?? "";
  const suppliedToken = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!tokenMatches(suppliedToken, expectedToken)) {
    return NextResponse.json({ error: "Unauthorized webhook request." }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "A valid JSON payload is required." }, { status: 400 });
  }
  let sms: NormalizedSms;
  try {
    sms = normalizeSmsPayload(payload);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid SMS payload." },
      { status: 400 },
    );
  }

  try {
    await saveIncomingSms(sms.from, sms.text, sms.externalId);
    return NextResponse.json({ accepted: true }, { status: 202 });
  } catch (error) {
    console.error("Could not persist incoming SMS:", error);
    return NextResponse.json(
      { error: "The SMS could not be saved. Try again later." },
      { status: 503 },
    );
  }
}
