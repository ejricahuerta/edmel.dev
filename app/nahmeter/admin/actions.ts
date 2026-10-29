"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PRICE_CENTS, nahmeterEnv } from "@/lib/nahmeter/config";
import { adminClient } from "@/lib/nahmeter/supabase";

async function addMonths(payCode: string, months: number, amountCents: number, ref: string | null, note: string | null) {
  const cfg = nahmeterEnv();
  if ("missing" in cfg) redirect("/nahmeter/admin?msg=" + encodeURIComponent("Not set up: " + cfg.missing.join(", ")));
  const admin = adminClient(cfg.env);

  const code = payCode.trim().toUpperCase();
  const account = await admin.from("nahmeter_accounts").select("user_id,email").eq("pay_code", code).maybeSingle();
  if (account.error || !account.data) redirect("/nahmeter/admin?msg=" + encodeURIComponent(`No account with code ${code}.`));

  const { data, error } = await admin.rpc("nahmeter_record_payment", {
    p_user: account.data.user_id,
    p_months: months,
    p_amount_cents: amountCents,
    p_ref: ref,
    p_note: note,
  });
  if (error) redirect("/nahmeter/admin?msg=" + encodeURIComponent("Couldn't record it: " + error.message));

  revalidatePath("/nahmeter/admin");
  const until = new Date(data as string).toLocaleDateString("en-CA", { dateStyle: "medium" });
  redirect("/nahmeter/admin?msg=" + encodeURIComponent(`${account.data.email}: paid until ${until}.`));
}

/** An e-Transfer arrived: every full $5 is a month. */
export async function recordPayment(form: FormData) {
  const dollars = Number(form.get("amount"));
  const cents = Math.round(dollars * 100);
  const months = Math.floor(cents / PRICE_CENTS);
  if (!Number.isFinite(dollars) || months < 1 || months > 24) {
    redirect("/nahmeter/admin?msg=" + encodeURIComponent("Amount must be $5 to $120."));
  }
  await addMonths(String(form.get("payCode") ?? ""), months, cents, String(form.get("ref") ?? "") || null, String(form.get("note") ?? "") || null);
}

/** Free months for someone who asked (can't pay right now, helped out, ...). */
export async function grantFreeMonths(form: FormData) {
  const months = Number(form.get("months"));
  if (!Number.isInteger(months) || months < 1 || months > 12) {
    redirect("/nahmeter/admin?msg=" + encodeURIComponent("Free months must be 1 to 12."));
  }
  const note = String(form.get("note") ?? "").trim() || "free on request";
  await addMonths(String(form.get("payCode") ?? ""), months, 0, null, note);
}
