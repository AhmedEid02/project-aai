import type { ArieAssessment } from "@/lib/arie/types";
import type { ClimateFusionResult } from "@/lib/arie/climate-fusion";

export type AidaBriefMode =
  | "executive"
  | "government"
  | "humanitarian"
  | "community"
  | "somali";

export type AidaScenarioContext = {
  id: string;
  locationName: string;
  region: string;
  countryContext: string;
  livelihoodZone: string;
};

export type AidaBriefInput = {
  generatedAt: string;
  mode: AidaBriefMode;
  scenario: AidaScenarioContext;
  fusion: ClimateFusionResult["fusionSummary"];
  assessment: ArieAssessment;
};

export type AidaBrief = {
  mode: AidaBriefMode;
  title: string;
  audience: string;
  headline: string;
  keyMessage: string;
  recommendedActions: string[];
  evidenceBase: string[];
  fieldVerification: string[];
  communicationChannels: string[];
  closingNote: string;
};