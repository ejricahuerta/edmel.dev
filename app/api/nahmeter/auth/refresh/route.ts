import { z } from "zod";
import { fail } from "@/lib/nahmeter/accounts";
import { nahmeterEnv } from "@/lib/nahmeter/config";
import { authClient } from "@/lib/nahmeter/supabase";

const body = z.object({ refresh_token: z.string().min(8).max(1024) });

/** A new access token for the app; a 401 means sign in again. */
export async function POST(request: Request) {
  const cfg = nahmeterEnv();
  if ("missing" in cfg) return fail(503, "Accounts aren't set up yet.");

  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return fail(400, "Missing refresh token.");

  const { data, error } = await authClient(cfg.env).auth.refreshSession({ refresh_token: parsed.data.refresh_token });
  if (error || !data.session) return fail(401, "Signed out. Sign in again.");
  return Response.json({
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    expiresAt: data.session.expires_at ?? null,
  });
}
