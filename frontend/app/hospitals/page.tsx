"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Building2, Globe2, LayoutList, LocateFixed, Map, MapPin, ShieldCheck } from "lucide-react";
import { fetchHospitals } from "@/lib/api";
import type { Hospital } from "@/types";
import { HospitalCard } from "@/components/hospitals/HospitalCard";
import { HospitalFilters, type FilterState } from "@/components/hospitals/HospitalFilters";
import { HospitalMap } from "@/components/map/HospitalMap";

const initialFilters: FilterState = {
  q: "",
  city: "",
  country: "",
  specialty: "",
  facility: "",
  emergency_available: "",
  cashless_insurance: "",
  max_consultation_price: "",
  max_distance_km: "",
  sort: "best"
};

type SearchMode = "nearby" | "city" | "worldwide";

const modes: Array<{ id: SearchMode; title: string; text: string; icon: typeof LocateFixed }> = [
  { id: "nearby", title: "Near me", text: "Use your location to rank hospitals by distance.", icon: LocateFixed },
  { id: "city", title: "Search a city", text: "Find hospitals in a city, region or pincode.", icon: MapPin },
  { id: "worldwide", title: "Worldwide manual", text: "Browse by country and select hospitals manually.", icon: Globe2 }
];

export default function HospitalsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [view, setView] = useState<"list" | "map">("list");
  const [mode, setMode] = useState<SearchMode>("city");
  const [coords, setCoords] = useState<{ latitude?: number; longitude?: number }>({});
  const [compare, setCompare] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const params = useMemo(() => {
    const p: Record<string, string | number | boolean> = { sort: filters.sort };
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "sort") p[key] = value;
    });
    if (filters.emergency_available) p.emergency_available = filters.emergency_available === "true";
    if (filters.cashless_insurance) p.cashless_insurance = filters.cashless_insurance === "true";
    if (mode === "nearby" && coords.latitude) {
      p.latitude = coords.latitude;
      p.longitude = coords.longitude!;
    }
    return p;
  }, [filters, coords, mode]);

  useEffect(() => {
    setLoading(true);
    fetchHospitals(params)
      .then(setHospitals)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params, refreshKey]);

  useEffect(() => {
    const saved = localStorage.getItem("hpf_compare_ids");
    if (!saved) return;
    try {
      const ids = JSON.parse(saved) as string[];
      setCompare(hospitals.filter((hospital) => ids.includes(hospital.id)));
    } catch {
      localStorage.removeItem("hpf_compare_ids");
    }
  }, [hospitals]);

  function useLocation() {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setMode("nearby");
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setFilters({ ...filters, sort: "nearest", city: "", country: "" });
      },
      () => alert("Location permission was not granted. City and worldwide search still work.")
    );
  }

  function addCompare(hospital: Hospital) {
    setCompare((items) => {
      const next = items.find((item) => item.id === hospital.id) ? items.filter((item) => item.id !== hospital.id) : [...items, hospital].slice(0, 4);
      localStorage.setItem("hpf_compare_ids", JSON.stringify(next.map((item) => item.id)));
      return next;
    });
  }

  function switchMode(nextMode: SearchMode) {
    setMode(nextMode);
    if (nextMode === "nearby") {
      setFilters({ ...filters, city: "", country: "", sort: "nearest" });
      return;
    }
    if (nextMode === "city") {
      setCoords({});
      setFilters({ ...filters, country: "India", city: filters.city || "Delhi NCR", sort: "best" });
      return;
    }
    setCoords({});
    setFilters({ ...filters, city: "", country: "", sort: "best" });
  }

  function resetFilters() {
    setCoords({});
    setMode("city");
    setFilters({ ...initialFilters, city: "Delhi NCR", country: "India" });
  }

  const selectedIds = new Set(compare.map((hospital) => hospital.id));
  const countries = new Set(hospitals.map((hospital) => hospital.country));
  const emergencyCount = hospitals.filter((hospital) => hospital.emergency_available).length;

  return (
    <main className="page-shell">
      <section className="overflow-hidden rounded-lg border border-line bg-white">
        <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
          <div className="p-6 sm:p-8">
            <p className="label text-teal">Hospital finder</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Find the right hospital by location, facilities and estimated costs.</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Search nearby hospitals, scan city-wide options, or manually compare hospitals across countries. Every profile keeps the focus on facilities, prices, emergency support and official links.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: "ICU", patch: { facility: "ICU" } },
                { label: "MRI", patch: { facility: "MRI" } },
                { label: "Cashless insurance", patch: { cashless_insurance: "true" } },
                { label: "Emergency", patch: { emergency_available: "true" } },
                { label: "Cardiology", patch: { specialty: "Cardiology" } }
              ].map((item) => (
                <button key={item.label} onClick={() => setFilters({ ...filters, ...item.patch })} className="rounded-full border border-line bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-teal hover:text-teal">
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-line bg-slate-50 p-6 lg:border-l lg:border-t-0">
            <div className="grid grid-cols-2 gap-3">
              <Metric icon={<Building2 size={18} />} label="Hospitals found" value={loading ? "..." : hospitals.length} />
              <Metric icon={<ShieldCheck size={18} />} label="Emergency ready" value={loading ? "..." : emergencyCount} />
              <Metric icon={<Globe2 size={18} />} label="Countries" value={loading ? "..." : countries.size || 1} />
              <Metric icon={<MapPin size={18} />} label="Mode" value={mode === "nearby" ? "Nearby" : mode === "city" ? "City" : "Global"} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-3 md:grid-cols-3">
        {modes.map(({ id, title, text, icon: Icon }) => (
          <button key={id} onClick={() => switchMode(id)} className={`rounded-lg border p-4 text-left transition ${mode === id ? "border-teal bg-teal/5 shadow-sm" : "border-line bg-white hover:border-teal/50"}`}>
            <div className="flex items-start gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${mode === id ? "bg-teal text-white" : "bg-slate-100 text-slate-600"}`}>
                <Icon size={19} />
              </span>
              <span>
                <span className="block font-semibold text-ink">{title}</span>
                <span className="mt-1 block text-sm leading-5 text-slate-600">{text}</span>
              </span>
            </div>
          </button>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
        <HospitalFilters filters={filters} setFilters={setFilters} onUseLocation={useLocation} onReset={resetFilters} onApply={() => setRefreshKey((value) => value + 1)} locationActive={Boolean(coords.latitude)} />

        <div className="min-w-0">
          <div className="surface mb-4 flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">{loading ? "Searching hospitals..." : `${hospitals.length} hospitals found`}</p>
              <p className="mt-1 text-sm text-muted">
                {mode === "nearby" && !coords.latitude ? "Use current location to calculate distance, or switch to city search." : "Sorted by your selected discovery mode and filters."}
              </p>
            </div>
            <div className="flex gap-2">
              <button className={view === "list" ? "btn-primary" : "btn-secondary"} onClick={() => setView("list")}><LayoutList size={16} /> List</button>
              <button className={view === "map" ? "btn-primary" : "btn-secondary"} onClick={() => setView("map")}><Map size={16} /> Map</button>
            </div>
          </div>

          {compare.length ? (
            <div className="mb-4 rounded-lg border border-teal/30 bg-teal/5 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-teal">{compare.length} selected for comparison</p>
                  <p className="mt-1 text-sm text-slate-700">{compare.map((hospital) => hospital.name).join(", ")}</p>
                </div>
                <Link href="/compare" className="btn-primary">Open comparison</Link>
              </div>
            </div>
          ) : null}

          {view === "map" ? (
            <div className="overflow-hidden rounded-lg border border-line bg-white p-3">
              <HospitalMap hospitals={hospitals} />
            </div>
          ) : (
            <div className="grid gap-4">
              {hospitals.map((hospital) => (
                <HospitalCard key={hospital.id} hospital={hospital} onCompare={addCompare} selected={selectedIds.has(hospital.id)} />
              ))}
              {!loading && hospitals.length === 0 ? (
                <div className="surface p-8 text-center">
                  <h2 className="text-lg font-semibold">No hospitals match these filters</h2>
                  <p className="mt-2 text-sm text-muted">Try clearing the price, facility or location filter.</p>
                  <button className="btn-secondary mt-4" onClick={resetFilters}>Reset filters</button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-line bg-white p-4">
      <div className="flex items-center gap-2 text-muted">{icon}<span className="text-xs font-semibold uppercase tracking-wide">{label}</span></div>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}
