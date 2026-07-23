export function generateMissionId() {

  const now = new Date();

  const year = now.getFullYear();

  const random =
    Math.floor(Math.random() * 9000) + 1000;

  return `AAI-${year}-${random}`;

}