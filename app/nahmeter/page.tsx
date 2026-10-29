import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { APK_URL, CONTACT_EMAIL, LEGAL_BASE, PRICE_CENTS, TRIAL_DAYS, payEmail } from "@/lib/nahmeter/config";

export const metadata: Metadata = {
  title: "nah.meter",
  description:
    "A community Android app for delivery couriers: a one-word verdict on every offer, so you can decide fast. Advice only. $5 a month after a 14-day free trial, free on request.",
  alternates: { canonical: "/nahmeter" },
};

const price = `$${(PRICE_CENTS / 100).toFixed(0)}`;

/** What nah.meter is, what it costs, and how to pay. */
export default function Nahmeter() {
  return (
    <>
      <SiteNav base="/" />
      <main id="main">
        <div className="ed-container">
          <header className="ed-hero">
            <div className="ed-hero-copy">
              <span className="ed-eyebrow">Community app</span>
              <h1 className="ed-display-l">nah.meter</h1>
              <p className="ed-lede">
                A tool that helps delivery couriers see each offer and decide for themselves. It reads the offer on
                your screen and gives one word: bet., eh. or nah. Advice only: it never taps anything for you.
              </p>
              <div>
                <a className="ed-btn ed-btn-primary" href={APK_URL}>Download for Android</a>
              </div>
            </div>
          </header>

          <section className="ed-section" style={{ display: "grid", gap: "var(--space-5)", maxWidth: "var(--measure)" }}>
            <h2 className="ed-h2">What it costs</h2>
            <p className="ed-body">
              nah.meter is run at cost, not for profit. The first {TRIAL_DAYS} days are free. After that it&apos;s {price} CAD a
              month, which pays for hosting and upkeep. If you can&apos;t pay right now, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and ask for free months.
            </p>
            <h2 className="ed-h2">How to pay</h2>
            <ol className="ed-body" style={{ paddingLeft: "1.2em", display: "grid", gap: "var(--space-2)" }}>
              <li>Sign in to nah.meter with your email. The app shows your pay code, like NAH-7KQ2.</li>
              <li>Send {price} per month by Interac e-Transfer to <strong>{payEmail()}</strong>, with your pay code in the message.</li>
              <li>We add the months to your account, usually within a day. Tap Check again in the app.</li>
            </ol>
            <p className="ed-small">Nothing renews by itself: each e-Transfer adds months, and you can stop any time.</p>
          </section>

          <section className="ed-section" style={{ display: "grid", gap: "var(--space-4)", maxWidth: "var(--measure)" }}>
            <h2 className="ed-h2">The fine print</h2>
            <p className="ed-body">
              nah.meter isn&apos;t affiliated with Uber. What it reads on your screen stays on your phone; the app only goes
              online to sign you in and check your licence.
            </p>
            <p className="ed-body">
              <a href={`${LEGAL_BASE}/terms.md`}>Terms of use</a> · <a href={`${LEGAL_BASE}/privacy.md`}>Privacy policy</a>
            </p>
          </section>
        </div>
      </main>
      <SiteFooter base="/" />
    </>
  );
}
