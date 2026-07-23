export type ReportType =
  | "situation-report"
  | "early-action-bulletin"
  | "government-brief"
  | "humanitarian-note"
  | "community-advisory"
  | "somali-advisory";

export interface ReportMetadata {
  missionId: string;
  generatedAt: string;
  generatedBy: string;
  version: string;
}

export interface ReportSection {
  title: string;
  content: string;
}

export interface OperationalReport {
  type: ReportType;

  title: string;

  audience: string;

  metadata: ReportMetadata;

  sections: ReportSection[];
}