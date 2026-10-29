import type { Metadata } from "next";
import { grantFreeMonths, recordPayment } from "@/app/nahmeter/admin/actions";
import { licenceFor, type Account } from "@/lib/nahmeter/accounts";
import { nahmeterEnv } from "@/lib/nahmeter/config";
import { adminClient } from "@/lib/nahmeter/supabase";

export const metadata: Metadata = { title: "nah.meter admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const day = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-CA", { dateStyle: "medium" }) : "—");

/** Owner only (Basic auth in middleware.ts): accounts, and recording e-Transfers or free months. */
export default async function NahmeterAdmin({ searchParams }: { searchParams: Promise<{ msg?: string }> }) {
  const { msg } = await searchParams;
  const cfg = nahmeterEnv();
  if ("missing" in cfg) {
    return (
      <main className="ed-page">
        <div className="ed-container ed-section">
          <h1 className="ed-h1">nah.meter admin</h1>
          <p className="ed-body">Not set up yet. Missing: {cfg.missing.join(", ")}.</p>
        </div>
      </main>
    );
  }

  const { data, error } = await adminClient(cfg.env)
    .from("nahmeter_accounts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  const accounts = (data ?? []) as Account[];

  return (
    <main className="ed-page">
      <div className="ed-container ed-section" style={{ display: "grid", gap: "var(--space-7)" }}>
        <h1 className="ed-h1">nah.meter admin</h1>
        {msg ? <p className="ed-mono" role="status">{msg}</p> : null}
        {error ? <p className="ed-mono">Couldn&apos;t load accounts: {error.message}</p> : null}

        <section style={{ display: "grid", gap: "var(--space-5)", maxWidth: 520 }}>
          <h2 className="ed-h3">Record an e-Transfer</h2>
          <form action={recordPayment}>
            <div className="ed-field"><label htmlFor="pc">Pay code</label><input id="pc" name="payCode" className="ed-input" placeholder="NAH-7KQ2" required /></div>
            <div className="ed-field"><label htmlFor="amt">Amount ($, every $5 is a month)</label><input id="amt" name="amount" className="ed-input" type="number" min="5" step="0.01" defaultValue="5" required /></div>
            <div className="ed-field"><label htmlFor="ref">e-Transfer reference</label><input id="ref" name="ref" className="ed-input" /></div>
            <div className="ed-field"><label htmlFor="note">Note</label><input id="note" name="note" className="ed-input" /></div>
            <button type="submit" className="ed-btn ed-btn-primary">Add months</button>
          </form>
        </section>

        <section style={{ display: "grid", gap: "var(--space-5)", maxWidth: 520 }}>
          <h2 className="ed-h3">Grant free months</h2>
          <form action={grantFreeMonths}>
            <div className="ed-field"><label htmlFor="fpc">Pay code</label><input id="fpc" name="payCode" className="ed-input" placeholder="NAH-7KQ2" required /></div>
            <div className="ed-field"><label htmlFor="fm">Months</label><input id="fm" name="months" className="ed-input" type="number" min="1" max="12" defaultValue="1" required /></div>
            <div className="ed-field"><label htmlFor="fnote">Note</label><input id="fnote" name="note" className="ed-input" placeholder="free on request" /></div>
            <button type="submit" className="ed-btn ed-btn-secondary">Grant</button>
          </form>
        </section>

        <section style={{ display: "grid", gap: "var(--space-4)" }}>
          <h2 className="ed-h3">Accounts ({accounts.length})</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="ed-mono" style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th>Email</th><th>Code</th><th>Status</th><th>Trial ends</th><th>Paid until</th><th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((a) => {
                  const l = licenceFor(a, cfg.env);
                  return (
                    <tr key={a.user_id} style={{ borderTop: "1px solid var(--line)" }}>
                      <td>{a.email}</td><td>{a.pay_code}</td><td>{l.status}</td>
                      <td>{day(a.trial_ends_at)}</td><td>{day(a.paid_until)}</td><td>{day(a.created_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
