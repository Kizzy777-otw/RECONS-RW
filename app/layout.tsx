import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RECONS | Sustainable Infrastructure for Rwanda",
  description:
    "RECONS delivers renewable energy, water, sanitation and carbon-financing solutions for a more sustainable Rwanda.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
