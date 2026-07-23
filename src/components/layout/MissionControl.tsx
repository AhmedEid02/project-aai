"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import {
  Radio,
  BrainCircuit,
  Clock3,
  Users,
  Scale,
  TriangleAlert,
  FileText,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import IncidentForm from "@/components/incident/IncidentForm";
import MissionHeader from "@/components/mission/MissionHeader";
import MissionBrief from "@/components/mission/MissionBrief";
import MissionReadiness from "@/components/mission/MissionReadiness";
import ClimateFusionTrace from "@/components/intelligence/ClimateFusionTrace";
import ClimateEvidencePanel from "@/components/intelligence/ClimateEvidencePanel";
import AdaptiveRiskIndex from "@/components/intelligence/AdaptiveRiskIndex";
import ActionTimeline from "@/components/mission/ActionTimeline";
import StakeholderActions from "@/components/Stakeholders/StakeholderActions";
import WeatherCard from "@/components/weather/WeatherCard";
import OperationalTriggerMatrix from "@/components/intelligence/OperationalTriggerMatrix";
import DecisionJustification from "@/components/decision/DecisionJustification";
import DecisionConfidence from "@/components/decision/DecisionConfidence";
import ConsequencesCard from "@/components/decision/ConsequencesCard";
import AdaptiveActionPriority from "@/components/intelligence/AdaptiveActionPriority";
import ReportCenter from "@/components/reports/ReportCenter";
import ExpectedImpactCard from "@/components/intelligence/ExpectedImpactCard";
import MissionStatusBar from "@/components/mission/MissionStatusBar";
import IntelligencePipeline from "@/components/intelligence/IntelligencePipeline";
import ExecutiveIntelligenceBrief from "@/components/aida/ExecutiveIntelligenceBrief";
import {
  buildOperationalIntelligence,
  type IntelligenceResult,
  type IntelligenceContext,
} from "@/lib/intelligence";

const PriorityActionMap = dynamic(
  () => import("@/components/map/PriorityActionMap"),
  {
    ssr: false,
  }
);

type District =
  | "Gabiley"
  | "Hargeisa"
  | "Borama"
  | "Burao"
  | "Berbera";

