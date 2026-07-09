"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Loader2,
  MapPinned,
  RadioTower,
  ShieldCheck,
} from "lucide-react";

import { AdaptiveRiskIndex } from "./AdaptiveRiskIndex";
import { ClimateContext } from "./ClimateContext";
import { DecisionConfidence } from "./DecisionConfidence";
import { EvidencePanel } from "./EvidencePanel";
import { ExpectedOutcome } from "./ExpectedOutcome";
import { FusionTracePanel } from "./FusionTracePanel";
import { OperationalDecision } from "./OperationalDecision";
import { RiskDrivers } from "./RiskDrivers";

import type { ArieAssessment } from "@/lib/arie/types";
import type { ClimateFusionResult } from "@/lib/arie/climate-fusion";

type ArieApiResponse = {
  generatedAt: string;
  scenario: {
    id: string;
    locationName: string;
    region: string;
    countryContext: string;
    livelihoodZone: string;
  };
  fusion: ClimateFusionResult["fusionSummary"];
  assessment: ArieAssessment;
};

const scenarios = [
  {
    id: "gabiley-drought-watch",
    label: "Gabiley Drought Watch",
    description: "Dryland farming and agro-pastoral livelihoods",
  },
  {
    id: "togdheer-pastoral-stress",
    label: "Togdheer Pastoral Stress",
    description: "Mobile pastoral corridor and water-point pressure",
  },
];

const milestones = [
  { label: "Foundation", status: "Complete" },
  { label: "ARIE Intelligence Console", status: "Complete" },
  { label: "Adaptive Risk Intelligence", status: "Complete" },
  { label: "Multi-source Climate Fusion", status: "Active" },
  { label: "AIDA Decision Copilot", status: "Next" },
  { label: "Operational Products", status: "Planned" },
  { label: "Demo & Deployment", status: "Planned" },
];

export default function ARIEConsole() {
  const [selectedScenario, setSelectedScenario] = useState(
    "gabiley-drought-watch",
  );
  const [data, setData] = useState<ArieApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAssessment() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(`/api/arie?scenario=${selectedScenario}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load ARIE assessment.");
        }

        const payload = (await response.json()) as ArieApiResponse;

        if (isMounted) {
          setData(payload);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unexpected ARIE loading error.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadAssessment();

    return () => {
      isMounted = false;
    };
  }, [selectedScenario]);

  const assessment = data?.assessment;

  const selectedScenarioMeta = useMemo(
    () => scenarios.find((scenario) => scenario.id === selectedScenario),
    [selectedScenario],
  );

  if (isLoading && !assessment) {
    return (
      <section className="flex min-h-[420px] items-center justify-center rounded-3xl border border-slate-800 bg-slate-950">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-cyan-300" />
          <h2 className="mt-4 text-lg font-semibold text-white">
            Loading ARIE intelligence cycle
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Pulling live risk assessment from the ARIE reasoning engine.
          </p>
        </div>
      </section>
    );
  }

  if (errorMessage || !assessment || !data) {
    return (
      <section className="rounded-3xl border border-red-400/20 bg-red-950/30 p-6">
        <div className="flex items-center gap-3 text-red-200">
          <AlertTriangle className="h-5 w-5" />
          <h2 className="text-lg font-semibold">ARIE assessment unavailable</h2>
        </div>

        <p className="mt-3 text-sm leading-6 text-red-100/80">
          {errorMessage ??
            "The ARIE API did not return a valid operational assessment."}
        </p>

        <button
          type="button"
          onClick={() => setSelectedScenario("gabiley-drought-watch")}
          className="mt-5 rounded-xl border border-red-300/30 bg-red-300/10 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-300/20"
        >
          Reset to Gabiley scenario
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-2xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                <RadioTower className="h-3.5 w-3.5" />
                ARIE Intelligence Console
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
                <Activity className="h-3.5 w-3.5" />
                Fusion-Enabled Risk Engine
              </span>
            </div>

            <h1 className="max-w-4xl text-2xl font-bold tracking-tight text-white md:text-3xl">
              Adaptive Risk Intelligence for Early Warning–Early Action
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              ARIE converts climate signals, livelihood stress, exposure, coping
              pressure, and coordination readiness into explainable operational
              decisions for anticipatory action.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 lg:min-w-80">
            <label
              htmlFor="scenario"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
            >
              Operational scenario
            </label>

            <select
              id="scenario"
              value={selectedScenario}
              onChange={(event) => setSelectedScenario(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-semibold text-white outline-none transition focus:border-cyan-400"
            >
              {scenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.label}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              {selectedScenarioMeta?.description}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white">
              <Clock3 className="h-4 w-4 text-cyan-300" />
              Live Decision Cycle
            </div>

            <div className="mt-3 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between gap-4">
                <span>Operational mode</span>
                <span className="font-semibold text-amber-200">
                  {assessment.operationalMode}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Scenario</span>
                <span className="font-semibold text-cyan-200">
                  {assessment.locationName}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Fusion confidence</span>
                <span className="font-semibold text-violet-200">
                  {data.fusion.confidence}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Generated</span>
                <span className="font-semibold text-emerald-200">
                  {new Date(data.generatedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <StatusTile
            icon={<MapPinned className="h-5 w-5" />}
            label="Situation"
            value={assessment.locationName}
            tone="cyan"
          />
          <StatusTile
            icon={<AlertTriangle className="h-5 w-5" />}
            label="Risk Level"
            value={`${assessment.riskLevel} / ${assessment.riskTrend}`}
            tone="amber"
          />
          <StatusTile
            icon={<BrainCircuit className="h-5 w-5" />}
            label="AI Logic"
            value="ARIE reasoning engine"
            tone="violet"
          />
          <StatusTile
            icon={<ShieldCheck className="h-5 w-5" />}
            label="Decision"
            value={assessment.recommendedDecision}
            tone="emerald"
          />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <ClimateContext />
        <AdaptiveRiskIndex
          score={assessment.riskScore}
          level={assessment.riskLevel}
          trend={assessment.riskTrend}
        />
      </div>

      <FusionTracePanel fusion={data.fusion} />

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <RiskDrivers drivers={assessment.drivers} />
        <EvidencePanel evidence={assessment.evidence} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <OperationalDecision packages={assessment.actionPackages} />
        <div className="space-y-5">
          <DecisionConfidence score={assessment.decisionConfidence} />
          <ExpectedOutcome outcomes={assessment.expectedOutcomes} />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-300" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
            AAI Milestone Tracker
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3"
            >
              <div className="text-xs text-slate-500">Milestone {index + 1}</div>
              <div className="mt-1 text-sm font-semibold text-white">
                {milestone.label}
              </div>
              <div
                className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                  milestone.status === "Complete"
                    ? "bg-emerald-400/10 text-emerald-200"
                    : milestone.status === "Active"
                      ? "bg-cyan-400/10 text-cyan-200"
                      : milestone.status === "Next"
                        ? "bg-amber-400/10 text-amber-200"
                        : "bg-slate-800 text-slate-400"
                }`}
              >
                {milestone.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatusTile({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "cyan" | "amber" | "violet" | "emerald";
}) {
  const toneClass = {
    cyan: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
    amber: "text-amber-300 bg-amber-400/10 border-amber-400/20",
    violet: "text-violet-300 bg-violet-400/10 border-violet-400/20",
    emerald: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  }[tone];

  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-medium uppercase tracking-[0.16em]">
          {label}
        </span>
      </div>

      <div className="mt-3 line-clamp-2 text-sm font-semibold text-white">
        {value}
      </div>
    </div>
  );
}