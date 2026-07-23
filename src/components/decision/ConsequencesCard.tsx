"use client";

import { AlertTriangle } from "lucide-react";

export default function ConsequencesCard() {
  const consequences = [
    "Reduced crop production and pasture availability.",
    "Increased livestock stress and water shortages.",
    "Higher food insecurity among vulnerable households.",
    "Greater likelihood of humanitarian assistance requirements.",
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        Expected Consequences
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Likely impacts if no coordinated early action is implemented.
      </p>

      <div className="mt-6 space-y-4">
        {consequences.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />

            <p className="text-sm text-slate-700">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}