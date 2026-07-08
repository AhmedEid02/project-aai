"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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

        <Marker position={[9.55, 43.65]}>
          <Popup>
            <strong>Gabiley District</strong>
            <br />
            Mission Status: Early Action
            <br />
            Adaptive Risk Index: 81
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}