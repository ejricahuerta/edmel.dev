import { z } from "zod";
import { fail } from "@/lib/nahmeter/accounts";
import { nahmeterEnv } from "@/lib/nahmeter/config";
import { sendSignInLink } from "@/lib/nahmeter/signin-email";
import { adminClient } from "@/lib/nahmeter/supabase";

const body = z.object({ email: z.string().trim().toLowerCase().email().max(254) });

/** Emails a sign-in link whose page opens nah.meter on the phone (Android App Link). */
export async function POST(request: Request) {
  const cfg = nahmeterEnv();
  if ("missing" in cfg) return fail(503, "Accounts aren't set up yet.");
  const { env } = cfg;

  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return fail(400, "Enter a valid email.");

  const failed = await sendSignInLink(env, adminClient(env), parsed.data.email, {
    path: "/nahmeter/auth/confirm",
    subject: "Sign in to nah.meter",
    intro: "Tap this link on the phone where nah.meter is installed to sign in:",
    button: "Sign in to nah.meter",
  });
  if (failed) return fail(failed.status, failed.error);
  return Response.json({ ok: true });
}
