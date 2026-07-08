"use client";

import { useEffect, useState } from "react";
import { getWeather, WeatherData } from "@/lib/weather";
import { LOCATIONS } from "@/lib/locations";

type Props = {
  district: keyof typeof LOCATIONS;
};

export default function WeatherCard({
  district,
}: Props) {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  useEffect(() => {
    async function loadWeather() {
      try {
        const location = LOCATIONS[district];

        const data = await getWeather(
          location.latitude,
          location.longitude
        );

        setWeather(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadWeather();
  }, [district]);

  if (!weather) {
    return (
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        Loading live weather...
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold">
        Live Weather
      </h3>

      <div className="mt-4 space-y-2 text-sm">
        <p>📍 {district}</p>
        <p>🌡 {weather.temperature} °C</p>
        <p>💨 {weather.windSpeed} km/h</p>
        <p>🌦 Code: {weather.weatherCode}</p>
      </div>
    </div>
  );
}