import type { ArieRiskInput } from "./types";

export const arieScenarios: Record<string, ArieRiskInput> = {
  "gabiley-drought-watch": {
    scenarioId: "gabiley-drought-watch",
    locationName: "Gabiley Agro-Pastoral Zone",
    region: "Maroodi Jeex / Gabiley",
    countryContext: "Somaliland / Somalia",
    livelihoodZone: "Dryland farming and agro-pastoral livelihoods",

    rainfallDeficit: 82,
    temperatureStress: 71,
    waterStress: 78,
    pastureStress: 69,
    marketStress: 58,
    exposure: 74,
    copingPressure: 67,
    coordinationReadiness: 62,
  },

  "togdheer-pastoral-stress": {
    scenarioId: "togdheer-pastoral-stress",
    locationName: "Togdheer Pastoral Corridor",
    region: "Togdheer",
    countryContext: "Somaliland / Somalia",
    livelihoodZone: "Mobile pastoral livelihoods",

    rainfallDeficit: 76,
    temperatureStress: 68,
    waterStress: 81,
    pastureStress: 84,
    marketStress: 63,
    exposure: 79,
    copingPressure: 73,
    coordinationReadiness: 55,
  },
};