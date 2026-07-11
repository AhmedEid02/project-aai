"use client";

import {
  CheckCircle2,
  Clock3,
  Rocket,
  ShieldCheck,
  TimerReset,
} from "lucide-react";

const milestoneStatus = [
  {
    label: "Foundation",
    status: "Complete",
  },
  {
    label: "ARIE Intelligence Console",
    status: "Complete",
  },
  {
    label: "Adaptive Risk Engine",
    status: "Complete",
  },
  {
    label: "Climate Fusion Trace",
    status: "Complete",
  },
  {
    label: "AIDA Decision Partner",
    status: "Complete",
  },
  {
    label: "Operational Products",
    status: "Complete",
  },
  {
    label: "Build + Deployment",
    status: "Active",
  },
  {
    label: "Pitch + Demo",
    status: "Next",
  },
];

const finishSprint = [
  {
    window: "Now",
    focus: "Freeze features and protect working build",
    output: "No more major architecture changes",
    status: "Complete",
  },
  {
    window: "Next 3–6 hours",
    focus: "README, demo flow, deployment notes",
    output: "Judge-ready project documentation",
    status: "Active",
  },
  {
    window: "Next 6–12 hours",
    focus: "Vercel deployment and UI polish",
    output: "Public demo link",
    status: "Next",
  },
  {
    window: "Final 12–24 hours",
    focus: "Pitch script, screenshots, submission assets",
    output: "Final hackathon package",
    status: "Next",
  },
];

export function SprintClock() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-2xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
            <TimerReset className="h-4 w-4" />
            AAI Final Finish Sprint
          </div>

          <h2 className="mt-3 text-2xl font-bold text-white">
            48-hour rescue sprint: demo, deployment, and pitch
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            The core platform is now build-safe. The remaining work is focused
            only on documentation, deployment, demo flow, and final submission
            materials.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 lg:min-w-80">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-100">
            <ShieldCheck className="h-4 w-4" />
            Current status
          </div>

          <div className="mt-3 text-3xl font-bold text-white">
            Build Passed
          </div>

          <p className="mt-2 text-sm leading-6 text-emerald-100/80">
            ARIE, Climate Fusion, AIDA, Operational Products, and all API routes
            are production-build ready.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {finishSprint.map((item) => (
          <div
            key={item.window}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {item.window}
              </span>

              <StatusPill status={item.status} />
            </div>

            <div className="mt-3 text-sm font-semibold text-white">
              {item.focus}
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {item.output}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
        <div className="mb-4 flex items-center gap-2">
          <Rocket className="h-4 w-4 text-cyan-300" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
            Delivery status
          </h3>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {milestoneStatus.map((milestone) => (
            <div
              key={milestone.label}
              className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm font-semibold text-white">
                  {milestone.label}
                </div>

                {milestone.status === "Complete" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                ) : (
                  <Clock3 className="h-4 w-4 shrink-0 text-amber-300" />
                )}
              </div>

              <div className="mt-3">
                <StatusPill status={milestone.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatusPill({ status }: { status: string }) {
  const className =
    status === "Complete"
      ? "bg-emerald-400/10 text-emerald-200"
      : status === "Active"
        ? "bg-cyan-400/10 text-cyan-200"
        : "bg-amber-400/10 text-amber-200";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {status}
    </span>
  );
}

export default SprintClock;