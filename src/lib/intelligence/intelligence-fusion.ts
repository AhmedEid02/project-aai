import { analyzeIncident } from "./engine";
import { buildIntelligenceContext } from "./context-builder";

import type {
  Incident,
  IntelligenceResult,
} from "./types";

import {
  getClimateContext,
  type ClimateContext,
} from "@/lib/climate-service";

import type {
  IntelligenceContext,
} from "./context-builder";

export type OperationalIntelligence = {
  intelligence: IntelligenceResult;
  climate: ClimateContext;
  context: IntelligenceContext;
};

export async function buildOperationalIntelligence(
  incident: Incident,
): Promise<OperationalIntelligence> {

  // Core assessment
  const intelligence =
    analyzeIncident(incident);

  // Climate intelligence
  const climate =
    await getClimateContext(
      incident.district as Parameters<
        typeof getClimateContext
      >[0],
    );

  // Intelligence fusion
  const context =
    buildIntelligenceContext(
      intelligence.assessment,
      climate,
    );

  return {

    intelligence,

    climate,

    context,

  };

}