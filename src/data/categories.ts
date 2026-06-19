import { SportCategory } from "@/types";

export const sportCategories: (SportCategory & {
  bg: string;
  panel: string;
})[] = [
  {
    id: "mma",
    name: "MMA",
    description:
      "The ultimate combination of striking, wrestling, and submission fighting.",
    image: "/images/mma.png",
    bg: "#E8131F",
    panel: "#F0444D",
  },
  {
    id: "boxing",
    name: "Boxing",
    description:
      "The sweet science of precision punching, footwork, and knockout power.",
    image: "/images/boxing.png",
    bg: "#B8860B",
    panel: "#D4AF37",
  },
  {
    id: "muay-thai",
    name: "Muay Thai",
    description:
      "The art of eight limbs featuring punches, kicks, knees, and elbows.",
    image: "/images/muaythai.png",
    bg: "#A4161A",
    panel: "#D62828",
  },
  {
    id: "kickboxing",
    name: "Kickboxing",
    description:
      "A fast-paced striking discipline combining boxing techniques and powerful kicks.",
    image: "/images/kickboxing.png",
    bg: "#6E1111",
    panel: "#A4161A",
  },
  {
    id: "bjj",
    name: "Jiu-Jitsu",
    description:
      "A grappling art focused on submissions, positional control, and ground dominance.",
    image: "/images/bjj.png",
    bg: "#1D3557",
    panel: "#457B9D",
  },
  {
    id: "wrestling",
    name: "Wrestling",
    description:
      "Elite takedowns, pressure, and control that form the backbone of many champions.",
    image: "/images/wrestling.png",
    bg: "#264653",
    panel: "#2A9D8F",
  },
];