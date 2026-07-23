"use client";

import {
  CloudRain,
  Thermometer,
  Leaf,
  Droplets,
  Users,
  Beef,
  ShieldCheck,
  Database,
} from "lucide-react";

import type { IntelligenceContext } from "@/lib/intelligence";

type Props = {
  context: IntelligenceContext;
};

export default function ClimateEvidencePanel({
  context,
}: Props) {
  const evidence = context.evidence;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Climate Evidence
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Climate indicators supporting the current operational assessment.
        </p>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">

        <EvidenceCard
          icon={<CloudRain className="h-6 w-6 text-blue-600" />}
          title="Rainfall Anomaly"
          value={`${evidence.rainfallAnomaly}%`}
        />

        <EvidenceCard
          icon={<Thermometer className="h-6 w-6 text-red-600" />}
          title="Temperature Anomaly"
          value={`${evidence.temperatureAnomaly}°C`}
        />

        <EvidenceCard
          icon={<Leaf className="h-6 w-6 text-green-600" />}
          title="Vegetation Stress"
          value={evidence.vegetationStress.toFixed(2)}
        />

        <EvidenceCard
          icon={<Droplets className="h-6 w-6 text-cyan-600" />}
          title="Water Stress"
          value={evidence.waterStress}
        />

        <EvidenceCard
          icon={<ShieldCheck className="h-6 w-6 text-amber-600" />}
          title="Forecast Confidence"
          value={`${evidence.forecastConfidence}%`}
        />

        <EvidenceCard
          icon={<Users className="h-6 w-6 text-indigo-600" />}
          title="Affected Population"
          value={evidence.affectedPopulation.toLocaleString()}
        />

        <EvidenceCard
          icon={<Beef className="h-6 w-6 text-orange-600" />}
          title="Affected Livestock"
          value={evidence.affectedLivestock.toLocaleString()}
        />

        <EvidenceCard
          icon={<Database className="h-6 w-6 text-slate-700" />}
          title="Evidence Score"
          value={evidence.evidenceScore.toString()}
        />
      </div>

      <div className="border-t bg-slate-50 p-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">
          Data Sources
        </h3>

        <div className="flex flex-wrap gap-2">
          {evidence.dataSources.map((source) => (
            <span
              key={source}
              className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-700"
            >
              {source}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

type EvidenceCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function EvidenceCard({
  icon,
  title,
  value,
}: EvidenceCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-3">{icon}</div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}