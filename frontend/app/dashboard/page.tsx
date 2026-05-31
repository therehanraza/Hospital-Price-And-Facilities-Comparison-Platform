"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { StatCard } from "@/components/ui/StatCard";
import { DashboardCharts } from "@/components/charts/DashboardCharts";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => { api.get("/api/dashboard/stats").then((res) => setStats(res.data.data)); }, []);
  if (!stats) return <main className="page-shell">Loading dashboard...</main>;
  return (
    <main className="page-shell">
      <div><p className="label">Analytics</p><h1 className="mt-2 text-3xl font-semibold">Hospital data dashboard</h1><p className="mt-2 text-slate-600">A recruiter-friendly view of coverage, pricing, facilities and comparison activity.</p></div>
      <div className="mt-6 grid gap-4 md:grid-cols-4"><StatCard label="Total hospitals" value={stats.total_hospitals} /><StatCard label="Emergency support" value={stats.emergency_hospitals} /><StatCard label="Cashless insurance" value={stats.cashless_hospitals} /><StatCard label="Avg consultation" value={`Rs ${stats.average_consultation_price}`} /></div>
      <div className="mt-6"><DashboardCharts stats={stats} /></div>
    </main>
  );
}
