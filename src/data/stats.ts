import { StatItem, VersusMatchup } from "@/types";
import { getFighterById } from "./fighters";

export const heroStats: StatItem[] = [
  { label: "Fighters", value: 20, suffix: "+" },
  { label: "Events", value: 1, suffix: "+" },
  { label: "Venues", value: 1, suffix: "+" },
  { label: "Coverage", value: 1, suffix: " Indonesia" },
];

export const matchups: VersusMatchup[] = [
  {
    id: "faiz-vs-aik",
    fighterA: getFighterById("faiz-al-ansori")!,
    fighterB: getFighterById("rizky-dwi-aik")!,
    eventName: "Sansshut Combat Night — Co Main Event",
    date: "2026-08-15",
    prediction: {
      fighterAChance: 52,
      fighterBChance: 48,
      analysis:
        "Faiz Al Ansori datang dengan power boxing dan rekor hampir sempurna, sementara Rizky Dwi Aik punya counter attack tajam dari kickboxing. Ini duel striker vs counter striker yang bisa selesai cepat jika salah satu fighter kehilangan fokus.",
    },
  },
  {
    id: "sultan-vs-adam",
    fighterA: getFighterById("sultan-muhammad")!,
    fighterB: getFighterById("adam-yapin")!,
    eventName: "Sansshut Combat Night — Heavy Clash",
    date: "2026-08-15",
    prediction: {
      fighterAChance: 58,
      fighterBChance: 42,
      analysis:
        "Sultan Muhammad membawa ancaman KO besar sebagai heavyweight power puncher, tetapi Adam Yapin punya wrestling dan ground control yang bisa merusak ritme striking Sultan. Pertarungan ini adalah adu power vs grappling control.",
    },
  },
  {
    id: "showi-vs-raqil-haikal",
    fighterA: getFighterById("ahmad-showi")!,
    fighterB: getFighterById("raqil-salman")!,
    fighterC: getFighterById("haikal-halilintar")!,
    eventName: "Sansshut Combat Night — Main Event Handicap Match",
    date: "2026-08-15",
    prediction: {
      fighterAChance: 45,
      fighterBChance: 55,
      analysis:
        "Ahmad Showi menghadapi tantangan terbesar dalam 1 vs 2 melawan Raqil Salman dan Haikal Halilintar. Showi unggul agresivitas dan striking cepat, tetapi kombinasi speed Raqil dan pressure power Haikal membuat main event ini sangat berbahaya.",
    },
  },
];