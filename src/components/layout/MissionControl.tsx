"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import IncidentForm from "@/components/incident/IncidentForm";
import MissionBrief from "@/components/mission/MissionBrief";
import ActionTimeline from "@/components/mission/ActionTimeline";
import StakeholderActions from "@/components/Stakeholders/StakeholderActions";
import WeatherCard from "@/components/weather/WeatherCard";

import {
  analyzeIncident,
  type DecisionOutput,
} from "@/lib/decision-engine";

const PriorityActionMap = dynamic(
  () => import("@/components/map/PriorityActionMap"),
  {
    ssr: false,
  },
);

type District =
  | "Gabiley"
  | "Hargeisa"
  | "Borama"
  | "Burao"
  | "Berbera";

export default function MissionControl() {
  const [result, setResult] = useState<DecisionOutput | null>(null);

  const [selectedDistrict, setSelectedDistrict] =
    useState<District>("Gabiley");

  return (
    <div className="flex flex-1 flex-col gap-8 overflow-auto p-8">
      {/* ===================== Situation Awareness ===================== */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Situation Awareness
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Assess the current incident, monitor environmental conditions, and
            review priority action areas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <IncidentForm
            onAnalyze={(incident) => {
              setSelectedDistrict(incident.district as District);

              const output = analyzeIncident(incident);
              setResult(output);
            }}
          />

          <PriorityActionMap />

          <WeatherCard district={selectedDistrict} />
        </div>
      </section>

      {/* ===================== Decision Intelligence ===================== */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Decision Intelligence
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            AI-generated operational recommendations based on the assessed
            climate and incident conditions.
          </p>
        </div>

        {result ? (
          <>
            <MissionBrief
              summary={result.summary}
              confidence={result.confidence}
              riskIndex={result.riskIndex}
              riskLevel={result.riskLevel}
              missionStatus={result.missionStatus}
              recommendation={result.recommendation}
              actions={result.actions}
              stakeholders={result.stakeholders}
            />

            <div className="mt-8">
              <ActionTimeline hazard="Drought" />
            </div>

            <div className="mt-8">
              <StakeholderActions />
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">
              No Analysis Available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Complete the incident assessment and click{" "}
              <span className="font-medium text-slate-700">
                &quot;Analyze Situation&quot;
              </span>{" "}
              to generate operational recommendations, stakeholder actions, and
              decision intelligence.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}