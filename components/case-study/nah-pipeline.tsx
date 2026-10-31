// nah.meter's reading pipeline, drawn twice and swapped by CSS like ArchDiagram: a wide SVG
// (two rows of three) and a tall one (a single column), because one viewBox can't serve a
// phone and a desktop. Order is nodes -> edges -> labels so label halos break the edges.

type Node = { title: string; sub: string; className: string };

const NODES: Node[] = [
  { title: "Offer pop-up", sub: "pay · minutes · km · 15 s", className: "cd-ext" },
  { title: "Accessibility service", sub: "delivery app's windows only", className: "cd-cron" },
  { title: "Screenshot + OCR", sub: "ML Kit, on the phone · ~1/s", className: "cd-gmail" },
  { title: "OfferParser", sub: "forgives OCR, never guesses", className: "cd-gmail" },
  { title: "Scorer", sub: "your rules · exact maths", className: "cd-api" },
  { title: "Verdict card + voice", sub: "docked above the offer", className: "cd-spa" },
];

const DESC =
  "A delivery offer pops up over other apps. nah.meter's accessibility service notices it but " +
  "reads only the delivery app's own windows. Because the offer's text is hidden from " +
  "accessibility, it takes a screenshot of those windows about once a second and reads it with " +
  "on-device text recognition. The parser turns the recognised lines into pay, minutes and " +
  "kilometres, tolerating recognition mistakes but returning can't read rather than guessing, " +
  "and two reads must agree before a verdict shows. The scorer applies the courier's own rules " +
  "with exact maths, and the verdict card docks above the offer and can be spoken aloud. " +
  "Everything happens on the phone: the app has no internet permission.";

const Marker = ({ id, lit }: { id: string; lit?: boolean }) => (
  <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" className={lit ? "cd-head-lit" : "cd-head"} />
  </marker>
);

function NodeBox({ n, x, y, w, h }: { n: Node; x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} className={`cd-node ${n.className}`} />;
}

function NodeText({ n, x, y, w, h }: { n: Node; x: number; y: number; w: number; h: number }) {
  return (
    <>
      <text x={x + w / 2} y={y + h / 2 - 6} className="cd-node-title cd-mid">
        {n.title}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 18} className="cd-node-sub cd-mid">
        {n.sub}
      </text>
    </>
  );
}

export function NahPipeline() {
  // Wide: two rows of three.
  const W = { w: 270, h: 76, xs: [40, 365, 690], ys: [70, 250] };
  const wPos = NODES.map((_, i) => ({ x: W.xs[i % 3], y: W.ys[Math.floor(i / 3)] }));
  // Tall: one column.
  const T = { x: 30, w: 360, h: 84, y0: 64, gap: 52 };
  const tPos = NODES.map((_, i) => ({ x: T.x, y: T.y0 + i * (T.h + T.gap) }));
  const tallH = T.y0 + NODES.length * (T.h + T.gap) + 10;

  return (
    <>
      {/* ——— wide ——— */}
      <svg className="cs-diagram cs-diagram-wide" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="nahw-t nahw-d">
        <title id="nahw-t">How nah.meter reads an offer</title>
        <desc id="nahw-d">{DESC}</desc>
        <defs>
          <Marker id="nah-arrow-w" />
          <Marker id="nah-arrow-w-lit" lit />
        </defs>

        {/* nodes */}
        <rect x="16" y="30" width="968" height="330" className="cd-loop-box" />
        {NODES.map((n, i) => (
          <NodeBox key={n.title} n={n} x={wPos[i].x} y={wPos[i].y} w={W.w} h={W.h} />
        ))}

        {/* edges */}
        <line x1="310" y1="108" x2="365" y2="108" className="cd-edge" markerEnd="url(#nah-arrow-w)" />
        <line x1="635" y1="108" x2="690" y2="108" className="cd-edge" markerEnd="url(#nah-arrow-w)" />
        <path d="M825,146 L825,198 L175,198 L175,250" className="cd-loop" markerEnd="url(#nah-arrow-w-lit)" />
        <line x1="310" y1="288" x2="365" y2="288" className="cd-edge" markerEnd="url(#nah-arrow-w)" />
        <line x1="635" y1="288" x2="690" y2="288" className="cd-edge" markerEnd="url(#nah-arrow-w)" />

        {/* labels */}
        {NODES.map((n, i) => (
          <NodeText key={n.title} n={n} x={wPos[i].x} y={wPos[i].y} w={W.w} h={W.h} />
        ))}
        <text x="500" y="203" className="cd-edge-label cd-mid">
          two reads must agree
        </text>
        <text x="32" y="22" className="cd-legend">
          // all on the phone · no internet permission
        </text>
        <text x="984" y="384" className="cd-legend" textAnchor="end">
          // it never taps the offer
        </text>
      </svg>

      {/* ——— tall ——— */}
      <svg className="cs-diagram cs-diagram-tall" viewBox={`0 0 420 ${tallH + 40}`} preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="naht-t naht-d">
        <title id="naht-t">How nah.meter reads an offer</title>
        <desc id="naht-d">{DESC}</desc>
        <defs>
          <Marker id="nah-arrow-t" />
          <Marker id="nah-arrow-t-lit" lit />
        </defs>

        {/* nodes */}
        <rect x="12" y="40" width="396" height={tallH - 20} className="cd-loop-box" />
        {NODES.map((n, i) => (
          <NodeBox key={n.title} n={n} x={tPos[i].x} y={tPos[i].y} w={T.w} h={T.h} />
        ))}

        {/* edges */}
        {NODES.slice(1).map((n, i) => {
          const lit = i === 2; // OCR -> parser: the double read
          return (
            <line
              key={n.title}
              x1={210}
              y1={tPos[i].y + T.h}
              x2={210}
              y2={tPos[i + 1].y}
              className={lit ? "cd-loop" : "cd-edge"}
              markerEnd={`url(#${lit ? "nah-arrow-t-lit" : "nah-arrow-t"})`}
            />
          );
        })}

        {/* labels */}
        {NODES.map((n, i) => (
          <NodeText key={n.title} n={n} x={tPos[i].x} y={tPos[i].y} w={T.w} h={T.h} />
        ))}
        <text x="222" y={tPos[3].y - 18} className="cd-edge-label">
          two reads agree
        </text>
        <text x="16" y="28" className="cd-legend">
          // all on the phone · no internet
        </text>
        <text x="16" y={tallH + 34} className="cd-legend">
          // it never taps the offer
        </text>
      </svg>
    </>
  );
}
