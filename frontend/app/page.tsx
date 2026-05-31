import Link from "next/link";
import { BarChart3, CheckCircle2, MapPinned, ShieldCheck, SlidersHorizontal, Stethoscope } from "lucide-react";
import { Disclaimer } from "@/components/ui/Disclaimer";

const features = [
  ["Nearby discovery", "Find hospitals by current location, city or pincode without paid map APIs.", MapPinned],
  ["Estimated prices", "Compare OPD, room, ICU and diagnostics price ranges in one view.", BarChart3],
  ["Facilities clarity", "Check ICU, emergency, ambulance, pharmacy, blood bank, MRI and CT availability.", CheckCircle2],
  ["Specialty filters", "Filter by cardiology, neurology, orthopedics, pediatrics, gynecology and more.", Stethoscope],
  ["Smart search", "Turn plain language needs into practical filters with Gemini or Mock AI fallback.", SlidersHorizontal],
  ["Trust signals", "Data confidence scores show how complete each hospital profile is.", ShieldCheck]
];

export default function LandingPage() {
  return (
    <main>
      <section className="border-b border-line bg-white">
        <div className="page-shell grid min-h-[520px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="label text-teal">Hospital discovery and cost transparency</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">Compare nearby hospitals by facilities, estimated prices, specialties, and emergency support.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">CareCompare helps users understand what services a hospital offers, what price range to expect, and which details should be confirmed directly before making a visit.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/hospitals" className="btn-primary">Find Nearby Hospitals</Link>
              <Link href="/compare" className="btn-secondary">Compare Hospitals</Link>
            </div>
          </div>
          <div className="rounded-lg border border-line bg-slate-50 p-5">
            <div className="grid gap-3">
              {["Emergency + ICU available", "Consultation estimate Rs 500-Rs 1,200", "MRI, CT Scan, Lab Tests", "Cashless insurance: confirm network"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm">
                  <span className="text-sm font-medium text-slate-700">{item}</span><CheckCircle2 className="text-teal" size={18} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="page-shell grid gap-6 md:grid-cols-3">
        <div><p className="label">The problem</p><h2 className="mt-2 text-2xl font-semibold">Hospital information is scattered.</h2><p className="mt-3 text-slate-600">Users often jump between maps, websites, calls and insurance lists just to understand basic facility and cost information.</p></div>
        <div><p className="label">The solution</p><h2 className="mt-2 text-2xl font-semibold">One practical comparison workspace.</h2><p className="mt-3 text-slate-600">Search nearby hospitals, compare estimated prices, inspect facilities, save options and review AI-generated summaries.</p></div>
        <div><p className="label">Free-tier ready</p><h2 className="mt-2 text-2xl font-semibold">Built without paid services.</h2><p className="mt-3 text-slate-600">OpenStreetMap, Vercel, Render, MongoDB Atlas M0, Gemini free tier and a Mock AI fallback keep the demo deployable.</p></div>
      </section>
      <section className="bg-white">
        <div className="page-shell">
          <h2 className="text-2xl font-semibold">Key features</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, text, Icon]) => <div key={title as string} className="card p-5"><Icon className="text-teal" size={22} /><h3 className="mt-4 font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text as string}</p></div>)}
          </div>
        </div>
      </section>
      <section className="page-shell grid gap-6 lg:grid-cols-2">
        <div className="card p-6"><h2 className="text-2xl font-semibold">How it works</h2><div className="mt-5 space-y-4 text-sm text-slate-700"><p><b>1.</b> Search by location, city, specialty or facility.</p><p><b>2.</b> Review hospital profiles with price ranges and confidence scores.</p><p><b>3.</b> Compare 2 to 4 hospitals side by side and read a structured AI summary.</p></div></div>
        <div className="card overflow-hidden"><div className="border-b border-line bg-slate-50 px-5 py-3 font-semibold">Comparison preview</div><div className="grid grid-cols-3 divide-x divide-line text-sm"><div className="p-4 font-medium">Criteria</div><div className="p-4 font-medium">MetroCare</div><div className="p-4 font-medium">Janak Community</div><div className="p-4">Emergency</div><div className="p-4">Yes</div><div className="p-4">Yes</div><div className="p-4">MRI</div><div className="p-4">Yes</div><div className="p-4">No</div><div className="p-4">Consultation</div><div className="p-4">Rs 700-Rs 1,300</div><div className="p-4">Rs 350-Rs 800</div></div></div>
      </section>
      <section className="page-shell"><Disclaimer /></section>
      <section className="border-t border-line bg-white"><div className="page-shell flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"><div><h2 className="text-2xl font-semibold">Start with seeded Delhi NCR demo hospitals.</h2><p className="mt-2 text-slate-600">Use demo login, explore real workflows, then connect MongoDB Atlas for deployment.</p></div><Link href="/hospitals" className="btn-primary">Explore hospitals</Link></div></section>
    </main>
  );
}
