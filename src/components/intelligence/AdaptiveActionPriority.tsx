"use client";

import { Trophy, Clock3, TrendingUp, ShieldAlert } from "lucide-react";


import type {
    IntelligenceContext,
} from "@/lib/intelligence";

type Props = {
    context: IntelligenceContext;
};

const urgencyStyles = {
  Critical:
    "bg-red-100 text-red-700 border border-red-200",
  High:
    "bg-orange-100 text-orange-700 border border-orange-200",
  Medium:
    "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Low:
    "bg-green-100 text-green-700 border border-green-200",
};

export default function AdaptiveActionPriority({
  context,
}: Props) {
  const actions =
    context.priorities;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-cyan-100 p-3">

            <ShieldAlert className="h-7 w-7 text-cyan-700" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Adaptive Action Prioritization
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Operational actions ranked automatically according to
              risk severity, urgency and expected mission impact.
            </p>

          </div>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100 text-slate-700">

            <tr>

              <th className="px-5 py-4 text-left">
                Rank
              </th>

              <th className="px-5 py-4 text-left">
                Stakeholder
              </th>

              <th className="px-5 py-4 text-left">
                Recommended Action
              </th>

              <th className="px-5 py-4 text-left">
                Priority
              </th>

              <th className="px-5 py-4 text-left">
                Urgency
              </th>

              <th className="px-5 py-4 text-left">
                Response Window
              </th>

            </tr>

          </thead>

          <tbody>

            {actions.map((item, index) => (

              <tr
                key={`${item.stakeholder}-${index}`}
                className="border-t hover:bg-slate-50 transition-colors"
              >

                <td className="px-5 py-5 text-lg font-semibold">

                  {index === 0 && "🥇"}

                  {index === 1 && "🥈"}

                  {index === 2 && "🥉"}

                  {index > 2 && index + 1}

                </td>

                <td className="px-5 py-5 font-medium">
                  {item.stakeholder}
                </td>

                <td className="px-5 py-5">
                  {item.action}
                </td>

                <td className="px-5 py-5">

                  <div className="flex items-center gap-2">

                    <TrendingUp className="h-4 w-4 text-cyan-600" />

                    <span className="font-bold">
                      {item.priority}
                    </span>

                  </div>

                </td>

                <td className="px-5 py-5">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      urgencyStyles[item.urgency]
                    }`}
                  >
                    {item.urgency}
                  </span>

                </td>

                <td className="px-5 py-5">

                  <div className="flex items-center gap-2">

                    <Clock3 className="h-4 w-4 text-slate-500" />

                    {item.responseWindow}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t bg-slate-50 p-5">

        <div className="flex items-center gap-2 text-sm text-slate-600">

          <Trophy className="h-4 w-4 text-amber-500" />

          Actions are dynamically prioritized by the Adaptive Action
          Prioritization Engine (AAPE) using the current operational
          assessment.

        </div>

      </div>

    </section>
  );
}