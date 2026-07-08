import { getWeather } from "./weather";
import { LOCATIONS } from "./locations";

export type ClimateContext = {
  district: string;
  temperature: number;
  windSpeed: number;
  weatherCode: number;
};

export async function getClimateContext(
  district: keyof typeof LOCATIONS
): Promise<ClimateContext> {
  const location = LOCATIONS[district];

  const weather = await getWeather(
    location.latitude,
    location.longitude
  );

  return {
    district,
    temperature: weather.temperature,
    windSpeed: weather.windSpeed,
    weatherCode: weather.weatherCode,
  };
}