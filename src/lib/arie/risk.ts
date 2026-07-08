export function getRiskIndex(severity: string): number {
  switch (severity) {
    case "Extreme":
      return 95;

    case "High":
      return 81;

    case "Moderate":
      return 60;

    default:
      return 40;
  }
}