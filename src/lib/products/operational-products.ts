import type { AidaBrief, AidaBriefInput, AidaBriefMode } from "@/lib/aida/types";
import { generateAidaBrief } from "@/lib/aida/brief-generator";

export type OperationalProductType =
  | "situation-report"
  | "government-note"
  | "humanitarian-note"
  | "community-advisory"
  | "somali-message";

export type OperationalProduct = {
  type: OperationalProductType;
  title: string;
  audience: string;
  productCode: string;
  generatedAt: string;
  scenarioName: string;
  riskSummary: string;
  sections: {
    heading: string;
    content: string | string[];
  }[];
};

const productModeMap: Record<OperationalProductType, AidaBriefMode> = {
  "situation-report": "executive",
  "government-note": "government",
  "humanitarian-note": "humanitarian",
  "community-advisory": "community",
  "somali-message": "somali",
};

const productTitles: Record<OperationalProductType, string> = {
  "situation-report": "Situation Report",
  "government-note": "Government Action Note",
  "humanitarian-note": "Humanitarian Coordination Note",
  "community-advisory": "Community Advisory",
  "somali-message": "Somali Last-Mile Message",
};

const productCodes: Record<OperationalProductType, string> = {
  "situation-report": "SITREP",
  "government-note": "GOV-ACTION",
  "humanitarian-note": "HUM-COORD",
  "community-advisory": "COMM-ADV",
  "somali-message": "SOM-MSG",
};

export const operationalProductTypes: OperationalProductType[] = [
  "situation-report",
  "government-note",
  "humanitarian-note",
  "community-advisory",
  "somali-message",
];

function buildRiskSummary(input: AidaBriefInput) {
  return `${input.assessment.riskLevel} risk | Score ${input.assessment.riskScore}/100 | ${input.assessment.operationalMode}`;
}

function buildProductSections(
  type: OperationalProductType,
  brief: AidaBrief,
  input: AidaBriefInput,
): OperationalProduct["sections"] {
  if (type === "somali-message") {
    return [
      {
        heading: "Farriinta Muhiimka ah",
        content: brief.headline,
      },
      {
        heading: "Waxa Bulshada Loo Sheegayo",
        content: brief.keyMessage,
      },
      {
        heading: "Tallaabooyinka Degdegga ah",
        content: brief.recommendedActions,
      },
      {
        heading: "Waxa La Hubinayo",
        content: brief.fieldVerification,
      },
      {
        heading: "Kanaallada Fariinta",
        content: brief.communicationChannels,
      },
      {
        heading: "Xusuusin",
        content: brief.closingNote,
      },
    ];
  }

  return [
    {
      heading: "Headline",
      content: brief.headline,
    },
    {
      heading: "Operational Message",
      content: brief.keyMessage,
    },
    {
      heading: "Recommended Actions",
      content: brief.recommendedActions,
    },
    {
      heading: "Evidence Base",
      content: brief.evidenceBase,
    },
    {
      heading: "Field Verification Priorities",
      content: brief.fieldVerification,
    },
    {
      heading: "Communication Channels",
      content: brief.communicationChannels,
    },
    {
      heading: "Decision Rationale",
      content: input.assessment.decisionRationale,
    },
    {
      heading: "Closing Note",
      content: brief.closingNote,
    },
  ];
}

export function generateOperationalProduct(
  type: OperationalProductType,
  input: Omit<AidaBriefInput, "mode">,
): OperationalProduct {
  const mode = productModeMap[type];

  const briefInput: AidaBriefInput = {
    ...input,
    mode,
  };

  const brief = generateAidaBrief(briefInput);

  return {
    type,
    title: productTitles[type],
    audience: brief.audience,
    productCode: productCodes[type],
    generatedAt: input.generatedAt,
    scenarioName: input.scenario.locationName,
    riskSummary: buildRiskSummary(briefInput),
    sections: buildProductSections(type, brief, briefInput),
  };
}