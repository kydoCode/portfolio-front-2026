import type { Metadata } from "next";
import PeripheralClient from "./PeripheralClient";

export const metadata: Metadata = {
  title: "Peripheral — Contact & Loisirs",
  description:
    "Contactez Sylvain CLEMENT — développeur web full stack. Formulaire de contact, centres d'intérêt : musique, photo, sport, associatif.",
};

export default function PeripheralPage() {
  return <PeripheralClient />;
}
