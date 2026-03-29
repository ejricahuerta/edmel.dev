import { ContactForm } from "@/components/contact-form";
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
          edmel<span>.dev</span>
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
            10 years in web dev. 6+ as{" "}
            <Squiggle
              variant="warn"
              code="NoTeamRequired"
              message={
                <>
                  Expected: <span className="tt-type">team[]</span>, found:{" "}
                  <span className="tt-type">1</span>
                </>
              }
            >
              sole architect
            </Squiggle>{" "}
            of production SaaS platforms. I take your{" "}
            <Squiggle
              variant="error"
              code="ProblemUnsolved"
              message={
                <>
                  No software found to handle{" "}
                  <span className="tt-type">businessProblem</span>
                </>
              }
            >
              business problem
            </Squiggle>{" "}
            from whiteboard to production.
          </p>
        </div>

        <div className="form-card" id="contact">
          <div className="form-header">
            <div className="form-header-dot" />
            <span className="form-header-label">new_project.json</span>
            <span className="form-availability">// 2 spots left this quarter</span>
          </div>
          <ContactForm />
        </div>
      </div>

      <Ticker />

      <section id="services">
        <div className="sec-label">/// what I do</div>
        <Reveal className="services">
          <div className="svc">
            <div className="svc-n">// 01</div>
            <div className="svc-t">
              Turn your idea into a{" "}
              <Squiggle
                variant="warn"
                code="IdeaNotImplemented"
                message={
                  <>
                    Property <span className="tt-type">workingSoftware</span> is
                    undefined
                  </>
                }
              >
                working product
              </Squiggle>
            </div>
            <div className="svc-d">
              You have a business problem and no software to solve it. I take it
              from whiteboard to live with paying users, without a team of ten or
              a six-month timeline.
            </div>
          </div>
          <div className="svc">
            <div className="svc-n">// 02</div>
            <div className="svc-t">
              Replace the{" "}
              <Squiggle
                variant="error"
                code="BottleneckDetected"
                message={
                  <>
                    Type <span className="tt-type">Spreadsheet</span> is not
                    assignable to <span className="tt-type">Automation</span>
                  </>
                }
              >
                manual work
              </Squiggle>{" "}
              slowing you down
            </div>
            <div className="svc-d">
              Repetitive tasks, slow internal tools, workflows held together by
              spreadsheets. I build the automation that gives your team their time
              back.
            </div>
          </div>
          <div className="svc">
            <div className="svc-n">// 03</div>
            <div className="svc-t">
              Add{" "}
              <Squiggle
                variant="warn"
                code="AINotDeployed"
                message={
                  <>
                    Expected production integration, received{" "}
                    <span className="tt-type">pitchDeck</span>
                  </>
                }
              >
                AI
              </Squiggle>{" "}
              where it actually makes a difference
            </div>
            <div className="svc-d">
              Not AI for the pitch deck. AI that handles real calls, reads real
              reports, and writes real outreach. Production-ready integrations that
              work the day you go live.
            </div>
          </div>
          <div className="svc">
            <div className="svc-n">// 04</div>
            <div className="svc-t">
              Build it so it{" "}
              <Squiggle
                variant="error"
                code="ScalabilityUndefined"
                message={
                  <>
                    Architecture not found:{" "}
                    <span className="tt-type">day one decisions</span> matter
                  </>
                }
              >
                scales
              </Squiggle>{" "}
              when you do
            </div>
            <div className="svc-d">
              The decisions made on day one determine whether your product
              survives growth. I&apos;ve kept platforms running at enterprise
              scale for 5+ years without an ops team. That&apos;s not luck.
              It&apos;s how I build.
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
                engineer, from concept to production.
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
            currently taking on new projects
          </div>
          <h2>
            <span className="h-fn">You&apos;ve been working around it</span>
            <br />
            <span className="h-str">long enough.</span>
          </h2>
          <div className="contact-links">
            <a href="#contact" className="primary">
              Start a Project
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
