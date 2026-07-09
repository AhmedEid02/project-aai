export type SprintMilestoneStatus = "Complete" | "Active" | "Next" | "Planned";

export type SprintMilestone = {
  label: string;
  status: SprintMilestoneStatus;
  dayRange: string;
  focus: string;
};

export const AAI_SPRINT_START_DATE = "2026-07-09T00:00:00+03:00";

/**
 * AAI is managed as a 28-day build sprint.
 * The submission deadline can remain separate if the hackathon gives an extra final day.
 */
export const AAI_SPRINT_TOTAL_DAYS = 28;

export const AAI_SUBMISSION_DEADLINE = "2026-08-06T23:59:59+03:00";

export const aaiSprintMilestones: SprintMilestone[] = [
  {
    label: "Foundation",
    status: "Complete",
    dayRange: "Day 1–3",
    focus: "Architecture, layout, climate API, mission control foundation.",
  },
  {
    label: "ARIE Intelligence Console",
    status: "Complete",
    dayRange: "Day 4–7",
    focus: "Emergency operations console and decision-support interface.",
  },
  {
    label: "Adaptive Risk Intelligence",
    status: "Complete",
    dayRange: "Day 8–11",
    focus: "Risk engine, explainable drivers, decisions, and action packages.",
  },
  {
    label: "Multi-source Climate Fusion",
    status: "Active",
    dayRange: "Day 12–15",
    focus: "Fusion trace, climate-livelihood signals, and field verification logic.",
  },
  {
    label: "AIDA Decision Copilot",
    status: "Next",
    dayRange: "Day 16–19",
    focus: "AI explanation, summarization, translation, and advisory generation.",
  },
  {
    label: "Operational Products",
    status: "Planned",
    dayRange: "Day 20–24",
    focus: "Situation report, community advisory, stakeholder brief, demo outputs.",
  },
  {
    label: "Demo & Deployment",
    status: "Planned",
    dayRange: "Day 25–28",
    focus: "Final polish, deployment, pitch narrative, and hackathon submission.",
  },
];