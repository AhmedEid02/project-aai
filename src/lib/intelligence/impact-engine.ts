import type {
  Assessment,
} from "./types";

import type {
  ClimateEvidence,
} from "./evidence-engine";

export type ImpactAssessment = {
  cropImpact: "Low" | "Moderate" | "High";
  livestockImpact: "Low" | "Moderate" | "High";
  waterImpact: "Low" | "Moderate" | "High";
  communityImpact: "Low" | "Moderate" | "High";
  humanitarianPriority: "Low" | "Moderate" | "High";

  affectedPopulation: number;
  affectedLivestock: number;
};
function waterStressScore(
  level: ClimateEvidence["waterStress"],
): number {

  switch (level) {

    case "Critical":
      return 100;

    case "High":
      return 80;

    case "Moderate":
      return 50;

    default:
      return 20;

  }

}
function classify(score: number): "Low" | "Moderate" | "High" {

  if (score >= 70) return "High";

  if (score >= 40) return "Moderate";

  return "Low";

}

export function buildImpactAssessment(
  assessment: Assessment,
  evidence: ClimateEvidence,
): ImpactAssessment {

  const cropScore =
    (evidence.rainfallAnomaly + evidence.vegetationStress) / 2;

  const waterScoreValue =
  waterStressScore(
    evidence.waterStress,
  );

const vegetationScore =
  evidence.vegetationStress * 100;

const livestockScore =
  (
    vegetationScore +
    waterScoreValue
  ) / 2;

const waterScore =
  (
    waterScoreValue +
    evidence.rainfallAnomaly
  ) / 2;

  const communityScore =
    (
      cropScore +
      livestockScore +
      waterScore +
      assessment.riskScore
    ) / 4;

  return {

    cropImpact:
      classify(cropScore),

    livestockImpact:
      classify(livestockScore),

    waterImpact:
      classify(waterScore),

    communityImpact:
      classify(communityScore),

    humanitarianPriority:
      classify(assessment.riskScore),

    affectedPopulation:
      evidence.affectedPopulation,

    affectedLivestock:
      evidence.affectedLivestock,

  };

}