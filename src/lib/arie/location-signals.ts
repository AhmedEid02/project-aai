import type { ArieRiskInput } from "./types";

export type LocationSignalProfile = {
  scenarioId: string;
  latitude: number;
  longitude: number;
  adminLevel: string;
  dominantLivelihood: string;
  seasonalConcern: string;
  exposedGroups: string[];
  lastMileChannels: string[];
  fieldVerificationNeeds: string[];
};

export const locationSignalProfiles: Record<string, LocationSignalProfile> = {
  "gabiley-drought-watch": {
    scenarioId: "gabiley-drought-watch",
    latitude: 9.7009,
    longitude: 43.6244,
    adminLevel: "District / agro-pastoral monitoring zone",
    dominantLivelihood: "Dryland farming and agro-pastoral livelihoods",
    seasonalConcern:
      "Erratic rainfall, delayed planting decisions, water stress, and crop failure risk.",
    exposedGroups: [
      "Smallholder farmers",
      "Women farmers",
      "Agro-pastoral households",
      "Youth climate messengers",
    ],
    lastMileChannels: [
      "Local radio",
      "WhatsApp groups",
      "Extension workers",
      "Community elders",
      "Farmer groups",
    ],
    fieldVerificationNeeds: [
      "Rainfall received in the last 7–14 days",
      "Soil moisture condition",
      "Water-point pressure",
      "Crop planting status",
      "Local market price movement",
    ],
  },

  "togdheer-pastoral-stress": {
    scenarioId: "togdheer-pastoral-stress",
    latitude: 9.5333,
    longitude: 45.5333,
    adminLevel: "Regional pastoral corridor",
    dominantLivelihood: "Mobile pastoral livelihoods",
    seasonalConcern:
      "Pasture decline, livestock movement pressure, water scarcity, and market stress.",
    exposedGroups: [
      "Pastoral households",
      "Mobile herders",
      "Women-headed households",
      "Livestock-dependent traders",
    ],
    lastMileChannels: [
      "Pastoral movement networks",
      "Radio",
      "Community elders",
      "Water committee contacts",
      "WhatsApp alerts",
    ],
    fieldVerificationNeeds: [
      "Pasture condition",
      "Livestock body condition",
      "Water trucking demand",
      "Borehole congestion",
      "Movement toward alternative grazing areas",
    ],
  },
};

export function getLocationSignalProfile(
  scenario: ArieRiskInput,
): LocationSignalProfile {
  return (
    locationSignalProfiles[scenario.scenarioId] ?? {
      scenarioId: scenario.scenarioId,
      latitude: 0,
      longitude: 0,
      adminLevel: "Unknown operational area",
      dominantLivelihood: scenario.livelihoodZone,
      seasonalConcern:
        "Climate-sensitive livelihood stress requiring field verification.",
      exposedGroups: ["Climate-exposed households"],
      lastMileChannels: ["Community channels"],
      fieldVerificationNeeds: [
        "Rainfall condition",
        "Water availability",
        "Livelihood stress",
      ],
    }
  );
}