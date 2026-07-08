"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import IncidentForm from "@/components/incident/IncidentForm";
import MissionBrief from "@/components/mission/MissionBrief";
import ActionTimeline from "@/components/mission/ActionTimeline";
import StakeholderActions from "@/components/Stakeholders/StakeholderActions";
import AIDecisionPartner from "@/components/ai/AIDecisionPartner";
import WeatherCard from "@/components/weather/WeatherCard";

import {
  analyzeIncident,
  DecisionOutput,
} from "@/lib/decision-engine";

const PriorityActionMap = dynamic(
  () => import("@/components/map/PriorityActionMap"),
  {
    ssr: false,
  }
);

export default function MissionControl() {
  const [result, setResult] =
    useState<DecisionOutput | null>(null);

  const [selectedDistrict, setSelectedDistrict] =
    useState<"Gabiley" | "Hargeisa" | "Borama" | "Burao" | "Berbera">(
      "Gabiley"
    );

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-auto p-6">

      {/* Situation Awareness */}

      <section>

        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Situation Awareness
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <IncidentForm
            onAnalyze={(incident) => {
              setSelectedDistrict(
                incident.district as
                  | "Gabiley"
                  | "Hargeisa"
                  | "Borama"
                  | "Burao"
                  | "Berbera"
              );

              const output = analyzeIncident(incident);

              setResult(output);
            }}
          />

          <PriorityActionMap />

          <WeatherCard
            district={selectedDistrict}
          />

        </div>

      </section>

      {/* Decision Intelligence */}

      {result && (

        <section>

          <h2 className="mb-4 text-xl font-bold text-slate-800">
            Decision Intelligence
          </h2>

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

          <div className="mt-6">

            <ActionTimeline hazard="Drought" />

          </div>

          <div className="mt-6">

            <StakeholderActions />

          </div>

        </section>

      )}

      {/* AI Decision Partner */}

      <section>

        <h2 className="mb-4 text-xl font-bold text-slate-800">
          AI Decision Partner
        </h2>

        <AIDecisionPartner />

      </section>

    </div>
  );
}