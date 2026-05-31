"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Search } from "lucide-react";
import { api } from "@/lib/api";
import { HospitalCard } from "@/components/hospitals/HospitalCard";

export default function SavedPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/saved")
      .then((res) => setItems(res.data.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="page-shell">
      <section className="rounded-lg border border-line bg-white p-6 sm:p-8">
        <p className="label text-teal">Saved hospitals</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Review saved options</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">Keep hospitals here while you compare prices, facilities and official links before calling directly.</p>
      </section>

      <div className="mt-6 grid gap-4">
        {loading ? <div className="card p-6 text-slate-600">Loading saved hospitals...</div> : null}
        {!loading && items.length ? items.map((item) => (
          <div key={item.id} className="grid gap-2">
            <HospitalCard hospital={item.hospital} />
            <p className="rounded-md border border-line bg-white px-4 py-3 text-sm text-muted">Note: {item.note || "No note added"}</p>
          </div>
        )) : null}
        {!loading && !items.length ? <EmptySaved /> : null}
      </div>
    </main>
  );
}

function EmptySaved() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-teal/10 text-teal"><Bookmark size={22} /></div>
      <h2 className="mt-4 text-xl font-semibold text-ink">No saved hospitals yet</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">Login, open a hospital profile, and save it for later review. You can still browse hospitals without saving anything.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Link href="/hospitals" className="btn-primary"><Search size={16} /> Find hospitals</Link>
        <Link href="/login" className="btn-secondary">Login</Link>
      </div>
    </div>
  );
}
