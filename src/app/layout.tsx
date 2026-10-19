import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

// Inter Tight très gras pour les titres en majuscules, Inter pour le texte.
const titre = Inter_Tight({ variable: "--font-titre", subsets: ["latin", "latin-ext"], weight: ["800", "900"], display: "swap" });
const corps = Inter({ variable: "--font-corps", subsets: ["latin", "latin-ext"], display: "swap" });

export const metadata: Metadata = {
  title: "Léa Moreau — Coach sportive & nutrition à Bordeaux (démo)",
  description: "Coaching sportif et nutrition à Bordeaux et en visio. Séance découverte offerte. Site de démonstration, personnage fictif.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${titre.variable} ${corps.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden font-sans">{children}</body>
    </html>
  );
}
