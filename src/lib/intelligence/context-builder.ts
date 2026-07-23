import type { ClimateContext } from "@/lib/climate-service";
import type { Assessment } from "./types";

import {
  buildClimateEvidence,
  type ClimateEvidence,
} from "./evidence-engine";

import {
  prioritizeActions,
  type PrioritizedAction,
} from "./action-prioritizer";

import {
  buildOperationalProducts,
} from "@/lib/reports";
import {
  buildImpactAssessment,
  type ImpactAssessment,
} from "./impact-engine";
export type IntelligenceContext = {
  assessment: Assessment;
  evidence: ClimateEvidence;
  impact: ImpactAssessment;
  priorities: PrioritizedAction[];
  reports: ReturnType<typeof buildOperationalProducts>;
};

export function buildIntelligenceContext(
  assessment: Assessment,
  climate: ClimateContext,
): IntelligenceContext {

  const evidence =
  buildClimateEvidence(
    assessment,
    climate,
  );
const impact =
  buildImpactAssessment(
    assessment,
    evidence,
  );
  const priorities =
    prioritizeActions(assessment);

  const reports =
    buildOperationalProducts(assessment);

  return {
  assessment,
  evidence,
  impact,
  priorities,
  reports,
};

}