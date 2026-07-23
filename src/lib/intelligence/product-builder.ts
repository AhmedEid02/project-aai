import type {
  Assessment,
  OperationalProduct,
} from "./types";

export function buildOperationalProducts(
  assessment: Assessment,
): OperationalProduct[] {

  return [

    {
      title: "Situation Report",

      audience: "Government",

      content:
`Situation Report

Operational Area:
${assessment.incident.district}

Hazard:
${assessment.incident.hazard}

Risk:
${assessment.riskLevel}

Confidence:
${assessment.confidence}%

Recommendation:
${assessment.recommendedDecision}`,
    },

    {
      title: "Government Action Note",

      audience: "Government",

      content:
`Coordinate district preparedness and verify priority communities before conditions deteriorate.`,
    },

    {
      title: "Humanitarian Coordination Note",

      audience: "Humanitarian",

      content:
`Review anticipatory action triggers and prepare response resources.`,
    },

    {
      title: "Community Advisory",

      audience: "Community",

      content:
`Monitor local conditions and follow official climate advisories.`,
    },

    {
      title: "Somali Last-Mile Advisory",

      audience: "Community",

      content:
`La soco digniinaha cimilada, kaydi biyaha, ilaali xoolaha, kana war sug maamulka deegaanka.`,
    },

  ];

}