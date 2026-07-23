import { createAssessment } from "./assessment";
import { buildMissionBrief } from "./mission-builder";
import { buildAIDABriefs } from "./aida-builder";
import { buildOperationalProducts } from "./product-builder";

import type {
  Incident,
  IntelligenceResult,
} from "./types";

export function analyzeIncident(
  incident: Incident,
): IntelligenceResult {

  const assessment =
    createAssessment(incident);

  const mission =
    buildMissionBrief(
      assessment,
    );

  const products =
    buildOperationalProducts(
      assessment,
    );

  // Prepared for AIDA integration
  buildAIDABriefs(assessment);

  return {

    assessment,

    mission,

    products,

  };

}