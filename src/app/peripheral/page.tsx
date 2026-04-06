import type { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import PeripheralClient from "./PeripheralClient";

export const metadata: Metadata = {
  title: "Peripheral — Contact & Loisirs",
  description:
    "Contactez Sylvain CLEMENT — développeur web full stack. Formulaire de contact, centres d'intérêt : musique, photo, sport, associatif.",
};

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function PeripheralPage() {
  const hobbies = await prisma.hobby.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });

  return <PeripheralClient hobbies={hobbies} />;
}
