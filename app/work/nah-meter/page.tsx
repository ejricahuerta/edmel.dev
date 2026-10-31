import type { Metadata } from "next";
import { NahPipeline } from "@/components/case-study/nah-pipeline";
import { type Stat, StatStrip } from "@/components/case-study/stat-strip";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Squiggle } from "@/components/squiggle";
import { Button, Chips, Mark, SpecList } from "@/components/ui";

const BASE = "/case-studies/nah-meter";

export const metadata: Metadata = {
  title: "nah.meter — a one-word verdict on every delivery offer",
  description:
    "Case study: an offline Android app that reads each delivery offer off the screen, scores it against the courier's own rules, and answers in one word before the 15-second timer runs out. It never taps anything and never goes online.",
  alternates: { canonical: "/work/nah-meter" },
  openGraph: {
    type: "article",
    url: "/work/nah-meter",
    title: "nah.meter — bad offer? Just say nah.",
    description:
      "Reads delivery offers with on-device OCR, does the $/hr maths, and answers bet!, meh. or nah. Advice only, fully offline.",
    images: [
      {
        url: `${BASE}/og.png`,
        width: 1200,
        height: 630,
        alt: "A delivery offer for $6.07, 23 minutes and 11.5 km, with nah.meter's black verdict card docked above it: nah., $15.83 an hour, under your $20.",
      },
    ],
  },
};

const STATS: Stat[] = [
  { id: "speed", value: "~1 s", label: "from offer card to verdict" },
  { id: "tests", value: "52", label: "parser + scorer unit tests" },
  { id: "releases", value: "41", label: "signed releases in 47 hours" },
  { id: "prs", value: "27", label: "pull requests merged" },
  { id: "loc", value: "5.7k", label: "lines of kotlin" },
  { id: "network", value: "0", label: "internet permissions", accent: true },
];

