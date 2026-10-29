import { Resend } from "resend";
import type { NahmeterEnv } from "@/lib/nahmeter/config";
import type { AdminClient } from "@/lib/nahmeter/supabase";

const HOUR_MS = 60 * 60 * 1000;

export type SignInEmail = {
  /** The page on this site the link opens, e.g. "/nahmeter/auth/confirm". */
  path: string;
  subject: string;
  /** The line above the link. */
  intro: string;
  /** The link's text in the HTML email. */
  button: string;
};

/**
 * Emails a one-time sign-in link (a Supabase magic link made here and sent through Resend, so the
 * shared project's own email templates stay untouched). At most one a minute and five an hour per
 * address. Returns null when sent, or the status and message to show.
 */
export async function sendSignInLink(
  env: NahmeterEnv,
  admin: AdminClient,
  email: string,
  mail: SignInEmail,
): Promise<{ status: number; error: string } | null> {
  const failed = { status: 502, error: "Couldn't send the email. Try again." };

  const recent = await admin
    .from("signin_requests")
    .select("created_at")
    .eq("email", email)
    .gte("created_at", new Date(Date.now() - HOUR_MS).toISOString())
    .order("created_at", { ascending: false });
  if (recent.error) return failed;
  if (recent.data.length >= 5) return { status: 429, error: "Too many emails to this address. Try again in an hour." };
  if (recent.data[0] && Date.now() - new Date(recent.data[0].created_at).getTime() < 60_000) {
    return { status: 429, error: "Wait a minute before sending another link." };
  }

  // First sign-in: create the user (already confirmed: the link itself proves the address).
  const created = await admin.auth.admin.createUser({ email, email_confirm: true });
  if (created.error && created.error.code !== "email_exists" && created.error.status !== 422) return failed;

  const link = await admin.auth.admin.generateLink({ type: "magiclink", email });
  if (link.error || !link.data.properties?.hashed_token) return failed;
  const url =
    `${env.NAHMETER_SITE_URL}${mail.path}?token_hash=` +
    `${encodeURIComponent(link.data.properties.hashed_token)}&type=magiclink`;

  const fromAddress = env.RESEND_FROM.match(/<([^>]+)>/)?.[1] ?? env.RESEND_FROM.trim();
  const { error } = await new Resend(env.RESEND_API_KEY).emails.send({
    from: `nah.meter <${fromAddress}>`,
    to: [email],
    subject: mail.subject,
    text: [
      mail.intro,
      "",
      url,
      "",
      "It works once and expires in an hour. If you didn't ask for it, ignore this email.",
    ].join("\n"),
    html: `
      <p style="font-family:system-ui,sans-serif;font-size:16px;line-height:1.5;color:#111;">
        ${mail.intro}
      </p>
      <p><a href="${url}" style="font-family:system-ui,sans-serif;font-size:18px;font-weight:700;color:#111;">${mail.button}</a></p>
      <p style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#555;">
        It works once and expires in an hour. If you didn't ask for it, ignore this email.
      </p>`,
  });
  if (error) return failed;

  await admin.from("signin_requests").insert({ email });
  return null;
}
