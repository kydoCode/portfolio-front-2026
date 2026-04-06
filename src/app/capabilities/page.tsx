import type { Metadata } from "next";
import CapabilitiesClient from "./CapabilitiesClient";

export const metadata: Metadata = {
  title: "Capabilities — Compétences & Projets",
  description:
    "Compétences techniques, certifications (ISTQB Foundation v4.0, Cisco CyberOps) et projets de Sylvain CLEMENT : Next.js, React, TypeScript, Node.js, Swift/iOS.",
};

export default function CapabilitiesPage() {
  return <CapabilitiesClient />;
}
