"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signup } from "@/lib/api";
import { setSession } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await signup(name, email, password);
      setSession(data.access_token, data.user);
      router.push("/dashboard");
    } catch {
      setError("Could not create account. Use a valid email and password with at least 6 characters.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <div className="mx-auto max-w-xl rounded-lg border border-line bg-white p-8 shadow-soft">
        <p className="label text-teal">Create workspace access</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Create an account</h1>
        <p className="mt-3 text-sm leading-6 text-muted">Use signup for the portfolio flow, or use demo login if you want instant access.</p>
        <form onSubmit={submit} className="mt-6">
          <label className="block"><span className="label">Name</span><input className="input mt-1" value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label className="mt-4 block"><span className="label">Email</span><input className="input mt-1" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label className="mt-4 block"><span className="label">Password</span><input type="password" className="input mt-1" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          {error ? <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
          <button className="btn-primary mt-5 w-full" disabled={loading}>{loading ? "Creating account..." : "Sign up"}</button>
        </form>
        <p className="mt-5 text-center text-sm text-muted">Need the demo flow? <Link href="/login" className="font-semibold text-teal">Login with demo credentials</Link></p>
      </div>
    </main>
  );
}
