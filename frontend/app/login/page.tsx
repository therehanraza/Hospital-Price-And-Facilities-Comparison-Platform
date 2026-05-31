"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Building2, CheckCircle2, ShieldCheck } from "lucide-react";
import { login } from "@/lib/api";
import { setSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginWith(nextEmail: string, nextPassword: string) {
    setLoading(true);
    setError("");
    try {
      const data = await login(nextEmail, nextPassword);
      setSession(data.access_token, data.user);
      router.push("/dashboard");
    } catch {
      setError("Login failed. Make sure the backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await loginWith(email, password);
  }

  return (
    <main className="page-shell">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-lg border border-line bg-white shadow-soft lg:grid-cols-[1fr_420px]">
        <section className="bg-slate-50 p-8">
          <p className="label text-teal">Demo workspace</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Sign in to compare, save and manage hospital data.</h1>
          <p className="mt-4 leading-7 text-slate-600">Use the demo accounts to test the full product flow without setting up external authentication.</p>
          <div className="mt-8 grid gap-4">
            <Feature icon={<Building2 size={18} />} title="User demo" text="Search hospitals, save profiles and compare facilities." />
            <Feature icon={<ShieldCheck size={18} />} title="Admin demo" text="Open the admin area and edit hospital data." />
            <Feature icon={<CheckCircle2 size={18} />} title="Free-tier safe" text="Works with seeded data and Mock AI fallback." />
          </div>
        </section>
        <form onSubmit={submit} className="p-8">
          <h2 className="text-2xl font-semibold">Login</h2>
          <p className="mt-2 text-sm text-muted">Demo credentials are prefilled. You can switch roles below.</p>
          <label className="mt-6 block"><span className="label">Email</span><input className="input mt-1" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label className="mt-4 block"><span className="label">Password</span><input type="password" className="input mt-1" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          {error ? <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
          <button className="btn-primary mt-5 w-full" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button type="button" className="btn-secondary w-full" onClick={() => loginWith("user@example.com", "password123")} disabled={loading}>Demo user</button>
            <button type="button" className="btn-secondary w-full" onClick={() => loginWith("admin@example.com", "password123")} disabled={loading}>Demo admin</button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <div className="flex items-center gap-2 font-semibold text-ink">{icon}{title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
