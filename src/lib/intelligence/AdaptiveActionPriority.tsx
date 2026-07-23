"use client";

import type { Assessment } from "@/lib/intelligence";
import { prioritizeActions } from "@/lib/intelligence";

import {
  Trophy,
  Clock3,
  TrendingUp,
} from "lucide-react";

type Props = {
  assessment: Assessment;
};

export default function AdaptiveActionPriority({
  assessment,
}: Props) {

  const actions = prioritizeActions(assessment);

  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <Trophy className="h-7 w-7 text-cyan-600" />

        <div>

          <h2 className="text-2xl font-bold">
            Adaptive Action Prioritization
          </h2>

          <p className="text-sm text-slate-500">
            Ranked operational actions based on risk,
            urgency and expected impact.
          </p>

        </div>

      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Rank
              </th>

              <th className="p-4 text-left">
                Stakeholder
              </th>

              <th className="p-4 text-left">
                Action
              </th>

              <th className="p-4 text-left">
                Priority
              </th>

              <th className="p-4 text-left">
                Urgency
              </th>

              <th className="p-4 text-left">
                Window
              </th>

            </tr>

          </thead>

          <tbody>

            {actions.map((item, index) => (

              <tr
                key={`${item.stakeholder}-${index}`}
                className="border-t"
              >

                <td className="p-4 font-semibold">

                  {index === 0 && "🥇"}

                  {index === 1 && "🥈"}

                  {index === 2 && "🥉"}

                  {index > 2 && index + 1}

                </td>

                <td className="p-4">
                  {item.stakeholder}
                </td>

                <td className="p-4">
                  {item.action}
                </td>

                <td className="p-4">

                  <div className="flex items-center gap-2">

                    <TrendingUp className="h-4 w-4 text-cyan-600" />

                    {item.priority}

                  </div>

                </td>

                <td className="p-4">

                  {item.urgency}

                </td>

                <td className="p-4">

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

    </section>

  );

}