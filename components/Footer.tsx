import { ArrowUpRight, MapPin } from "lucide-react";
import { Brand } from "@/components/Brand";

export function Footer() {
  return (
    <footer className="grid-pattern relative bg-slate-100 px-5 pb-8 pt-14 text-navy dark:bg-navy dark:text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-slate-200 pb-12 dark:border-white/10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600 dark:text-white/55">
            Practical engineering and clean technology for resilient communities and a sustainable Rwanda.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold">Explore</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-white/60">
            <a href="#services" className="hover:text-electric">Our services</a>
            <a href="#impact" className="hover:text-electric">Our impact</a>
            <a href="#contact" className="hover:text-electric">Contact us</a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold">Find us</h3>
          <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-slate-600 dark:text-white/60">
            <MapPin className="mt-1 shrink-0 text-electric" size={16} />
            Kigali, Rwanda
          </p>
          <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@recons.rw"}`} className="mt-3 inline-flex items-center gap-1 text-sm text-slate-700 hover:text-electric-dark dark:text-white/70 dark:hover:text-electric">
            Get in touch <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-6 text-xs text-slate-500 dark:text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} RECONS Rwanda. All rights reserved.</p>
        <p>Building a future that works for everyone.</p>
      </div>
    </footer>
  );
}
