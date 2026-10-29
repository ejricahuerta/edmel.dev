"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { endAdminSession, isAdmin, startAdminSession } from "@/lib/nahmeter/admin-session";
import { PRICE_CENTS, nahmeterEnv } from "@/lib/nahmeter/config";
import { sendSignInLink } from "@/lib/nahmeter/signin-email";
import { adminClient, authClient } from "@/lib/nahmeter/supabase";

function back(msg: string): never {
  redirect("/nahmeter/admin?msg=" + encodeURIComponent(msg));
}

function setUp() {
  const cfg = nahmeterEnv();
  if ("missing" in cfg) back("Not set up: " + cfg.missing.join(", "));
  return cfg.env;
}

/** Emails a sign-in link, only to the admin address. */
export async function sendAdminLink(form: FormData) {
  const env = setUp();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (email === env.NAHMETER_ADMIN_EMAIL) {
    const failed = await sendSignInLink(env, adminClient(env), email, {
      path: "/nahmeter/admin/confirm",
      subject: "Sign in to nah.meter admin",
      intro: "Open this link to sign in to the nah.meter admin page:",
      button: "Sign in to nah.meter admin",
    });
    if (failed) back(failed.error);
  }
  back("If that's the admin address, a sign-in link is on its way.");
}

/** The link's token, posted from the confirm page (a button, so email scanners can't use it up). */
export async function confirmAdminLink(form: FormData) {
  const env = setUp();
  const tokenHash = String(form.get("token_hash") ?? "");
  const { data, error } = await authClient(env).auth.verifyOtp({ token_hash: tokenHash, type: "magiclink" });
  if (error || data.user?.email?.toLowerCase() !== env.NAHMETER_ADMIN_EMAIL) {
    back("That link has expired or was already used. Send a new one.");
  }
  await startAdminSession(env);
  redirect("/nahmeter/admin");
}

export async function signOutAdmin() {
  await endAdminSession();
  redirect("/nahmeter/admin");
}

async function addMonths(payCode: string, months: number, amountCents: number, ref: string | null, note: string | null) {
  const env = setUp();
  if (!(await isAdmin(env))) back("Sign in first.");
  const admin = adminClient(env);

  const code = payCode.trim().toUpperCase();
  const account = await admin.from("accounts").select("user_id,email").eq("pay_code", code).maybeSingle();
  if (account.error || !account.data) back(`No account with code ${code}.`);

  const { data, error } = await admin.rpc("record_payment", {
    p_user: account.data.user_id,
    p_months: months,
    p_amount_cents: amountCents,
    p_ref: ref,
    p_note: note,
  });
  if (error) back("Couldn't record it: " + error.message);

  revalidatePath("/nahmeter/admin");
  const until = new Date(data as string).toLocaleDateString("en-CA", { dateStyle: "medium" });
  back(`${account.data.email}: paid until ${until}.`);
}

/** An e-Transfer arrived: every full $5 is a month. */
export async function recordPayment(form: FormData) {
  const dollars = Number(form.get("amount"));
  const cents = Math.round(dollars * 100);
  const months = Math.floor(cents / PRICE_CENTS);
  if (!Number.isFinite(dollars) || months < 1 || months > 24) back("Amount must be $5 to $120.");
  await addMonths(String(form.get("payCode") ?? ""), months, cents, String(form.get("ref") ?? "") || null, String(form.get("note") ?? "") || null);
}

/** Free months for someone who asked (can't pay right now, helped out, ...). */
export async function grantFreeMonths(form: FormData) {
  const months = Number(form.get("months"));
  if (!Number.isInteger(months) || months < 1 || months > 12) back("Free months must be 1 to 12.");
  const note = String(form.get("note") ?? "").trim() || "free on request";
  await addMonths(String(form.get("payCode") ?? ""), months, 0, null, note);
}
