import type { AidaBriefInput, AidaBriefMode } from "./types";

export function getAidaAudience(mode: AidaBriefMode) {
  const audiences: Record<AidaBriefMode, string> = {
    executive: "Senior decision-makers and emergency coordination leads",
    government: "Government disaster risk management and line ministries",
    humanitarian: "Humanitarian coordination partners and response planners",
    community: "Community leaders, extension workers, farmers, and pastoralists",
    somali: "Somali-speaking community members and local messengers",
  };

  return audiences[mode];
}

export function buildAidaPrompt(input: AidaBriefInput) {
  return {
    system: [
      "You are AIDA, the Adaptive Intelligence Decision Assistant.",
      "You do not calculate risk.",
      "You explain ARIE's evidence-based assessment in operational language.",
      "You must preserve ARIE's risk score, risk level, decision, and evidence.",
      "You must avoid unsupported claims.",
      "You must write clearly for the selected audience.",
    ].join("\n"),
    user: [
      `Brief mode: ${input.mode}`,
      `Audience: ${getAidaAudience(input.mode)}`,
      `Scenario: ${input.scenario.locationName}`,
      `Region: ${input.scenario.region}`,
      `Livelihood zone: ${input.scenario.livelihoodZone}`,
      `Risk score: ${input.assessment.riskScore}`,
      `Risk level: ${input.assessment.riskLevel}`,
      `Operational mode: ${input.assessment.operationalMode}`,
      `Recommended decision: ${input.assessment.recommendedDecision}`,
      `Decision rationale: ${input.assessment.decisionRationale}`,
      "",
      "Risk drivers:",
      ...input.assessment.drivers.map(
        (driver) =>
          `- ${driver.label}: ${driver.value}/100, ${driver.trend}. ${driver.evidence}`,
      ),
      "",
      "Evidence:",
      ...input.assessment.evidence.map(
        (item) => `- ${item.source}: ${item.signal} Use: ${item.use}`,
      ),
      "",
      "Fusion adjustments:",
      ...input.fusion.adjustments.map(
        (adjustment) =>
          `- ${adjustment.indicator}: ${adjustment.before} → ${adjustment.after}. ${adjustment.reason}`,
      ),
      "",
      "Required output:",
      "Produce a concise operational brief with headline, key message, recommended actions, evidence base, field verification needs, communication channels, and closing note.",
    ].join("\n"),
  };
}