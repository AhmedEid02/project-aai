import { AlertTriangle, ArrowRight, Minus, TrendingUp } from "lucide-react";

type Driver = {
  label: string;
  value: number;
  weight: "Low" | "Medium" | "High";
  trend: "Rising" | "Stable" | "Falling";
  evidence: string;
};

export function RiskDrivers({ drivers }: { drivers: Driver[] }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
        <AlertTriangle className="h-4 w-4" />
        Risk Drivers
      </div>

      <h2 className="mt-3 text-xl font-bold text-white">
        What is pushing the risk upward?
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-300">
        ARIE separates the risk score into explainable drivers so field teams can
        challenge, validate, or act on the intelligence.
      </p>

      <div className="mt-5 space-y-4">
        {drivers.map((driver) => (
          <article
            key={driver.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold text-white">{driver.label}</div>
                <p className="mt-1 text-sm leading-5 text-slate-400">
                  {driver.evidence}
                </p>
              </div>

              <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                {driver.weight}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-400"
                  style={{ width: `${driver.value}%` }}
                />
              </div>

              <span className="w-10 text-right text-sm font-bold text-white">
                {driver.value}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              {driver.trend === "Rising" ? (
                <TrendingUp className="h-3.5 w-3.5 text-amber-300" />
              ) : driver.trend === "Stable" ? (
                <Minus className="h-3.5 w-3.5 text-slate-300" />
              ) : (
                <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
              )}
              Trend: {driver.trend}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}