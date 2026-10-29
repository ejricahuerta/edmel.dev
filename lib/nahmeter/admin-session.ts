import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NahmeterEnv } from "@/lib/nahmeter/config";

/**
 * The admin page's sign-in: after the admin address's email link is confirmed, a signed cookie (the
 * address and an expiry, signed with a key derived from the service role key) keeps you signed in for
 * a week. No password to set or remember; changing the admin address or the service key signs out.
 */
const COOKIE = "nahmeter_admin";
const PATH = "/nahmeter/admin";
const MAX_AGE_S = 7 * 24 * 60 * 60;

function signature(env: NahmeterEnv, payload: string): Buffer {
  return createHmac("sha256", env.SUPABASE_SERVICE_ROLE_KEY).update("nahmeter-admin-session:" + payload).digest();
}

export async function startAdminSession(env: NahmeterEnv): Promise<void> {
  const payload = Buffer.from(
    JSON.stringify({ email: env.NAHMETER_ADMIN_EMAIL, exp: Date.now() + MAX_AGE_S * 1000 }),
  ).toString("base64url");
  (await cookies()).set(COOKIE, `${payload}.${signature(env, payload).toString("base64url")}`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: PATH,
    maxAge: MAX_AGE_S,
  });
}

export async function endAdminSession(): Promise<void> {
  (await cookies()).delete({ name: COOKIE, path: PATH });
}

/** Whether this request carries a valid, unexpired admin session for the current admin address. */
export async function isAdmin(env: NahmeterEnv): Promise<boolean> {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [payload, sig] = value.split(".");
  if (!payload || !sig) return false;
  const given = Buffer.from(sig, "base64url");
  const expected = signature(env, payload);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return false;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as { email?: string; exp?: number };
    return session.email === env.NAHMETER_ADMIN_EMAIL && typeof session.exp === "number" && session.exp > Date.now();
  } catch {
    return false;
  }
}
