import { NextResponse } from "next/server";

import { generateAidaBrief } from "@/lib/aida/brief-generator";
import type { AidaBriefMode } from "@/lib/aida/types";
import { fuseClimateSignals } from "@/lib/arie/climate-fusion";
import { assessArieRisk } from "@/lib/arie/risk-engine";
import { arieScenarios } from "@/lib/arie/scenarios";

const validModes: AidaBriefMode[] = [
  "executive",
  "government",
  "humanitarian",
  "community",
  "somali",
];

function isValidMode(mode: string): mode is AidaBriefMode {
  return validModes.includes(mode as AidaBriefMode);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const scenarioId = searchParams.get("scenario") ?? "gabiley-drought-watch";
  const modeParam = searchParams.get("mode") ?? "executive";

  const scenario = arieScenarios[scenarioId];

  if (!scenario) {
    return NextResponse.json(
      {
        error: "Scenario not found",
        availableScenarios: Object.keys(arieScenarios),
      },
      { status: 404 },
    );
  }

  if (!isValidMode(modeParam)) {
    return NextResponse.json(
      {
        error: "Brief mode not supported",
        availableModes: validModes,
      },
      { status: 400 },
    );
  }

  const fusion = fuseClimateSignals(scenario);
  const assessment = assessArieRisk(fusion.fusedInput);

  const generatedAt = new Date().toISOString();

  const brief = generateAidaBrief({
    generatedAt,
    mode: modeParam,
    scenario: {
      id: scenario.scenarioId,
      locationName: scenario.locationName,
      region: scenario.region,
      countryContext: scenario.countryContext,
      livelihoodZone: scenario.livelihoodZone,
    },
    fusion: fusion.fusionSummary,
    assessment,
  });

  return NextResponse.json({
    generatedAt,
    scenario: {
      id: scenario.scenarioId,
      locationName: scenario.locationName,
      region: scenario.region,
      countryContext: scenario.countryContext,
      livelihoodZone: scenario.livelihoodZone,
    },
    assessmentSummary: {
      riskScore: assessment.riskScore,
      riskLevel: assessment.riskLevel,
      operationalMode: assessment.operationalMode,
      recommendedDecision: assessment.recommendedDecision,
    },
    brief,
  });
}