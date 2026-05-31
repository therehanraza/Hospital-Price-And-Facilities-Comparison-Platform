import type { Hospital } from "@/types";
import type { ReactNode } from "react";
import { confidenceTone, inr } from "@/lib/utils";

type Row = {
  section: string;
  label: string;
  value: (hospital: Hospital) => ReactNode;
};

const boolBadge = (value: boolean, yes = "Available", no = "Confirm") => (
  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${value ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"}`}>
    {value ? yes : no}
  </span>
);

export function ComparisonTable({ hospitals }: { hospitals: Hospital[] }) {
  const rows: Row[] = [
    { section: "Location", label: "City / country", value: (h) => `${h.city}, ${h.country}` },
    { section: "Location", label: "Distance", value: (h) => h.distance_km ? `${h.distance_km} km` : "Use location" },
    { section: "Emergency", label: "Emergency", value: (h) => boolBadge(h.emergency_available) },
    { section: "Emergency", label: "Ambulance", value: (h) => boolBadge(h.ambulance_available) },
    { section: "Facilities", label: "ICU", value: (h) => boolBadge(h.facilities.includes("ICU")) },
    { section: "Facilities", label: "Pharmacy", value: (h) => boolBadge(h.facilities.includes("Pharmacy")) },
    { section: "Facilities", label: "Blood bank", value: (h) => boolBadge(h.facilities.includes("Blood Bank")) },
    { section: "Diagnostics", label: "MRI", value: (h) => boolBadge(h.diagnostics.includes("MRI")) },
    { section: "Diagnostics", label: "CT scan", value: (h) => boolBadge(h.diagnostics.includes("CT Scan")) },
    { section: "Diagnostics", label: "Lab tests", value: (h) => boolBadge(h.diagnostics.includes("Lab Tests")) },
    { section: "Insurance", label: "Cashless insurance", value: (h) => boolBadge(h.cashless_insurance, "Supported", "Confirm network") },
    { section: "Clinical scope", label: "Specialties", value: (h) => h.specialties.join(", ") },
    { section: "Estimated prices", label: "Consultation", value: (h) => `${inr(h.estimated_prices.consultation_min)} - ${inr(h.estimated_prices.consultation_max)}` },
    { section: "Estimated prices", label: "Private room", value: (h) => h.estimated_prices.private_room_min ? `${inr(h.estimated_prices.private_room_min)} - ${inr(h.estimated_prices.private_room_max)}` : "Confirm" },
    { section: "Estimated prices", label: "ICU", value: (h) => h.estimated_prices.icu_min ? `${inr(h.estimated_prices.icu_min)} - ${inr(h.estimated_prices.icu_max)}` : "Confirm" },
    { section: "Estimated prices", label: "MRI / CT", value: (h) => h.estimated_prices.mri_min ? `${inr(h.estimated_prices.mri_min)} onward` : h.estimated_prices.ct_scan_min ? `${inr(h.estimated_prices.ct_scan_min)} onward` : "Confirm" },
    { section: "Trust", label: "Website", value: (h) => <a className="font-medium text-teal hover:underline" href={h.website} target="_blank" rel="noreferrer">Open official link</a> },
    { section: "Trust", label: "Data confidence", value: (h) => <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${confidenceTone(h.data_confidence_score)}`}>{h.data_confidence_score}/100</span> }
  ];

  let currentSection = "";

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
      <div className="border-b border-line bg-slate-50 px-5 py-4">
        <p className="label">Comparison table</p>
        <h2 className="mt-1 text-lg font-semibold text-ink">Facilities, prices and trust signals</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-white">
              <th className="sticky left-0 z-10 min-w-48 bg-white px-4 py-4 text-left font-semibold text-ink">Criteria</th>
              {hospitals.map((hospital) => (
                <th key={hospital.id} className="min-w-64 px-4 py-4 text-left align-top">
                  <span className="block font-semibold text-ink">{hospital.name}</span>
                  <span className="mt-1 block text-xs font-normal text-muted">{hospital.city}, {hospital.country}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const showSection = row.section !== currentSection;
              currentSection = row.section;
              return (
                <tr key={`${row.section}-${row.label}`} className="border-b border-line last:border-0">
                  <td className="sticky left-0 z-10 bg-white px-4 py-3 align-top">
                    {showSection ? <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-teal">{row.section}</p> : null}
                    <p className="font-medium text-ink">{row.label}</p>
                  </td>
                  {hospitals.map((hospital) => (
                    <td key={hospital.id} className="px-4 py-3 align-top leading-6 text-slate-700">{row.value(hospital)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
