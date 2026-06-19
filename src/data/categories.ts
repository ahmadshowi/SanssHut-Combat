import { SportCategory } from "@/types";

export const sportCategories: (SportCategory & {
  bg: string;
  panel: string;
})[] = [
  {
    id: "mma",
    name: "MMA",
    description:
      "The pinnacle of combat sports — striking, grappling, and submissions combined in the most complete fighting discipline.",
    image: "/images/mmas.png",
    bg: "#E8131F",
    panel: "#F0444D",
  },
  {
    id: "boxing",
    name: "Boxing",
    description:
      "The art of pugilism. Speed, power, and footwork define the sport that built the foundation of combat entertainment.",
    image: "/images/boxing.png",
    bg: "#B8860B",
    panel: "#D4AF37",
  },
  {
    id: "kickboxing",
    name: "Kickboxing",
    description:
      "A dynamic blend of striking disciplines, combining boxing hands with powerful kicks for explosive standup battles.",
    image: "/images/kick.png",
    bg: "#6E1111",
    panel: "#A4161A",
  },
];