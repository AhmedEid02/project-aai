export type Incident = {
  hazard: string;
  country: string;
  region: string;
  district: string;
  severity: "Low" | "Moderate" | "High" | "Extreme";
  forecastWindow: string;
};

export type RiskDriver = {
  label: string;
  score: number;
  weight: "Low" | "Medium" | "High";
  trend: "Improving" | "Stable" | "Rising";
  evidence: string;
};

export type EvidenceSource = {
  source: string;
  description: string;
  confidence: "Low" | "Medium" | "High";
};

export type ActionPackage = {
  stakeholder: string;
  priority: "Medium" | "High" | "Critical";
  timeframe: string;
  action: string;
};

export type Assessment = {
  incident: Incident;

  generatedAt: string;

  riskScore: number;

  riskLevel:
    | "Low"
    | "Moderate"
    | "High"
    | "Critical";

  confidence: number;

  operationalStatus: string;

  recommendedDecision: string;

  summary: string;

  drivers: RiskDriver[];

  evidence: EvidenceSource[];

  actions: ActionPackage[];

  missionReadiness: {
    overall: number;
    coordination: number;
    communication: number;
    logistics: number;
    water: number;
    community: number;
  };

  decisionConfidence: {
    weather: number;
    livelihood: number;
    fieldVerification: number;
    dataQuality: number;
  };

  consequences: {
    immediate: string[];
    delayed: string[];
    benefits: string[];
  };
};

export type MissionBrief = {
  title: string;

  summary: string;

  missionStatus: string;

  recommendation: string;
};

export type OperationalProduct = {
  title: string;

  audience: string;

  content: string;
};

export type IntelligenceResult = {
  assessment: Assessment;

  mission: MissionBrief;

  products: OperationalProduct[];
};