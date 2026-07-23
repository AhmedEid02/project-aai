"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Database,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function DecisionJustification() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Operational Decision Intelligence
        </h2>

        <p className="mt-2 text-slate-500">
          Explainable reasoning behind the operational recommendation generated
          by the Adaptive Action Intelligence platform.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* LEFT COLUMN */}

        <div className="space-y-6">

          <div className="rounded-2xl border bg-slate-50 p-5">

            <div className="flex items-center gap-2">

              <TrendingUp
                className="text-cyan-700"
                size={20}
              />

              <h3 className="font-semibold text-slate-900">
                Primary Risk Drivers
              </h3>

            </div>

            <div className="mt-5 space-y-4">

              <RiskDriver
                title="Rainfall Deficit"
                impact="High Influence"
                color="bg-red-500"
              />

              <RiskDriver
                title="Water Stress"
                impact="High Influence"
                color="bg-orange-500"
              />

              <RiskDriver
                title="Livelihood Exposure"
                impact="Moderate Influence"
                color="bg-yellow-500"
              />

              <RiskDriver
                title="Market Pressure"
                impact="Moderate Influence"
                color="bg-blue-500"
              />

            </div>

          </div>

          <div className="rounded-2xl border bg-slate-50 p-5">

            <div className="flex items-center gap-2">

              <Database
                className="text-cyan-700"
                size={20}
              />

              <h3 className="font-semibold text-slate-900">
                Evidence Sources
              </h3>

            </div>

            <div className="mt-5 space-y-3">

              <Evidence text="Open-Meteo weather observations" />

              <Evidence text="ARIE operational reasoning engine" />

              <Evidence text="Climate Fusion contextual analysis" />

              <Evidence text="Livelihood vulnerability profile" />

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN */}

        <div className="space-y-6">

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">

            <div className="flex items-center gap-2">

              <AlertTriangle
                className="text-amber-700"
                size={20}
              />

              <h3 className="font-semibold text-amber-900">
                Remaining Uncertainty
              </h3>

            </div>

            <ul className="mt-5 space-y-3 text-sm text-slate-700">

              <li>
                • Field verification is pending for eastern grazing areas.
              </li>

              <li>
                • Water-point functionality requires district confirmation.
              </li>

            </ul>

          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

            <div className="flex items-center gap-2">

              <ShieldCheck
                className="text-emerald-700"
                size={20}
              />

              <h3 className="font-semibold text-emerald-900">
                Escalation Trigger
              </h3>

            </div>

            <p className="mt-5 text-sm leading-7 text-slate-700">

              If rainfall remains below seasonal thresholds for two
              consecutive dekads, and field verification confirms worsening
              water availability, the recommended operational status will
              escalate from <strong>Monitoring</strong> to{" "}
              <strong>Emergency Activation</strong>.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

function RiskDriver({
  title,
  impact,
  color,
}: {
  title: string;
  impact: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">

      <div className="flex items-center gap-3">

        <div className={`h-3 w-3 rounded-full ${color}`} />

        <span className="font-medium text-slate-800">
          {title}
        </span>

      </div>

      <span className="text-sm text-slate-500">
        {impact}
      </span>

    </div>
  );
}

function Evidence({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2
        className="h-5 w-5 text-emerald-600"
      />

      <span className="text-sm text-slate-700">
        {text}
      </span>

    </div>
  );
}