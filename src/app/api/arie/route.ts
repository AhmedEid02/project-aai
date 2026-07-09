import { NextResponse } from "next/server";

import { fuseClimateSignals } from "@/lib/arie/climate-fusion";
import { assessArieRisk } from "@/lib/arie/risk-engine";
import { arieScenarios } from "@/lib/arie/scenarios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scenarioId = searchParams.get("scenario") ?? "gabiley-drought-watch";

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

  const fusion = fuseClimateSignals(scenario);
  const assessment = assessArieRisk(fusion.fusedInput);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
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
}