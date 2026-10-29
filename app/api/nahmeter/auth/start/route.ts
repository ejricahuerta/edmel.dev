import { z } from "zod";
import { fail } from "@/lib/nahmeter/accounts";
import { nahmeterEnv } from "@/lib/nahmeter/config";
import { authClient } from "@/lib/nahmeter/supabase";

const body = z.object({ email: z.string().trim().toLowerCase().email().max(254) });

/** Sends the sign-in email. Its link opens nah.meter on the phone (Android App Link). */
export async function POST(request: Request) {
  const cfg = nahmeterEnv();
  if ("missing" in cfg) return fail(503, "Accounts aren't set up yet.");

  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return fail(400, "Enter a valid email.");

  const { error } = await authClient(cfg.env).auth.signInWithOtp({
    email: parsed.data.email,
    options: { shouldCreateUser: true, emailRedirectTo: `${cfg.env.NAHMETER_SITE_URL}/nahmeter/auth/confirm` },
  });
  if (error) {
    return error.status === 429
      ? fail(429, "Too many tries. Wait a minute and try again.")
      : fail(502, "Couldn't send the email. Try again.");
  }
  return Response.json({ ok: true });
}
