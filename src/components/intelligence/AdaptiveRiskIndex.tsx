"use client";

import type { Assessment } from "@/lib/intelligence";

type Props = {
  assessment: Assessment;
};

function color(score: number) {
  if (score >= 80) return "bg-red-500";
  if (score >= 65) return "bg-orange-500";
  if (score >= 45) return "bg-yellow-500";
  return "bg-emerald-500";
}

export default function AdaptiveRiskIndex({
  assessment,
}: Props) {

  return (

    <section className="rounded-3xl border bg-white p-6 shadow-sm">

      <div>

        <h2 className="text-2xl font-bold">

          Adaptive Risk Index

        </h2>

        <p className="mt-2 text-sm text-slate-500">

          Operational contribution of each climate and livelihood driver.

        </p>

      </div>

      <div className="mt-8 space-y-5">

        {assessment.drivers.map((driver) => (

          <div key={driver.label}>

            <div className="mb-2 flex justify-between">

              <span className="font-medium">

                {driver.label}

              </span>

              <span className="font-bold">

                {driver.score}

              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">

              <div
                className={`h-full rounded-full ${color(driver.score)}`}
                style={{
                  width: `${driver.score}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">

        <div className="text-sm uppercase tracking-wide">

          Overall Operational Risk

        </div>

        <div className="mt-2 text-5xl font-bold">

          {assessment.riskScore}

        </div>

        <div className="mt-2 text-lg">

          {assessment.riskLevel}

        </div>

      </div>

    </section>

  );

}