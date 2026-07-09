import type {
  ActionPackage,
  ArieAssessment,
  ArieRiskInput,
  EvidenceItem,
  RiskDriver,
  RiskLevel,
} from "./types";

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function getRiskLevel(score: number): RiskLevel {
  if (score >= 85) return "Severe";
  if (score >= 70) return "High";
  if (score >= 45) return "Moderate";
  return "Low";
}

function getOperationalMode(level: RiskLevel) {
  if (level === "Severe") return "Emergency Activation";
  if (level === "High") return "Enhanced Watch";
  if (level === "Moderate") return "Preparedness Monitoring";
  return "Routine Monitoring";
}

function getRecommendedDecision(level: RiskLevel) {
  if (level === "Severe") {
    return "Activate emergency early action coordination and immediate response readiness";
  }

  if (level === "High") {
    return "Activate district anticipatory action coordination";
  }

  if (level === "Moderate") {
    return "Increase monitoring and prepare no-regrets early action options";
  }

  return "Continue routine monitoring and community advisory updates";
}

function buildDrivers(input: ArieRiskInput): RiskDriver[] {
  return [
    {
      label: "Rainfall deficit",
      value: input.rainfallDeficit,
      weight: "High",
      trend: input.rainfallDeficit >= 70 ? "Rising" : "Stable",
      evidence:
        "Rainfall performance is below normal, increasing risk for rain-fed farming and water availability.",
    },
    {
      label: "Water-point pressure",
      value: input.waterStress,
      weight: "High",
      trend: input.waterStress >= 70 ? "Rising" : "Stable",
      evidence:
        "Water stress may increase pressure around boreholes, shallow wells, berkads, and tanker supply.",
    },
    {
      label: "Pasture stress",
      value: input.pastureStress,
      weight: "Medium",
      trend: input.pastureStress >= 65 ? "Rising" : "Stable",
      evidence:
        "Pasture deterioration can affect livestock body condition, mobility, milk supply, and household income.",
    },
    {
      label: "Market sensitivity",
      value: input.marketStress,
      weight: "Medium",
      trend: input.marketStress >= 70 ? "Rising" : "Stable",
      evidence:
        "Market pressure may increase the cost of water, fodder, transport, and staple food items.",
    },
    {
      label: "Coping pressure",
      value: input.copingPressure,
      weight: "High",
      trend: input.copingPressure >= 65 ? "Rising" : "Stable",
      evidence:
        "Households may begin shifting toward erosive coping if action is delayed.",
    },
  ];
}

function buildEvidence(input: ArieRiskInput): EvidenceItem[] {
  return [
    {
      source: "Climate API",
      signal:
        "Climate stress indicators suggest elevated drought-sensitive livelihood risk.",
      confidence: "Medium",
      use: "Supports early situation awareness and risk prioritization.",
    },
    {
      source: "Location Registry",
      signal: `${input.locationName} is classified as ${input.livelihoodZone}.`,
      confidence: "High",
      use: "Improves geographic targeting and livelihood-sensitive action planning.",
    },
    {
      source: "Community CIS Logic",
      signal:
        "Warnings require translation into simple, trusted, locally usable messages.",
      confidence: "High",
      use: "Supports last-mile advisory delivery through radio, WhatsApp, elders, and youth messengers.",
    },
    {
      source: "ARIE Risk Engine",
      signal:
        "Risk score combines climate stress, livelihood exposure, coping pressure, and coordination readiness.",
      confidence: "High",
      use: "Provides explainable reasoning instead of opaque AI scoring.",
    },
  ];
}

function buildActionPackages(level: RiskLevel): ActionPackage[] {
  if (level === "Severe") {
    return [
      {
        stakeholder: "Government / DRM",
        action:
          "Activate emergency coordination cell and issue district-level operational alert.",
        window: "Immediate",
        priority: "Critical",
      },
      {
        stakeholder: "Humanitarian partners",
        action:
          "Trigger emergency response readiness for water, fodder, food security, and cash assistance.",
        window: "24 hours",
        priority: "Critical",
      },
      {
        stakeholder: "Community actors",
        action:
          "Disseminate urgent advisories through trusted local channels and verify priority needs.",
        window: "Immediate",
        priority: "Critical",
      },
    ];
  }

  if (level === "High") {
    return [
      {
        stakeholder: "Government / DRM",
        action:
          "Activate district anticipatory action briefing and validate priority locations.",
        window: "24–48 hours",
        priority: "Critical",
      },
      {
        stakeholder: "Humanitarian partners",
        action:
          "Prepare water, fodder, livelihood, and cash-response planning triggers.",
        window: "48–72 hours",
        priority: "High",
      },
      {
        stakeholder: "Community actors",
        action:
          "Share localized advisories through radio, WhatsApp, elders, and youth climate messengers.",
        window: "Immediate",
        priority: "Critical",
      },
    ];
  }

  return [
    {
      stakeholder: "Government / DRM",
      action:
        "Increase monitoring frequency and prepare district coordination notes.",
      window: "72 hours",
      priority: "Medium",
    },
    {
      stakeholder: "Humanitarian partners",
      action:
        "Review contingency plans and identify communities requiring closer follow-up.",
      window: "3–5 days",
      priority: "Medium",
    },
    {
      stakeholder: "Community actors",
      action:
        "Share preparedness messages and collect local observations from farmers and pastoralists.",
      window: "Ongoing",
      priority: "Medium",
    },
  ];
}

export function assessArieRisk(input: ArieRiskInput): ArieAssessment {
  const weightedScore =
    input.rainfallDeficit * 0.2 +
    input.temperatureStress * 0.1 +
    input.waterStress * 0.18 +
    input.pastureStress * 0.14 +
    input.marketStress * 0.1 +
    input.exposure * 0.12 +
    input.copingPressure * 0.11 +
    (100 - input.coordinationReadiness) * 0.05;

  const riskScore = clamp(weightedScore);
  const riskLevel = getRiskLevel(riskScore);

  const decisionConfidence = clamp(
    55 +
      input.coordinationReadiness * 0.18 +
      input.exposure * 0.12 +
      input.copingPressure * 0.1,
  );

  return {
    scenarioId: input.scenarioId,
    locationName: input.locationName,
    riskScore,
    riskLevel,
    riskTrend: riskScore >= 70 ? "+12%" : "+4%",
    decisionConfidence,
    operationalMode: getOperationalMode(riskLevel),
    recommendedDecision: getRecommendedDecision(riskLevel),
    decisionRationale:
      "The recommended decision is based on converging climate stress, livelihood exposure, coping pressure, and the need to act before households lose options.",
    drivers: buildDrivers(input),
    evidence: buildEvidence(input),
    actionPackages: buildActionPackages(riskLevel),
    expectedOutcomes: [
      {
        label: "Earlier coordination",
        value: "24–48h",
        detail:
          "District actors receive a common operating picture before risk escalates.",
      },
      {
        label: "Better targeting",
        value: "Priority zones",
        detail:
          "Action packages focus on communities with higher livelihood exposure.",
      },
      {
        label: "Last-mile uptake",
        value: "Trusted channels",
        detail:
          "Advisories move through radio, WhatsApp, elders, and youth climate messengers.",
      },
    ],
  };
}