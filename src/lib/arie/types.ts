export type RiskLevel = "Low" | "Moderate" | "High" | "Severe";

export type TrendDirection = "Rising" | "Stable" | "Falling";

export type EvidenceConfidence = "Low" | "Medium" | "High";

export type ArieRiskInput = {
  scenarioId: string;
  locationName: string;
  region: string;
  countryContext: string;
  livelihoodZone: string;

  rainfallDeficit: number;
  temperatureStress: number;
  waterStress: number;
  pastureStress: number;
  marketStress: number;
  exposure: number;
  copingPressure: number;
  coordinationReadiness: number;
};

export type RiskDriver = {
  label: string;
  value: number;
  weight: "Low" | "Medium" | "High";
  trend: TrendDirection;
  evidence: string;
};

export type EvidenceItem = {
  source: string;
  signal: string;
  confidence: EvidenceConfidence;
  use: string;
};

export type ActionPackage = {
  stakeholder: string;
  action: string;
  window: string;
  priority: "Low" | "Medium" | "High" | "Critical";
};

export type ArieAssessment = {
  scenarioId: string;
  locationName: string;
  riskScore: number;
  riskLevel: RiskLevel;
  riskTrend: string;
  decisionConfidence: number;
  operationalMode: string;
  recommendedDecision: string;
  decisionRationale: string;
  drivers: RiskDriver[];
  evidence: EvidenceItem[];
  actionPackages: ActionPackage[];
  expectedOutcomes: {
    label: string;
    value: string;
    detail: string;
  }[];
};