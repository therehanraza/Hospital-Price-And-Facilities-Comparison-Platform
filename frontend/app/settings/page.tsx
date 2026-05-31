import { AlertTriangle, CheckCircle2, Server, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { API_URL } from "@/lib/api";

export default function SettingsPage() {
  return (
    <main className="page-shell">
      <section className="rounded-lg border border-line bg-white p-6 sm:p-8">
        <p className="label text-teal">System settings</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">AI and free-tier configuration</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">This page explains how the deployed demo remains functional without paid services or exposed API keys.</p>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Setting icon={<Server size={18} />} label="API URL" value={API_URL} />
        <Setting icon={<Sparkles size={18} />} label="Current AI provider" value="Gemini when configured, Mock AI fallback otherwise" />
        <Setting icon={<Sparkles size={18} />} label="Main Gemini model" value="gemini-3-flash-preview" />
        <Setting icon={<Sparkles size={18} />} label="Fallback Gemini model" value="gemini-2.5-flash-lite" />
        <Setting icon={<CheckCircle2 size={18} />} label="GEMINI_API_KEY visibility" value="Backend-only environment variable. The frontend never exposes it." />
        <Setting icon={<CheckCircle2 size={18} />} label="Maps" value="Leaflet with OpenStreetMap tiles, no paid Google Maps dependency." />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="font-semibold">Fallback logic</h2>
          <p className="mt-2 leading-7 text-slate-600">The app uses Gemini API when available. If the Gemini API key is missing, unavailable, or rate-limited, the system automatically falls back to Mock AI so the deployed demo remains functional and free.</p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-center gap-2 font-semibold text-amber-900"><AlertTriangle size={18} /> Free-tier note</div>
          <p className="mt-2 leading-7 text-amber-900">Frontend: Vercel Hobby. Backend: Render free Python web service. Database: MongoDB Atlas M0. AI: Gemini free tier with Mock AI fallback. Maps: Leaflet + OpenStreetMap. Code hosting: GitHub free.</p>
        </div>
      </div>
    </main>
  );
}

function Setting({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 text-teal">{icon}<p className="label">{label}</p></div>
      <p className="mt-3 text-sm font-medium leading-6 text-ink">{value}</p>
    </div>
  );
}
