import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminSession, verifyAdminPassword } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "A valid JSON request is required." }, { status: 400 });
  }
  const password =
    body && typeof body === "object" && "password" in body && typeof body.password === "string"
      ? body.password
      : "";
  if (!password) return NextResponse.json({ error: "Enter your password." }, { status: 400 });

  try {
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "The password was not recognized." }, { status: 401 });
    }
    // Only the server creates the signed session; the browser receives it as an HttpOnly cookie.
    const session = createAdminSession();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE_NAME, session.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/admin",
      maxAge: session.maxAge,
    });
    return response;
  } catch (error) {
    console.error("Admin sign-in is unavailable:", error);
    return NextResponse.json({ error: "Admin authentication is not configured." }, { status: 503 });
  }
}
