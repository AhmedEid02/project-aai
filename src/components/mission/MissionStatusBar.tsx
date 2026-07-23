import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import {
  MapPin,
  AlertTriangle,
  ShieldCheck,
  Users,
  Beef,
  Clock3,
} from "lucide-react";

type MissionStatusBarProps = {
  district: string;
  riskLevel: string;
  confidence: number;
  population: number;
  livestock: number;
};

type StatusItemProps = {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
};

function StatusItem({
  icon: Icon,
  label,
  value,
}: StatusItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm">
      <Icon
        className="h-5 w-5 shrink-0 text-cyan-600"
        aria-hidden="true"
      />

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <div className="font-semibold text-slate-900">
          {value}
        </div>
      </div>
    </div>
  );
}

function getRiskColor(riskLevel: string): string {
  const normalizedRiskLevel = riskLevel
    .trim()
    .toLowerCase();

  if (
    normalizedRiskLevel === "critical" ||
    normalizedRiskLevel === "critical risk"
  ) {
    return "border-red-200 bg-red-100 text-red-700";
  }

  if (
    normalizedRiskLevel === "high" ||
    normalizedRiskLevel === "high risk"
  ) {
    return "border-orange-200 bg-orange-100 text-orange-700";
  }

  if (
    normalizedRiskLevel === "moderate" ||
    normalizedRiskLevel === "moderate risk"
  ) {
    return "border-yellow-200 bg-yellow-100 text-yellow-700";
  }

  return "border-green-200 bg-green-100 text-green-700";
}

export default function MissionStatusBar({
  district,
  riskLevel,
  confidence,
  population,
  livestock,
}: MissionStatusBarProps) {
  const riskColor = getRiskColor(riskLevel);

  return (
    <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      <StatusItem
        icon={MapPin}
        label="District"
        value={district}
      />

      <StatusItem
        icon={AlertTriangle}
        label="Risk Level"
        value={
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-sm ${riskColor}`}
          >
            {riskLevel}
          </span>
        }
      />

      <StatusItem
        icon={ShieldCheck}
        label="Confidence"
        value={`${confidence}%`}
      />

      <StatusItem
        icon={Users}
        label="Population"
        value={population.toLocaleString()}
      />

      <StatusItem
        icon={Beef}
        label="Livestock"
        value={livestock.toLocaleString()}
      />

      <StatusItem
        icon={Clock3}
        label="Status"
        value="Live Analysis"
      />
    </section>
  );
}