"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Brand } from "@/components/Brand";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const password = new FormData(event.currentTarget).get("password");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(result.error ?? "Unable to sign in.");
        return;
      }
      window.location.reload();
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="theme-page relative grid min-h-screen lg:grid-cols-[1fr_1fr]">
      <section className="relative hidden overflow-hidden bg-navy-deep p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative"><Brand inverse /></div>
        <div className="relative max-w-lg">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-electric">Team workspace</p>
          <h1 className="mt-5 text-5xl font-bold leading-tight">Better support. Stronger communities.</h1>
          <p className="mt-5 leading-7 text-white/55">Manage farmer support and keep every service conversation moving forward.</p>
        </div>
        <p className="relative text-xs text-white/35">RECONS Rwanda · Internal access</p>
      </section>
      <section className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="mb-12 flex items-center justify-between lg:hidden"><Brand /><ThemeToggle /></div>
          <div className="hidden justify-end lg:flex"><ThemeToggle /></div>
          <a href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-navy dark:text-slate-400 dark:hover:text-white"><ArrowLeft size={16} /> Back to website</a>
          <div className="mt-10 grid size-12 place-items-center rounded-2xl bg-electric-pale text-electric-dark"><LockKeyhole size={23} /></div>
          <h2 className="mt-6 text-3xl font-bold text-navy dark:text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sign in to the RECONS operations portal.</p>
          <form onSubmit={submit} className="mt-8">
            <label className="grid gap-2 text-sm font-semibold text-navy dark:text-slate-100">
              Admin password
              <input name="password" type="password" required autoComplete="current-password" className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-navy outline-none focus:border-electric dark:border-slate-700 dark:bg-navy-card dark:text-white" placeholder="Enter your password" />
            </label>
            {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
            <button disabled={loading} className="mt-5 w-full rounded-xl bg-navy px-5 py-3.5 text-sm font-bold text-white transition hover:bg-electric-dark disabled:opacity-60">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-xs leading-5 text-slate-400">Access is restricted to authorized RECONS team members. Contact your administrator if you need an account.</p>
        </div>
      </section>
    </main>
  );
}
