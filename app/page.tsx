import Link from "next/link";
import { HeroPrompt } from "@/components/hero-prompt";
import { KnownIssues } from "@/components/known-issues";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Squiggle } from "@/components/squiggle";
import { Ticker } from "@/components/ticker";
import { Arrow, Button, Chips, Mark, Section, StatusPill } from "@/components/ui";

export default function Home() {
  return (
    <>
      <SiteNav />

      <main id="main">
        <div className="ed-container">
          <div className="ed-hero">
            <div className="ed-hero-copy">
              <span className="ed-eyebrow">Rescue engineering · Toronto</span>
              <h1 className="ed-display-xl">
                Enterprise quality.
                <br />
                <span className="is-quiet">Startup </span>
                <Mark>speed.</Mark>
              </h1>
              <p className="ed-lede">
                You vibe-coded something real. Now it looks like{" "}
                <Squiggle
                  variant="warn"
                  code="AiSlopDetected"
                  message={
                    <>
                      Expected: <span className="tt-type">brand</span>, received:{" "}
                      <span className="tt-type">genericUI</span>
                    </>
                  }
                >
                  AI slop
                </Squiggle>{" "}
                and the{" "}
                <Squiggle
                  variant="error"
                  code="RlsMissing"
                  message={
                    <>
                      public tables without{" "}
                      <span className="tt-type">rowLevelSecurity</span>
                    </>
                  }
                >
                  data isn&apos;t locked down
                </Squiggle>
                . I de-slop the UI, harden auth &amp; storage, and rebuild what
                can&apos;t be saved.
              </p>
              <div className="ed-hero-actions">
                <Button href="#contact" arrow>
                  Start a rescue
                </Button>
                <Button href="#work" variant="secondary">
                  See shipped work
                </Button>
              </div>
            </div>

            <HeroPrompt />
          </div>
        </div>

        <Ticker />

        <Section id="services" label="what I fix">
          <Reveal className="ed-services">
            <article className="ed-service">
              <span className="ed-service-n">// 01</span>
              <h3 className="ed-h2">
                De-slop the{" "}
                <Squiggle
                  variant="warn"
                  code="GenericUI"
                  message={
                    <>
                      Type <span className="tt-type">AiTemplate</span> is not
                      assignable to <span className="tt-type">Brand</span>
                    </>
                  }
                >
                  UI
                </Squiggle>
              </h3>
              <p className="ed-service-d">
                Kill the generic AI look. Typography, layout, and brand that feel
                intentional, not another card stack that could belong to anyone.
              </p>
            </article>
            <article className="ed-service">
              <span className="ed-service-n">// 02</span>
              <h3 className="ed-h2">
                Lock down your{" "}
                <Squiggle
                  variant="error"
                  code="DataExposed"
                  message={
                    <>
                      Expected: <span className="tt-type">authorizedAccess</span>,
                      received: <span className="tt-type">publicSelect</span>
                    </>
                  }
                >
                  data
                </Squiggle>
              </h3>
              <p className="ed-service-d">
                Auth, RLS, secrets, API routes. Stop treating &quot;it works in the
                demo&quot; as a security model.
              </p>
            </article>
            <article className="ed-service">
              <span className="ed-service-n">// 03</span>
              <h3 className="ed-h2">
                Stabilize what you{" "}
                <Squiggle
                  variant="warn"
                  code="VibeUnstable"
                  message={
                    <>
                      Next prompt may overwrite{" "}
                      <span className="tt-type">workingCode</span>
                    </>
                  }
                >
                  vibe-coded
                </Squiggle>
              </h3>
              <p className="ed-service-d">
                Tests where it hurts, seams where AI pasted chaos, so the next
                Cursor session doesn’t break production.
              </p>
            </article>
            <article className="ed-service">
              <span className="ed-service-n">// 04</span>
              <h3 className="ed-h2">
                Rebuild what{" "}
                <Squiggle
                  variant="error"
                  code="Unmaintainable"
                  message={
                    <>
                      Architecture not found:{" "}
                      <span className="tt-type">cannotBeSaved</span>
                    </>
                  }
                >
                  can&apos;t be saved
                </Squiggle>
              </h3>
              <p className="ed-service-d">
                Keep the product idea. Replace the parts that are unmaintainable.
                Phased, not a six-month freeze.
              </p>
            </article>
          </Reveal>
        </Section>

        <Section id="work" label="shipped products">
          <Reveal>
            <div className="ed-intro">
              <p className="ed-h3">The Rosetta Suite</p>
              <p className="ed-body">
                3 live AI-powered tools. One umbrella brand. Each shipped as sole
                engineer, from concept to production apps that don’t read as
                generated filler.
              </p>
              <Chips items={["SvelteKit", "Supabase", "OpenAI API", "Stripe", "PostHog", "Vercel"]} />
            </div>
            <div className="ed-cards">
              <a href="https://chartrosetta.com" target="_blank" rel="noopener noreferrer" className="ed-card">
                <div className="ed-card-head">
                  <h3 className="ed-h2">Chart Rosetta</h3>
                  <span className="ed-card-url">
                    chartrosetta.com <Arrow external />
                  </span>
                </div>
                <div className="ed-card-desc">
                  Takes any{" "}
                  <Squiggle
                    inLink
                    variant="warn"
                    code="DataUnreadable"
                    message={
                      <>
                        Type <span className="tt-type">image</span> is not readable
                        by humans
                      </>
                    }
                  >
                    chart screenshot
                  </Squiggle>{" "}
                  and returns a plain-English summary:
                  <ul className="ed-dash">
                    <li>what it shows</li>
                    <li>the key insight</li>
                    <li>what to do next</li>
                  </ul>
                </div>
              </a>
              <a href="https://reportrosetta.com" target="_blank" rel="noopener noreferrer" className="ed-card">
                <div className="ed-card-head">
                  <h3 className="ed-h2">Report Rosetta</h3>
                  <span className="ed-card-url">
                    reportrosetta.com <Arrow external />
                  </span>
                </div>
                <div className="ed-card-desc">
                  Converts any{" "}
                  <Squiggle
                    inLink
                    variant="error"
                    code="ReportUnparsed"
                    message={
                      <>
                        Cannot read <span className="tt-type">PDF | CSV | URL</span>{" "}
                        without translation layer
                      </>
                    }
                  >
                    business report
                  </Squiggle>{" "}
                  (PDF, CSV, URL, or pasted text) into four plain-English outputs:
                  <ul className="ed-dash">
                    <li>summary</li>
                    <li>key findings</li>
                    <li>actions</li>
                    <li>what to ignore</li>
                  </ul>
                </div>
              </a>
              <a href="https://leadrosetta.ednsy.com" target="_blank" rel="noopener noreferrer" className="ed-card">
                <div className="ed-card-head">
                  <h3 className="ed-h2">Lead Rosetta</h3>
                  <span className="ed-card-url">
                    leadrosetta.ednsy.com <Arrow external />
                  </span>
                </div>
                <div className="ed-card-desc">
                  Auto-generates{" "}
                  <Squiggle
                    inLink
                    variant="warn"
                    code="GenericPitch"
                    message={
                      <>
                        Expected: <span className="tt-type">builtDemo</span>,
                        received: <span className="tt-type">genericEmail</span>
                      </>
                    }
                  >
                    personalized demo websites
                  </Squiggle>{" "}
                  for prospects using their Google Business Profile, so agencies
                  send a built demo instead of a generic pitch.
                </div>
              </a>
            </div>

            <div className="ed-gap-8" />

            <div className="ed-intro">
              <p className="ed-h3">Client builds</p>
              <p className="ed-body">
                Live production sites for local businesses. Designed, built, and
                shipped end to end.
              </p>
            </div>
            <div className="ed-cards">
              <Link href="/work/6ixback" className="ed-card ed-card-feature">
                <div className="ed-card-head">
                  <h3 className="ed-h2">6ixBack</h3>
                  <span className="ed-card-url">
                    read the case study <Arrow />
                  </span>
                  <StatusPill status="resolved" className="ed-card-tag">
                    case study
                  </StatusPill>
                </div>
                <div className="ed-card-desc">
                  Toronto and the GTA&apos;s home for{" "}
                  <Squiggle
                    inLink
                    variant="warn"
                    code="CourtNotFound"
                    message={
                      <>
                        Cannot resolve <span className="tt-type">pickupGame</span>{" "}
                        without a schedule
                      </>
                    }
                  >
                    pickup volleyball
                  </Squiggle>
                  : browse drop-ins, join leagues, and host games with direct
                  e-Transfer to captains. Zero platform fees — and no payment
                  processor anywhere in the system.
                </div>
              </Link>
              <a href="https://clearwego.ca" target="_blank" rel="noopener noreferrer" className="ed-card">
                <div className="ed-card-head">
                  <h3 className="ed-h2">Clear We Go</h3>
                  <span className="ed-card-url">
                    clearwego.ca <Arrow external />
                  </span>
                </div>
                <div className="ed-card-desc">
                  Property, estate, and house{" "}
                  <Squiggle
                    inLink
                    variant="error"
                    code="SpaceUncleared"
                    message={
                      <>
                        Expected: <span className="tt-type">emptyReady</span>,
                        received: <span className="tt-type">cluttered</span>
                      </>
                    }
                  >
                    cleanout service
                  </Squiggle>{" "}
                  for Toronto and the GTA. Quote flow, documented clearing, and a
                  path from assessment to swept handoff.
                </div>
              </a>
            </div>
            <a href="#contact" className="ed-more">
              // more in the works, get in touch
            </a>
          </Reveal>
        </Section>

        <Section id="known-issues" label="known issues" count={5}>
          <KnownIssues />
        </Section>

        <div className="ed-container ed-cta-wrap">
          <div className="ed-window ed-cta">
            <div className="ed-window-bar">
              <span className="ed-window-dot is-live" aria-hidden />
              <span className="ed-window-title">next_steps.md</span>
              <span className="ed-window-meta">// currently taking rescue projects</span>
            </div>
            <div className="ed-window-body">
              <h2 className="ed-display-l">
                Don&apos;t ship the demo
                <br />
                <span className="is-quiet">as the </span>
                <Mark>product.</Mark>
              </h2>
              <div className="ed-cta-actions">
                <Button href="#contact" arrow>
                  Get it production-ready
                </Button>
                <Button href="/work/6ixback" variant="secondary">
                  Read the 6ixBack case study
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
