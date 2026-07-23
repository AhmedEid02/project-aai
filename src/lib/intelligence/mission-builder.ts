import type {
  Assessment,
  MissionBrief,
} from "./types";

export function buildMissionBrief(
  assessment: Assessment,
): MissionBrief {

  return {

    title:
      `${assessment.incident.hazard} Mission Brief`,

    summary:
      assessment.summary,

    missionStatus:
      assessment.operationalStatus,

    recommendation:
      assessment.recommendedDecision,

  };

}