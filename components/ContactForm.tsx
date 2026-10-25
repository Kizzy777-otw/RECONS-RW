"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const emailAddress = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@recons.rw";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Prepare an email draft instead of transmitting form contents to an unconfigured backend.
    const subject = encodeURIComponent(`RECONS inquiry: ${String(formData.get("topic"))}`);
    const body = encodeURIComponent(
      `Name: ${String(formData.get("name"))}\nEmail: ${String(formData.get("email"))}\nPhone: ${String(formData.get("phone") || "Not provided")}\nTopic: ${String(formData.get("topic"))}\n\n${String(formData.get("message"))}`,
    );
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="theme-surface rounded-3xl border border-slate-200 p-6 shadow-soft dark:border-slate-700 sm:p-8">
      {submitted && (
        <p role="status" className="mb-5 flex items-center gap-2 rounded-xl bg-electric-pale p-3 text-sm text-navy">
          <CheckCircle2 size={18} className="text-electric-dark" />
          Your email app is opening with your inquiry ready to send.
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-navy dark:text-slate-100">
          Full name
          <input required name="name" autoComplete="name" className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal text-navy outline-none focus:border-electric dark:border-slate-700 dark:bg-navy dark:text-white" placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy dark:text-slate-100">
          Email address
          <input required name="email" type="email" autoComplete="email" className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal text-navy outline-none focus:border-electric dark:border-slate-700 dark:bg-navy dark:text-white" placeholder="you@example.com" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy dark:text-slate-100">
          Phone number <span className="font-normal text-slate-400">(optional)</span>
          <input name="phone" type="tel" autoComplete="tel" className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal text-navy outline-none focus:border-electric dark:border-slate-700 dark:bg-navy dark:text-white" placeholder="+250 7..." />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy dark:text-slate-100">
          What can we help with?
          <select required name="topic" defaultValue="" className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal text-navy outline-none focus:border-electric dark:border-slate-700 dark:bg-navy dark:text-white">
            <option value="" disabled>Select a service</option>
            <option>Renewable energy & PURE</option>
            <option>Biogas & HomeBiogas</option>
            <option>Water solutions</option>
            <option>Sanitation & waste treatment</option>
            <option>Project management</option>
            <option>Carbon financing</option>
            <option>Other inquiry</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy dark:text-slate-100 sm:col-span-2">
          Tell us about your project
          <textarea required name="message" rows={4} className="resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal text-navy outline-none focus:border-electric dark:border-slate-700 dark:bg-navy dark:text-white" placeholder="A few details will help us get back to you..." />
        </label>
      </div>
      <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3.5 text-sm font-bold text-navy transition hover:bg-electric-dark">
        Prepare inquiry <ArrowUpRight size={17} />
      </button>
      <p className="mt-3 text-xs text-slate-400">Your default email application will open so you can review and send your message.</p>
    </form>
  );
}
