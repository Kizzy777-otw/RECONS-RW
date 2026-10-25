import { ArrowUpRight, Menu } from "lucide-react";
import { Brand } from "@/components/Brand";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  ["Services", "#services"],
  ["Our impact", "#impact"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-slate-200/80 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-medium text-slate-700 transition hover:text-electric-dark dark:text-white/75 dark:hover:text-electric">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-2.5 text-sm font-semibold text-navy transition hover:border-electric hover:text-electric-dark dark:border-white/20 dark:text-white dark:hover:text-electric sm:px-5"
          >
            Admin Portal <ArrowUpRight size={15} />
          </a>
          <a href="#services" aria-label="Jump to services" className="rounded-lg p-2 text-navy dark:text-white md:hidden">
            <Menu size={23} />
          </a>
        </div>
      </div>
    </header>
  );
}
