import Image from "next/image";
import { HeroPrompt } from "@/components/hero-prompt";
import { KnownIssues } from "@/components/known-issues";
import { Reveal } from "@/components/reveal";
import { Squiggle } from "@/components/squiggle";
import { Ticker } from "@/components/ticker";

function ExternalIcon() {
  return (
    <svg
      width="10"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <nav>
        <a href="#" className="nav-logo">
          <Image
            src="/edmel.png"
            alt=""
            width={32}
            height={32}
            className="nav-avatar"
            priority
          />
          <span className="nav-logo-text">
            edmel<span>.dev</span>
          </span>
        </a>
        <div className="nav-actions">
          <div className="nav-social">
            <a
              href="https://github.com/ejricahuerta"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span aria-hidden="true"> · </span>
            <a
              href="https://linkedin.com/in/exricahuerta"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span aria-hidden="true"> · </span>
            <a
              href="https://www.instagram.com/dev.exd"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
          <a href="#contact" className="nav-cta">
            Get in touch
          </a>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-left">
          <div className="eyebrow">Custom Web Development</div>
          <h1>
            <span className="h-kw">Enterprise quality.</span>
            <br />
            <span className="h-str">Startup speed.</span>
          </h1>
          <p className="hero-sub">
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
        </div>

        <HeroPrompt />
      </div>

      <Ticker />

      <section id="services">
        <div className="sec-label">/// what I fix</div>
        <Reveal className="services">
          <div className="svc">
            <div className="svc-n">// 01</div>
            <div className="svc-t">
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
            </div>
            <div className="svc-d">
              Kill the generic AI look. Typography, layout, and brand that feel
              intentional, not another card stack that could belong to anyone.
            </div>
          </div>
          <div className="svc">
            <div className="svc-n">// 02</div>
            <div className="svc-t">
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
            </div>
            <div className="svc-d">
              Auth, RLS, secrets, API routes. Stop treating &quot;it works in the
              demo&quot; as a security model.
            </div>
          </div>
          <div className="svc">
            <div className="svc-n">// 03</div>
            <div className="svc-t">
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
            </div>
            <div className="svc-d">
              Tests where it hurts, seams where AI pasted chaos, so the next
              Cursor session doesn’t break production.
            </div>
          </div>
          <div className="svc">
            <div className="svc-n">// 04</div>
            <div className="svc-t">
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
            </div>
            <div className="svc-d">
              Keep the product idea. Replace the parts that are unmaintainable.
              Phased, not a six-month freeze.
            </div>
          </div>
        </Reveal>
      </section>

      <section id="work">
        <div className="sec-label">/// shipped products</div>
        <Reveal>
          <>
            <div className="work-intro">
              <p className="work-suite-kicker">
                <span className="suite-doc-prefix">///</span>{" "}
                <span className="suite-name-text">The Rosetta Suite</span>
              </p>
              <p className="suite-desc">
                3 live AI-powered tools. One umbrella brand. Each shipped as sole
                engineer, from concept to production apps that don’t read as
                generated filler.
              </p>
              <div className="suite-stack">
                <span>SvelteKit</span>
                <span>Supabase</span>
                <span>OpenAI API</span>
                <span>Stripe</span>
                <span>PostHog</span>
                <span>Vercel</span>
              </div>
            </div>
            <div className="prod-list">
            <a
              href="https://chartrosetta.com"
              target="_blank"
              rel="noopener noreferrer"
              className="prod-card"
            >
              <div className="prod-top">
                <span className="prod-name">Chart Rosetta</span>
                <span className="prod-url">
                  chartrosetta.com <ExternalIcon />
                </span>
              </div>
              <div className="prod-desc">
                Takes any{" "}
                <Squiggle
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
                <ul className="dash-list">
                  <li>what it shows</li>
                  <li>the key insight</li>
                  <li>what to do next</li>
                </ul>
              </div>
            </a>
            <a
              href="https://reportrosetta.com"
              target="_blank"
              rel="noopener noreferrer"
              className="prod-card"
            >
              <div className="prod-top">
                <span className="prod-name">Report Rosetta</span>
                <span className="prod-url">
                  reportrosetta.com <ExternalIcon />
                </span>
              </div>
              <div className="prod-desc">
                Converts any{" "}
                <Squiggle
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
                <ul className="dash-list">
                  <li>summary</li>
                  <li>key findings</li>
                  <li>actions</li>
                  <li>what to ignore</li>
                </ul>
              </div>
            </a>
            <a
              href="https://leadrosetta.ednsy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="prod-card"
            >
              <div className="prod-top">
                <span className="prod-name">Lead Rosetta</span>
                <span className="prod-url">
                  leadrosetta.ednsy.com <ExternalIcon />
                </span>
              </div>
              <div className="prod-desc">
                Auto-generates{" "}
                <Squiggle
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

            <div className="work-intro work-intro-follow">
              <p className="work-suite-kicker">
                <span className="suite-doc-prefix">///</span>{" "}
                <span className="suite-name-text">Client builds</span>
              </p>
              <p className="suite-desc">
                Live production sites for local businesses. Designed, built, and
                shipped end to end.
              </p>
            </div>
            <div className="prod-list">
              <a
                href="https://6ixback.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="prod-card"
              >
                <div className="prod-top">
                  <span className="prod-name">6ixBack</span>
                  <span className="prod-url">
                    6ixback.ca <ExternalIcon />
                  </span>
                </div>
                <div className="prod-desc">
                  Toronto and the GTA&apos;s home for{" "}
                  <Squiggle
                    variant="warn"
                    code="CourtNotFound"
                    message={
                      <>
                        Cannot resolve{" "}
                        <span className="tt-type">pickupGame</span> without a
                        schedule
                      </>
                    }
                  >
                    pickup volleyball
                  </Squiggle>
                  : browse drop-ins, join leagues, and host games with direct
                  e-Transfer to captains. Zero platform fees.
                </div>
              </a>
              <a
                href="https://clearwego.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="prod-card"
              >
                <div className="prod-top">
                  <span className="prod-name">Clear We Go</span>
                  <span className="prod-url">
                    clearwego.ca <ExternalIcon />
                  </span>
                </div>
                <div className="prod-desc">
                  Property, estate, and house{" "}
                  <Squiggle
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
                  for Toronto and the GTA. Quote flow, documented clearing, and
                  a path from assessment to swept handoff.
                </div>
              </a>
            </div>
          </>
          <a href="#contact" className="more-link">
            // more in the works, get in touch
          </a>
        </Reveal>
      </section>

      <section id="known-issues" aria-labelledby="known-issues-heading">
        <div className="sec-label" id="known-issues-heading">
          /// known issues
        </div>
        <KnownIssues />
      </section>

      <div className="contact-block">
        <div className="contact-glow" />
        <div className="form-header">
          <div className="form-header-dot" />
          <span className="form-header-label">next_steps.md</span>
        </div>
        <div className="contact-cta-body">
          <div className="eyebrow contact-cta-eyebrow">
            currently taking rescue projects
          </div>
          <h2>
            <span className="h-fn">Don&apos;t ship the demo</span>
            <br />
            <span className="h-str">as the product.</span>
          </h2>
          <div className="contact-links">
            <a href="#contact" className="primary">
              Get it production-ready
            </a>
          </div>
        </div>
      </div>

      <footer>
        <span className="footer-brand">edmel.dev</span>
        <span className="footer-meta">
          Toronto &amp; GTA · Edmel Ricahuerta
        </span>
      </footer>
    </>
  );
}
