"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "recons-theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Honor an explicit saved choice first, otherwise use the visitor's operating-system theme.
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = saved ? saved === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", useDark);
    setDark(useDark);
  }, []);

  function toggleTheme() {
    // Update the document class immediately so CSS theme variables switch without a reload.
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    window.localStorage.setItem(STORAGE_KEY, nextDark ? "dark" : "light");
    setDark(nextDark);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      aria-pressed={dark}
      title={`Switch to ${dark ? "light" : "dark"} mode`}
      className="inline-flex size-10 items-center justify-center rounded-full border border-slate-300/50 bg-white/10 text-current transition hover:border-electric hover:text-electric dark:border-white/15"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
