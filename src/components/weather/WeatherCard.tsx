"use client";

import { useEffect, useState } from "react";
import {
  CloudSun,
  Loader2,
  MapPin,
  RadioTower,
  Thermometer,
  Wind,
} from "lucide-react";

import { getWeather, type WeatherData } from "@/lib/weather";
import { LOCATIONS } from "@/lib/locations";

type Props = {
  district: keyof typeof LOCATIONS;
};

export default function WeatherCard({ district }: Props) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const location = LOCATIONS[district];

        const data = await getWeather(location.latitude, location.longitude);

        if (isMounted) {
          setWeather(data);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setErrorMessage("Live weather signal is temporarily unavailable.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      isMounted = false;
    };
  }, [district]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Loader2 className="h-4 w-4 animate-spin text-cyan-600" />
          Loading live weather signal
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Fetching current local conditions for situation awareness.
        </p>
      </div>
    );
  }

  if (errorMessage || !weather) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-red-700">
          <RadioTower className="h-4 w-4" />
          Weather signal unavailable
        </div>

        <p className="mt-2 text-sm leading-6 text-red-600">
          {errorMessage ??
            "Unable to load current weather conditions for this district."}
        </p>
      </div>
    );
  }

  const condition = describeWeatherCode(weather.weatherCode);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
            <RadioTower className="h-4 w-4" />
            Live Weather Signal
          </div>

          <h3 className="mt-2 text-lg font-bold text-slate-900">
            {district} District
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Current local conditions for situation awareness.
          </p>
        </div>

        <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-700">
          <CloudSun className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <WeatherMetric
          icon={<MapPin className="h-4 w-4" />}
          label="Monitoring area"
          value={`${district}, Somaliland`}
        />

        <WeatherMetric
          icon={<Thermometer className="h-4 w-4" />}
          label="Temperature"
          value={`${weather.temperature} °C`}
        />

        <WeatherMetric
          icon={<Wind className="h-4 w-4" />}
          label="Wind speed"
          value={`${weather.windSpeed} km/h`}
        />

        <WeatherMetric
          icon={<CloudSun className="h-4 w-4" />}
          label="Sky condition"
          value={condition}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-cyan-100 bg-cyan-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
          Operational use
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-700">
          This live signal supports local situation awareness. ARIE still uses
          climate-livelihood stress, exposure, coping pressure, and coordination
          readiness for final early-action decisions.
        </p>
      </div>
    </div>
  );
}

function WeatherMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span className="text-cyan-700">{icon}</span>
        {label}
      </div>

      <div className="text-right text-sm font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}

function describeWeatherCode(code: number) {
  if (code === 0) return "Clear sky / stable signal";
  if ([1, 2, 3].includes(code)) return "Partly cloudy conditions";
  if ([45, 48].includes(code)) return "Fog or low visibility";
  if ([51, 53, 55].includes(code)) return "Light drizzle";
  if ([61, 63, 65].includes(code)) return "Rainfall signal";
  if ([80, 81, 82].includes(code)) return "Rain showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorm risk";

  return "Weather signal received";
}