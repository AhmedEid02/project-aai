import {
  buildSummary,
  getPriorityActions,
  getRecommendation,
  getRiskIndex,
  getStakeholders,
} from "./arie";

export type IncidentData = {
  hazard: string;
  country: string;
  region: string;
  district: string;
  severity: string;
  forecastWindow: string;
};

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
  incident: IncidentData
): DecisionOutput {

  const riskIndex = getRiskIndex(incident.severity);

  let riskLevel = "Low";

  if (riskIndex >= 50) riskLevel = "High";
  if (riskIndex >= 75) riskLevel = "Critical";

  let missionStatus = "Monitoring";

  if (riskIndex >= 50) missionStatus = "Preparing";
  if (riskIndex >= 75) missionStatus = "Early Action";
  if (riskIndex >= 90) missionStatus = "Emergency";

  return {
    summary: buildSummary(
      incident.hazard,
      incident.district
    ),

    confidence: 88,

    riskIndex,

    riskLevel,

    missionStatus,

    recommendation: getRecommendation(
      incident.hazard
    ),

    actions: getPriorityActions(
      incident.hazard
    ),

    stakeholders: getStakeholders(
      incident.hazard
    ),
  };
}