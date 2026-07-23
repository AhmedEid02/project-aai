import {
  Assessment,
  Incident,
  RiskDriver,
  EvidenceSource,
  ActionPackage,
} from "./types";

function getRiskScore(severity: Incident["severity"]): number {
  switch (severity) {
    case "Extreme":
      return 92;
    case "High":
      return 76;
    case "Moderate":
      return 55;
    default:
      return 28;
  }
}

function getRiskLevel(score: number): Assessment["riskLevel"] {
  if (score >= 90) return "Critical";
  if (score >= 70) return "High";
  if (score >= 45) return "Moderate";
  return "Low";
}

function getMissionStatus(score: number): string {
  if (score >= 90) return "Emergency Activation";
  if (score >= 70) return "Enhanced Watch";
  if (score >= 45) return "Preparedness Monitoring";
  return "Routine Monitoring";
}

function buildDrivers(): RiskDriver[] {
  return [
    {
      label: "Rainfall Deficit",
      score: 82,
      weight: "High",
      trend: "Rising",
      evidence:
        "Rainfall remains below seasonal averages across the operational area.",
    },
    {
      label: "Water Stress",
      score: 74,
      weight: "High",
      trend: "Rising",
      evidence:
        "Increasing pressure on water points and community water supply.",
    },
    {
      label: "Pasture Condition",
      score: 68,
      weight: "Medium",
      trend: "Stable",
      evidence:
        "Vegetation condition indicates declining pasture availability.",
    },
    {
      label: "Livelihood Exposure",
      score: 79,
      weight: "High",
      trend: "Stable",
      evidence:
        "Pastoral and agro-pastoral households remain highly exposed.",
    },
  ];
}

function buildEvidence(): EvidenceSource[] {
  return [
    {
      source: "Open-Meteo",
      description:
        "Current weather observations and forecast conditions.",
      confidence: "High",
    },
    {
      source: "Climate Fusion",
      description:
        "Integrated climate and livelihood interpretation.",
      confidence: "High",
    },
    {
      source: "Community CIS",
      description:
        "Localized climate advisory and community validation.",
      confidence: "Medium",
    },
  ];
}

function buildActions(level: Assessment["riskLevel"]): ActionPackage[] {
  if (level === "Critical") {
    return [
      {
        stakeholder: "Government",
        priority: "Critical",
        timeframe: "Immediate",
        action:
          "Activate district emergency coordination mechanisms.",
      },
      {
        stakeholder: "Humanitarian Partners",
        priority: "Critical",
        timeframe: "24 Hours",
        action:
          "Prepare anticipatory response for food, water and livestock.",
      },
      {
        stakeholder: "Communities",
        priority: "Critical",
        timeframe: "Immediate",
        action:
          "Disseminate localized advisories using trusted communication channels.",
      },
    ];
  }

  return [
    {
      stakeholder: "Government",
      priority: "High",
      timeframe: "48 Hours",
      action:
        "Strengthen monitoring and coordinate district preparedness.",
    },
    {
      stakeholder: "Humanitarian Partners",
      priority: "High",
      timeframe: "72 Hours",
      action:
        "Review contingency resources and response triggers.",
    },
    {
      stakeholder: "Communities",
      priority: "Medium",
      timeframe: "Ongoing",
      action:
        "Follow official advisories and monitor local conditions.",
    },
  ];
}

export function createAssessment(
  incident: Incident
): Assessment {

  const riskScore = getRiskScore(incident.severity);

  const riskLevel = getRiskLevel(riskScore);

  return {

    incident,

    generatedAt: new Date().toISOString(),

    riskScore,

    riskLevel,

    confidence: 88,

    operationalStatus: getMissionStatus(riskScore),

    recommendedDecision:
      "Activate coordinated early action based on the current operational risk.",

    summary:
      `${incident.hazard} conditions are increasing across ${incident.district}. Early action is recommended before livelihood impacts escalate.`,

    drivers: buildDrivers(),

    evidence: buildEvidence(),

    actions: buildActions(riskLevel),
missionReadiness: {

  overall: 84,

  coordination: 90,

  communication: 87,

  logistics: 74,

  water: 79,

  community: 85,

},

decisionConfidence: {

  weather: 95,

  livelihood: 87,

  fieldVerification: 61,

  dataQuality: 92,

},

consequences: {

  immediate: [

    "Reduced water availability",

    "Pasture deterioration",

  ],

  delayed: [

    "Livestock losses",

    "Food insecurity",

    "Higher humanitarian response costs",

  ],

  benefits: [

    "Earlier coordination",

    "Reduced livelihood losses",

    "Improved preparedness",

  ],

},
  };
}