import { NextResponse } from "next/server";

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

  const assessment = assessArieRisk(scenario);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    assessment,
  });
}