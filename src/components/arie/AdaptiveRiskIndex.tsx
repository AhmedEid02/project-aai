import { Gauge, TrendingUp } from "lucide-react";

export function AdaptiveRiskIndex({
  score,
  level,
  trend,
}: {
  score: number;
  level: string;
  trend: string;
}) {
  const scoreTone =
    score >= 75
      ? "text-red-200 border-red-400/30 bg-red-400/10"
      : score >= 55
        ? "text-amber-200 border-amber-400/30 bg-amber-400/10"
        : "text-emerald-200 border-emerald-400/30 bg-emerald-400/10";

  const barTone =
    score >= 75 ? "bg-red-400" : score >= 55 ? "bg-amber-400" : "bg-emerald-400";

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
            <Gauge className="h-4 w-4" />
            Adaptive Risk Index
          </div>

          <h2 className="mt-3 text-xl font-bold text-white">
            Composite operational risk score
          </h2>
        </div>

        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${scoreTone}`}>
          {level} Risk
        </span>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <div className="text-6xl font-black tracking-tight text-white">{score}</div>
          <div className="mt-1 text-sm text-slate-400">out of 100</div>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-amber-200">
          <TrendingUp className="h-4 w-4" />
          {trend} from previous cycle
        </div>
      </div>

      <div
        className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
      >
        <div className={`h-full rounded-full ${barTone}`} style={{ width: `${score}%` }} />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <MiniMetric label="Lead-time window" value="24–72h" />
        <MiniMetric label="Decision posture" value="No-regrets" />
        <MiniMetric label="Escalation status" value="Watch+" />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="text-sm font-semibold text-white">ARIE interpretation</div>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Risk is elevated because climate stress, livelihood exposure, and coping
          pressure are converging. ARIE recommends early coordination before
          households lose response options.
        </p>
      </div>
    </section>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-bold text-white">{value}</div>
    </div>
  );
}