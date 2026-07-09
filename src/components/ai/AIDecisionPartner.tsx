"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Bot,
  CheckCircle2,
  ClipboardList,
  FileText,
  Globe2,
  Languages,
  Loader2,
  Megaphone,
  RadioTower,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

type AidaBriefMode =
  | "executive"
  | "government"
  | "humanitarian"
  | "community"
  | "somali";

type AidaBrief = {
  mode: AidaBriefMode;
  title: string;
  audience: string;
  headline: string;
  keyMessage: string;
  recommendedActions: string[];
  evidenceBase: string[];
  fieldVerification: string[];
  communicationChannels: string[];
  closingNote: string;
};

type AidaApiResponse = {
  generatedAt: string;
  scenario: {
    id: string;
    locationName: string;
    region: string;
    countryContext: string;
    livelihoodZone: string;
  };
  assessmentSummary: {
    riskScore: number;
    riskLevel: string;
    operationalMode: string;
    recommendedDecision: string;
  };
  brief: AidaBrief;
};

type AIDecisionPartnerProps = {
  scenarioId?: string;
};

const briefModes: {
  id: AidaBriefMode;
  label: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    id: "executive",
    label: "Executive",
    description: "Senior decision brief",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    id: "government",
    label: "Government",
    description: "DRM and ministries",
    icon: <ClipboardList className="h-4 w-4" />,
  },
  {
    id: "humanitarian",
    label: "Humanitarian",
    description: "Partners and response planners",
    icon: <UsersRound className="h-4 w-4" />,
  },
  {
    id: "community",
    label: "Community",
    description: "Local advisory language",
    icon: <Megaphone className="h-4 w-4" />,
  },
  {
    id: "somali",
    label: "Somali",
    description: "Last-mile Somali message",
    icon: <Languages className="h-4 w-4" />,
  },
];

export function AIDecisionPartner({
  scenarioId = "gabiley-drought-watch",
}: AIDecisionPartnerProps) {
  const [selectedMode, setSelectedMode] = useState<AidaBriefMode>("executive");
  const [data, setData] = useState<AidaApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadBrief() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(
          `/api/aida?scenario=${scenarioId}&mode=${selectedMode}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Unable to generate AIDA brief.");
        }

        const payload = (await response.json()) as AidaApiResponse;

        if (isMounted) {
          setData(payload);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unexpected AIDA briefing error.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadBrief();

    return () => {
      isMounted = false;
    };
  }, [scenarioId, selectedMode]);

  const activeMode = useMemo(
    () => briefModes.find((mode) => mode.id === selectedMode),
    [selectedMode],
  );

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-2xl">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-violet-200">
            <Bot className="h-4 w-4" />
            AIDA Decision Partner
          </div>

          <h2 className="mt-3 text-2xl font-bold text-white">
            Convert ARIE intelligence into operational briefs
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            AIDA does not calculate risk. It translates ARIE’s evidence-based
            assessment into audience-specific decision products for coordination,
            response planning, and last-mile communication.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 xl:min-w-80">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <Globe2 className="h-4 w-4" />
            Brief mode
          </div>

          <select
            value={selectedMode}
            onChange={(event) =>
              setSelectedMode(event.target.value as AidaBriefMode)
            }
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-semibold text-white outline-none transition focus:border-violet-400"
          >
            {briefModes.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.label}
              </option>
            ))}
          </select>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            {activeMode?.description}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-5">
        {briefModes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => setSelectedMode(mode.id)}
            className={`rounded-2xl border p-3 text-left transition ${
              selectedMode === mode.id
                ? "border-violet-400/40 bg-violet-400/10 text-violet-100"
                : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              {mode.icon}
              {mode.label}
            </div>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              {mode.description}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-5">
        {isLoading ? (
          <div className="flex min-h-72 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-300" />
              <p className="mt-3 text-sm font-semibold text-white">
                Generating AIDA brief
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Reading ARIE assessment and audience mode.
              </p>
            </div>
          </div>
        ) : errorMessage || !data ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-950/30 p-5">
            <p className="text-sm font-semibold text-red-100">
              AIDA brief unavailable
            </p>
            <p className="mt-2 text-sm text-red-100/80">
              {errorMessage ?? "The AIDA API did not return a valid brief."}
            </p>
          </div>
        ) : (
          <AidaBriefCard data={data} />
        )}
      </div>
    </section>
  );
}

function AidaBriefCard({ data }: { data: AidaApiResponse }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">
            <FileText className="h-4 w-4" />
            {data.brief.title}
          </div>

          <h3 className="mt-3 text-xl font-bold text-white">
            {data.brief.headline}
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
            {data.brief.keyMessage}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 xl:min-w-72">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            ARIE summary
          </div>

          <div className="mt-3 space-y-2 text-xs text-slate-300">
            <div className="flex justify-between gap-4">
              <span>Risk score</span>
              <span className="font-semibold text-white">
                {data.assessmentSummary.riskScore}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span>Risk level</span>
              <span className="font-semibold text-amber-200">
                {data.assessmentSummary.riskLevel}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span>Mode</span>
              <span className="font-semibold text-cyan-200">
                {data.assessmentSummary.operationalMode}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <BriefSection
          title="Recommended actions"
          items={data.brief.recommendedActions}
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-300" />}
        />

        <BriefSection
          title="Evidence base"
          items={data.brief.evidenceBase}
          icon={<ShieldCheck className="h-4 w-4 text-cyan-300" />}
        />

        <BriefSection
          title="Field verification"
          items={data.brief.fieldVerification}
          icon={<ClipboardList className="h-4 w-4 text-amber-300" />}
        />

        <BriefSection
          title="Communication channels"
          items={data.brief.communicationChannels}
          icon={<RadioTower className="h-4 w-4 text-violet-300" />}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Closing note
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          {data.brief.closingNote}
        </p>
      </div>
    </article>
  );
}

function BriefSection({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        {icon}
        {title}
      </div>

      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item} className="flex gap-2 text-sm leading-6 text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AIDecisionPartner;