import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1220",
          deep: "#081030",
          card: "#111827",
        },
        electric: {
          DEFAULT: "#62D200",
          dark: "#4EAA00",
          pale: "#F0FBE5",
        },
        paper: "#F8FAFC",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(11, 18, 32, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
