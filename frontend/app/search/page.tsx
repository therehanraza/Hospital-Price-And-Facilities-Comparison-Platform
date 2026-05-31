"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import type { Hospital } from "@/types";
import { HospitalCard } from "@/components/hospitals/HospitalCard";

export default function SmartSearchPage() {
  const [query, setQuery] = useState("Need a nearby hospital with ICU, cardiology, MRI, cashless insurance and consultation under 1000.");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  async function search() {
    setLoading(true);
    try {
      const res = await api.post("/api/ai/smart-search", { query });
      setResult(res.data.data);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="page-shell">
      <div><p className="label">AI smart search</p><h1 className="mt-2 text-3xl font-semibold">Turn plain language into hospital filters</h1><p className="mt-2 text-slate-600">This is a search assistant, not a chatbot. It extracts facilities, specialties, budget and support needs.</p></div>
      <div className="card mt-6 p-5">
        <label><span className="label">Search need</span><textarea className="input mt-1 min-h-28" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
        <button onClick={search} className="btn-primary mt-4">{loading ? "Searching..." : "Interpret and search"}</button>
      </div>
      {result ? <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]"><aside className="card p-5"><h2 className="font-semibold">Interpreted filters</h2><pre className="mt-3 whitespace-pre-wrap rounded-md bg-slate-950 p-4 text-xs text-slate-100">{JSON.stringify(result.interpretedFilters, null, 2)}</pre><p className="mt-3 text-sm text-slate-600">{result.searchExplanation}</p></aside><section className="grid gap-4">{result.hospitals.map((h: Hospital) => <HospitalCard key={h.id} hospital={h} />)}</section></div> : null}
    </main>
  );
}
