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
export function buildOperationalProducts(
  assessment: Assessment,
): OperationalReport[] {

  const situation = buildSituationReport(assessment);

  const government: OperationalReport = {
    ...situation,
    type: "government-brief",
    title: "Government Action Note",
    audience: "Government Decision Makers",
    sections: [
      {
        title: "Decision Required",
        content: assessment.recommendedDecision,
      },
      {
        title: "Priority Coordination",
        content:
          "Activate district coordination mechanisms and allocate resources according to the current operational risk.",
      },
      {
        title: "Operational Risk",
        content: `Risk Level: ${assessment.riskLevel} (${assessment.riskScore}/100)`,
      },
    ],
  };

  const humanitarian: OperationalReport = {
    ...situation,
    type: "humanitarian-note",
    title: "Humanitarian Coordination Note",
    audience: "Humanitarian Partners",
    sections: [
      {
        title: "Priority Humanitarian Actions",
        content: assessment.actions
          .map(a => `• ${a.stakeholder}: ${a.action}`)
          .join("\n"),
      },
      {
        title: "Evidence Summary",
        content: assessment.evidence
          .map(e => `• ${e.source}`)
          .join("\n"),
      },
    ],
  };

  const community: OperationalReport = {
    ...situation,
    type: "community-advisory",
    title: "Community Advisory",
    audience: "Communities",
    sections: [
      {
        title: "What is happening?",
        content: assessment.summary,
      },
      {
        title: "What should you do?",
        content:
          "Monitor local conditions, conserve available water resources, protect livestock where applicable, and follow official advisories.",
      },
    ],
  };

  const somali: OperationalReport = {
    ...situation,
    type: "somali-advisory",
    title: "Somali Last-Mile Advisory",
    audience: "Communities",
    sections: [
      {
        title: "Fariin Bulsho",
        content:
          "Khatartu hadda waa " +
          assessment.riskLevel.toLowerCase() +
          ". La soco digniinaha rasmiga ah, ilaali biyaha, kana diyaar garow tallaabooyinka hore.",
      },
    ],
  };

  return [
    situation,
    government,
    humanitarian,
    community,
    somali,
  ];
}