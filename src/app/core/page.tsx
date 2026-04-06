import type { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import CoreClient from "./CoreClient";

export const metadata: Metadata = {
  title: "Core — Parcours & Expérience",
  description:
    "Parcours académique et expérience professionnelle de Sylvain CLEMENT : DWWM, Apple Foundation Program, Master ENS de Lyon, stages en développement web et formation IT.",
};

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function CorePage() {
  const [experience, education, certifications] = await Promise.all([
    prisma.experience.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
    prisma.education.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
    prisma.certification.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
  ]);

  return (
    <CoreClient
      experience={experience}
      education={education}
      certifications={certifications}
    />
  );
}
