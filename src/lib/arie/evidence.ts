export function buildEvidence(
  hazard: string,
  severity: string
): string[] {
  const evidence: string[] = [];

  evidence.push(`Hazard identified: ${hazard}`);
  evidence.push(`Severity assessed as ${severity}`);

  if (severity === "High" || severity === "Extreme") {
    evidence.push("High operational impact expected.");
  }

  if (hazard === "Drought") {
    evidence.push("Potential water and pasture shortages.");
  }

  if (hazard === "Flood") {
    evidence.push("Flood-prone infrastructure may be affected.");
  }

  if (hazard === "Heatwave") {
    evidence.push("Heat stress risk for people and livestock.");
  }

  if (hazard === "Desert Locust") {
    evidence.push("Potential crop and pasture damage.");
  }

  if (hazard === "Tropical Cyclone") {
    evidence.push("Strong winds and heavy rainfall expected.");
  }

  return evidence;
}