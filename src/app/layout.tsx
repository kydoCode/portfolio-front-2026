import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sylvain CLEMENT | Développeur Web Full Stack",
    template: "%s | Sylvain CLEMENT",
  },
  description:
    "Portfolio 2026 de Sylvain CLEMENT — Concepteur Designer UI & Développeur Web Full Stack certifié ISTQB. Expertise Next.js, React, TypeScript, Swift/iOS. Basé dans le Sud de la France.",
  keywords: [
    "développeur web",
    "full stack",
    "Next.js",
    "React",
    "TypeScript",
    "ISTQB",
    "portfolio",
    "Sylvain CLEMENT",
    "concepteur designer UI",
    "Swift iOS",
  ],
  authors: [{ name: "Sylvain CLEMENT", url: "https://sylvainclement.dev" }],
  creator: "Sylvain CLEMENT",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://sylvainclement.dev",
    siteName: "Sylvain CLEMENT — Silent System",
    title: "Sylvain CLEMENT | Développeur Web Full Stack",
    description:
      "Portfolio 2026 — Concepteur Designer UI & Développeur Web certifié ISTQB. Next.js, React, TypeScript, Swift/iOS.",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Sylvain CLEMENT — Silent System Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sylvain CLEMENT | Développeur Web Full Stack",
    description: "Portfolio 2026 — Concepteur Designer UI & Développeur Web certifié ISTQB.",
    images: ["/images/og-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL("https://sylvainclement.dev"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
