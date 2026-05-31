"use client";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function DashboardCharts({ stats }: { stats: any }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-5"><h3 className="font-semibold">Hospitals by specialty</h3><div className="mt-4 h-72"><ResponsiveContainer><BarChart data={stats.specialty_chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis /><Tooltip /><Bar dataKey="count" fill="#0F766E" /></BarChart></ResponsiveContainer></div></div>
      <div className="card p-5"><h3 className="font-semibold">Price range distribution</h3><div className="mt-4 h-72"><ResponsiveContainer><BarChart data={stats.price_distribution}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="range" /><YAxis /><Tooltip /><Bar dataKey="count" fill="#2563EB" /></BarChart></ResponsiveContainer></div></div>
      <div className="card p-5"><h3 className="font-semibold">Facilities availability</h3><div className="mt-4 h-72"><ResponsiveContainer><BarChart data={stats.facilities_availability}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis /><Tooltip /><Bar dataKey="count" fill="#16A34A" /></BarChart></ResponsiveContainer></div></div>
      <div className="card p-5"><h3 className="font-semibold">Comparisons over time</h3><div className="mt-4 h-72"><ResponsiveContainer><LineChart data={stats.comparisons_over_time}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Line dataKey="count" stroke="#F59E0B" strokeWidth={2} /></LineChart></ResponsiveContainer></div></div>
    </div>
  );
}
