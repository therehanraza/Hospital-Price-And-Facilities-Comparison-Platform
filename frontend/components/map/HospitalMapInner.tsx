"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import type { Hospital } from "@/types";
import { inr } from "@/lib/utils";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconAnchor: [12, 41]
});

export default function HospitalMapInner({ hospitals }: { hospitals: Hospital[] }) {
  const center: [number, number] = hospitals.length ? [hospitals[0].latitude, hospitals[0].longitude] : [28.6139, 77.2090];
  return (
    <MapContainer center={center} zoom={10} scrollWheelZoom={false}>
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {hospitals.map((h) => (
        <Marker key={h.id} position={[h.latitude, h.longitude]} icon={icon}>
          <Popup>
            <strong>{h.name}</strong><br />
            {h.city}<br />
            Consultation: {inr(h.estimated_prices.consultation_min)}-{inr(h.estimated_prices.consultation_max)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
