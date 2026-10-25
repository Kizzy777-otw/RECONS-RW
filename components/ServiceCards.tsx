"use client";

import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Droplets,
  Flame,
  Gauge,
  Handshake,
  Image as ImageIcon,
  Leaf,
  MapPinned,
  Recycle,
  Sun,
  Waves,
  type LucideIcon,
} from "lucide-react";

type ServiceDetail = {
  tab: string;
  title: string;
  name: string;
  location: string;
  description: string;
  metrics: [{ value: string; label: string }, { value: string; label: string }];
  features: string[];
  image: string;
};

function makePlaceholderImage(title: string) {
  // Escape the label before inserting it into SVG markup, then encode the SVG as a data URL.
  const safeTitle = title.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    };
    return entities[character];
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#0B1220"/>
        <stop offset="1" stop-color="#223149"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" fill="none" stroke="#94A3B8" stroke-opacity=".14"/>
      </pattern>
    </defs>
    <rect width="800" height="600" fill="url(#background)"/>
    <rect width="800" height="600" fill="url(#grid)"/>
    <circle cx="400" cy="250" r="92" fill="#61D000" fill-opacity=".08" stroke="#61D000" stroke-opacity=".6" stroke-width="3"/>
    <rect x="354" y="204" width="92" height="76" rx="12" fill="none" stroke="#DCE6F2" stroke-opacity=".8" stroke-width="5"/>
    <circle cx="382" cy="229" r="8" fill="#61D000"/>
    <path d="m364 267 23-23 18 16 14-14 18 21" fill="none" stroke="#61D000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
    <text x="400" y="390" fill="#CBD5E1" fill-opacity=".85" font-family="Arial,sans-serif" font-size="24" letter-spacing="4" text-anchor="middle">${safeTitle.toUpperCase()}</text>
    <text x="400" y="430" fill="#94A3B8" font-family="Arial,sans-serif" font-size="16" letter-spacing="3" text-anchor="middle">SERVICE IMAGE</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const services: ServiceDetail[] = [
  {
    tab: "PURE",
    title: "Productive Use of Renewable Energy",
    name: "Accelerating Agri-PURE & Regenerative Agriculture in Rwanda",
    location: "Kirehe · Eastern Province",
    description: "We connect clean energy with rural value chains—replacing costly diesel pumps with off-grid solar irrigation, adding solar-powered cold storage to reduce post-harvest horticultural losses, and integrating biodigesters for more resilient rural livelihoods.",
    metrics: [{ value: "35%", label: "Higher crop yield potential" }, { value: "0", label: "Diesel emissions" }],
    features: ["Off-grid solar irrigation systems", "Solar cold-chain storage & milk chillers", "Solar agro-processing & milling"],
    image: makePlaceholderImage("Productive Use of Renewable Energy"),
  },
  {
    tab: "Biogas",
    title: "Biogas & HomeBiogas Partnership",
    name: "Turning everyday organic waste into lasting value",
    location: "Farmer households · Rwanda",
    description: "Household biodigesters transform organic waste into dependable cooking fuel and nutrient-rich bio-slurry. We support the complete journey, from right-fit system selection to farmer onboarding and after-installation support.",
    metrics: [{ value: "2-in-1", label: "Clean fuel + bio-fertilizer" }, { value: "24/7", label: "Reliable household energy" }],
    features: ["HomeBiogas system planning", "Farmer onboarding & aftercare", "Organic waste-to-energy solutions"],
    image: makePlaceholderImage("Biogas & HomeBiogas Partnership"),
  },
  {
    tab: "Groundwater",
    title: "Ground Water Exploration",
    name: "Finding groundwater with confidence",
    location: "Site-led · Rwanda",
    description: "Our teams combine site assessment, geophysical investigation and engineering judgement to help clients identify viable groundwater resources and plan responsible, resilient water supply.",
    metrics: [{ value: "360°", label: "Site-to-source assessment" }, { value: "1st", label: "Evidence-led site selection" }],
    features: ["Hydrogeological reconnaissance", "Geophysical survey coordination", "Borehole siting & technical advice"],
    image: makePlaceholderImage("Ground Water Exploration"),
  },
  {
    tab: "Tanking",
    title: "Tanking Solutions",
    name: "Reliable water storage, built around your needs",
    location: "Communities · Institutions · Enterprise",
    description: "We plan practical storage systems that balance capacity, site conditions and long-term operations, helping communities and businesses protect access to water when it matters.",
    metrics: [{ value: "24/7", label: "Water security planning" }, { value: "Right-fit", label: "Storage designed for demand" }],
    features: ["Storage capacity assessments", "Tank selection & installation planning", "Distribution and system integration"],
    image: makePlaceholderImage("Tanking Solutions"),
  },
  {
    tab: "Solar pumping",
    title: "Solar Water Pumping",
    name: "Powering dependable water with the sun",
    location: "Farms · Schools · Communities",
    description: "Right-sized solar pumping systems reduce dependence on fuel and grid power, bringing reliable water to farms, institutions and rural communities across Rwanda.",
    metrics: [{ value: "45+", label: "Solar pumps deployed" }, { value: "0", label: "Diesel needed to pump" }],
    features: ["Solar pump sizing & system design", "Irrigation and community water supply", "Installation oversight & operator handover"],
    image: makePlaceholderImage("Solar Water Pumping"),
  },
  {
    tab: "RO desalination",
    title: "RO Water Desalination",
    name: "Making more water sources usable",
    location: "Water treatment · Rwanda",
    description: "Reverse-osmosis treatment is carefully matched to source-water quality and demand, with an emphasis on safe operation, efficient use and practical maintenance.",
    metrics: [{ value: "Right-fit", label: "Treatment by water quality" }, { value: "Safe", label: "Designed for water quality" }],
    features: ["Source-water assessment", "RO system selection & process design", "Operations and maintenance planning"],
    image: makePlaceholderImage("RO Water Desalination"),
  },
  {
    tab: "Sanitation",
    title: "Fecal Sludge Treatment Plants",
    name: "Building safer, circular sanitation systems",
    location: "Urban & peri-urban Rwanda",
    description: "We support sanitation infrastructure that protects public health and local waterways while exploring responsible resource recovery from treated waste.",
    metrics: [{ value: "Safe", label: "End-to-end sanitation planning" }, { value: "Circular", label: "Resource recovery considered" }],
    features: ["Treatment process & capacity planning", "Environmental and public-health safeguards", "Resource recovery assessment"],
    image: makePlaceholderImage("Fecal Sludge Treatment Plants"),
  },
  {
    tab: "Project delivery",
    title: "Project Management",
    name: "From a clear plan to a well-delivered project",
    location: "Across every project stage",
    description: "Experienced coordination helps keep technical projects focused, transparent and on track—from early feasibility and procurement through construction and handover.",
    metrics: [{ value: "360°", label: "Project lifecycle oversight" }, { value: "On track", label: "Coordinated project delivery" }],
    features: ["Feasibility & implementation planning", "Delivery, schedule & quality oversight", "Commissioning and handover support"],
    image: makePlaceholderImage("Project Management"),
  },
  {
    tab: "Carbon finance",
    title: "Carbon Financing",
    name: "Connecting climate results to new opportunity",
    location: "Climate action · Rwanda",
    description: "We help turn credible emissions reductions into well-documented climate outcomes, aligning project design, impact measurement and carbon-finance pathways.",
    metrics: [{ value: "12,000 t", label: "CO₂ impact showcased" }, { value: "Measurable", label: "Climate outcomes documented" }],
    features: ["Carbon project opportunity screening", "Impact measurement & documentation", "Carbon finance pathway advisory"],
    image: makePlaceholderImage("Carbon Financing"),
  },
];

