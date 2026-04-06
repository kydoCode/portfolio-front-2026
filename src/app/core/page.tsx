import type { Metadata } from "next";
import CoreClient from "./CoreClient";

export const metadata: Metadata = {
  title: "Core — Parcours & Expérience",
  description:
    "Parcours académique et expérience professionnelle de Sylvain CLEMENT : DWWM, Apple Foundation Program, Master ENS de Lyon, stages en développement web et formation IT.",
};

export default function CorePage() {
  return <CoreClient />;
}
