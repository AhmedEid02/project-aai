"use client";

import {
  ShieldCheck,
  CloudRain,
  Users,
  Map,
  Database,
} from "lucide-react";

import type { Assessment } from "@/lib/intelligence";

type DecisionConfidenceProps = {
  assessment: Assessment;
};

type MetricProps = {
  label: string;
  score: number;
  icon: React.ReactNode;
};

export default function DecisionConfidence({
  assessment,
}: DecisionConfidenceProps) {

  const metrics = [

    {
      label: "Weather Evidence",
      score: assessment.decisionConfidence.weather,
      icon: <CloudRain className="h-5 w-5 text-cyan-700" />,
    },

    {
      label: "Livelihood Evidence",
      score: assessment.decisionConfidence.livelihood,
      icon: <Users className="h-5 w-5 text-cyan-700" />,
    },

    {
      label: "Field Verification",
      score: assessment.decisionConfidence.fieldVerification,
      icon: <Map className="h-5 w-5 text-cyan-700" />,
    },

    {
      label: "Data Quality",
      score: assessment.decisionConfidence.dataQuality,
      icon: <Database className="h-5 w-5 text-cyan-700" />,
    },

  ];

  return (

    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Decision Confidence
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Confidence assessment of the operational recommendation.
          </p>

        </div>

        <div className="rounded-2xl bg-slate-900 px-6 py-4 text-center text-white">

          <div className="text-4xl font-bold">
            {assessment.confidence}%
          </div>

          <div className="text-sm">
            Overall Confidence
          </div>

        </div>

      </div>

      <div className="mt-8 space-y-5">

        {metrics.map((metric) => (

          <ConfidenceMetric
            key={metric.label}
            {...metric}
          />

        ))}

      </div>

      <div className="mt-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">

        <div className="flex items-center gap-2">

          <ShieldCheck className="h-5 w-5 text-cyan-700" />

          <h3 className="font-semibold text-cyan-900">
            Confidence Assessment
          </h3>

        </div>

        <p className="mt-3 leading-7 text-slate-700">

          The recommendation is supported by integrated climate,
          livelihood and operational evidence. Field verification
          remains important for continuous refinement.

        </p>

      </div>

    </section>

  );

}

function ConfidenceMetric({
  label,
  score,
  icon,
}: MetricProps) {

  return (

    <div className="rounded-2xl border bg-slate-50 p-5">

      <div className="mb-3 flex items-center justify-between">

        <div className="flex items-center gap-3">

          {icon}

          <span className="font-medium">
            {label}
          </span>

        </div>

        <span className="font-bold">
          {score}%
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

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