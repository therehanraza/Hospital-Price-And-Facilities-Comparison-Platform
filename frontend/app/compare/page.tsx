"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Globe2, Search, Sparkles, X } from "lucide-react";
import { api, fetchHospitals } from "@/lib/api";
import type { Hospital } from "@/types";
import { ComparisonTable } from "@/components/compare/ComparisonTable";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { HospitalCard } from "@/components/hospitals/HospitalCard";

export default function ComparePage() {
  const [all, setAll] = useState<Hospital[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [manualSearch, setManualSearch] = useState("");
  const [country, setCountry] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const selected = useMemo(() => all.filter((hospital) => ids.includes(hospital.id)), [all, ids]);
  const countries = useMemo(() => Array.from(new Set(all.map((hospital) => hospital.country))).sort(), [all]);
  const filteredHospitals = useMemo(() => {
    return all.filter((hospital) => {
      const text = `${hospital.name} ${hospital.city} ${hospital.state} ${hospital.country} ${hospital.specialties.join(" ")} ${hospital.facilities.join(" ")}`.toLowerCase();
      return (!manualSearch || text.includes(manualSearch.toLowerCase())) && (!country || hospital.country === country);
    });
  }, [all, manualSearch, country]);

  useEffect(() => {
    fetchHospitals().then((rows) => {
      setAll(rows);
      const saved = localStorage.getItem("hpf_compare_ids");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as string[];
          const valid = parsed.filter((id) => rows.some((hospital) => hospital.id === id)).slice(0, 4);
          if (valid.length >= 2) {
            setIds(valid);
            return;
          }
        } catch {
          localStorage.removeItem("hpf_compare_ids");
        }
      }
      setIds(rows.slice(0, 3).map((hospital) => hospital.id));
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("hpf_compare_ids", JSON.stringify(ids));
    if (ids.length < 2) return;
    setLoadingSummary(true);
    api.post("/api/compare", { hospital_ids: ids, filters_used: {} })
      .then((res) => setSummary(res.data.data.ai_summary))
      .catch(() => api.post("/api/ai/compare", { hospital_ids: ids }).then((res) => setSummary(res.data.data.output)))
      .finally(() => setLoadingSummary(false));
  }, [ids]);

  function setSlot(index: number, value: string) {
    const next = [...ids];
    if (value) next[index] = value;
    else next.splice(index, 1);
    setIds(Array.from(new Set(next)).slice(0, 4));
  }

  function removeHospital(id: string) {
    setIds(ids.filter((item) => item !== id));
  }

  return (
    <main className="page-shell">
      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
          <p className="label text-teal">Hospital comparison</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Compare local or worldwide hospitals side by side.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Select 2 to 4 hospitals from nearby, city or worldwide demo data. The table compares emergency support, diagnostics, facilities, estimated prices, insurance support and official links.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/hospitals" className="btn-secondary"><Building2 size={16} /> Find hospitals</Link>
            <a href="#comparison-table" className="btn-primary">Review comparison <ArrowRight size={16} /></a>
          </div>
        </div>
        <div className="rounded-lg border border-line bg-slate-50 p-6">
          <div className="grid grid-cols-2 gap-3">
            <Metric label="Directory size" value={all.length || "..."} />
            <Metric label="Countries" value={countries.length || "..."} />
            <Metric label="Selected" value={selected.length} />
            <Metric label="AI mode" value="Fallback ready" />
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-line bg-white p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="label">Manual selector</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">Search the directory, then fill comparison slots</h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-md border border-line bg-slate-50 px-3 py-2 text-sm text-slate-600"><Globe2 size={16} /> {filteredHospitals.length} matching hospitals</span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_260px]">
          <label>
            <span className="label">Search name, city, specialty or facility</span>
            <div className="relative mt-1">
              <Search className="pointer-events-none absolute left-3 top-3 text-slate-400" size={16} />
              <input className="input pl-9" value={manualSearch} onChange={(e) => setManualSearch(e.target.value)} placeholder="Delhi, Toronto, ICU, cardiology..." />
            </div>
          </label>
          <label>
            <span className="label">Country</span>
            <select className="input mt-1" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">All countries</option>
              {countries.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((index) => (
            <label key={index} className="rounded-lg border border-line bg-slate-50 p-3">
              <span className="label">Hospital {index + 1}</span>
              <select className="input mt-2 bg-white" value={ids[index] || ""} onChange={(e) => setSlot(index, e.target.value)}>
                <option value="">Select hospital</option>
                {filteredHospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>{hospital.name} - {hospital.city}, {hospital.country}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </section>

      {selected.length ? (
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="label">Selected hospitals</p>
              <h2 className="mt-1 text-xl font-semibold text-ink">Current comparison set</h2>
            </div>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {selected.map((hospital) => (
              <div key={hospital.id} className="relative">
                <button className="absolute right-3 top-3 z-10 rounded-md border border-line bg-white p-2 text-muted shadow-sm hover:text-red-600" onClick={() => removeHospital(hospital.id)} title="Remove hospital">
                  <X size={15} />
                </button>
                <HospitalCard hospital={hospital} selected />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section id="comparison-table" className="mt-6">
        {selected.length >= 2 ? <ComparisonTable hospitals={selected} /> : <div className="surface p-8 text-center text-muted">Select at least two hospitals to compare.</div>}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="card p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="text-teal" size={18} />
            <h2 className="font-semibold">AI comparison summary</h2>
          </div>
          {loadingSummary ? <p className="mt-3 text-sm text-muted">Generating structured comparison...</p> : null}
          {summary ? (
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
              <p>{summary.overallSummary}</p>
              <p><b>Best for affordability:</b> {summary.bestForAffordability}</p>
              <p><b>Best for emergency:</b> {summary.bestForEmergency}</p>
              <p><b>Best for facilities:</b> {summary.bestForFacilities}</p>
              <p><b>Best for diagnostics:</b> {summary.bestForDiagnostics}</p>
            </div>
          ) : null}
        </div>
        <div className="card p-5">
          <h2 className="font-semibold">Confirm directly</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
            {(summary?.thingsToConfirm || ["Current prices", "Insurance network", "Emergency capacity"]).map((item: string) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <div className="mt-6"><Disclaimer /></div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-line bg-white p-4">
      <p className="label">{label}</p>
      <p className="mt-2 text-xl font-semibold text-ink">{value}</p>
    </div>
  );
}
