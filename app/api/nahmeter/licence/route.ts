import { ensureAccount, fail, licenceFor, userFromRequest } from "@/lib/nahmeter/accounts";
import { nahmeterEnv } from "@/lib/nahmeter/config";
import { adminClient } from "@/lib/nahmeter/supabase";

export const dynamic = "force-dynamic";

/** The signed-in courier's trial and paid dates. The app caches them, so it works offline until they pass. */
export async function GET(request: Request) {
  const cfg = nahmeterEnv();
  if ("missing" in cfg) return fail(503, "Accounts aren't set up yet.");

  const admin = adminClient(cfg.env);
  const user = await userFromRequest(admin, request);
  if (!user) return fail(401, "Signed out. Sign in again.");

  const account = await ensureAccount(admin, user);
  return Response.json(licenceFor(account, cfg.env));
}
