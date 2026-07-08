export function buildSummary(
  hazard: string,
  district: string
): string {
  return `High ${hazard.toLowerCase()} risk is expected in ${district}. Early preparedness measures should begin immediately.`;
}