// Two hand-authored SVGs, swapped by CSS. A single SVG cannot serve both:
// scaling a 1000-unit viewBox down to a ~295px phone container renders a
// 14-unit label at under 5px.
//
// Each SVG is ordered nodes -> edges -> labels, deliberately. SVG paints in
// document order, so labels must come last for their background-coloured halo
// (see .cd-edge-label in globals.css) to break the edges running under them.
// Each also owns its own <title>/<desc> and its own uniquely-id'd markers —
// duplicate marker ids across two SVGs in one document fail silently.

const DESC =
  "Players and hosts reach a Next.js web tier, which holds no database " +
  "credentials and forwards every read and write to an ASP.NET Core API over " +
  "an authenticated service call. The API owns Postgres through EF Core. A " +
  "cron worker, the same container image running in a different role, drives " +
  "seven jobs on a sixty-second loop and pushes outbound email through Resend " +
  "and WhatsApp through a self-hosted gateway. Payment reconciliation is a " +
  "loop: the API polls the host's Gmail inbox over a read-only scope, receives " +
  "the Interac e-Transfer notification, matches the signed payment code and " +
  "amount against the signup, and marks it paid.";

export function ArchDiagram() {
  return (
    <>
      {/* ——— wide ——— */}
      <svg
        className="cs-diagram cs-diagram-wide"
        viewBox="0 0 1000 560"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby="archw-t archw-d"
      >
        <title id="archw-t">6ixBack system architecture</title>
        <desc id="archw-d">{DESC}</desc>

        <defs>
          <marker
            id="cs-arrow-w"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="cd-head" />
          </marker>
          <marker
            id="cs-arrow-w-lit"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="cd-head-lit" />
          </marker>
        </defs>

        {/* nodes */}
        <rect x="584" y="278" width="376" height="96" className="cd-loop-box" />

        <rect x="40" y="30" width="260" height="52" className="cd-node cd-ext" />
        <rect x="40" y="140" width="260" height="76" className="cd-node cd-spa" />
        <rect x="350" y="140" width="230" height="76" className="cd-node cd-cron" />
        <rect x="40" y="280" width="540" height="92" className="cd-node cd-api" />
        <rect x="40" y="440" width="540" height="76" className="cd-node cd-db" />
        <rect x="740" y="140" width="220" height="56" className="cd-node cd-ext" />
        <rect x="740" y="212" width="220" height="56" className="cd-node cd-ext" />
        <rect x="740" y="290" width="220" height="76" className="cd-node cd-gmail" />

        {/* edges */}
        <line x1="170" y1="82" x2="170" y2="140" className="cd-edge" markerEnd="url(#cs-arrow-w)" />
        <line x1="170" y1="216" x2="170" y2="280" className="cd-edge" markerEnd="url(#cs-arrow-w)" />
        <line x1="465" y1="216" x2="465" y2="280" className="cd-edge" markerEnd="url(#cs-arrow-w)" />
        <line x1="170" y1="372" x2="170" y2="440" className="cd-edge" markerEnd="url(#cs-arrow-w)" />
        <line x1="580" y1="168" x2="740" y2="168" className="cd-edge" markerEnd="url(#cs-arrow-w)" />
        <line x1="580" y1="196" x2="740" y2="240" className="cd-edge" markerEnd="url(#cs-arrow-w)" />

        {/* the lit path — reconciliation */}
        <line x1="580" y1="312" x2="740" y2="312" className="cd-loop" markerEnd="url(#cs-arrow-w-lit)" />
        <line x1="740" y1="344" x2="580" y2="344" className="cd-loop" markerEnd="url(#cs-arrow-w-lit)" />
        <line x1="470" y1="372" x2="470" y2="440" className="cd-loop" markerEnd="url(#cs-arrow-w-lit)" />

        {/* node labels */}
        <text x="60" y="54" className="cd-node-title">
          browser
        </text>
        <text x="60" y="72" className="cd-node-sub">
          players · hosts
        </text>

        <text x="60" y="170" className="cd-node-title">
          spa · next.js
        </text>
        <text x="60" y="190" className="cd-node-sub">
          rsc · server actions
        </text>

        <text x="370" y="170" className="cd-node-title">
          cron · same image
        </text>
        <text x="370" y="190" className="cd-node-sub">
          background worker
        </text>

        <text x="60" y="310" className="cd-node-title">
          api · asp.net core
        </text>
        <text x="60" y="330" className="cd-node-sub">
          17 vertical slices · 195 routes
        </text>
        <text x="60" y="352" className="cd-node-note">
          <tspan className="cd-num">3</tspan> · match signed code + amount
        </text>

        <text x="60" y="470" className="cd-node-title">
          postgres 16
        </text>
        <text x="60" y="490" className="cd-node-sub">
          37 tables · 26 migrations
        </text>

        <text x="760" y="172" className="cd-node-title">
          resend · email
        </text>
        <text x="760" y="244" className="cd-node-title">
          waha · whatsapp
        </text>

        <text x="760" y="320" className="cd-node-title">
          gmail api
        </text>
        <text x="760" y="340" className="cd-node-sub">
          read-only scope
        </text>

        {/* edge labels */}
        <text x="180" y="118" className="cd-edge-label">
          requests
        </text>
        <text x="180" y="242" className="cd-edge-label">
          service call
        </text>
        <text x="180" y="260" className="cd-edge-label">
          no db credentials here
        </text>
        <text x="475" y="252" className="cd-edge-label">
          60s loop · 7 jobs
        </text>
        <text x="180" y="410" className="cd-edge-label">
          ef core
        </text>
        <text x="674" y="302" className="cd-edge-label cd-mid">
          <tspan className="cd-num">1</tspan> · poll host inbox
        </text>
        <text x="660" y="364" className="cd-edge-label cd-mid">
          <tspan className="cd-num">2</tspan> · interac email
        </text>
        <text x="480" y="410" className="cd-edge-label">
          <tspan className="cd-num">4</tspan> · mark paid
        </text>
        {/* Below the dashed frame: above it would run into the waha node. */}
        <text x="584" y="396" className="cd-legend">
          /// reconciliation loop
        </text>
      </svg>

      {/* ——— tall ——— */}
      <svg
        className="cs-diagram cs-diagram-tall"
        viewBox="0 0 420 700"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby="archt-t archt-d"
      >
        <title id="archt-t">6ixBack system architecture</title>
        <desc id="archt-d">{DESC}</desc>

        <defs>
          <marker
            id="cs-arrow-t"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="cd-head" />
          </marker>
          <marker
            id="cs-arrow-t-lit"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="cd-head-lit" />
          </marker>
        </defs>

        {/* nodes */}
        <rect x="14" y="10" width="392" height="46" className="cd-node cd-ext" />
        <rect x="14" y="96" width="190" height="62" className="cd-node cd-spa" />
        <rect x="216" y="96" width="190" height="62" className="cd-node cd-cron" />
        <rect x="14" y="258" width="392" height="86" className="cd-node cd-api" />
        <rect x="130" y="452" width="276" height="72" className="cd-node cd-gmail" />
        <rect x="14" y="600" width="392" height="76" className="cd-node cd-db" />

        {/* edges */}
        <line x1="109" y1="56" x2="109" y2="96" className="cd-edge" markerEnd="url(#cs-arrow-t)" />
        <line x1="60" y1="158" x2="60" y2="258" className="cd-edge" markerEnd="url(#cs-arrow-t)" />
        <line x1="360" y1="158" x2="360" y2="258" className="cd-edge" markerEnd="url(#cs-arrow-t)" />
        <line x1="48" y1="344" x2="48" y2="600" className="cd-edge" markerEnd="url(#cs-arrow-t)" />

        {/* the lit path — reconciliation */}
        <line x1="200" y1="344" x2="200" y2="452" className="cd-loop" markerEnd="url(#cs-arrow-t-lit)" />
        <line x1="330" y1="452" x2="330" y2="344" className="cd-loop" markerEnd="url(#cs-arrow-t-lit)" />
        <line x1="90" y1="344" x2="90" y2="600" className="cd-loop" markerEnd="url(#cs-arrow-t-lit)" />

        {/* node labels */}
        <text x="30" y="39" className="cd-node-title">
          browser · players + hosts
        </text>

        <text x="28" y="122" className="cd-node-title">
          spa · next.js
        </text>
        <text x="28" y="144" className="cd-node-sub">
          rsc · actions
        </text>

        <text x="230" y="122" className="cd-node-title">
          cron · worker
        </text>
        <text x="230" y="144" className="cd-node-sub">
          same image
        </text>

        <text x="30" y="286" className="cd-node-title">
          api · asp.net core
        </text>
        <text x="30" y="308" className="cd-node-sub">
          17 slices · 195 routes
        </text>
        <text x="30" y="332" className="cd-node-note">
          <tspan className="cd-num">3</tspan> · match code + amount
        </text>

        <text x="146" y="482" className="cd-node-title">
          gmail api
        </text>
        <text x="146" y="504" className="cd-node-sub">
          read-only scope
        </text>

        <text x="30" y="630" className="cd-node-title">
          postgres 16
        </text>
        <text x="30" y="652" className="cd-node-sub">
          37 tables · 26 migrations
        </text>

        {/* edge labels */}
        <text x="72" y="196" className="cd-edge-label">
          service call
        </text>
        <text x="72" y="218" className="cd-edge-label">
          no db credentials
        </text>
        <text x="196" y="242" className="cd-edge-label">
          60s · 7 jobs
        </text>
        <text x="130" y="376" className="cd-edge-label">
          <tspan className="cd-num">1</tspan> · poll inbox
        </text>
        <text x="130" y="404" className="cd-edge-label">
          <tspan className="cd-num">2</tspan> · interac email
        </text>
        {/* Clear of the two verticals in the left lane: a halo masks glyphs
            but not the gaps between words, so these sit beside the edges
            rather than on top of them. */}
        <text x="150" y="556" className="cd-edge-label">
          ef core
        </text>
        <text x="150" y="584" className="cd-edge-label">
          <tspan className="cd-num">4</tspan> · mark paid
        </text>
      </svg>
    </>
  );
}
