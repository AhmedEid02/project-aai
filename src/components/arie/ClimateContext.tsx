import {
  CloudRain,
  Droplets,
  MapPinned,
  RadioTower,
  ThermometerSun,
  UsersRound,
  Wind,
} from "lucide-react";

import type { ClimateFusionResult } from "@/lib/arie/climate-fusion";
import type { ArieAssessment } from "@/lib/arie/types";

type ScenarioContext = {
  id: string;
  locationName: string;
  region: string;
  countryContext: string;
  livelihoodZone: string;
};

type ClimateContextProps = {
  scenario: ScenarioContext;
  fusion: ClimateFusionResult["fusionSummary"];
  riskDrivers: ArieAssessment["drivers"];
};

const signalIcons = {
  rainfall: CloudRain,
  water: Droplets,
  pasture: Wind,
  market: RadioTower,
  coping: UsersRound,
  temperature: ThermometerSun,
  default: MapPinned,
};

export function ClimateContext({
  scenario,
  fusion,
  riskDrivers,
}: ClimateContextProps) {
  const exposedGroups = getExposedGroups(scenario.livelihoodZone);
  const primarySignals = riskDrivers.slice(0, 4);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
            <MapPinned className="h-4 w-4" />
            Situation Awareness
          </div>

          <h2 className="mt-3 text-xl font-bold text-white">
            {scenario.locationName}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            {scenario.region}, {scenario.countryContext}. This scenario focuses
            on {scenario.livelihoodZone.toLowerCase()}, where warnings must
            translate climate signals into practical decisions on water, pasture,
            planting, livestock movement, household preparedness, and local
            coordination.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              {scenario.region}
            </span>

            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300">
              {scenario.livelihoodZone}
            </span>

            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
              Fusion: {fusion.confidence}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:max-w-md">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            <UsersRound className="h-4 w-4" />
            Exposed groups
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {exposedGroups.map((group) => (
              <span
                key={group}
                className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-200"
              >
                {group}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {primarySignals.map((signal) => {
          const Icon = getSignalIcon(signal.label);

          return (
            <article
              key={signal.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <Icon className="h-5 w-5 text-cyan-300" />

                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                  {signal.trend}
                </span>
              </div>

              <div className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">
                {signal.label}
              </div>

              <div className="mt-1 text-lg font-bold text-white">
                {signal.value}/100
              </div>

              <p className="mt-2 text-sm leading-5 text-slate-400">
                {signal.evidence}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <ContextList
          title="Field verification priorities"
          items={fusion.fieldVerificationNeeds}
        />

        <ContextList
          title="Last-mile communication channels"
          items={fusion.lastMileChannels}
        />
      </div>
    </section>
  );
}

function ContextList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="text-sm font-semibold text-white">{title}</div>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs leading-5 text-slate-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function getSignalIcon(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("rainfall")) return signalIcons.rainfall;
  if (normalized.includes("water")) return signalIcons.water;
  if (normalized.includes("pasture")) return signalIcons.pasture;
  if (normalized.includes("market")) return signalIcons.market;
  if (normalized.includes("coping")) return signalIcons.coping;
  if (normalized.includes("temperature")) return signalIcons.temperature;

  return signalIcons.default;
}

function getExposedGroups(livelihoodZone: string) {
  const normalized = livelihoodZone.toLowerCase();

  if (normalized.includes("pastoral") && !normalized.includes("agro")) {
    return [
      "Pastoral households",
      "Mobile herders",
      "Women-headed households",
      "Livestock-dependent traders",
    ];
  }

  if (normalized.includes("farming") || normalized.includes("agro")) {
    return [
      "Smallholder farmers",
      "Women farmers",
      "Agro-pastoral households",
      "Youth climate messengers",
    ];
  }

  return [
    "Climate-exposed households",
    "Women and youth",
    "Local community leaders",
  ];
}