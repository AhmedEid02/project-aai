export interface ReadinessAssessment {
  overall: number;

  coordination: number;

  communication: number;

  logistics: number;

  water: number;

  community: number;

  status:
    | "READY"
    | "EARLY_ACTION_READY"
    | "LIMITED_CAPACITY"
    | "RESPONSE_CONSTRAINT";
}

export interface ConfidenceAssessment {
  overall: number;

  weather: number;

  livelihood: number;

  fieldVerification: number;

  dataQuality: number;
}

export interface IntelligenceAssessment {
  primaryDrivers: string[];

  evidence: string[];

  uncertainties: string[];

  escalationTrigger: string;
}

export interface ConsequenceAssessment {
  immediate: string[];

  delayed: string[];

  expectedBenefits: string[];
}

export interface OperationalAssessment {
  readiness: ReadinessAssessment;

  confidence: ConfidenceAssessment;

  intelligence: IntelligenceAssessment;

  consequences: ConsequenceAssessment;
}