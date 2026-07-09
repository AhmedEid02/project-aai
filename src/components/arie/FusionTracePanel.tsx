import {
  ArrowRight,
  FileSearch,
  ListChecks,
  RadioTower,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import type { ClimateFusionResult } from "@/lib/arie/climate-fusion";

type FusionSummary = ClimateFusionResult["fusionSummary"];

export function FusionTracePanel({ fusion }: { fusion: FusionSummary }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
        <Workflow className="h-4 w-4" />
        Climate Fusion Trace
      </div>

      <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            How ARIE adjusted the risk inputs
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            This panel exposes the reasoning path between baseline climate-livelihood
            signals and the final Adaptive Risk Index. It helps operators see what
            changed, why it changed, and what needs field verification.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 lg:min-w-64">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Fusion confidence
          </div>

          <div className="mt-2 flex items-center justify-between gap-4">
            <span className="text-lg font-bold text-white">
              {fusion.confidence}
            </span>

            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              {fusion.profileUsed}
            </span>
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-400">
            {fusion.method}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            Risk input adjustments
          </div>

          <div className="mt-4 space-y-3">
            {fusion.adjustments.length > 0 ? (
              fusion.adjustments.map((adjustment) => (
                <article
                  key={`${adjustment.indicator}-${adjustment.before}-${adjustment.after}`}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {formatIndicator(adjustment.indicator)}
                      </div>

                      <p className="mt-1 text-sm leading-5 text-slate-400">
                        {adjustment.reason}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">
                      <span className="text-sm font-bold text-slate-300">
                        {adjustment.before}
                      </span>

                      <ArrowRight className="h-4 w-4 text-cyan-300" />

                      <span className="text-sm font-bold text-white">
                        {adjustment.after}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-400">
                No fusion adjustment was applied. ARIE used the baseline scenario
                values directly.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <TraceList
            icon={<FileSearch className="h-4 w-4 text-cyan-300" />}
            title="Signals used"
            items={fusion.signalsUsed}
          />

          <TraceList
            icon={<ListChecks className="h-4 w-4 text-amber-300" />}
            title="Field verification needs"
            items={fusion.fieldVerificationNeeds}
          />

          <TraceList
            icon={<RadioTower className="h-4 w-4 text-emerald-300" />}
            title="Last-mile channels"
            items={fusion.lastMileChannels}
          />
        </div>
      </div>
    </section>
  );
}

function TraceList({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        {icon}
        {title}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs leading-5 text-slate-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function formatIndicator(indicator: string) {
  return indicator
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}