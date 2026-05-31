"use client";
import { LocateFixed, RotateCcw, Search } from "lucide-react";

export type FilterState = {
  q: string;
  city: string;
  country: string;
  specialty: string;
  facility: string;
  emergency_available: string;
  cashless_insurance: string;
  max_consultation_price: string;
  max_distance_km: string;
  sort: string;
};

type Props = {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onUseLocation: () => void;
  onReset: () => void;
  onApply: () => void;
  locationActive: boolean;
};

const countries = ["India", "United States", "United Kingdom", "Canada", "Singapore", "United Arab Emirates", "Germany", "Australia", "Japan"];
const specialties = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Gynecology", "Oncology", "Dermatology", "General Medicine"];
const facilities = ["ICU", "MRI", "CT Scan", "Emergency", "Ambulance", "Pharmacy", "Blood Bank", "Parking"];

export function HospitalFilters({ filters, setFilters, onUseLocation, onReset, onApply, locationActive }: Props) {
  const update = (key: keyof FilterState, value: string) => setFilters({ ...filters, [key]: value });

  return (
    <aside className="surface p-5 lg:sticky lg:top-28">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">Refine results</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">Hospital filters</h2>
        </div>
        <button className="rounded-md border border-line p-2 text-muted hover:border-teal hover:text-teal" type="button" onClick={onReset} title="Reset filters">
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="label">Hospital name</span>
          <div className="relative mt-1">
            <Search className="pointer-events-none absolute left-3 top-3 text-slate-400" size={16} />
            <input className="input pl-9" value={filters.q} onChange={(e) => update("q", e.target.value)} placeholder="Search by hospital name" />
          </div>
        </label>

        <label className="block">
          <span className="label">City, region or pincode</span>
          <input className="input mt-1" value={filters.city} onChange={(e) => update("city", e.target.value)} placeholder="Delhi NCR, Noida, London" />
        </label>

        <label className="block">
          <span className="label">Country</span>
          <select className="input mt-1" value={filters.country} onChange={(e) => update("country", e.target.value)}>
            <option value="">Any country</option>
            {countries.map((country) => <option key={country}>{country}</option>)}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="label">Specialty</span>
            <select className="input mt-1" value={filters.specialty} onChange={(e) => update("specialty", e.target.value)}>
              <option value="">Any</option>
              {specialties.map((specialty) => <option key={specialty}>{specialty}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="label">Facility</span>
            <select className="input mt-1" value={filters.facility} onChange={(e) => update("facility", e.target.value)}>
              <option value="">Any</option>
              {facilities.map((facility) => <option key={facility}>{facility}</option>)}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="label">Emergency</span>
            <select className="input mt-1" value={filters.emergency_available} onChange={(e) => update("emergency_available", e.target.value)}>
              <option value="">Either</option>
              <option value="true">Available</option>
              <option value="false">Not marked</option>
            </select>
          </label>
          <label className="block">
            <span className="label">Cashless</span>
            <select className="input mt-1" value={filters.cashless_insurance} onChange={(e) => update("cashless_insurance", e.target.value)}>
              <option value="">Either</option>
              <option value="true">Supported</option>
              <option value="false">Confirm</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="label">Maximum consultation estimate</span>
          <input className="input mt-1" inputMode="numeric" value={filters.max_consultation_price} onChange={(e) => update("max_consultation_price", e.target.value)} placeholder="1000" />
        </label>

        <label className="block">
          <span className="label">Sort results</span>
          <select className="input mt-1" value={filters.sort} onChange={(e) => update("sort", e.target.value)}>
            <option value="best">Best overall match</option>
            <option value="nearest">Nearest</option>
            <option value="lowest_price">Lowest estimated price</option>
            <option value="facility_score">Highest facility score</option>
            <option value="emergency">Emergency support</option>
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-2">
        <button className="btn-primary w-full" type="button" onClick={onApply}>
          <Search size={16} /> Search hospitals
        </button>
        <button className="btn-secondary w-full" type="button" onClick={onUseLocation}>
          <LocateFixed size={16} /> {locationActive ? "Location active" : "Use current location"}
        </button>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-600">
        Location is optional. If it is denied, city, pincode and worldwide manual search continue to work.
      </p>
    </aside>
  );
}
