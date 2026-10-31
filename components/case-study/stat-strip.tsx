import { Fixline } from "@/components/ui";

export type Stat = {
  id: string;
  value: string;
  label: string;
  accent?: boolean;
};

export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="ed-stats">
      {stats.map((stat) => (
        <div key={stat.id} className={stat.accent ? "ed-stat is-accent" : "ed-stat"}>
          <div className="ed-stat-n">{stat.value}</div>
          {stat.accent ? <Fixline width={96} strokeWidth={4} amplitude={3} /> : null}
          <div className="ed-stat-l">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
