"use client";

import { useState } from "react";
import type { Incident } from "@/lib/intelligence";

type IncidentFormProps = {
  onAnalyze: (incident: Incident) => void;
};

export default function IncidentForm({
  onAnalyze,
}: IncidentFormProps) {
  const [incident, setIncident] = useState<Incident>({
    hazard: "Drought",
    country: "Somalia",
    region: "Somaliland",
    district: "Gabiley",
    severity: "High",
    forecastWindow: "7 Days",
  });

  const updateField = (
    field: keyof Incident,
    value: string,
  ) => {
    setIncident({
      ...incident,
      [field]: value,
    } as Incident);
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">
        Current Incident
      </h2>

      <p className="mt-2 text-slate-500">
        Define the current hazard to generate an AI-powered Mission Brief.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {/* Hazard */}

        <div>
          <label className="mb-2 block font-medium">
            Hazard
          </label>

          <select
            className="w-full rounded-lg border p-3"
            value={incident.hazard}
            onChange={(e) =>
              updateField("hazard", e.target.value)
            }
          >
            <option>Drought</option>
            <option>Flood</option>
            <option>Heatwave</option>
            <option>Desert Locust</option>
            <option>Tropical Cyclone</option>
          </select>
        </div>

        {/* Country */}

        <div>
          <label className="mb-2 block font-medium">
            Country
          </label>

          <select
            className="w-full rounded-lg border p-3"
            value={incident.country}
            onChange={(e) =>
              updateField("country", e.target.value)
            }
          >
            <option>Somalia</option>
            <option>Kenya</option>
            <option>Ethiopia</option>
            <option>Djibouti</option>
            <option>Uganda</option>
            <option>South Sudan</option>
          </select>
        </div>

        {/* Region */}

        <div>
          <label className="mb-2 block font-medium">
            Region / State
          </label>

          <input
            className="w-full rounded-lg border p-3"
            value={incident.region}
            onChange={(e) =>
              updateField("region", e.target.value)
            }
          />
        </div>

        {/* District */}

        <div>
          <label className="mb-2 block font-medium">
            District
          </label>

          <select
            className="w-full rounded-lg border p-3"
            value={incident.district}
            onChange={(e) =>
              updateField("district", e.target.value)
            }
          >
            <option>Gabiley</option>
            <option>Hargeisa</option>
            <option>Borama</option>
            <option>Burao</option>
            <option>Berbera</option>
          </select>
        </div>

        {/* Severity */}

        <div>
          <label className="mb-2 block font-medium">
            Severity
          </label>

          <select
            className="w-full rounded-lg border p-3"
            value={incident.severity}
            onChange={(e) =>
              updateField("severity", e.target.value)
            }
          >
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
            <option>Extreme</option>
          </select>
        </div>

        {/* Forecast Window */}

        <div>
          <label className="mb-2 block font-medium">
            Forecast Window
          </label>

          <select
            className="w-full rounded-lg border p-3"
            value={incident.forecastWindow}
            onChange={(e) =>
              updateField("forecastWindow", e.target.value)
            }
          >
            <option>24 Hours</option>
            <option>72 Hours</option>
            <option>7 Days</option>
            <option>14 Days</option>
          </select>
        </div>

      </div>

      <button
        onClick={() => onAnalyze(incident)}
        className="mt-10 rounded-xl bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
      >
        Analyze Situation
      </button>
    </div>
  );
}