import type { Assessment } from "./types";

export type AIDABrief = {
  executive: string;
  government: string;
  humanitarian: string;
  community: string;
  somali: string;
};

export function buildAIDABriefs(
  assessment: Assessment,
): AIDABrief {

  const area = assessment.incident.district;

  return {

    executive:

`Operational risk is currently assessed as ${assessment.riskLevel} (${assessment.riskScore}/100) for ${area}. ${assessment.recommendedDecision}.`,

    government:

`District authorities should activate preparedness measures, validate field conditions, and coordinate sectoral agencies before impacts escalate.`,

    humanitarian:

`Partners should review anticipatory action triggers, verify priority communities, and prepare early response resources.`,

    community:

`Communities should follow official advisories, conserve water resources, monitor livestock and crops, and report unusual conditions.`,

    somali:

`Bulshada degmada ${area} waxaa lagula talinayaa inay la socdaan digniinaha cimilada, ilaashadaan biyaha iyo xoolaha, isla markaana la shaqeeyaan maamulka deegaanka.`,

  };

}