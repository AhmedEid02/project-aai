"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Flame,
  Hourglass,
  TimerReset,
} from "lucide-react";

import {
  AAI_SPRINT_START_DATE,
  AAI_SPRINT_TOTAL_DAYS,
  AAI_SUBMISSION_DEADLINE,
  aaiSprintMilestones,
} from "@/lib/aai/sprint-plan";

const DAY_MS = 1000 * 60 * 60 * 24;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function SprintClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());

    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  const metrics = useMemo(() => {
    const start = new Date(AAI_SPRINT_START_DATE);
    const submissionDeadline = new Date(AAI_SUBMISSION_DEADLINE);
    const current = now ?? start;

    const elapsedRaw =
      Math.floor((current.getTime() - start.getTime()) / DAY_MS) + 1;

    const currentDay = clamp(elapsedRaw, 1, AAI_SPRINT_TOTAL_DAYS);

    const buildDaysLeft = Math.max(
      0,
      AAI_SPRINT_TOTAL_DAYS - currentDay + 1,
    );

    const progress = clamp(
      Math.round((currentDay / AAI_SPRINT_TOTAL_DAYS) * 100),
      0,
      100,
    );

    const activeMilestone =
      aaiSprintMilestones.find((milestone) => milestone.status === "Active") ??
      aaiSprintMilestones[0];

    return {
      submissionDeadline,
      currentDay,
      buildDaysLeft,
      progress,
      activeMilestone,
    };
  }, [now]);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-2xl">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
            <CalendarClock className="h-4 w-4" />
            AAI Hackathon Sprint Clock
          </div>

          <h2 className="mt-3 text-2xl font-bold text-white">
            Day {metrics.currentDay} of {AAI_SPRINT_TOTAL_DAYS}
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            AAI is now managed as a 28-day operational build. Every day must move
            the platform closer to a deployable early warning–to–early action
            intelligence system.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[560px]">
          <ClockMetric
            icon={<Hourglass className="h-4 w-4 text-amber-300" />}
            label="Build days left"
            value={`${metrics.buildDaysLeft}`}
          />

          <ClockMetric
            icon={<Flame className="h-4 w-4 text-red-300" />}
            label="Current focus"
            value={metrics.activeMilestone.label}
          />

          <ClockMetric
            icon={<TimerReset className="h-4 w-4 text-emerald-300" />}
            label="Submission deadline"
            value={formatDate(metrics.submissionDeadline)}
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span>Sprint progress</span>
          <span>{metrics.progress}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-cyan-400"
            style={{ width: `${metrics.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-7">
        {aaiSprintMilestones.map((milestone, index) => (
          <article
            key={milestone.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500">M{index + 1}</span>

              {milestone.status === "Complete" && (
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              )}
            </div>

            <div className="mt-2 text-sm font-semibold text-white">
              {milestone.label}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              {milestone.dayRange}
            </div>

            <div
              className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                milestone.status === "Complete"
                  ? "bg-emerald-400/10 text-emerald-200"
                  : milestone.status === "Active"
                    ? "bg-cyan-400/10 text-cyan-200"
                    : milestone.status === "Next"
                      ? "bg-amber-400/10 text-amber-200"
                      : "bg-slate-800 text-slate-400"
              }`}
            >
              {milestone.status}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClockMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {icon}
        {label}
      </div>

      <div className="mt-2 line-clamp-2 text-sm font-bold text-white">
        {value}
      </div>
    </div>
  );
}