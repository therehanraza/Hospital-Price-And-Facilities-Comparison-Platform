"use client";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import { Ambulance, ExternalLink, Heart, MapPin, Plus, ShieldCheck, Sparkles } from "lucide-react";
import { api, fetchHospital } from "@/lib/api";
import type { Hospital } from "@/types";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { confidenceTone, inr } from "@/lib/utils";

export default function HospitalDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    fetchHospital(id).then((item) => {
      setHospital(item);
      api.post(`/api/ai/hospital-summary/${item.id}`).then((res) => setSummary(res.data.data.output));
    });
  }, [id]);

  async function save() {
    if (!hospital) return;
    try {
      await api.post(`/api/saved/${hospital.id}`, { note: "Saved from detail page" });
      alert("Hospital saved.");
    } catch {
      alert("Please login before saving hospitals.");
    }
  }

  function addToCompare() {
    if (!hospital) return;
    const raw = localStorage.getItem("hpf_compare_ids");
    const existing = raw ? JSON.parse(raw) as string[] : [];
    const next = Array.from(new Set([...existing, hospital.id])).slice(0, 4);
    localStorage.setItem("hpf_compare_ids", JSON.stringify(next));
    router.push("/compare");
  }

  if (!hospital) return <main className="page-shell">Loading hospital...</main>;

  const prices = hospital.estimated_prices;

  return (
    <main className="page-shell">
      <section className="overflow-hidden rounded-lg border border-line bg-white">
        <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
          <div className="p-6 sm:p-8">
            <p className="label text-teal">{hospital.city}, {hospital.country}</p>
            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{hospital.name}</h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{hospital.description}</p>
              </div>
              <span className={`h-fit rounded-full border px-3 py-1 text-sm font-semibold ${confidenceTone(hospital.data_confidence_score)}`}>
                {hospital.data_confidence_score}/100 data confidence
              </span>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted"><MapPin size={16} /> {hospital.address}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {hospital.specialties.map((item) => <span className="badge" key={item}>{item}</span>)}
            </div>
          </div>
          <aside className="border-t border-line bg-slate-50 p-6 lg:border-l lg:border-t-0">
            <div className="grid gap-3">
              <Signal icon={<Ambulance size={18} />} label="Emergency" value={hospital.emergency_available ? "Available" : "Confirm"} />
              <Signal icon={<ShieldCheck size={18} />} label="Cashless insurance" value={hospital.cashless_insurance ? "Supported" : "Confirm network"} />
              <Price label="Consultation" value={`${inr(prices.consultation_min)} - ${inr(prices.consultation_max)}`} />
            </div>
            <div className="mt-5 grid gap-2">
              <button onClick={addToCompare} className="btn-primary"><Plus size={16} /> Add to comparison</button>
              <button onClick={save} className="btn-secondary"><Heart size={16} /> Save hospital</button>
              <a href={hospital.website} target="_blank" rel="noreferrer" className="btn-secondary"><ExternalLink size={16} /> Visit official website</a>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="card p-5">
            <h2 className="text-xl font-semibold">Facilities and diagnostics</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Section title="Facilities" items={hospital.facilities} />
              <Section title="Diagnostics" items={hospital.diagnostics} />
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-xl font-semibold">Estimated price ranges</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <Price label="General ward" value={`${inr(prices.general_ward_min)} - ${inr(prices.general_ward_max)}`} />
              <Price label="Private room" value={`${inr(prices.private_room_min)} - ${inr(prices.private_room_max)}`} />
              <Price label="ICU" value={prices.icu_min ? `${inr(prices.icu_min)} - ${inr(prices.icu_max)}` : "Confirm"} />
              <Price label="MRI" value={prices.mri_min ? `${inr(prices.mri_min)} - ${inr(prices.mri_max)}` : "Confirm"} />
              <Price label="CT scan" value={prices.ct_scan_min ? `${inr(prices.ct_scan_min)} - ${inr(prices.ct_scan_max)}` : "Confirm"} />
              <Price label="Blood tests" value={`${inr(prices.blood_test_min)} - ${inr(prices.blood_test_max)}`} />
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="text-teal" size={18} />
              <h2 className="font-semibold">AI hospital summary</h2>
            </div>
            {summary ? (
              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
                <p>{summary.summary}</p>
                <List title="Strengths" items={summary.strengths} />
                <List title="Limitations" items={summary.limitations} />
                <List title="Confirm directly" items={summary.thingsToConfirm} />
              </div>
            ) : <p className="mt-3 text-sm text-muted">Generating structured summary...</p>}
          </div>

          <div className="card p-5">
            <h2 className="font-semibold">Profile details</h2>
            <div className="mt-4 space-y-3 text-sm">
              <Info label="Phone" value={hospital.phone} />
              <Info label="Last updated" value={hospital.last_updated} />
              <Info label="Source note" value={hospital.data_source_note} />
            </div>
          </div>
        </aside>
      </section>

      <div className="mt-6"><Disclaimer /></div>
    </main>
  );
}

function Signal({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="rounded-md border border-line bg-white p-4"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal">{icon}{label}</div><p className="mt-2 font-semibold text-ink">{value}</p></div>;
}
function Price({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-line bg-white p-4"><p className="label">{label}</p><p className="mt-2 font-semibold text-ink">{value}</p></div>;
}
function Info({ label, value }: { label: string; value: string }) {
  return <div><p className="label">{label}</p><p className="mt-1 text-slate-700">{value}</p></div>;
}
function Section({ title, items }: { title: string; items: string[] }) {
  return <div><p className="label">{title}</p><div className="mt-3 flex flex-wrap gap-2">{items.map((item) => <span className="badge" key={item}>{item}</span>)}</div></div>;
}
function List({ title, items }: { title: string; items: string[] }) {
  return <div><p className="font-medium text-ink">{title}</p><ul className="mt-1 list-disc space-y-1 pl-5">{items?.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}
