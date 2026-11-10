import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";
import { updateIssueStatus } from "@/lib/adminData";
import type { IssueStatus } from "@/types";

export const runtime = "nodejs";

function isIssueStatus(value: unknown): value is IssueStatus {
  return value === "New" || value === "In progress" || value === "Resolved";
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
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
  const status =
    body && typeof body === "object" && "status" in body ? body.status : undefined;
  if (!isIssueStatus(status)) {
    return NextResponse.json({ error: "Choose a valid issue status." }, { status: 400 });
  }

  try {
    const { id } = await params;
    await updateIssueStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Could not update admin issue:", error);
    return NextResponse.json({ error: "The issue status could not be saved." }, { status: 503 });
  }
}
