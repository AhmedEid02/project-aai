import { NextResponse } from "next/server";

import {
  generateOperationalProduct,
  operationalProductTypes,
  type OperationalProductType,
} from "@/lib/products/operational-products";
import { fuseClimateSignals } from "@/lib/arie/climate-fusion";
import { assessArieRisk } from "@/lib/arie/risk-engine";
import { arieScenarios } from "@/lib/arie/scenarios";

function isValidProductType(type: string): type is OperationalProductType {
  return operationalProductTypes.includes(type as OperationalProductType);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const scenarioId = searchParams.get("scenario") ?? "gabiley-drought-watch";
  const productType = searchParams.get("type") ?? "situation-report";

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

  if (!isValidProductType(productType)) {
    return NextResponse.json(
      {
        error: "Operational product type not supported",
        availableProductTypes: operationalProductTypes,
      },
      { status: 400 },
    );
  }

  const fusion = fuseClimateSignals(scenario);
  const assessment = assessArieRisk(fusion.fusedInput);
  const generatedAt = new Date().toISOString();

  const product = generateOperationalProduct(productType, {
    generatedAt,
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
    product,
  });
}