export default function NahMeterCaseStudy() {
  return (
    <>
      <SiteNav base="/" current="Case study" />

      {/* As on the 6ixBack page: the first sections render without Reveal so the prose is
          indexable before client JS runs, and each Reveal wraps exactly one section. */}
      <main id="main">
        <div className="ed-container">
          <header className="ed-hero">
            <div className="ed-hero-copy">
              <span className="ed-eyebrow">Case study</span>
              <h1 className="ed-display-l">
                nah.meter.
                <br />
                <span className="is-quiet">A verdict before the timer runs out.</span>
              </h1>
              <p className="ed-lede">
                A delivery offer gives a courier fifteen seconds and three numbers: pay, minutes,
                kilometres. It never gives the one that matters, what it pays per hour. nah.meter
                reads the offer off the screen, scores it against the courier&apos;s own rules and
                answers in one word: bet!, meh. or nah. It never taps anything, and it never goes
                online.
              </p>
              <Chips
                items={["Kotlin", "Jetpack Compose", "Accessibility service", "ML Kit OCR", "Room", "DataStore", "GitHub Actions"]}
              />
            </div>

            <div className="ed-window">
              <div className="ed-window-bar">
                <span className="ed-window-dot is-live" aria-hidden />
                <span className="ed-window-title">nah-meter.json</span>
                <span className="ed-window-meta">// shipping</span>
              </div>
              <div className="ed-window-body">
                <SpecList
                  items={[
                    ["role", "sole engineer"],
                    ["timeline", "Oct 2026 · v1 to v1.0.92 in 3 days"],
                    ["status", "sideloaded APK · Android 8+"],
                    ["scale", "5.7k lines Kotlin · 52 tests"],
                    ["network", "none, by manifest"],
                  ]}
                />
                <Button href="https://github.com/ejricahuerta/nah-meter" variant="ghost" external arrow>
                  github.com/ejricahuerta/nah-meter
                </Button>
              </div>
            </div>
          </header>
        </div>

        <section className="ed-section" id="at-a-glance" aria-labelledby="at-a-glance-heading">
          <div className="ed-container">
            <h2 className="ed-label" id="at-a-glance-heading">at a glance</h2>
            <StatStrip stats={STATS} />
          </div>
        </section>

        <section className="ed-section" id="promo" aria-labelledby="promo-heading">
          <div className="ed-container">
            <h2 className="ed-label" id="promo-heading">in 45 seconds</h2>
            <figure className="cs-figure">
              <div className="cs-shot-frame">
                <div className="ed-window-bar">
                  <span className="ed-window-dot" aria-hidden />
                  <span className="ed-window-title">nahmeter-promo.mp4</span>
                </div>
                <video
                  className="cs-video"
                  src={`${BASE}/promo.mp4`}
                  poster={`${BASE}/poster.webp`}
                  controls
                  playsInline
                  preload="none"
                  width={1920}
                  height={1080}
                  aria-label="nah.meter promo: a delivery offer with a 15-second timer gets a verdict card, nah., $15.83 an hour; then bet! and meh. offers, the spoken verdict, the rules screen, and the promises: it never taps for you, no internet, no account."
                />
              </div>
              <figcaption className="ed-comment">
                // the promo, also built in code: Remotion, the app&apos;s own tokens and scoring
                logic, a voiceover cut to the frame
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="ed-section" id="reading" aria-labelledby="reading-heading">
          <div className="ed-container">
            <h2 className="ed-label" id="reading-heading">reading a screen that won&apos;t be read</h2>
            <div className="ed-intro">
              <p className="ed-body">
                The maths is one line: pay divided by minutes, times sixty. Everything hard is
                getting three numbers off someone else&apos;s app, a second after they appear,
                on a phone in a dash mount, while being certain enough to say them out loud.
              </p>
            </div>
            <div className="ed-services">
              <div className="ed-service">
                <span className="ed-service-n">// 01</span>
                <h3 className="ed-h2">The text isn&apos;t there</h3>
                <div className="ed-service-d">
                  The delivery app shows offers as a pop-up over other apps and{" "}
                  <Squiggle
                    variant="warn"
                    code="NodeTextHidden"
                    message={
                      <>
                        Offer text not exposed to{" "}
                        <span className="tt-type">AccessibilityNodeInfo</span>
                      </>
                    }
                  >
                    hides its text from accessibility.
                  </Squiggle>{" "}
                  So the main path is a screenshot cropped to that app&apos;s windows only, read
                  on the phone by ML Kit about once a second. No recording prompt, no upload.
                </div>
              </div>
              <div className="ed-service">
                <span className="ed-service-n">// 02</span>
                <h3 className="ed-h2">Forgive the OCR, never guess</h3>
                <div className="ed-service-d">
                  &ldquo;$1l.59&rdquo; and &ldquo;$1159&rdquo; are both $11.59, and a bracket read
                  as a C is still a bracket. But a trip line with an hours word and no readable
                  hours number is <em>can&apos;t read.</em>, because the minutes alone once scored
                  a 63-minute trip as 3 minutes: $270.80 an hour. A trip faster than 100 km/h is a
                  misread time, not a great offer.
                </div>
              </div>
              <div className="ed-service">
                <span className="ed-service-n">// 03</span>
                <h3 className="ed-h2">The tallest number, not the biggest</h3>
                <div className="ed-service-d">
                  Pages behind the pop-up have their own dollar amounts. The pay is the dollar
                  figure in the tallest text in the band above the trip line, never the largest
                  value on screen.
                </div>
              </div>
              <div className="ed-service">
                <span className="ed-service-n">// 04</span>
                <h3 className="ed-h2">Two reads must agree</h3>
                <div className="ed-service-d">
                  $19.04 read once as $9.04 is a nah. on a good offer. A screenshot read only
                  counts when the next one agrees, so a one-off misread never shows, and never
                  replaces a verdict that&apos;s already up. The verdict stays as long as the card
                  does, and leaves 600 ms after it&apos;s gone.
                </div>
              </div>
            </div>
            <div className="cs-note">
              <p className="ed-body">
                The honest trade-off: OCR is the main path because the accessible one is closed,
                and it costs about a second per verdict. Every parser fix starts as a unit test
                built from the exact lines a courier pasted from the app&apos;s diagnostics log.
              </p>
            </div>
          </div>
        </section>

        <section className="ed-section" id="pipeline" aria-labelledby="pipeline-heading">
          <div className="ed-container">
            <h2 className="ed-label" id="pipeline-heading">pipeline</h2>
            <Reveal>
              <figure className="cs-figure">
                <NahPipeline />
                <figcaption className="ed-comment">
                  // one phone, no network, and the read-twice step picked out in lime
                </figcaption>
              </figure>
              <div className="cs-note">
                <ul className="ed-dash">
                  <li>
                    the service has to hear events from every app, because the offer&apos;s
                    &ldquo;window changed&rdquo; event carries no package name; it reads text only
                    from the delivery app&apos;s own windows
                  </li>
                  <li>
                    the verdict is an accessibility overlay, so there&apos;s no &ldquo;draw over
                    apps&rdquo; permission, and it uses screen coordinates: without that, Android
                    shifted it down by exactly the status bar&apos;s height on a Pixel
                  </li>
                  <li>
                    the screenshot reader frees every bitmap as soon as it&apos;s done; at one read
                    a second for a whole shift, a leak there crashed the app after a few hours
                  </li>
                  <li>
                    Android switches a crashed accessibility service off and only the user can turn
                    it back on, so if the reader stops mid-shift, a notification says so
                  </li>
                </ul>
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
                  <h3 className="ed-h3">Advice only, never a tap</h3>
                  <p>
                    Auto-accept is the first thing couriers ask for, and it&apos;s how accounts get
                    deactivated. The app can&apos;t tap: there&apos;s no gesture code in it at all.
                    The courier decides; nah.meter just does the maths faster.
                  </p>
                </article>
                <article className="ed-decision">
                  <h3 className="ed-h3">Offline, enforced by the manifest</h3>
                  <p>
                    The manifest removes the internet permission with a merge rule, so no library
                    can quietly add it back. No analytics, no crash reporting that leaves the
                    phone. Diagnostics are a log the courier copies and pastes, if they choose to.
                  </p>
                </article>
                <article className="ed-decision">
                  <h3 className="ed-h3">&ldquo;can&apos;t read.&rdquo; beats a confident wrong answer</h3>
                  <p>
                    A verdict someone acts on in fifteen seconds has to be right or absent. Any
                    number the parser can&apos;t stand behind turns the card grey, rather than into
                    a best guess dressed up as an answer.
                  </p>
                </article>
                <article className="ed-decision">
                  <h3 className="ed-h3">The strict rate is the courier&apos;s call</h3>
                  <p>
                    Missing the strict rate is nah.; missing the other is only meh. $ per hour by
                    default, $ per km in traffic, when the minutes stretch and the distance
                    doesn&apos;t. One tap in the shade flips it.
                  </p>
                </article>
                <article className="ed-decision">
                  <h3 className="ed-h3">Say it, don&apos;t show it</h3>
                  <p>
                    The verdict can be spoken, &ldquo;nah. 15 an hour&rdquo;, on media volume at
                    the courier&apos;s level, because the delivery app turns navigation volume down.
                    Whole dollars, because &ldquo;fourteen nineteen per hour&rdquo; is noise at 60
                    km/h. Silent on calls.
                  </p>
                </article>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="ed-section" id="practice" aria-labelledby="practice-heading">
          <div className="ed-container">
            <h2 className="ed-label" id="practice-heading">debugging a phone I don&apos;t hold</h2>
            <Reveal>
              <div className="ed-services">
                <div className="ed-service">
                  <span className="ed-service-n">// diagnostics</span>
                  <h3 className="ed-h2">A log written for pasting</h3>
                  <div className="ed-service-d">
                    The app keeps the last 150 entries on the phone: the delivery app coming and
                    going, the lines each reader saw, every verdict and where it came from, and the
                    last crash&apos;s stack trace. One tap copies it, and a bug report becomes a
                    reproducible test.
                  </div>
                </div>
                <div className="ed-service">
                  <span className="ed-service-n">// core</span>
                  <h3 className="ed-h2">The logic has no Android in it</h3>
                  <div className="ed-service-d">
                    Parsing and scoring live in a plain Kotlin module with exact BigDecimal maths,
                    tested anywhere: 52 unit tests, including the eight scoring cases from the
                    product spec as acceptance criteria. Exactly meeting a threshold passes.
                  </div>
                </div>
                <div className="ed-service">
                  <span className="ed-service-n">// releases</span>
                  <h3 className="ed-h2">Every merge is a signed build</h3>
                  <div className="ed-service-d">
                    Each merge to main runs the tests and publishes a signed APK as a GitHub
                    release, with the build number as the version code so updates always install
                    over the last one. 41 releases in the first 47 hours.
                  </div>
                </div>
                <div className="ed-service">
                  <span className="ed-service-n">// design</span>
                  <h3 className="ed-h2">Colour only means a verdict</h3>
                  <div className="ed-service-d">
                    Black, white and Geist, from one token file. Colour appears in exactly one
                    place: the verdict word. A courier glancing at a dash mount should never have
                    to wonder what a green thing means.
                  </div>
                </div>
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
                  <span className="ed-service-n">// app</span>
                  <ul className="ed-dash">
                    <li>Kotlin · Jetpack Compose</li>
                    <li>Accessibility service + overlay</li>
                    <li>ML Kit text recognition, on device</li>
                    <li>On-device text-to-speech</li>
                    <li>Room · DataStore</li>
                  </ul>
                </div>
                <div className="ed-service">
                  <span className="ed-service-n">// core</span>
                  <ul className="ed-dash">
                    <li>Plain Kotlin module</li>
                    <li>BigDecimal scoring</li>
                    <li>OCR-tolerant parser</li>
                    <li>JUnit · 52 tests</li>
                  </ul>
                </div>
                <div className="ed-service">
                  <span className="ed-service-n">// delivery</span>
                  <ul className="ed-dash">
                    <li>GitHub Actions</li>
                    <li>Signed APK per merge</li>
                    <li>Sideloaded · Android 8+</li>
                    <li>Remotion promo, built in code</li>
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
                Your users have fifteen seconds, not a desk.
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
