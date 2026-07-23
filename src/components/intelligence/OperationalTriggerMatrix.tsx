"use client";

import type { Assessment } from "@/lib/intelligence";

import {
  CheckCircle2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

type Props = {
  assessment: Assessment;
};

export default function OperationalTriggerMatrix({
  assessment,
}: Props) {

  const triggers = assessment.drivers.map((driver) => {

    let status:
      | "TRIGGERED"
      | "WATCH"
      | "STANDBY";

    let action: string;

    if (driver.score >= 75) {

      status = "TRIGGERED";

      action = "Initiate operational response";

    } else if (driver.score >= 55) {

      status = "WATCH";

      action = "Increase monitoring";

    } else {

      status = "STANDBY";

      action = "Routine observation";

    }

    return {

      trigger: driver.label,

      threshold: `${driver.score}/100`,

      status,

      action,

    };

  });

  return (

    <section className="rounded-3xl border bg-white p-6 shadow-sm">

      <div>

        <h2 className="text-2xl font-bold">

          Operational Trigger Matrix

        </h2>

        <p className="mt-2 text-sm text-slate-500">

          Operational thresholds supporting anticipatory action.

        </p>

      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Trigger
              </th>

              <th className="p-4 text-left">
                Threshold
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Recommended Action
              </th>

            </tr>

          </thead>

          <tbody>

            {triggers.map((item) => (

              <tr
                key={item.trigger}
                className="border-t"
              >

                <td className="p-4">

                  {item.trigger}

                </td>

                <td className="p-4">

                  {item.threshold}

                </td>

                <td className="p-4">

                  <div className="flex items-center gap-2">

                    {item.status === "TRIGGERED" && (

                      <CheckCircle2 className="h-5 w-5 text-red-600" />

                    )}

                    {item.status === "WATCH" && (

                      <AlertTriangle className="h-5 w-5 text-amber-500" />

                    )}

                    {item.status === "STANDBY" && (

                      <Clock3 className="h-5 w-5 text-slate-500" />

                    )}

                    {item.status}

                  </div>

                </td>

                <td className="p-4">

                  {item.action}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>

  );

}