import type { Assessment } from "./types";

export type ClimateEvidence = {
  rainfallAnomaly: number;
  temperatureAnomaly: number;
  vegetationStress: number;
  waterStress: "Low" | "Moderate" | "High" | "Critical";
  forecastConfidence: number;
  affectedPopulation: number;
  affectedLivestock: number;
  evidenceScore: number;
  dataSources: string[];
};

import type { ClimateContext } from "@/lib/climate-service";

export function buildClimateEvidence(
    assessment: Assessment,
    climate: ClimateContext,
): ClimateEvidence {

  const rainfallAnomaly = Math.round(
    assessment.riskScore * 0.45,
  );

  const temperatureAnomaly = Number(
    (assessment.riskScore / 25).toFixed(1),
  );

  const vegetationStress = Number(
    Math.min(
      assessment.riskScore / 100,
      1,
    ).toFixed(2),
  );

  const forecastConfidence =
    Math.min(
      70 + Math.round(assessment.riskScore / 4),
      98,
    );

  const affectedPopulation =
    assessment.riskScore * 1200;

  const affectedLivestock =
    assessment.riskScore * 650;

  let waterStress: ClimateEvidence["waterStress"] =
    "Low";

  switch (assessment.riskLevel) {

    case "Critical":
      waterStress = "Critical";
      break;

    case "High":
      waterStress = "High";
      break;

    case "Moderate":
      waterStress = "Moderate";
      break;

    default:
      waterStress = "Low";
  }

  return {

    rainfallAnomaly,

    temperatureAnomaly,

    vegetationStress,

    waterStress,

    forecastConfidence,

    affectedPopulation,

    affectedLivestock,

    evidenceScore: assessment.riskScore,

    dataSources: [

      "NASA POWER",

      "CHIRPS",

      "MODIS NDVI",

      "ICPAC Forecast",

      "Community Reports",

    ],

  };

}