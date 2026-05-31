"use client";
import dynamic from "next/dynamic";
import type { Hospital } from "@/types";

const MapInner = dynamic(() => import("./HospitalMapInner"), { ssr: false, loading: () => <div className="card grid min-h-[460px] place-items-center p-6 text-muted">Loading map...</div> });

export function HospitalMap({ hospitals }: { hospitals: Hospital[] }) {
  return <MapInner hospitals={hospitals} />;
}
