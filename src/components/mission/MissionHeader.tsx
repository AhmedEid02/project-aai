"use client";

import {
  Activity,
  BadgeCheck,
  CalendarClock,
  MapPin,
  ShieldAlert,
} from "lucide-react";

import { createMission } from "@/lib/mission";

type MissionHeaderProps = {
  missionId?: string;
  location: string;
  hazard: string;
  riskLevel: string;
  riskScore: number;
  confidence: number;
};

export default function MissionHeader({
  missionId,
  location,
  hazard,
  riskLevel,
  riskScore,
  confidence,
}: MissionHeaderProps) {
const mission = createMission(location, hazard);

const riskColor =
  riskScore >= 90
    ? "text-red-500"
    : riskScore >= 75
    ? "text-orange-500"
    : riskScore >= 50
    ? "text-yellow-500"
    : "text-emerald-500";
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
            Adaptive Action Intelligence
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Mission {missionId || mission.id}
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Operational mission generated from fused climate intelligence,
            AI assessment, and decision-support analytics for coordinated
            early action.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 p-6 text-white">
          <p className="text-sm text-slate-400">
            Operational Status
          </p>

          <h2 className="mt-2 text-2xl font-bold text-cyan-300">
            {riskLevel}
          </h2>

          <p className="mt-5 text-sm text-slate-400">
            Risk Score
          </p>

          <div className={`text-5xl font-bold ${riskColor}`}>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <InfoCard
          icon={<MapPin size={18} />}
          title="Area of Concern"
          value={location}
        />

        <InfoCard
          icon={<ShieldAlert size={18} />}
          title="Primary Hazard"
          value={hazard}
        />

        <InfoCard
          icon={<BadgeCheck size={18} />}
          title="Confidence"
          value={`${confidence}%`}
        />

        <InfoCard
          icon={<CalendarClock size={18} />}
          title="Mission Generated"
          value={mission.generatedAt}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Activity
            className="text-cyan-700"
            size={18}
          />

          <h3 className="font-semibold text-cyan-900">
            Operational Intelligence Sources
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          <StatusBadge
            label="Open-Meteo"
            active
          />

          <StatusBadge
            label="ARIE Engine"
            active
          />

          <StatusBadge
            label="Climate Fusion"
            active
          />

          <StatusBadge
            label="CHIRPS"
          />

          <StatusBadge
            label="MODIS NDVI"
          />
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center gap-2 text-cyan-700">
        {icon}

        <span className="text-sm font-medium">
          {title}
        </span>
      </div>

      <div className="mt-3 text-lg font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}

function StatusBadge({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-medium ${
        active
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-200 text-slate-500"
      }`}
    >
      {active ? "🟢" : "🟡"} {label}
    </span>
  );
}