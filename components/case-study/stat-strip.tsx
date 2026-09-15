type Stat = {
  id: string;
  value: string;
  label: string;
  accent?: boolean;
};

const STATS: Stat[] = [
  { id: "loc", value: "138k", label: "// lines of code, two runtimes" },
  { id: "tables", value: "37", label: "// postgres tables · 26 live migrations" },
  { id: "tests", value: "186", label: "// test files · vitest + xunit" },
  { id: "routes", value: "195", label: "// api routes · 17 vertical slices" },
  { id: "primitives", value: "43", label: "// design-system primitives" },
  { id: "processors", value: "0", label: "// payment processors", accent: true },
];

export function StatStrip() {
  return (
    <div className="cs-stats">
      {STATS.map((stat) => (
        <div
          key={stat.id}
          className={`svc cs-stat${stat.accent ? " cs-stat--accent" : ""}`}
        >
          <div className="cs-stat-n">{stat.value}</div>
          <div className="svc-n">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
