import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Sprout,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { ImpactHologram } from "@/components/ImpactHologram";
import { Navbar } from "@/components/Navbar";
import { ServiceCards } from "@/components/ServiceCards";

const metrics = [
  { value: "1,200+", label: "Farmers reached" },
  { value: "45+", label: "Solar pumps deployed" },
  { value: "12,000", unit: "t", label: "CO₂ emissions saved" },
];

export default function HomePage() {
  return (
    <>
      <main>
        <section className="relative min-h-[760px] overflow-hidden bg-[#F8FAFC] text-navy dark:bg-navy-deep dark:text-white">
          <div className="absolute inset-0 grid-pattern opacity-60" />
          <div className="absolute -right-36 top-32 size-[520px] rounded-full bg-electric/10 blur-[100px]" />
          <div className="absolute -bottom-36 left-[30%] size-[420px] rounded-full bg-blue-500/5 blur-[100px] dark:bg-blue-500/10" />
          <Navbar />
          <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-10 px-5 pb-16 pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-28">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-electric-dark dark:text-electric">
                <span className="size-2 rounded-full bg-electric" /> Engineering a resilient Rwanda
              </div>
              <h1 className="text-5xl font-bold leading-[1.06] tracking-[-0.045em] sm:text-6xl lg:text-[4.35rem]">
                Sustainable infrastructure
                <span className="text-electric-dark dark:text-electric"> & clean tech</span>
                {" "}solutions for Rwanda.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 dark:text-white/60">
                We bring practical engineering and proven clean technologies together to create lasting impact for people, businesses and the planet.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-4 text-sm font-bold text-navy transition hover:bg-electric-dark">
                  Start a conversation <ArrowUpRight size={17} />
                </a>
                <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-4 text-sm font-bold text-navy transition hover:border-electric dark:border-white/20 dark:text-white dark:hover:border-white">
                  Discover our services <ArrowRight size={16} />
                </a>
              </div>
              <div className="mt-14 flex items-center gap-4 border-t border-slate-200 pt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:border-white/10 dark:text-white/45">
                <Sprout size={17} className="text-electric-dark dark:text-electric" />
                Local knowledge. Lasting solutions.
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
              <div className="absolute -inset-4 rounded-[2rem] border border-slate-200 dark:border-white/10" />
              <div className="relative overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white/75 p-7 shadow-xl shadow-slate-900/5 dark:border-transparent dark:bg-gradient-to-br dark:from-[#1d2d40] dark:via-[#12253a] dark:to-[#172219] dark:shadow-none sm:p-9">
                <div className="absolute -right-8 -top-8 size-48 rounded-full border border-electric/20" />
                <div className="absolute -right-2 top-0 size-36 rounded-full border border-electric/20" />
                <div className="relative flex min-h-[400px] flex-col justify-between">
                  <ImpactHologram />
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-white/40">Our impact, together</p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-white/70">Progress built on purpose.</p>
                    </div>
                    <span className="grid size-11 place-items-center rounded-full border border-electric/35 text-electric"><span className="size-2 rounded-full bg-electric shadow-[0_0_12px_rgba(97,208,0,.8)]" /></span>
                  </div>
                  <div className="relative z-10 my-8 grid grid-cols-2 gap-3">
                    <div className="col-span-2 rounded-2xl border border-slate-200/80 bg-white/30 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-white/50">
                        <span>Communities reached</span><span>2026</span>
                      </div>
                      <div className="mt-3 text-4xl font-bold">1,200<span className="text-electric">+</span></div>
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"><div className="h-full w-[78%] rounded-full bg-electric" /></div>
                    </div>
                    <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
                      <p className="text-2xl font-bold">45<span className="text-electric-dark dark:text-electric">+</span></p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-white/50">Solar pumps</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
                      <p className="text-2xl font-bold">12k<span className="text-electric-dark dark:text-electric">t</span></p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-white/50">CO₂ avoided</p>
                    </div>
                  </div>
                  <a href="#impact" className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-electric-dark dark:text-electric">See our impact <ArrowDown size={15} /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mx-auto grid max-w-7xl grid-cols-3 border-t border-slate-200 px-5 py-7 dark:border-white/10 lg:px-8">
            {metrics.map((metric) => (
              <div key={metric.label} className="border-r border-slate-200 px-3 last:border-0 dark:border-white/10 sm:px-8">
                <p className="text-2xl font-bold sm:text-3xl">{metric.value}<span className="text-electric-dark dark:text-electric">{metric.unit ?? ""}</span></p>
                <p className="mt-1 text-[10px] text-slate-500 dark:text-white/50 sm:text-xs">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="theme-page px-5 py-24 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-electric-dark">Who we are</p>
              <h2 className="mt-5 max-w-lg text-4xl font-bold leading-tight tracking-tight text-navy dark:text-white sm:text-5xl">
                Better systems create a better future.
              </h2>
            </div>
            <div className="max-w-2xl lg:pt-8">
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                RECONS is a Rwanda-based sustainability and engineering consultancy. We design and deliver infrastructure that improves everyday life—connecting clean energy, water, sanitation and climate finance to the people who need them.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Designed for local realities", "Built for long-term resilience", "Measured by real-world impact", "Delivered with trusted partners"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm font-semibold text-navy dark:text-slate-100"><Check size={17} className="text-electric-dark" /> {item}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="theme-page px-5 py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-electric-dark">What we do</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-navy dark:text-white sm:text-5xl">Explore services. Engineer impact.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">Choose a sector to explore locally grounded solutions, technical capabilities and project outcomes.</p>
            </div>
            <ServiceCards />
          </div>
        </section>

        <section id="impact" className="grid-pattern relative overflow-hidden bg-slate-100 py-24 text-navy dark:bg-navy dark:text-white lg:py-28">
          <div className="absolute -left-20 top-0 size-80 rounded-full bg-electric/10 blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-electric-dark dark:text-electric">Impact that matters</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-navy dark:text-white sm:text-5xl">Progress you can count on.</h2>
              <p className="mt-5 leading-7 text-slate-600 dark:text-white/55">Every project is a step toward healthier communities, stronger livelihoods and a lower-carbon future.</p>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                { value: "1,200+", label: "Farmers reached", detail: "More opportunity for rural families" },
                { value: "45+", label: "Solar water pumps", detail: "Clean water powered by the sun" },
                { value: "12,000", suffix: " t", label: "CO₂ emissions saved", detail: "A measurable climate contribution" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none">
                  <p className="text-5xl font-bold tracking-tight">{item.value}<span className="text-electric-dark dark:text-electric">{item.suffix ?? ""}</span></p>
                  <h3 className="mt-4 text-lg font-bold">{item.label}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-white/50">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="theme-page px-5 py-24 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-electric-dark">Let’s work together</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-navy dark:text-white sm:text-5xl">Have a project in mind?</h2>
              <p className="mt-5 max-w-md leading-7 text-slate-500 dark:text-slate-400">Tell us what you’re working on. Our team will help you explore the right solution for your community or business.</p>
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@recons.rw"}`} className="mt-6 inline-flex items-center gap-2 font-bold text-navy hover:text-electric-dark dark:text-white">
                Email our team <ArrowUpRight size={17} />
              </a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
