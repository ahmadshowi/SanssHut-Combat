import { StatItem, VersusMatchup } from "@/types";
import { getFighterById } from "./fighters";

export const heroStats: StatItem[] = [
  { label: "Fighters", value: 11, suffix: "" },
  { label: "Events", value: 1, suffix: "+" },
  { label: "Venues", value: 1, suffix: "+" },
  { label: "Coverage", value: 0, suffix: "Indonesia" },
];

const showi = getFighterById("ahmad-showi")!;
const raqil = getFighterById("raqil-salman")!;
const haikal = getFighterById("haikal-halilintar")!;

export const featuredMatchup: VersusMatchup = {
  id: "showi-vs-raqil-haikal",
  fighterA: showi,
  fighterB: raqil,
  fighterC: haikal,
  eventName: "Sansshut Combat Night — Handicap Match",
  date: "2026-08-15",
  prediction: {
    fighterAChance: 45,
    fighterBChance: 55,
    analysis:
      "Ahmad Showi menghadapi tantangan besar dalam handicap match 1 vs 2 melawan Raqil Salman dan Haikal Halilintar. Showi unggul dari agresivitas dan striking cepat, tetapi Raqil dan Haikal punya kombinasi speed serta power pressure yang membuat pertandingan ini sangat berbahaya.",
  },
};