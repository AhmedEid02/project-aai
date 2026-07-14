import {
  analyzeIncident as analyzeIntelligence,
  type Incident,
} from "@/lib/intelligence";

export type IncidentData = Incident;

export type DecisionOutput = {
  summary: string;
  confidence: number;
  riskIndex: number;
  riskLevel: string;
  missionStatus: string;
  recommendation: string;
  actions: string[];
  stakeholders: string[];
};

export function analyzeIncident(
  incident: IncidentData,
): DecisionOutput {

  const intelligence =
    analyzeIntelligence(incident);

  return {

    summary:
      intelligence.mission.summary,

    confidence:
      intelligence.assessment.confidence,

    riskIndex:
      intelligence.assessment.riskScore,

    riskLevel:
      intelligence.assessment.riskLevel,

    missionStatus:
      intelligence.assessment.operationalStatus,

    recommendation:
      intelligence.assessment.recommendedDecision,

    actions:
      intelligence.assessment.actions.map(
        (item) => item.action,
      ),

    stakeholders:
      intelligence.assessment.actions.map(
        (item) => item.stakeholder,
      ),

  };

}