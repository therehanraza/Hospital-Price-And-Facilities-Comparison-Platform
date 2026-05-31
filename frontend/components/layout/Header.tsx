"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, LogOut, Search } from "lucide-react";
import { getUser, logout } from "@/lib/auth";
import { useEffect, useState } from "react";
import type { User } from "@/types";

const nav = [
  ["Dashboard", "/dashboard"],
  ["Hospitals", "/hospitals"],
  ["Compare", "/compare"],
  ["Smart Search", "/search"],
  ["Saved", "/saved"],
  ["Admin", "/admin"],
  ["Settings", "/settings"]
];

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    const syncUser = () => setUser(getUser());
    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("hpf-session", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("hpf-session", syncUser);
    };
  }, []);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-teal text-white"><Activity size={19} /></span>
          <span className="hidden sm:block">
            <span className="block whitespace-nowrap leading-4">CareCompare</span>
            <span className="block whitespace-nowrap text-[11px] font-medium text-muted">Hospital cost and facilities</span>
          </span>
        </Link>
        <Link href="/hospitals" className="hidden w-64 shrink items-center gap-2 rounded-md border border-line bg-slate-50 px-3 py-2 text-sm text-muted 2xl:flex">
          <Search size={16} />
          <span className="truncate">Search hospitals, cities, facilities</span>
        </Link>
        <nav className="hidden min-w-0 items-center gap-0.5 lg:flex">
          {nav.map(([label, href]) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
            return (
              <Link key={href} href={href} className={`whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition ${active ? "bg-teal/10 text-teal" : "text-slate-600 hover:bg-slate-100 hover:text-ink"}`}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm text-muted sm:inline">{user.name}</span>
              <button onClick={logout} className="btn-secondary px-3" title="Logout"><LogOut size={16} /></button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary whitespace-nowrap">Login</Link>
              <Link href="/signup" className="btn-primary whitespace-nowrap">Sign up</Link>
            </>
          )}
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-line px-4 py-2 lg:hidden">
        {nav.map(([label, href]) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
          return <Link key={href} href={href} className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium ${active ? "bg-teal/10 text-teal" : "text-slate-600"}`}>{label}</Link>;
        })}
      </nav>
    </header>
  );
}
