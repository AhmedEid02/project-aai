"use client";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
const missionMarker = L.divIcon({
  html: `
    <div style="
      width:18px;
      height:18px;
      background:#06b6d4;
      border:3px solid white;
      border-radius:50%;
      box-shadow:0 0 10px rgba(6,182,212,.55);
    "></div>
  `,
  className: "",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export default function PriorityActionMap() {
  return (
    <div className="rounded-2xl overflow-hidden border shadow-sm">
      <MapContainer
        center={[9.55, 43.65]}
        zoom={8}
        style={{ height: "420px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
  position={[9.55, 43.65]}
  icon={missionMarker}
>
          <Popup>
  <div className="space-y-1">
    <h3 className="font-semibold">
      Gabiley District
    </h3>

    <p>
      <strong>Hazard:</strong> Meteorological Drought
    </p>

    <p>
      <strong>Status:</strong> Early Action Activated
    </p>

    <p>
      <strong>Adaptive Risk Index:</strong> 81 / 100
    </p>
  </div>
</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}