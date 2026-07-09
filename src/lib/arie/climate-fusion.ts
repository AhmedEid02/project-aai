import type { ArieRiskInput } from "./types";
import { getLocationSignalProfile } from "./location-signals";

type FusionAdjustment = {
  indicator: keyof Pick<
    ArieRiskInput,
    | "rainfallDeficit"
    | "temperatureStress"
    | "waterStress"
    | "pastureStress"
    | "marketStress"
    | "exposure"
    | "copingPressure"
    | "coordinationReadiness"
  >;
  before: number;
  after: number;
  reason: string;
};

export type ClimateFusionResult = {
  fusedInput: ArieRiskInput;
  fusionSummary: {
    method: string;
    profileUsed: string;
    confidence: "Low" | "Medium" | "High";
    signalsUsed: string[];
    adjustments: FusionAdjustment[];
    fieldVerificationNeeds: string[];
    lastMileChannels: string[];
  };
};

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function adjust(
  input: ArieRiskInput,
  indicator: FusionAdjustment["indicator"],
  delta: number,
  reason: string,
): FusionAdjustment {
  const before = input[indicator];
  const after = clamp(before + delta);

  input[indicator] = after;

  return {
    indicator,
    before,
    after,
    reason,
  };
}

export function fuseClimateSignals(
  scenario: ArieRiskInput,
): ClimateFusionResult {
  const profile = getLocationSignalProfile(scenario);

  const fusedInput: ArieRiskInput = {
    ...scenario,
  };

  const adjustments: FusionAdjustment[] = [];

  const isAgroPastoral =
    profile.dominantLivelihood.toLowerCase().includes("agro") ||
    profile.dominantLivelihood.toLowerCase().includes("farming");

  const isPastoral =
    profile.dominantLivelihood.toLowerCase().includes("pastoral") &&
    !profile.dominantLivelihood.toLowerCase().includes("agro");

  if (isAgroPastoral) {
    adjustments.push(
      adjust(
        fusedInput,
        "rainfallDeficit",
        3,
        "Dryland farming systems are highly sensitive to delayed or poorly distributed rainfall.",
      ),
    );

    adjustments.push(
      adjust(
        fusedInput,
        "waterStress",
        2,
        "Agro-pastoral zones face combined crop-water and livestock-water pressure.",
      ),
    );

    adjustments.push(
      adjust(
        fusedInput,
        "copingPressure",
        2,
        "Crop failure risk can push households toward early negative coping if advisories arrive late.",
      ),
    );
  }

  if (isPastoral) {
    adjustments.push(
      adjust(
        fusedInput,
        "pastureStress",
        4,
        "Mobile pastoral livelihoods are strongly affected by pasture availability and grazing-route pressure.",
      ),
    );

    adjustments.push(
      adjust(
        fusedInput,
        "waterStress",
        3,
        "Pastoral corridors can experience rapid water-point congestion during dry spells.",
      ),
    );

    adjustments.push(
      adjust(
        fusedInput,
        "marketStress",
        2,
        "Livestock market sensitivity can rise when animal condition weakens or movement costs increase.",
      ),
    );
  }

  if (scenario.coordinationReadiness < 60) {
    adjustments.push(
      adjust(
        fusedInput,
        "copingPressure",
        3,
        "Lower coordination readiness increases the chance that households act before formal support arrives.",
      ),
    );
  }

  if (scenario.rainfallDeficit >= 75 && scenario.waterStress >= 75) {
    adjustments.push(
      adjust(
        fusedInput,
        "exposure",
        2,
        "Concurrent rainfall deficit and water stress increase exposed livelihood risk.",
      ),
    );
  }

  return {
    fusedInput,
    fusionSummary: {
      method: "Scenario baseline plus livelihood-sensitive climate fusion rules",
      profileUsed: profile.scenarioId,
      confidence: "Medium",
      signalsUsed: [
        "Scenario baseline",
        "Livelihood profile",
        "Water-stress sensitivity",
        "Rainfall-deficit sensitivity",
        "Coordination readiness",
        "Last-mile communication profile",
      ],
      adjustments,
      fieldVerificationNeeds: profile.fieldVerificationNeeds,
      lastMileChannels: profile.lastMileChannels,
    },
  };
}