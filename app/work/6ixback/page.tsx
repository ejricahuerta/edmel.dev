import type { Metadata } from "next";
import { ArchDiagram } from "@/components/case-study/arch-diagram";
import { Shot } from "@/components/case-study/shot";
import { StatStrip } from "@/components/case-study/stat-strip";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Squiggle } from "@/components/squiggle";
import { Button, Chips, Mark, SpecList } from "@/components/ui";

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
      <SiteNav base="/" current="Case study" />

      {/* Sections 1-3 render without Reveal: this page's value is indexable
          prose, and .ed-reveal starts at opacity 0 until client JS runs. Each
          Reveal below wraps exactly one section — its 0.06 threshold is
          relative to the observed box, so a wrapper much taller than the
          viewport can never intersect enough to un-hide itself. */}
      <main id="main">
      <div className="ed-container">
        <header className="ed-hero">
          <div className="ed-hero-copy">
            <span className="ed-eyebrow">Case study</span>
            <h1 className="ed-display-l">
              6ixBack.
              <br />
              <span className="is-quiet">Toronto pickup volleyball.</span>
            </h1>
            <p className="ed-lede">
              Hosts post drop-ins, leagues and tournaments. Players reserve spots.
              The money moves player-to-host by Interac e-Transfer — no platform
              cut, no merchant account, no payment processor. Which means nothing
              ever tells the platform who paid. So I built the thing that works it
              out.
            </p>
            <Chips
              items={[
                "Next.js 16",
                "React 19",
                "TypeScript",
                "ASP.NET Core",
                "EF Core",
                "Postgres 16",
                "Docker",
                "pnpm monorepo",
              ]}
            />
          </div>

          <div className="ed-window">
            <div className="ed-window-bar">
              <span className="ed-window-dot is-live" aria-hidden />
              <span className="ed-window-title">6ixback.json</span>
              <span className="ed-window-meta">// live</span>
            </div>
            <div className="ed-window-body">
              <SpecList
                items={[
                  ["role", "sole engineer"],
                  ["timeline", "Apr – Sep 2026"],
                  ["status", "live in production"],
                  ["scale", "138k lines · 186 test files"],
                  ["runtimes", "Next.js 16 · .NET 10"],
                ]}
              />
              <Button href="https://6ixback.ca" variant="ghost" external arrow>
                6ixback.ca
              </Button>
            </div>
          </div>
        </header>
      </div>

      <section className="ed-section" id="at-a-glance" aria-labelledby="at-a-glance-heading">
        <div className="ed-container">
        <h2 className="ed-label" id="at-a-glance-heading">at a glance</h2>
        <StatStrip />
        </div>
      </section>

      <section className="ed-section" id="reconciliation" aria-labelledby="reconciliation-heading">
        <div className="ed-container">
        <h2 className="ed-label" id="reconciliation-heading">payment reconciliation, not payment processing</h2>
        <div className="ed-intro">
          <p className="ed-body">
            Every other booking product I could copy starts from the same
            assumption: a processor takes the money, then tells you it happened.
            Take the processor away and the hardest problem in the system is no
            longer scheduling nine teams across three tiers. It is knowing, with
            confidence, that a specific stranger paid a specific host for a
            specific Monday night.
          </p>
        </div>
        <div className="ed-services">
          <div className="ed-service">
            <span className="ed-service-n">// 01</span>
            <h3 className="ed-h2">A signed code, per signup</h3>
            <div className="ed-service-d">
              Every reservation mints a short code derived from the signup itself
              and signed server-side. It can&apos;t be guessed, and it can&apos;t
              be replayed against a different signup. It rides along in the one
              field a bank transfer actually gives you: the memo.
            </div>
          </div>
          <div className="ed-service">
            <span className="ed-service-n">// 02</span>
            <h3 className="ed-h2">The money never touches the platform</h3>
            <div className="ed-service-d">
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
          <div className="ed-service">
            <span className="ed-service-n">// 03</span>
            <h3 className="ed-h2">Read the inbox, not the webhook</h3>
            <div className="ed-service-d">
              With the host&apos;s consent, the platform reads the host&apos;s own
              inbox over a read-only Google scope they can revoke at any time. It
              finds the Interac notification, extracts the code and the amount,
              and matches them to the signup. A wrong amount is rejected rather
              than guessed at, and a code nobody ever pays expires on a clock
              instead of holding a spot forever.
            </div>
          </div>
          <div className="ed-service">
            <span className="ed-service-n">// 04</span>
            <h3 className="ed-h2">The part nobody sees</h3>
            <div className="ed-service-d">
              A per-game reconciliation view, so when a host asks &ldquo;why is
              this one still unpaid&rdquo; there is an answer instead of a shrug.
              And a daily job that warns a host before their inbox authorization
              lapses — because an expiry nobody notices is a payments outage that
              looks like nothing at all.
            </div>
          </div>
        </div>
        <div className="cs-note">
          <p className="ed-body">
            The honest trade-off: inbound reconciliation is polled, not pushed,
            and it always will be. There is no webhook for a bank transfer
            between two strangers. Everything in the design follows from
            accepting that instead of wishing it away.
          </p>
        </div>
        </div>
      </section>

      <section className="ed-section" id="architecture" aria-labelledby="architecture-heading">
        <div className="ed-container">
        <h2 className="ed-label" id="architecture-heading">architecture</h2>
        <Reveal>
          <figure className="cs-figure">
            <ArchDiagram />
            <figcaption className="ed-comment">
              // two runtimes, one credential boundary, and the reconciliation
              loop picked out in lime
            </figcaption>
          </figure>
          <div className="cs-note">
            <ul className="ed-dash">
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
        </div>
      </section>

      <section className="ed-section" id="screens" aria-labelledby="screens-heading">
        <div className="ed-container">
        <h2 className="ed-label" id="screens-heading">what it looks like</h2>
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
        </div>
      </section>

      <section className="ed-section" id="practice" aria-labelledby="practice-heading">
        <div className="ed-container">
        <h2 className="ed-label" id="practice-heading">built to survive its own maintainer</h2>
        <Reveal>
          <div className="ed-services">
            <div className="ed-service">
              <span className="ed-service-n">// tests</span>
              <h3 className="ed-h2">186 test files, on both runtimes</h3>
              <div className="ed-service-d">
                Unit tests sit beside the pure logic they cover — payment
                matching, recurrence rules, roster removal, redirect
                sanitisation. The API suite boots the real application and runs
                against a genuine Postgres in a throwaway container, rather than
                pretending an in-memory provider is a database.
              </div>
            </div>
            <div className="ed-service">
              <span className="ed-service-n">// ci</span>
              <h3 className="ed-h2">Four workflows, one required gate</h3>
              <div className="ed-service-d">
                Lint, typecheck and unit tests on the web side; the API suite
                against a Postgres service container. Every change to either
                package must carry a changeset, enforced as a merge gate — with a
                documented escape hatch, because dogma loses to a typo fix. The
                two packages version and release independently.
              </div>
            </div>
            <div className="ed-service">
              <span className="ed-service-n">// migrations</span>
              <h3 className="ed-h2">A re-platform done in the open</h3>
              <div className="ed-service-d">
                The schema was rebuilt once already. 26 live migrations, a written
                cutover runbook, an ETL script, and a reconcile script whose only
                job is to prove the old and new datasets agree. The superseded
                migrations are archived rather than deleted, so the history still
                explains itself.
              </div>
            </div>
            <div className="ed-service">
              <span className="ed-service-n">// the contract</span>
              <h3 className="ed-h2">43 primitives and a written rule</h3>
              <div className="ed-service-d">
                A design system with a living specimen page, governed by an
                explicit use / extend / deviate rule — and an audit that logs
                every place the app deviates anyway. A design system nobody can
                cheat quietly is the only kind that survives contact with a
                deadline.
              </div>
            </div>
          </div>
        </Reveal>
        </div>
      </section>

      <section className="ed-section" id="decisions" aria-labelledby="decisions-heading">
        <div className="ed-container">
        <h2 className="ed-label" id="decisions-heading">decisions I&apos;d defend</h2>
        <Reveal>
          <div className="ed-cards">
            <article className="ed-decision">
              <h3 className="ed-h3">Poll, don&apos;t webhook</h3>
              <p>Inbound payment confirmation is polled because the bank will never
                call us; outbound messaging is pushed. Choosing the right
                direction per integration beats forcing one pattern on both.</p>
            </article>
            <article className="ed-decision">
              <h3 className="ed-h3">No realtime layer</h3>
              <p>No sockets. Liveness is server-rendered revalidation and an
                explicit refresh. A volleyball roster changes a few times an hour,
                not a few times a second — a persistent connection per viewer
                would have been infrastructure bought to solve a problem nobody
                had.</p>
            </article>
            <article className="ed-decision">
              <h3 className="ed-h3">Installable, deliberately not offline</h3>
              <p>The app installs to a phone home screen, and its service worker
                says in a comment that it caches nothing on purpose. An app whose
                entire content is who else is playing tonight has nothing honest
                to show you offline.</p>
            </article>
            <article className="ed-decision">
              <h3 className="ed-h3">One shell, four roles</h3>
              <p>Player, host, cohost and admin are separate passwordless sessions
                that can be held at the same time, so testing a host flow
                doesn&apos;t cost you your player session. Host access is
                approval-gated rather than self-serve — publishing a game takes on
                other people&apos;s money and evenings.</p>
            </article>
            <article className="ed-decision">
              <h3 className="ed-h3">The scoreboard is a route, not a modal</h3>
              <p>Live scoring opens over the league page as an intercepting parallel
                route: a real URL you can send to the person holding the clipboard,
                that still renders as a modal over the standings when you click
                into it from there.</p>
            </article>
          </div>
        </Reveal>
        </div>
      </section>

      <section className="ed-section" id="stack" aria-labelledby="stack-heading">
        <div className="ed-container">
        <h2 className="ed-label" id="stack-heading">stack</h2>
        <Reveal>
          <div className="cs-stack-cols">
            <div className="ed-service">
              <span className="ed-service-n">// web</span>
              <ul className="ed-dash">
                <li>Next.js 16 · App Router</li>
                <li>React 19 · server components</li>
                <li>TypeScript</li>
                <li>Tailwind CSS v4</li>
                <li>Zod at every boundary</li>
                <li>Vitest</li>
              </ul>
            </div>
            <div className="ed-service">
              <span className="ed-service-n">// api</span>
              <ul className="ed-dash">
                <li>ASP.NET Core · .NET 10</li>
                <li>EF Core · Npgsql</li>
                <li>Vertical slice features</li>
                <li>Transactional outbox</li>
                <li>xUnit · Testcontainers</li>
              </ul>
            </div>
            <div className="ed-service">
              <span className="ed-service-n">// infra</span>
              <ul className="ed-dash">
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
        </div>
      </section>

      <div className="ed-container ed-cta-wrap">
        <div className="ed-window ed-cta">
          <div className="ed-window-bar">
            <span className="ed-window-dot is-live" aria-hidden />
            <span className="ed-window-title">next_steps.md</span>
            <span className="ed-window-meta">// currently taking on new projects</span>
          </div>
          <div className="ed-window-body">
            <h2 className="ed-display-l">
              Your problem is weirder than a payment form.
              <br />
              <span className="is-quiet">Good. Those are the </span>
              <Mark>fun ones.</Mark>
            </h2>
            <div className="ed-cta-actions">
              <Button href="/#contact" arrow>
                Start a project
              </Button>
              <Button href="/#work" variant="secondary">
                Back to the index
              </Button>
            </div>
          </div>
        </div>
      </div>
      </main>

      <SiteFooter base="/" />
    </>
  );
}
