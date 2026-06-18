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
    eventName: "SanssHut Combat Night — Co Main Event",
    date: "2026-08-15",
    title: "Power Striker vs Counter Fighter",
    storyline:
      "Fight ini terjadi karena Faiz dikenal sebagai power striker yang agresif, sementara Aik dikenal sebagai counter fighter yang tenang dan tajam. Keduanya ingin membuktikan siapa striker paling berbahaya di SanssHut Combat.",
    tension:
      "Faiz membawa tekanan dan power besar, sedangkan Aik membawa timing dan counter attack. Satu kesalahan kecil bisa langsung mengubah arah pertandingan.",
    prediction: {
      fighterAChance: 52,
      fighterBChance: 48,
      analysis:
        "Faiz unggul dalam power dan pressure, tetapi Aik sangat berbahaya jika mampu membaca ritme serangan dan membalas lewat counter bersih.",
    },
  },
  {
    id: "sultan-vs-adam",
    fighterA: getFighterById("sultan-muhammad")!,
    fighterB: getFighterById("adam-yapin")!,
    eventName: "SanssHut Combat Night — Heavy Clash",
    date: "2026-08-15",
    title: "Knockout Power vs Ground Control",
    storyline:
      "Sultan datang sebagai heavyweight dengan reputasi power puncher yang dominan. Adam hadir sebagai fighter dengan wrestling dan ground control kuat. Fight ini terjadi karena keduanya punya gaya yang sangat bertolak belakang.",
    tension:
      "Sultan ingin menyelesaikan fight lewat KO cepat, sementara Adam ingin menyeret pertandingan ke ground dan mengontrol tempo dari bawah.",
    prediction: {
      fighterAChance: 58,
      fighterBChance: 42,
      analysis:
        "Sultan lebih unggul dalam striking dan power, tetapi Adam punya peluang besar jika bisa melakukan takedown lebih awal.",
    },
  },
  {
    id: "showi-vs-raqil-haikal",
    fighterA: getFighterById("ahmad-showi")!,
    fighterB: getFighterById("raqil-salman")!,
    fighterC: getFighterById("haikal-halilintar")!,
    eventName: "SanssHut Combat Night — Main Event Handicap Match",
    date: "2026-08-15",
    title: "The Rising Storm Against Two Threats",
    storyline:
      "Main event ini terjadi karena Ahmad Showi dianggap terlalu dominan dengan rekor sempurna. Untuk menguji batasnya, SanssHut Combat mempertemukannya dengan dua lawan sekaligus: Raqil yang cepat dan presisi, serta Haikal yang kuat dan penuh pressure.",
    tension:
      "Showi ingin membuktikan dirinya sebagai wajah utama SanssHut Combat. Raqil dan Haikal ingin menghentikan hype Showi dan mencuri sorotan di malam terbesar.",
    prediction: {
      fighterAChance: 45,
      fighterBChance: 55,
      analysis:
        "Showi unggul agresivitas dan striking cepat, tetapi kombinasi speed Raqil dan pressure power Haikal membuat pertandingan ini sangat berbahaya.",
    },
  },
];