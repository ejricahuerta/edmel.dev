import { Resend } from "resend";
import { z } from "zod";
import { fail } from "@/lib/nahmeter/accounts";
import { nahmeterEnv } from "@/lib/nahmeter/config";
import { adminClient } from "@/lib/nahmeter/supabase";

const body = z.object({ email: z.string().trim().toLowerCase().email().max(254) });

const HOUR_MS = 60 * 60 * 1000;

/**
 * Emails a sign-in link whose page opens nah.meter on the phone (Android App Link). The link is made
 * here and sent through Resend, so the shared Supabase project's own email templates stay untouched.
 */
export async function POST(request: Request) {
  const cfg = nahmeterEnv();
  if ("missing" in cfg) return fail(503, "Accounts aren't set up yet.");
  const { env } = cfg;

  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return fail(400, "Enter a valid email.");
  const email = parsed.data.email;
  const admin = adminClient(env);

  // At most one email a minute and five an hour to the same address.
  const recent = await admin
    .from("signin_requests")
    .select("created_at")
    .eq("email", email)
    .gte("created_at", new Date(Date.now() - HOUR_MS).toISOString())
    .order("created_at", { ascending: false });
  if (recent.error) return fail(502, "Couldn't send the email. Try again.");
  if (recent.data.length >= 5) return fail(429, "Too many emails to this address. Try again in an hour.");
  if (recent.data[0] && Date.now() - new Date(recent.data[0].created_at).getTime() < 60_000) {
    return fail(429, "Wait a minute before sending another link.");
  }

  // First sign-in: create the user (already confirmed: the link itself proves the address).
  const created = await admin.auth.admin.createUser({ email, email_confirm: true });
  if (created.error && created.error.code !== "email_exists" && created.error.status !== 422) {
    return fail(502, "Couldn't send the email. Try again.");
  }

  const link = await admin.auth.admin.generateLink({ type: "magiclink", email });
  if (link.error || !link.data.properties?.hashed_token) return fail(502, "Couldn't send the email. Try again.");
  const url =
    `${env.NAHMETER_SITE_URL}/nahmeter/auth/confirm?token_hash=` +
    `${encodeURIComponent(link.data.properties.hashed_token)}&type=magiclink`;

  const fromAddress = env.RESEND_FROM.match(/<([^>]+)>/)?.[1] ?? env.RESEND_FROM.trim();
  const { error } = await new Resend(env.RESEND_API_KEY).emails.send({
    from: `nah.meter <${fromAddress}>`,
    to: [email],
    subject: "Sign in to nah.meter",
    text: [
      "Tap this link on the phone where nah.meter is installed to sign in:",
      "",
      url,
      "",
      "It works once and expires in an hour. If you didn't ask for it, ignore this email.",
    ].join("\n"),
    html: `
      <p style="font-family:system-ui,sans-serif;font-size:16px;line-height:1.5;color:#111;">
        Tap this link on the phone where nah.meter is installed to sign in:
      </p>
      <p><a href="${url}" style="font-family:system-ui,sans-serif;font-size:18px;font-weight:700;color:#111;">Sign in to nah.meter</a></p>
      <p style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#555;">
        It works once and expires in an hour. If you didn't ask for it, ignore this email.
      </p>`,
  });
  if (error) return fail(502, "Couldn't send the email. Try again.");

  await admin.from("signin_requests").insert({ email });
  return Response.json({ ok: true });
}