export default function MissionControl() {
 const [intelligence, setIntelligence] =
  useState<IntelligenceResult | null>(null);
  const [context, setContext] =
  useState<IntelligenceContext | null>(null);

  const [selectedDistrict, setSelectedDistrict] =
    useState<District>("Gabiley");

  return (
    <div className="flex flex-1 flex-col gap-10 overflow-auto p-8">

      <MissionHeader
  missionId="AAI-2026-0001"
  location={
  selectedDistrict === "Gabiley"
    ? "Gabiley District"
    : selectedDistrict
}
  hazard="Meteorological Drought"
  riskLevel={
    intelligence?.assessment.riskLevel ?? "LOW RISK"
  }
  generatedAt={
    intelligence?.assessment.generatedAt ?? "15 Jul 2026 • 14:12 EAT"
  }
  riskScore={
  intelligence?.assessment.riskScore ?? 38
}
  confidence={
    intelligence?.assessment.confidence ?? 88
  }
/>
{intelligence && context && (
  <>
    <MissionStatusBar
      district={selectedDistrict}
      riskLevel={intelligence.assessment.riskLevel}
      confidence={intelligence.assessment.confidence}
      population={context.impact.affectedPopulation}
      livestock={context.impact.affectedLivestock}
    />

    <IntelligencePipeline />
    <ExecutiveIntelligenceBrief
  assessment={intelligence.assessment}
/>
  </>
)}
      {/* ================= Situation Awareness ================= */}

      <section>

        <div className="mb-6 flex items-center gap-3">

          <Radio className="h-7 w-7 text-cyan-600" />

          <div>

            <h2 className="text-2xl font-bold">
              Situation Awareness
            </h2>

            <p className="text-sm text-slate-500">
              Assess the incident, environmental conditions and operational context.
            </p>

          </div>

        </div>

        <div className="grid gap-6 lg:grid-cols-5">

  <div className="lg:col-span-2">
    <IncidentForm
      onAnalyze={async (incident) => {

        const result =
          await buildOperationalIntelligence(
            incident,
          );

        setSelectedDistrict(
          incident.district as District,
        );

        setIntelligence(
          result.intelligence,
        );

        setContext(
          result.context,
        );

      }}
    />
  </div>

  <div className="lg:col-span-3">
    <PriorityActionMap />
  </div>

</div>

<div className="mt-6">
  <WeatherCard
    district={selectedDistrict}
  />
</div>
</section>

{/* ================= Decision Intelligence ================= */}
<section>

  <div className="mb-6 flex items-center gap-3">

    <BrainCircuit className="h-7 w-7 text-cyan-600" />

    <div>

      <h2 className="text-2xl font-bold">
        Decision Intelligence
      </h2>

      <p className="text-sm text-slate-500">
        AI-generated operational recommendations and mission guidance.
      </p>

    </div>

  </div>

  {intelligence ? (

  <>

    <MissionBrief
      summary={intelligence.assessment.summary}
      confidence={intelligence.assessment.confidence}
      riskIndex={intelligence.assessment.riskScore}
      riskLevel={intelligence.assessment.riskLevel}
      missionStatus={intelligence.assessment.operationalStatus}
      recommendation={intelligence.assessment.recommendedDecision}
      actions={intelligence.assessment.actions.map(
  (item) => item.action
)}
      stakeholders={[]}
    />

    {/* ================= Mission Readiness ================= */}

    <section className="mt-10">

      <div className="mb-5 flex items-center gap-3">

        <CheckCircle2 className="h-6 w-6 text-cyan-600" />

        <h3 className="text-xl font-bold">
          Mission Readiness
        </h3>

      </div>

      <MissionReadiness
        assessment={intelligence.assessment}
      />

    </section>

    {/* ================= Decision Confidence ================= */}

    <section className="mt-10">

      <div className="mb-5 flex items-center gap-3">

        <ShieldCheck className="h-6 w-6 text-cyan-600" />

        <h3 className="text-xl font-bold">
          Decision Confidence
        </h3>

      </div>

      <DecisionConfidence
        assessment={intelligence.assessment}
      />

    </section>
{/* ================= Climate Fusion Trace ================= */}

<section className="mt-10">

  <ClimateFusionTrace
  assessment={intelligence.assessment}
/>
<section className="mt-10">
  {context && (
  <>
    <ClimateEvidencePanel
      context={context}
    />

    <ExpectedImpactCard
      context={context}
    />
  </>
)}
</section>
{/* ================= Adaptive Risk Index ================= */}

<section className="mt-10">

  <AdaptiveRiskIndex
    assessment={intelligence.assessment}
  />
{/* ================= Operational Trigger Matrix ================= */}

<section className="mt-10">

  <OperationalTriggerMatrix
    assessment={intelligence.assessment}
  />
{/* ================= Adaptive Action Prioritization ================= */}

<section className="mt-10">

  {context && (
  <AdaptiveActionPriority
    context={context}
  />
)}

</section>
</section>
</section>
</section>
    {/* ================= Timeline ================= */}

    <section className="mt-10">

      <div className="mb-5 flex items-center gap-3">

        <Clock3 className="h-6 w-6 text-cyan-600" />

        <h3 className="text-xl font-bold">
          Operational Timeline
        </h3>

      </div>

      <ActionTimeline
        hazard={intelligence.assessment.incident.hazard}
      />

    </section>

    {/* ================= Stakeholders ================= */}

    <section className="mt-10">

      <div className="mb-5 flex items-center gap-3">

        <Users className="h-6 w-6 text-cyan-600" />

        <h3 className="text-xl font-bold">
          Stakeholder Actions
        </h3>

      </div>

      <StakeholderActions />

    </section>

    {/* ================= Justification ================= */}

    <section className="mt-10">

      <div className="mb-5 flex items-center gap-3">

        <Scale className="h-6 w-6 text-cyan-600" />

        <h3 className="text-xl font-bold">
          Decision Justification
        </h3>

      </div>

      <DecisionJustification />

    </section>

    {/* ================= Consequences ================= */}

    <section className="mt-10">

      <div className="mb-5 flex items-center gap-3">

        <TriangleAlert className="h-6 w-6 text-cyan-600" />

        <h3 className="text-xl font-bold">
          Expected Consequences
        </h3>

      </div>

      <ConsequencesCard />

    </section>

    {/* ================= Reports ================= */}

    <section className="mt-10">

      <div className="mb-5 flex items-center gap-3">

        <FileText className="h-6 w-6 text-cyan-600" />

        <h3 className="text-xl font-bold">
          Operational Reports
        </h3>

      </div>

      <ReportCenter
  assessment={intelligence.assessment}
/>

    </section>

  </>

) : (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center shadow-sm">

            <h3 className="text-xl font-semibold">

              No Analysis Available

            </h3>

            <p className="mt-3 text-slate-500">

              Complete the incident assessment and click
              <strong> Analyze Situation </strong>
              to generate operational intelligence,
              reports and coordinated early actions.

            </p>

          </div>

        )}

      </section>

    </div>
  );
}