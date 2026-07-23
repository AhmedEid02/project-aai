"use client";

import {
  CheckCircle2,
  Radio,
  Truck,
  Users,
  Waves,
  MessageSquare,
} from "lucide-react";

import type { Assessment } from "@/lib/intelligence";

type MissionReadinessProps = {
  assessment: Assessment;
};

export default function MissionReadiness({
  assessment,
}: MissionReadinessProps) {

  const readiness = assessment.missionReadiness;

  const capabilities = [

    {
      label: "Coordination",
      score: readiness.coordination,
      icon: <Users className="h-5 w-5 text-cyan-700" />,
    },

    {
      label: "Community Communication",
      score: readiness.communication,
      icon: <MessageSquare className="h-5 w-5 text-cyan-700" />,
    },

    {
      label: "Water Readiness",
      score: readiness.water,
      icon: <Waves className="h-5 w-5 text-cyan-700" />,
    },

    {
      label: "Logistics",
      score: readiness.logistics,
      icon: <Truck className="h-5 w-5 text-cyan-700" />,
    },

    {
      label: "Response Coordination",
      score: readiness.community,
      icon: <Radio className="h-5 w-5 text-cyan-700" />,
    },

  ];

  return (

    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Mission Readiness
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Operational capacity to implement coordinated early action.
          </p>

        </div>

        <div className="rounded-2xl bg-cyan-600 px-6 py-4 text-center text-white">

          <div className="text-4xl font-bold">
            {readiness.overall}%
          </div>

          <div className="mt-1 text-sm">
            Overall Readiness
          </div>

        </div>

      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">

        {capabilities.map((capability) => (

          <Capability
            key={capability.label}
            {...capability}
          />

        ))}

      </div>

      <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

        <div className="flex items-center gap-2">

          <CheckCircle2 className="h-5 w-5 text-emerald-700" />

          <h3 className="font-semibold text-emerald-900">
            Operational Recommendation
          </h3>

        </div>

        <p className="mt-3 leading-7 text-slate-700">

          Current operational readiness indicates that coordinated early
          action can be implemented using existing institutional capacity.
          Continue monitoring readiness as new evidence becomes available.

        </p>

      </div>

    </section>

  );

}

type CapabilityProps = {
  label: string;
  score: number;
  icon: React.ReactNode;
};

function Capability({
  label,
  score,
  icon,
}: CapabilityProps) {

  return (

    <div className="rounded-2xl border bg-slate-50 p-5">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          {icon}

          <span className="font-semibold text-slate-800">
            {label}
          </span>

        </div>

        <span className="font-bold">
          {score}%
        </span>

      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">

        <div
          className="h-full rounded-full bg-cyan-600"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>

  );

}