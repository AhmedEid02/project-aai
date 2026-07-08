export function getPriorityActions(hazard: string): string[] {
  switch (hazard) {
    case "Flood":
      return [
        "Issue evacuation alerts",
        "Deploy rescue teams",
        "Inspect bridges",
        "Protect health facilities",
      ];

    case "Heatwave":
      return [
        "Open cooling centers",
        "Warn vulnerable populations",
        "Increase water distribution",
        "Monitor hospitals",
      ];

    case "Desert Locust":
      return [
        "Verify infestations",
        "Deploy control teams",
        "Monitor crop damage",
        "Notify farmers",
      ];

    case "Tropical Cyclone":
      return [
        "Open evacuation shelters",
        "Protect infrastructure",
        "Deploy emergency teams",
        "Monitor coastal communities",
      ];

    case "Drought":
    default:
      return [
        "Activate drought committee",
        "Monitor water sources",
        "Support livestock",
        "Issue community advisories",
      ];
  }
}