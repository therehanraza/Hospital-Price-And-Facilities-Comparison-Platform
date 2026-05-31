"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { Ambulance, Building2, CheckCircle2, ExternalLink, HeartPulse, MapPin, Plus, ShieldCheck, Star } from "lucide-react";
import type { Hospital } from "@/types";
import { confidenceTone, inr } from "@/lib/utils";

export function HospitalCard({ hospital, onCompare, selected = false }: { hospital: Hospital; onCompare?: (hospital: Hospital) => void; selected?: boolean }) {
  const facilityCount = hospital.facilities.length + hospital.diagnostics.length;
  const price = hospital.estimated_prices;

  return (
    <article className={`overflow-hidden rounded-lg border bg-white shadow-sm transition hover:border-teal/50 hover:shadow-soft ${selected ? "border-teal ring-2 ring-teal/10" : "border-line"}`}>
      <div className="grid gap-0 lg:grid-cols-[1fr_260px]">
        <div className="p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold leading-tight text-ink">{hospital.name}</h3>
                <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${confidenceTone(hospital.data_confidence_score)}`}>
                  {hospital.data_confidence_score}/100 data
                </span>
              </div>
              <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                <MapPin size={15} />
                <span>{hospital.city}, {hospital.country}</span>
                <span className="text-slate-300">|</span>
                <span>{hospital.address}</span>
                {hospital.distance_km ? <><span className="text-slate-300">|</span><b className="font-semibold text-ink">{hospital.distance_km} km away</b></> : null}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-md border border-line bg-slate-50 px-2.5 py-1.5 text-sm font-semibold text-slate-700">
              <Star className="fill-amber-400 text-amber-400" size={15} />
              {hospital.rating}
              <span className="font-normal text-muted">({hospital.review_count})</span>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{hospital.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {hospital.specialties.slice(0, 5).map((s) => <span className="badge" key={s}>{s}</span>)}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Signal icon={<Ambulance size={17} />} label="Emergency" value={hospital.emergency_available ? "Available" : "Confirm"} positive={hospital.emergency_available} />
            <Signal icon={<ShieldCheck size={17} />} label="Cashless" value={hospital.cashless_insurance ? "Supported" : "Confirm"} positive={hospital.cashless_insurance} />
            <Signal icon={<HeartPulse size={17} />} label="Facilities" value={`${facilityCount} listed`} positive={facilityCount >= 6} />
            <Signal icon={<Building2 size={17} />} label="Diagnostics" value={hospital.diagnostics.slice(0, 2).join(", ") || "Confirm"} positive={hospital.diagnostics.length > 0} />
          </div>

          {hospital.ranking_reason ? (
            <p className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600">
              {hospital.ranking_reason}
            </p>
          ) : null}
        </div>

        <div className="border-t border-line bg-slate-50 p-5 lg:border-l lg:border-t-0">
          <p className="label">Estimated price range</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{inr(price.consultation_min)}</p>
          <p className="text-sm text-muted">to {inr(price.consultation_max)} consultation</p>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Private room</dt>
              <dd className="font-medium text-ink">{price.private_room_min ? `${inr(price.private_room_min)}+` : "Confirm"}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">ICU</dt>
              <dd className="font-medium text-ink">{price.icu_min ? `${inr(price.icu_min)}+` : "Confirm"}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">MRI / CT</dt>
              <dd className="font-medium text-ink">{price.mri_min ? `${inr(price.mri_min)}+` : price.ct_scan_min ? `${inr(price.ct_scan_min)}+` : "Confirm"}</dd>
            </div>
          </dl>

          <div className="mt-5 grid gap-2">
            <button onClick={() => onCompare?.(hospital)} className={selected ? "btn-primary w-full" : "btn-secondary w-full"}>
              <Plus size={16} /> {selected ? "Selected" : "Compare"}
            </button>
            <Link href={`/hospitals/${hospital.id}`} className="btn-primary w-full">View details</Link>
            <a href={hospital.website} target="_blank" rel="noreferrer" className="btn-secondary w-full">
              <ExternalLink size={16} /> Official link
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function Signal({ icon, label, value, positive }: { icon: ReactNode; label: string; value: string; positive: boolean }) {
  return (
    <div className="rounded-md border border-line bg-white p-3">
      <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${positive ? "text-teal" : "text-muted"}`}>
        {icon}
        {label}
      </div>
      <p className="mt-1 flex items-center gap-1 text-sm font-medium text-ink">
        {positive ? <CheckCircle2 size={14} className="text-green-600" /> : null}
        {value}
      </p>
    </div>
  );
}
