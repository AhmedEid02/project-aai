"use client";

import {
  AlertTriangle,
  ShieldCheck,
  Users,
  ArrowRight,
  Brain,
} from "lucide-react";

import type { Assessment } from "@/lib/intelligence";

type Props = {
  assessment: Assessment;
};

export default function ExecutiveIntelligenceBrief({
  assessment,
}: Props) {

  return (

    <section className="rounded-3xl border border-slate-200 bg-white shadow">

      {/* Header */}

      <div className="rounded-t-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-6 text-white">

        <div className="flex items-center gap-3">

          <Brain className="h-8 w-8 text-cyan-300" />

          <div>

            <h2 className="text-2xl font-bold">
              AIDA Executive Intelligence Brief
            </h2>

            <p className="text-sm text-slate-300">
              AI-generated operational assessment for decision makers
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-8 p-8">

        {/* Situation */}

        <div>

          <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">

            <AlertTriangle className="h-5 w-5 text-amber-500" />

            Situation

          </h3>

          <p className="leading-8 text-slate-700">

            {assessment.summary}

          </p>

        </div>

        {/* Assessment */}

        <div>

          <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">

            <ShieldCheck className="h-5 w-5 text-emerald-600" />

            Operational Assessment

          </h3>

          <p className="leading-8 text-slate-700">

            Current conditions are assessed as

            <strong> {assessment.riskLevel} Risk</strong>

            with an analytical confidence of

            <strong> {assessment.confidence}%</strong>.

            Immediate implementation of recommended actions is advised
            where operational capacity exists.

          </p>

        </div>

        {/* Decision */}

        <div>

          <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">

            <ArrowRight className="h-5 w-5 text-cyan-700" />

            Recommended Decision

          </h3>

          <p className="leading-8 text-slate-700">

            {assessment.recommendedDecision}

          </p>

        </div>

        {/* Actions */}

        <div>

          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">

            <Users className="h-5 w-5 text-indigo-700" />

            Immediate Priority Actions

          </h3>

          <div className="space-y-4">

            {assessment.actions.slice(0, 5).map((action, index) => (

              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >

                <div className="font-semibold text-slate-900">

                  {action.stakeholder}

                </div>

                <div className="mt-2 text-slate-700">

                  {action.action}

                </div>

                <div className="mt-3 flex gap-6 text-sm">

                  <span>

                    <strong>Priority:</strong>

                    {" "}

                    {action.priority}

                  </span>

                  <span>

                    <strong>Timeline:</strong>

                    {" "}

                    {action.timeframe}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>

  );

}