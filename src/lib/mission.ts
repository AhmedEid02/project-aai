export type Mission = {
  id: string;
  generatedAt: string;
  location: string;
  hazard: string;
};

export function createMission(
  location: string,
  hazard: string,
): Mission {

  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    now.getDate(),
  ).padStart(2, "0");

  const random = Math.floor(
    Math.random() * 900,
  ) + 100;

  return {

    id: `AAI-${year}${month}${day}-${random}`,

    generatedAt:
      now.toLocaleString(),

    location,

    hazard,

  };

}