const icons: LucideIcon[] = [Sun, Flame, MapPinned, Gauge, Droplets, Waves, Recycle, Handshake, Leaf];

export function ServiceCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeService = services[activeIndex];
  const Icon = icons[activeIndex];
  const isPure = activeIndex === 0;

  function selectTab(index: number) {
    setActiveIndex(index);
    // Keep keyboard focus on the newly selected tab as the tab panel changes.
    requestAnimationFrame(() => tabRefs.current[index]?.focus());
  }

  return (
    <div>
      <div role="tablist" aria-label="Explore RECONS services" className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
        {services.map((service, index) => (
          <button
            key={service.tab}
            ref={(element) => { tabRefs.current[index] = element; }}
            id={`service-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls="service-panel"
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => {
              // Implement the standard arrow/Home/End tab navigation for keyboard users.
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                selectTab((activeIndex + 1) % services.length);
              } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                selectTab((activeIndex - 1 + services.length) % services.length);
              } else if (event.key === "Home") {
                event.preventDefault();
                selectTab(0);
              } else if (event.key === "End") {
                event.preventDefault();
                selectTab(services.length - 1);
              }
            }}
            className={`theme-tab group relative isolate flex min-h-[112px] flex-col items-start justify-between overflow-hidden rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-electric/70 sm:min-h-[126px] sm:p-5 ${activeIndex === index ? "border-electric/70" : "border-slate-200 dark:border-slate-700"}`}
            style={{ backgroundColor: "var(--panel-soft)" }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 z-0 scale-110 bg-cover bg-center blur-[5px] transition-transform duration-300 group-hover:scale-125"
              style={{ backgroundImage: `url("${service.image}")` }}
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-white/80 dark:bg-navy/75" />
            {activeIndex === index && <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-electric/10" />}
            <span className="relative z-10 flex h-full w-full flex-col items-start justify-between">
              <span className="flex w-full items-center justify-between">
                <span className={`grid size-9 place-items-center rounded-xl transition ${activeIndex === index ? "bg-electric text-navy" : "bg-electric-pale text-electric-dark dark:bg-electric/10 dark:text-electric"}`}>
                  {(() => {
                    const ServiceIcon = icons[index];
                    return <ServiceIcon size={18} strokeWidth={1.9} />;
                  })()}
                </span>
                <span className="font-mono text-[10px] text-slate-400">{String(index + 1).padStart(2, "0")}</span>
              </span>
              <span className={`mt-3 text-sm font-bold leading-snug ${activeIndex === index ? "text-navy dark:text-white" : "text-slate-700 dark:text-slate-200"}`}>{service.title}</span>
              <span className={`mt-2 h-0.5 w-8 rounded-full transition-all ${activeIndex === index ? "w-12 bg-electric" : "bg-slate-200 group-hover:w-12 group-hover:bg-electric dark:bg-slate-600"}`} />
            </span>
          </button>
        ))}
      </div>

      <article
        id="service-panel"
        role="tabpanel"
        aria-labelledby={`service-tab-${activeIndex}`}
        aria-live="polite"
        className="theme-surface grid overflow-hidden rounded-[1.75rem] border shadow-soft lg:min-h-[490px] lg:grid-cols-[0.95fr_1.05fr]"
      >
        <div className="relative min-h-[320px] overflow-hidden bg-navy-deep lg:min-h-full">
          <div
            key={activeService.title}
            className="absolute inset-0 bg-cover bg-center transition duration-500"
            style={{ backgroundImage: `url("${activeService.image}")` }}
            role="img"
            aria-label={`Insert "${activeService.title}" image here`}
          >
            <div className="absolute inset-0 grid place-items-center px-6 pb-20">
              <div className="flex flex-col items-center text-center">
                <span className="grid size-16 place-items-center rounded-2xl border border-slate-300 bg-white/80 text-slate-500 shadow-sm dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-300">
                  <ImageIcon size={30} strokeWidth={1.5} />
                </span>
                <p className="mt-5 max-w-sm text-sm font-semibold text-slate-600 dark:text-slate-200">
                  Insert &quot;{activeService.title}&quot; image here
                </p>
                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Service photo placeholder</p>
              </div>
            </div>
          </div>
          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/85 px-3 py-2 text-[11px] font-semibold text-navy shadow-sm backdrop-blur dark:border-white/20 dark:bg-navy/45 dark:text-white">
            <MapPinned size={13} className="text-electric-dark dark:text-electric" /> {activeService.location}
          </div>
          <div className="absolute inset-x-5 bottom-5 grid grid-cols-2 gap-3 sm:inset-x-7 sm:bottom-7">
            {activeService.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-slate-300 bg-white/90 p-4 text-navy shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-navy/55 dark:text-white dark:shadow-none">
                <div className="text-2xl font-bold tracking-tight text-electric-dark dark:text-electric">{metric.value}</div>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-white/75">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-electric-pale text-electric-dark dark:bg-electric/15 dark:text-electric">
              <Icon size={22} />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.19em] text-electric-dark dark:text-electric">RECONS / {activeService.tab}</p>
              <p className="mt-0.5 text-xs text-slate-400">{activeService.title}</p>
            </div>
          </div>
          <h3 className="mt-6 text-2xl font-bold leading-tight tracking-tight text-navy dark:text-white sm:text-3xl">
            {activeService.name}
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{activeService.description}</p>
          <div className="mt-6 grid gap-3">
            {activeService.features.map((feature) => (
              <p key={feature} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-electric-pale text-electric-dark dark:bg-electric/15 dark:text-electric"><Check size={12} strokeWidth={3} /></span>
                {feature}
              </p>
            ))}
          </div>
          <a
            href="#contact"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-electric px-5 py-3.5 text-sm font-bold text-navy transition hover:-translate-y-0.5 hover:bg-[#75ef00] hover:shadow-[0_8px_28px_rgba(97,208,0,.25)]"
          >
            {isPure ? "Request a PURE Feasibility Study" : `Discuss ${activeService.title}`}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </article>
      <p className="mt-4 text-center text-xs text-slate-400">Select a sector to explore local solutions. Example impact indicators are illustrative and should be verified per project.</p>
    </div>
  );
}
