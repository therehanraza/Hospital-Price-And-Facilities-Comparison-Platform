"use client";
import { useEffect, useState } from "react";
import { api, fetchHospitals } from "@/lib/api";
import type { Hospital } from "@/types";
import { inr } from "@/lib/utils";

const basePrices = {
  consultation_min: 500, consultation_max: 1000,
  general_ward_min: 1500, general_ward_max: 3500,
  private_room_min: 4500, private_room_max: 8500,
  icu_min: 8000, icu_max: 16000,
  mri_min: 4500, mri_max: 8500,
  ct_scan_min: 2500, ct_scan_max: 6500,
  blood_test_min: 300, blood_test_max: 1500
};

export default function AdminPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selected, setSelected] = useState<Hospital | null>(null);
  const [form, setForm] = useState<any>({
    name: "", description: "", address: "", city: "", state: "Delhi NCR", pincode: "", latitude: 28.6139, longitude: 77.2090,
    phone: "", website: "", emergency_available: true, ambulance_available: true, cashless_insurance: true,
    specialties: "General Medicine", facilities: "Emergency, ICU, Pharmacy", diagnostics: "Lab Tests", services: "OPD Consultation, Diagnostics",
    estimated_prices: basePrices, rating: 4.1, review_count: 100, data_confidence_score: 80, data_source_note: "Demo data for portfolio project. Verify details directly with hospital.", last_updated: "2026-05-01"
  });
  function load() { fetchHospitals().then(setHospitals); }
  useEffect(load, []);
  function edit(h: Hospital) {
    setSelected(h);
    setForm({ ...h, specialties: h.specialties.join(", "), facilities: h.facilities.join(", "), diagnostics: h.diagnostics.join(", "), services: h.services.join(", ") });
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form, specialties: split(form.specialties), facilities: split(form.facilities), diagnostics: split(form.diagnostics), services: split(form.services), latitude: Number(form.latitude), longitude: Number(form.longitude), rating: Number(form.rating), review_count: Number(form.review_count), data_confidence_score: Number(form.data_confidence_score) };
    if (selected) await api.patch(`/api/hospitals/${selected.id}`, payload);
    else await api.post("/api/hospitals", payload);
    setSelected(null);
    load();
  }
  async function remove(id: string) {
    if (confirm("Delete this hospital from demo data?")) { await api.delete(`/api/hospitals/${id}`); load(); }
  }
  return (
    <main className="page-shell">
      <div><p className="label">Admin hospital data</p><h1 className="mt-2 text-3xl font-semibold">Manage hospital profiles</h1><p className="mt-2 text-slate-600">Add facilities, services, estimated prices, website links, coordinates, source notes and confidence scores.</p></div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[420px_1fr]">
        <form onSubmit={submit} className="card p-5">
          <h2 className="font-semibold">{selected ? "Edit hospital" : "Add hospital"}</h2>
          <Field label="Name" value={form.name} set={(v) => setForm({ ...form, name: v })} />
          <Field label="Description" value={form.description} set={(v) => setForm({ ...form, description: v })} />
          <Field label="Address" value={form.address} set={(v) => setForm({ ...form, address: v })} />
          <div className="grid grid-cols-2 gap-3"><Field label="City" value={form.city} set={(v) => setForm({ ...form, city: v })} /><Field label="Pincode" value={form.pincode} set={(v) => setForm({ ...form, pincode: v })} /></div>
          <div className="grid grid-cols-2 gap-3"><Field label="Latitude" value={String(form.latitude)} set={(v) => setForm({ ...form, latitude: v })} /><Field label="Longitude" value={String(form.longitude)} set={(v) => setForm({ ...form, longitude: v })} /></div>
          <Field label="Website" value={form.website} set={(v) => setForm({ ...form, website: v })} />
          <Field label="Phone" value={form.phone} set={(v) => setForm({ ...form, phone: v })} />
          <Field label="Specialties" value={form.specialties} set={(v) => setForm({ ...form, specialties: v })} />
          <Field label="Facilities" value={form.facilities} set={(v) => setForm({ ...form, facilities: v })} />
          <Field label="Diagnostics" value={form.diagnostics} set={(v) => setForm({ ...form, diagnostics: v })} />
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm"><label><input type="checkbox" checked={form.emergency_available} onChange={(e) => setForm({ ...form, emergency_available: e.target.checked })} /> Emergency</label><label><input type="checkbox" checked={form.ambulance_available} onChange={(e) => setForm({ ...form, ambulance_available: e.target.checked })} /> Ambulance</label><label><input type="checkbox" checked={form.cashless_insurance} onChange={(e) => setForm({ ...form, cashless_insurance: e.target.checked })} /> Cashless</label></div>
          <button className="btn-primary mt-5 w-full">{selected ? "Update hospital" : "Add hospital"}</button>
        </form>
        <section className="card overflow-hidden">
          <div className="border-b border-line bg-slate-50 px-5 py-3 font-semibold">Hospital records</div>
          <div className="divide-y divide-line">{hospitals.map((h) => <div key={h.id} className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"><div><p className="font-medium">{h.name}</p><p className="text-sm text-muted">{h.city} | {h.facilities.slice(0, 3).join(", ")} | {inr(h.estimated_prices.consultation_min)} onward</p></div><div className="flex gap-2"><button onClick={() => edit(h)} className="btn-secondary">Edit</button><button onClick={() => remove(h.id)} className="btn-secondary text-red-700">Delete</button></div></div>)}</div>
        </section>
      </div>
    </main>
  );
}

function split(value: string) { return value.split(",").map((x) => x.trim()).filter(Boolean); }
function Field({ label, value, set }: { label: string; value: string; set: (value: string) => void }) { return <label className="mt-3 block"><span className="label">{label}</span><input className="input mt-1" value={value} onChange={(e) => set(e.target.value)} /></label>; }
