import type { Metadata } from "next";
import Link from "next/link";
import { ArchDiagram } from "@/components/case-study/arch-diagram";
import { Shot } from "@/components/case-study/shot";
import { StatStrip } from "@/components/case-study/stat-strip";
import { ExternalIcon } from "@/components/external-icon";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Squiggle } from "@/components/squiggle";

export const metadata: Metadata = {
  title: "6ixBack — reconciling e-Transfer payments by reading the inbox",
  description:
    "Case study: a two-tier Next.js and ASP.NET Core platform for Toronto pickup volleyball, where money moves player-to-host by Interac e-Transfer and the platform reconciles payments from the host's own inbox. No payment processor.",
  alternates: { canonical: "/work/6ixback" },
  openGraph: {
    type: "article",
    url: "/work/6ixback",
    title: "6ixBack — payment reconciliation, not payment processing",
    description:
      "A volleyball platform with no payment processor. Signed payment codes, reconciled against the host's own Interac e-Transfer notifications.",
    images: [
      {
        url: "/case-studies/6ixback/og.png",
        width: 1200,
        height: 630,
        alt: "6ixBack architecture: a Next.js web tier over an ASP.NET Core API and Postgres, with the Gmail reconciliation loop highlighted.",
      },
    ],
  },
};

export default function SixBackCaseStudy() {
  return (
    <>
      <SiteNav logoHref="/" ctaHref="/#contact" />

      {/* Sections 1-3 render without Reveal: this page's value is indexable
          prose, and .reveal starts at opacity 0 until client JS runs. Each
          Reveal below wraps exactly one section — its 0.06 threshold is
          relative to the observed box, so a wrapper much taller than the
          viewport can never intersect enough to un-hide itself. */}
      <header className="cs-hero">
        <div className="cs-hero-left">
          <div className="eyebrow">Case Study</div>
          <h1>
            <span className="h-kw">6ixBack.</span>
            <br />
            <span className="h-str">Toronto pickup volleyball.</span>
          </h1>
          <p className="hero-sub">
            Hosts post drop-ins, leagues and tournaments. Players reserve spots.
            The money moves player-to-host by Interac e-Transfer — no platform
            cut, no merchant account, no payment processor. Which means nothing
            ever tells the platform who paid. So I built the thing that works it
            out.
          </p>
          <div className="suite-stack">
            <span>Next.js 16</span>
            <span>React 19</span>
            <span>TypeScript</span>
            <span>ASP.NET Core</span>
            <span>EF Core</span>
            <span>Postgres 16</span>
            <span>Docker</span>
            <span>pnpm monorepo</span>
          </div>
        </div>

        <div className="form-card cs-hero-card">
          <div className="form-header">
            <div className="form-header-dot" />
            <span className="form-header-label">6ixback.json</span>
          </div>
          <dl className="cs-spec">
            <div className="cs-spec-row">
              <dt>role</dt>
              <dd>sole engineer</dd>
            </div>
            <div className="cs-spec-row">
              <dt>timeline</dt>
              <dd>Apr – Sep 2026</dd>
            </div>
            <div className="cs-spec-row">
              <dt>status</dt>
              <dd>live in production</dd>
            </div>
            <div className="cs-spec-row">
              <dt>scale</dt>
              <dd>138k lines · 186 test files</dd>
            </div>
            <div className="cs-spec-row">
              <dt>runtimes</dt>
              <dd>Next.js 16 · .NET 10</dd>
            </div>
          </dl>
          <div className="cs-spec-foot">
            <a
              href="https://6ixback.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="prod-url"
            >
              6ixback.ca <ExternalIcon />
            </a>
          </div>
        </div>
      </header>

      <section id="at-a-glance">
        <h2 className="sec-label">/// at a glance</h2>
        <StatStrip />
      </section>

      <section id="reconciliation">
        <h2 className="sec-label">
          /// payment reconciliation, not payment processing
        </h2>
        <div className="work-intro">
          <p className="suite-desc">
            Every other booking product I could copy starts from the same
            assumption: a processor takes the money, then tells you it happened.
            Take the processor away and the hardest problem in the system is no
            longer scheduling nine teams across three tiers. It is knowing, with
            confidence, that a specific stranger paid a specific host for a
            specific Monday night.
          </p>
        </div>
        <div className="services">
          <div className="svc">
            <div className="svc-n">// 01</div>
            <div className="svc-t">A signed code, per signup</div>
            <div className="svc-d">
              Every reservation mints a short code derived from the signup itself
              and signed server-side. It can&apos;t be guessed, and it can&apos;t
              be replayed against a different signup. It rides along in the one
              field a bank transfer actually gives you: the memo.
            </div>
          </div>
          <div className="svc">
            <div className="svc-n">// 02</div>
            <div className="svc-t">The money never touches the platform</div>
            <div className="svc-d">
              The player e-Transfers the host directly and pastes the code in the
              message.{" "}
              <Squiggle
                variant="warn"
                code="NoWebhookAvailable"
                message={
                  <>
                    No <span className="tt-type">webhook</span> is emitted for an{" "}
                    <span className="tt-type">InteracTransfer</span> between two
                    strangers
                  </>
                }
              >
                No Stripe.
              </Squiggle>{" "}
              No merchant account, no percentage, no chargeback surface, and
              nothing in scope for PCI — because there is no card anywhere in the
              system to put in scope.
            </div>
          </div>
          <div className="svc">
            <div className="svc-n">// 03</div>
            <div className="svc-t">Read the inbox, not the webhook</div>
            <div className="svc-d">
              With the host&apos;s consent, the platform reads the host&apos;s own
              inbox over a read-only Google scope they can revoke at any time. It
              finds the Interac notification, extracts the code and the amount,
              and matches them to the signup. A wrong amount is rejected rather
              than guessed at, and a code nobody ever pays expires on a clock
              instead of holding a spot forever.
            </div>
          </div>
          <div className="svc">
            <div className="svc-n">// 04</div>
            <div className="svc-t">The part nobody sees</div>
            <div className="svc-d">
              A per-game reconciliation view, so when a host asks &ldquo;why is
              this one still unpaid&rdquo; there is an answer instead of a shrug.
              And a daily job that warns a host before their inbox authorization
              lapses — because an expiry nobody notices is a payments outage that
              looks like nothing at all.
            </div>
          </div>
        </div>
        <div className="work-intro cs-note">
          <p className="suite-desc">
            The honest trade-off: inbound reconciliation is polled, not pushed,
            and it always will be. There is no webhook for a bank transfer
            between two strangers. Everything in the design follows from
            accepting that instead of wishing it away.
          </p>
        </div>
      </section>

      <section id="architecture">
        <h2 className="sec-label">/// architecture</h2>
        <Reveal>
          <figure className="cs-figure">
            <ArchDiagram />
            <figcaption className="svc-n">
              // two runtimes, one credential boundary, and the reconciliation
              loop picked out in yellow
            </figcaption>
          </figure>
          <div className="work-intro cs-note">
            <ul className="dash-list">
              <li>
                the web tier holds no database credentials — every read and write
                goes through the API over an authenticated service call, so the
                API is the only code path that can reach the data
              </li>
              <li>
                the cron worker is the same container image in a different role:
                seven jobs on a 60-second loop, in a deliberate order, because
                reminders have to fire before the sweep that cancels unpaid spots
              </li>
              <li>
                those same seven jobs are also HTTP endpoints, so the schedule can
                live in Vercel Cron or inside the container with no code change —
                the deployment target is a config decision, not a rewrite
              </li>
              <li>
                anything that must not be lost on the way out — an email, a
                WhatsApp post — is written to a transactional outbox in the same
                transaction as the thing that caused it, then drained with retries
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section id="screens">
        <h2 className="sec-label">/// what it looks like</h2>
        <Reveal>
          <div className="cs-shots">
            <Shot
              slug="browse"
              url="6ixback.ca/browse"
              caption="// browse — desktop and mobile"
              alt="The browse page listing upcoming drop-ins. Each card shows the date, start time, skill level, venue and neighbourhood, a pip row counting spots taken against capacity, and a reserve button with the price. A sidebar explains that unpaid spots cancel three hours before start and that players e-Transfer their host directly, with no card and no service fee."
            />
            <Shot
              slug="standings"
              url="6ixback.ca/league/standings"
              caption="// league standings — desktop and mobile"
              alt="A league standings table for a live season, ranked by MMR and showing win-loss record, point differential and points for and against per team, with each team tagged by tier. The header tracks week one of thirteen, nine teams, and the prize pool."
            />
            <Shot
              slug="matches"
              url="6ixback.ca/league/matches"
              caption="// match nights — desktop and mobile"
              alt="The match nights schedule for week one, broken into tiers. Each row gives a twenty-minute slot, the serving and receiving teams, the running set score, which team referees, and a scorecard link that requires signing in to score live."
            />
          </div>
        </Reveal>
      </section>

      <section id="practice">
        <h2 className="sec-label">/// built to survive its own maintainer</h2>
        <Reveal>
          <div className="services">
            <div className="svc">
              <div className="svc-n">// tests</div>
              <div className="svc-t">186 test files, on both runtimes</div>
              <div className="svc-d">
                Unit tests sit beside the pure logic they cover — payment
                matching, recurrence rules, roster removal, redirect
                sanitisation. The API suite boots the real application and runs
                against a genuine Postgres in a throwaway container, rather than
                pretending an in-memory provider is a database.
              </div>
            </div>
            <div className="svc">
              <div className="svc-n">// ci</div>
              <div className="svc-t">Four workflows, one required gate</div>
              <div className="svc-d">
                Lint, typecheck and unit tests on the web side; the API suite
                against a Postgres service container. Every change to either
                package must carry a changeset, enforced as a merge gate — with a
                documented escape hatch, because dogma loses to a typo fix. The
                two packages version and release independently.
              </div>
            </div>
            <div className="svc">
              <div className="svc-n">// migrations</div>
              <div className="svc-t">A re-platform done in the open</div>
              <div className="svc-d">
                The schema was rebuilt once already. 26 live migrations, a written
                cutover runbook, an ETL script, and a reconcile script whose only
                job is to prove the old and new datasets agree. The superseded
                migrations are archived rather than deleted, so the history still
                explains itself.
              </div>
            </div>
            <div className="svc">
              <div className="svc-n">// the contract</div>
              <div className="svc-t">43 primitives and a written rule</div>
              <div className="svc-d">
                A design system with a living specimen page, governed by an
                explicit use / extend / deviate rule — and an audit that logs
                every place the app deviates anyway. A design system nobody can
                cheat quietly is the only kind that survives contact with a
                deadline.
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="decisions">
        <h2 className="sec-label">/// decisions I&apos;d defend</h2>
        <Reveal>
          <div className="prod-list">
            <div className="prod-card cs-decision">
              <div className="prod-top">
                <span className="prod-name">Poll, don&apos;t webhook</span>
              </div>
              <div className="prod-desc">
                Inbound payment confirmation is polled because the bank will never
                call us; outbound messaging is pushed. Choosing the right
                direction per integration beats forcing one pattern on both.
              </div>
            </div>
            <div className="prod-card cs-decision">
              <div className="prod-top">
                <span className="prod-name">No realtime layer</span>
              </div>
              <div className="prod-desc">
                No sockets. Liveness is server-rendered revalidation and an
                explicit refresh. A volleyball roster changes a few times an hour,
                not a few times a second — a persistent connection per viewer
                would have been infrastructure bought to solve a problem nobody
                had.
              </div>
            </div>
            <div className="prod-card cs-decision">
              <div className="prod-top">
                <span className="prod-name">Installable, deliberately not offline</span>
              </div>
              <div className="prod-desc">
                The app installs to a phone home screen, and its service worker
                says in a comment that it caches nothing on purpose. An app whose
                entire content is who else is playing tonight has nothing honest
                to show you offline.
              </div>
            </div>
            <div className="prod-card cs-decision">
              <div className="prod-top">
                <span className="prod-name">One shell, four roles</span>
              </div>
              <div className="prod-desc">
                Player, host, cohost and admin are separate passwordless sessions
                that can be held at the same time, so testing a host flow
                doesn&apos;t cost you your player session. Host access is
                approval-gated rather than self-serve — publishing a game takes on
                other people&apos;s money and evenings.
              </div>
            </div>
            <div className="prod-card cs-decision">
              <div className="prod-top">
                <span className="prod-name">The scoreboard is a route, not a modal</span>
              </div>
              <div className="prod-desc">
                Live scoring opens over the league page as an intercepting parallel
                route: a real URL you can send to the person holding the clipboard,
                that still renders as a modal over the standings when you click
                into it from there.
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="stack">
        <h2 className="sec-label">/// stack</h2>
        <Reveal>
          <div className="cs-stack-cols">
            <div className="svc">
              <div className="svc-n">// web</div>
              <ul className="dash-list">
                <li>Next.js 16 · App Router</li>
                <li>React 19 · server components</li>
                <li>TypeScript</li>
                <li>Tailwind CSS v4</li>
                <li>Zod at every boundary</li>
                <li>Vitest</li>
              </ul>
            </div>
            <div className="svc">
              <div className="svc-n">// api</div>
              <ul className="dash-list">
                <li>ASP.NET Core · .NET 10</li>
                <li>EF Core · Npgsql</li>
                <li>Vertical slice features</li>
                <li>Transactional outbox</li>
                <li>xUnit · Testcontainers</li>
              </ul>
            </div>
            <div className="svc">
              <div className="svc-n">// infra</div>
              <ul className="dash-list">
                <li>Postgres 16</li>
                <li>Docker Compose · Coolify</li>
                <li>Vercel · cron + blob storage</li>
                <li>Gmail API · read-only</li>
                <li>Resend · transactional email</li>
                <li>Self-hosted WhatsApp HTTP API</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="contact-block">
        <div className="contact-glow" />
        <div className="form-header">
          <div className="form-header-dot" />
          <span className="form-header-label">next_steps.md</span>
        </div>
        <div className="contact-cta-body">
          <div className="eyebrow contact-cta-eyebrow">
            currently taking on new projects
          </div>
          <h2>
            <span className="h-fn">Your problem is weirder than a payment form.</span>
            <br />
            <span className="h-str">Good. Those are the fun ones.</span>
          </h2>
          <div className="contact-links">
            <a href="/#contact" className="primary">
              Start a Project
            </a>
          </div>
        </div>
      </div>

      <div className="cs-back">
        <Link href="/#work" className="more-link">
          // back to the index
        </Link>
      </div>

      <SiteFooter />
    </>
  );
}
