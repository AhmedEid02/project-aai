import { getWeather } from "./weather";
import { LOCATIONS } from "./locations";

export type ClimateContext = {
  district: string;

  current: {
    temperature: number;
    windSpeed: number;
    weatherCode: number;
  };

  indicators: {
    rainfallAnomaly: number;
    temperatureAnomaly: number;
    vegetationStress: number;
    waterStress: "Low" | "Moderate" | "High" | "Critical";
  };

  forecast: {
    confidence: number;
    droughtTrend: "Improving" | "Stable" | "Worsening";
  };

  metadata: {
    updatedAt: string;
    sources: string[];
  };
};

export async function getClimateContext(
  district: keyof typeof LOCATIONS
): Promise<ClimateContext> {
  const location = LOCATIONS[district];

  const weather = await getWeather(
    location.latitude,
    location.longitude
  );

  const rainfallAnomaly =
  weather.weatherCode >= 60 ? 15 : -35;

const temperatureAnomaly =
  Number((weather.temperature - 28).toFixed(1));

const vegetationStress =
  Number(
    Math.min(
      Math.max(
        Math.abs(rainfallAnomaly) / 100,
        0.15
      ),
      0.95
    ).toFixed(2)
  );

let waterStress:
  ClimateContext["indicators"]["waterStress"] = "Low";

if (rainfallAnomaly <= -30)
  waterStress = "High";

if (rainfallAnomaly <= -50)
  waterStress = "Critical";

return {
  district,

  current: {
    temperature: weather.temperature,
    windSpeed: weather.windSpeed,
    weatherCode: weather.weatherCode,
  },

  indicators: {
    rainfallAnomaly,
    temperatureAnomaly,
    vegetationStress,
    waterStress,
  },

  forecast: {
    confidence: 91,
    droughtTrend:
      rainfallAnomaly < 0
        ? "Worsening"
        : "Stable",
  },

  metadata: {
    updatedAt: new Date().toISOString(),
    sources: [
      "Open-Meteo",
      "NASA POWER",
      "CHIRPS (planned)",
      "ICPAC (planned)",
    ],
  },
};
}