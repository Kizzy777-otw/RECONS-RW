import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "recons_admin_session";
const SESSION_LIFETIME_SECONDS = 60 * 60 * 8;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  }
  return secret;
}

export function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD is not configured.");
  return password;
}

function sign(expiresAt: number): string {
  // Bind the expiry timestamp to a server-only secret so cookie contents cannot be forged.
  return createHmac("sha256", getSessionSecret())
    .update(`recons-admin:${expiresAt}`)
    .digest("hex");
}

function safeEqual(left: string, right: string): boolean {
  // Hash first to give both inputs a fixed length for timingSafeEqual.
  const leftDigest = createHmac("sha256", "recons-compare").update(left).digest();
  const rightDigest = createHmac("sha256", "recons-compare").update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

export function verifyAdminPassword(candidate: string): boolean {
  return safeEqual(candidate, getAdminPassword());
}

export function createAdminSession(): { value: string; maxAge: number } {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS;
  // Store the expiry beside its signature; validation checks both before accepting the session.
  return { value: `${expiresAt}.${sign(expiresAt)}`, maxAge: SESSION_LIFETIME_SECONDS };
}

export function isValidAdminSession(value?: string): boolean {
  if (!value) return false;
  const [expiresText, signature, extra] = value.split(".");
  if (extra !== undefined || !expiresText || !signature || !/^\d+$/.test(expiresText)) {
    return false;
  }
  const expiresAt = Number(expiresText);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) {
    return false;
  }
  // Recomputing the signature detects changes to either the expiry or the cookie value.
  return safeEqual(signature, sign(expiresAt));
}
