import { BrainCircuit, CheckCircle2 } from "lucide-react";

export function DecisionConfidence({ score }: { score: number }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
        <BrainCircuit className="h-4 w-4" />
        Decision Confidence
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-5xl font-black text-white">{score}%</div>
          <div className="mt-1 text-sm text-slate-400">
            confidence in recommendation
          </div>
        </div>

        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
          Operationally usable
        </span>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-400"
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="mt-5 space-y-3">
        {[
          "Multiple risk drivers point in the same direction.",
          "Recommended action is low-regret and coordination-focused.",
          "Community communication channels are available for last-mile delivery.",
        ].map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}