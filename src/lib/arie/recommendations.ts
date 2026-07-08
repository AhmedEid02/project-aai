export function getRecommendation(hazard: string): string {
  switch (hazard) {
    case "Flood":
      return "Prepare evacuation and protect critical infrastructure.";

    case "Heatwave":
      return "Activate heat-health action plans.";

    case "Desert Locust":
      return "Deploy surveillance and locust control teams.";

    case "Tropical Cyclone":
      return "Prepare evacuation shelters and emergency response.";

    case "Drought":
    default:
      return "Activate drought contingency measures.";
  }
}