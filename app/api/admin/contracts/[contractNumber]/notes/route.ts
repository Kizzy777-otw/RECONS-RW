import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";
import { addContractNote } from "@/lib/adminData";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ contractNumber: string }> },
) {
  if (!isValidAdminSession(request.cookies.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: "Admin authentication is required." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "A valid JSON request is required." }, { status: 400 });
  }
  const text = body && typeof body === "object" && "text" in body ? body.text : undefined;
  if (typeof text !== "string" || !text.trim() || text.length > 4000) {
    return NextResponse.json(
      { error: "Enter a note of 1 to 4,000 characters." },
      { status: 400 },
    );
  }

  try {
    const { contractNumber } = await params;
    const note = await addContractNote(contractNumber, text.trim());
    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error("Could not save admin contract note:", error);
    return NextResponse.json({ error: "The contract note could not be saved." }, { status: 503 });
  }
}
