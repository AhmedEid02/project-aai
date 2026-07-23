import type { DecisionOutput } from "@/lib/decision-engine";

import type {
  OperationalAssessment,
} from "./operational-assessment";

export function buildOperationalAssessment(
  decision: DecisionOutput,
): OperationalAssessment {

  const readinessOverall =
    Math.max(
      55,
      Math.min(
        95,
        Math.round(
          decision.confidence * 0.9,
        ),
      ),
    );

  return {

    readiness: {

      overall: readinessOverall,

      coordination:
        readinessOverall + 6,

      communication:
        readinessOverall + 3,

      logistics:
        readinessOverall - 12,

      water:
        readinessOverall - 7,

      community:
        readinessOverall + 1,

      status:

        readinessOverall >= 90
          ? "READY"

        : readinessOverall >= 75
        ? "EARLY_ACTION_READY"

        : readinessOverall >= 60
        ? "LIMITED_CAPACITY"

        : "RESPONSE_CONSTRAINT",

    },

    confidence: {

      overall:
        decision.confidence,

      weather: 95,

      livelihood: 87,

      fieldVerification: 61,

      dataQuality: 92,

    },

    intelligence: {

      primaryDrivers: [

        "Rainfall Deficit",

        "Water Stress",

        "Livelihood Exposure",

      ],

      evidence: [

        "Open-Meteo",

        "ARIE Intelligence Engine",

        "Climate Fusion",

        "Historical Climate Pattern",

      ],

      uncertainties: [

        "Field verification pending.",

        "Water point functionality requires confirmation.",

      ],

      escalationTrigger:

        "Rainfall remains below seasonal threshold for two consecutive dekads.",

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

      expectedBenefits: [

        "Earlier coordination",

        "Reduced livelihood losses",

        "Improved preparedness",

      ],

    },

  };

}