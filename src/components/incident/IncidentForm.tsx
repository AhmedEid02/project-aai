"use client";

import { useState } from "react";

type IncidentData = {
  hazard: string;
  country: string;
  region: string;
  district: string;
  severity: string;
  forecastWindow: string;
};

type IncidentFormProps = {
  onAnalyze: (incident: IncidentData) => void;
};

export default function IncidentForm({
  onAnalyze,
}: IncidentFormProps) {
  const [incident, setIncident] = useState<IncidentData>({
    hazard: "Drought",
    country: "Somalia",
    region: "Somaliland",
    district: "Gabiley",
    severity: "High",
    forecastWindow: "7 Days",
  });

  const updateField = (
    field: keyof IncidentData,
    value: string
  ) => {
    setIncident({
      ...incident,
      [field]: value,
    });
  };

  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm w-full max-w-4xl">
      <h2 className="text-2xl font-bold">
        Current Incident
      </h2>

      <p className="mt-2 text-slate-500">
        Define the current hazard to generate an AI-powered Mission Brief.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div>
          <label className="block mb-2 font-medium">
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

        <div>
          <label className="block mb-2 font-medium">
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

        <div>

          <div>
  <label className="block mb-2 font-medium">
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
        </div>


        <div>
          <label className="block mb-2 font-medium">
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

        <div>
          <label className="block mb-2 font-medium">
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
        className="mt-10 rounded-xl bg-slate-900 px-6 py-3 text-white hover:bg-slate-800"
      >
        Analyze Situation
      </button>
    </div>
  );
}