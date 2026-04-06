import type { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import CapabilitiesClient from "./CapabilitiesClient";

export const metadata: Metadata = {
  title: "Capabilities — Compétences & Projets",
  description:
    "Compétences techniques, certifications (ISTQB Foundation v4.0, Cisco CyberOps) et projets de Sylvain CLEMENT : Next.js, React, TypeScript, Node.js, Swift/iOS.",
};

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function CapabilitiesPage() {
  const [projects, certifications, skills] = await Promise.all([
    prisma.project.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
    prisma.certification.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
    prisma.skill.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
  ]);

  return (
    <CapabilitiesClient
      projects={projects}
      certifications={certifications}
      skills={skills}
    />
  );
}
