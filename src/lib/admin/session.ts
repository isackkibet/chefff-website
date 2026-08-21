import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "chef_admin_session";
const SESSION_DURATION_SECONDS = 8 * 60 * 60;

interface AdminSession {
  email: string;
  expiresAt: number;
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function credentialsAreValid(email: string, password: string) {
  const configuredEmail = process.env.ADMIN_EMAIL;
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredEmail || !configuredPassword) return false;

  return (
    safeEqual(
      email.trim().toLowerCase(),
      configuredEmail.trim().toLowerCase(),
    ) && safeEqual(password.trim(), configuredPassword.trim())
  );
}

export function createAdminSession(email: string) {
  const payload = Buffer.from(
    JSON.stringify({
      email,
      expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000,
    } satisfies AdminSession),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function getAdminSession(
  token: string | undefined,
): AdminSession | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(sign(payload), signature))
    return null;

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as AdminSession;
    if (!session.email || !session.expiresAt || session.expiresAt <= Date.now())
      return null;
    return session;
  } catch {
    return null;
  }
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  };
}
