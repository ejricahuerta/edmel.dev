import { z } from "zod";
import { ensureAccount, fail, licenceFor } from "@/lib/nahmeter/accounts";
import { nahmeterEnv } from "@/lib/nahmeter/config";
import { adminClient, authClient } from "@/lib/nahmeter/supabase";

const body = z.object({ token_hash: z.string().min(8).max(512) });

/** Turns the sign-in link's token into a session for the app, and starts the trial on first sign-in. */
export async function POST(request: Request) {
  const cfg = nahmeterEnv();
  if ("missing" in cfg) return fail(503, "Accounts aren't set up yet.");

  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return fail(400, "That sign-in link isn't complete.");

  const { data, error } = await authClient(cfg.env).auth.verifyOtp({
    token_hash: parsed.data.token_hash,
    type: "magiclink",
  });
  if (error || !data.session || !data.user) {
    return fail(401, "That sign-in link has expired or was already used. Send a new one.");
  }

  const account = await ensureAccount(adminClient(cfg.env), data.user);
  return Response.json({
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    expiresAt: data.session.expires_at ?? null,
    licence: licenceFor(account, cfg.env),
  });
}
