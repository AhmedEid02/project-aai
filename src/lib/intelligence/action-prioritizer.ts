import type { Assessment } from "./types";

export type PrioritizedAction = {
  stakeholder: string;
  action: string;
  priority: number;
  urgency: "Critical" | "High" | "Medium" | "Low";
  expectedImpact: "Very High" | "High" | "Moderate" | "Low";
  responseWindow: string;
  reason: string;
};

export function prioritizeActions(
  assessment: Assessment,
): PrioritizedAction[] {

  return assessment.actions
    .map((item) => {

      let priority = assessment.riskScore;

      // Increase priority for high-risk assessments
      switch (assessment.riskLevel) {
  case "Critical":
    priority += 15;
    break;

  case "High":
    priority += 10;
    break;

  case "Moderate":
    priority += 5;
    break;

  case "Low":
  default:
    break;
}

      // Give slightly higher priority to coordination actions
      if (
        item.action.toLowerCase().includes("coordinate") ||
        item.action.toLowerCase().includes("activate")
      ) {
        priority += 5;
      }

      priority = Math.min(priority, 100);

      let urgency: PrioritizedAction["urgency"] = "Low";

      if (priority >= 90) urgency = "Critical";
      else if (priority >= 75) urgency = "High";
      else if (priority >= 60) urgency = "Medium";

      let expectedImpact: PrioritizedAction["expectedImpact"] = "Moderate";

      if (priority >= 90) expectedImpact = "Very High";
      else if (priority >= 75) expectedImpact = "High";
      else if (priority < 60) expectedImpact = "Low";

      return {
        stakeholder: item.stakeholder,
        action: item.action,
        priority,
        urgency,
        expectedImpact,
        responseWindow:
          urgency === "Critical"
            ? "<24 hours"
            : urgency === "High"
            ? "24–48 hours"
            : urgency === "Medium"
            ? "2–5 days"
            : ">5 days",
        reason: `Priority derived from ${assessment.riskLevel.toLowerCase()} operational risk (score ${assessment.riskScore}) and mission assessment.`,
      };
    })
    .sort((a, b) => b.priority - a.priority);
}