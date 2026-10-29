import type { User } from "@supabase/supabase-js";
import { CONTACT_EMAIL, PRICE_CENTS, type NahmeterEnv } from "@/lib/nahmeter/config";
import type { AdminClient } from "@/lib/nahmeter/supabase";

export type Account = {
  user_id: string;
  email: string;
  created_at: string;
  trial_ends_at: string;
  paid_until: string | null;
  pay_code: string;
};

export type LicenceStatus = "trial" | "active" | "ended";

/** What the app needs to decide whether it may give verdicts, and how to pay. */
export type Licence = {
  email: string;
  status: LicenceStatus;
  trialEndsAt: string;
  paidUntil: string | null;
  /** The app may read offers until this moment: the later of the trial's end and the paid date. */
  readUntil: string;
  payCode: string;
  priceCents: number;
  payEmail: string;
  contactEmail: string;
  serverTime: string;
};

// No 0/O or 1/I/L, so a code typed into an e-Transfer message can't be misread.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function newPayCode(): string {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  return "NAH-" + Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}

/** The account for a signed-in user, created on first use (that starts the 14-day trial). */
export async function ensureAccount(admin: AdminClient, user: User): Promise<Account> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const found = await admin.from("accounts").select("*").eq("user_id", user.id).maybeSingle();
    if (found.error) throw found.error;
    if (found.data) return found.data as Account;

    const inserted = await admin
      .from("accounts")
      .insert({ user_id: user.id, email: user.email ?? "", pay_code: newPayCode() })
      .select("*")
      .single();
    if (!inserted.error) return inserted.data as Account;
    // 23505: a pay code clash (try another) or a parallel first sign-in (read it back).
    if (inserted.error.code !== "23505") throw inserted.error;
  }
  throw new Error("Could not create a nah.meter account");
}

export function licenceFor(account: Account, env: NahmeterEnv, now = new Date()): Licence {
  const trialEnds = new Date(account.trial_ends_at);
  const paidUntil = account.paid_until ? new Date(account.paid_until) : null;
  const readUntil = paidUntil && paidUntil > trialEnds ? paidUntil : trialEnds;
  const status: LicenceStatus =
    paidUntil && paidUntil > now ? "active" : trialEnds > now ? "trial" : "ended";
  return {
    email: account.email,
    status,
    trialEndsAt: trialEnds.toISOString(),
    paidUntil: paidUntil ? paidUntil.toISOString() : null,
    readUntil: readUntil.toISOString(),
    payCode: account.pay_code,
    priceCents: PRICE_CENTS,
    payEmail: env.NAHMETER_PAY_EMAIL,
    contactEmail: CONTACT_EMAIL,
    serverTime: now.toISOString(),
  };
}

/** The user behind an `Authorization: Bearer <access token>` header, or null. */
export async function userFromRequest(admin: AdminClient, request: Request): Promise<User | null> {
  const header = request.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  const { data, error } = await admin.auth.getUser(match[1]);
  if (error || !data.user) return null;
  return data.user;
}

/** JSON error responses the app can show as-is. */
export function fail(status: number, error: string): Response {
  return Response.json({ error }, { status });
}
