import { generateMissionId } from "./mission-id";
import type {
  OperationalReport,
  ReportSection,
} from "./types";

import type { Assessment } from "@/lib/intelligence";

export function buildSituationReport(
  assessment: Assessment,
): OperationalReport {

  const sections: ReportSection[] = [

    {
      title: "Executive Summary",

      content:
        assessment.summary,
    },

    {
      title: "Operational Risk",

      content:
`Risk Level: ${assessment.riskLevel}
Risk Score: ${assessment.riskScore}/100
Confidence: ${assessment.confidence}%`,
    },

    {
      title: "Recommended Decision",

      content:
        assessment.recommendedDecision,
    },

    {
      title: "Priority Actions",

      content:
        assessment.actions
          .map(
            (a) =>
              `• ${a.stakeholder}: ${a.action}`,
          )
          .join("\n"),
    },

    {
      title: "Evidence",

      content:
        assessment.evidence
          .map(
            (e) =>
              `• ${e.source} (${e.confidence})`,
          )
          .join("\n"),
    },

  ];

  return {

    type: "situation-report",

    title:
      "AAI Situation Report",

    audience:
      "Government and Humanitarian Partners",

    metadata: {

      missionId:
        generateMissionId(),

      generatedAt:
        new Date().toISOString(),

      generatedBy:
        "Adaptive Action Intelligence",

      version:
        "Prototype v1.0",

    },

    sections,

  };

}