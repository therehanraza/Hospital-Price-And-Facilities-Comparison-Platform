import { disclaimer } from "@/lib/utils";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-muted sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="font-semibold text-ink">CareCompare</p>
          <p className="mt-3 max-w-4xl leading-6">{disclaimer}</p>
          <p className="mt-3 leading-6">Built for free-tier deployment: Vercel, Render, MongoDB Atlas M0, Gemini free tier with Mock AI fallback, and OpenStreetMap.</p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:justify-self-end">
          <FooterGroup title="Product" links={[["Hospitals", "/hospitals"], ["Compare", "/compare"], ["Smart Search", "/search"]]} />
          <FooterGroup title="Workspace" links={[["Dashboard", "/dashboard"], ["Saved", "/saved"], ["Admin", "/admin"]]} />
          <FooterGroup title="System" links={[["Settings", "/settings"], ["Login", "/login"], ["Sign up", "/signup"]]} />
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <p className="font-semibold text-ink">{title}</p>
      <div className="mt-3 grid gap-2">
        {links.map(([label, href]) => <Link key={href} href={href} className="hover:text-teal">{label}</Link>)}
      </div>
    </div>
  );
}
