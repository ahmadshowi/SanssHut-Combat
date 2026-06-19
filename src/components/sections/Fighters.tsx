"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X, Search, Trophy, Zap, Shield, Dumbbell } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import FighterCard from "@/components/ui/FighterCard";
import { fighters } from "@/data/fighters";
import { Fighter, SportType } from "@/types";

const SPORT_FILTERS: (SportType | "All")[] = [
  "All",
  "MMA",
  "Boxing",
  "Muay Thai",
  "Kickboxing",
  "BJJ",
  "Wrestling",
];

const WEIGHT_CLASSES = [
  "All",
  ...Array.from(new Set(fighters.map((f) => f.weightClass))),
];

function getPowerStats(fighter: Fighter) {
  return [
    { label: "Power", value: Math.min(100, fighter.stats.koRate + 15) },
    { label: "Speed", value: Math.min(100, fighter.stats.winRate - 5) },
    { label: "Cardio", value: Math.min(100, fighter.stats.winRate - 8) },
    { label: "Technique", value: Math.min(100, fighter.stats.winRate) },
    {
      label: "Ground Game",
      value: Math.min(100, fighter.stats.submissionRate + 35),
    },
    { label: "Durability", value: Math.min(100, 75 + fighter.record.wins) },
  ];
}

function getBadges(fighter: Fighter) {
  const badges = [];

  if (fighter.record.losses === 0) badges.push("🔥 Undefeated");
  if (fighter.stats.koRate >= 70) badges.push("⚡ KO Artist");
  if (fighter.stats.submissionRate >= 50) badges.push("🛡 Ground Specialist");
  if (fighter.stats.winRate >= 90) badges.push("👑 Elite Fighter");
  if (fighter.record.wins >= 15) badges.push("🏆 Main Event Level");

  return badges.length > 0 ? badges : ["⭐ Rising Prospect"];
}

function getSignatureMoves(fighter: Fighter) {
  if (fighter.style.includes("Muay Thai")) {
    return ["Flying Knee", "Elbow Storm", "Clinch Pressure"];
  }

  if (fighter.style.includes("Boxing")) {
    return ["Power Cross", "Left Hook", "Body Shot Combo"];
  }

  if (fighter.style.includes("Kickboxing")) {
    return ["Head Kick", "Spinning Back Kick", "Counter Blitz"];
  }

  if (fighter.style.includes("Wrestling")) {
    return ["Double Leg Takedown", "Ground Control", "Top Pressure"];
  }

  if (fighter.style.includes("Submission")) {
    return ["Rear Naked Choke", "Armbar Trap", "Fast Scramble"];
  }

  return ["Fast Combo", "Pressure Attack", "Counter Strike"];
}

export default function Fighters() {
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState<(SportType | "All")>("All");
  const [weightFilter, setWeightFilter] = useState("All");
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);

  const filteredFighters = useMemo(() => {
    return fighters.filter((fighter) => {
      const matchesSearch = fighter.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesSport =
        sportFilter === "All" || fighter.sport === sportFilter;

      const matchesWeight =
        weightFilter === "All" || fighter.weightClass === weightFilter;

      return matchesSearch && matchesSport && matchesWeight;
    });
  }, [search, sportFilter, weightFilter]);

  return (
    <section id="fighters" className="section-padding relative">
      <SectionHeading
        label="Athletes"
        title="Fighter Profiles"
        description="Browse premium profiles of SanssHut Combat athletes."
      />

      <FadeIn className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fighter..."
            className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={sportFilter}
            onChange={(e) =>
              setSportFilter(e.target.value as SportType | "All")
            }
            className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-primary"
          >
            {SPORT_FILTERS.map((sport) => (
              <option key={sport} value={sport} className="bg-charcoal">
                {sport === "All" ? "All Sports" : sport}
              </option>
            ))}
          </select>

          <select
            value={weightFilter}
            onChange={(e) => setWeightFilter(e.target.value)}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-primary"
          >
            {WEIGHT_CLASSES.map((weight) => (
              <option key={weight} value={weight} className="bg-charcoal">
                {weight === "All" ? "All Weight Classes" : weight}
              </option>
            ))}
          </select>
        </div>
      </FadeIn>

      {filteredFighters.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFighters.map((fighter, idx) => (
            <FadeIn key={fighter.id} delay={idx * 0.06}>
              <button
                type="button"
                onClick={() => setSelectedFighter(fighter)}
                className="block w-full text-left"
              >
                <FighterCard fighter={fighter} />
              </button>
            </FadeIn>
          ))}
        </div>
      ) : (
        <FadeIn className="py-16 text-center">
          <p className="text-gray-400">
            No fighters found matching your criteria.
          </p>
        </FadeIn>
      )}

      {selectedFighter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-background p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedFighter(null)}
              className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-primary"
            >
              <X size={20} />
            </button>

            <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
              <div>
                <div className="relative h-[430px] overflow-hidden rounded-3xl bg-white/5">
                  <Image
                    src={selectedFighter.image}
                    alt={selectedFighter.name}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5">
                    <p className="font-display text-3xl font-extrabold text-white">
                      {selectedFighter.record.wins}-
                      {selectedFighter.record.losses}-
                      {selectedFighter.record.draws}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Professional Record
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {getBadges(selectedFighter).map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold text-gold"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  {selectedFighter.sport} Fighter
                </p>

                <h3 className="mt-3 font-display text-3xl font-extrabold uppercase text-white sm:text-5xl">
                  {selectedFighter.name}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {selectedFighter.countryFlag} {selectedFighter.country} •{" "}
                  {selectedFighter.weightClass}
                </p>

                <p className="mt-5 leading-relaxed text-gray-300">
                  {selectedFighter.name} adalah fighter dengan gaya bertarung{" "}
                  <span className="text-gold">{selectedFighter.style}</span>.
                  Dengan rekor{" "}
                  <span className="font-bold text-white">
                    {selectedFighter.record.wins} Wins,{" "}
                    {selectedFighter.record.losses} Losses,{" "}
                    {selectedFighter.record.draws} Draws
                  </span>
                  , fighter ini dikenal sebagai salah satu atlet berbahaya di
                  kelas {selectedFighter.weightClass}.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/5 p-4 text-center">
                    <p className="text-2xl font-bold text-primary">
                      {selectedFighter.stats.winRate}%
                    </p>
                    <p className="text-xs uppercase text-gray-400">Win Rate</p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4 text-center">
                    <p className="text-2xl font-bold text-gold">
                      {selectedFighter.stats.koRate}%
                    </p>
                    <p className="text-xs uppercase text-gray-400">KO Rate</p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4 text-center">
                    <p className="text-2xl font-bold text-white">
                      {selectedFighter.stats.submissionRate}%
                    </p>
                    <p className="text-xs uppercase text-gray-400">
                      Submission
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <Dumbbell size={18} className="text-primary" />
                      <h4 className="font-display font-bold uppercase text-white">
                        Combat Rating
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {getPowerStats(selectedFighter).map((stat) => (
                        <div key={stat.label}>
                          <div className="mb-1 flex justify-between text-xs text-gray-400">
                            <span>{stat.label}</span>
                            <span>{stat.value}</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${stat.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <Zap size={18} className="text-gold" />
                      <h4 className="font-display font-bold uppercase text-white">
                        Signature Moves
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {getSignatureMoves(selectedFighter).map((move) => (
                        <div
                          key={move}
                          className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm font-semibold text-gray-300"
                        >
                          ⚡ {move}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                  <div className="rounded-xl border border-white/10 p-4">
                    <p className="text-gray-500">Reach</p>
                    <p className="font-semibold text-white">
                      {selectedFighter.stats.reach} cm
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 p-4">
                    <p className="text-gray-500">Height</p>
                    <p className="font-semibold text-white">
                      {selectedFighter.stats.height} cm
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 p-4">
                    <p className="text-gray-500">Age</p>
                    <p className="font-semibold text-white">
                      {selectedFighter.stats.age} years
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 p-4">
                    <p className="text-gray-500">Style</p>
                    <p className="font-semibold text-white">
                      {selectedFighter.style}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Trophy size={18} className="text-gold" />
                    <h4 className="font-display font-bold uppercase text-white">
                      Career Highlights
                    </h4>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-black/20 p-4 text-sm text-gray-300">
                      🏆 {selectedFighter.weightClass} Top Contender
                    </div>
                    <div className="rounded-2xl bg-black/20 p-4 text-sm text-gray-300">
                      ⚔️ {selectedFighter.record.wins} Career Wins
                    </div>
                    <div className="rounded-2xl bg-black/20 p-4 text-sm text-gray-300">
                      🔥 {selectedFighter.stats.winRate}% Win Rate
                    </div>
                    <div className="rounded-2xl bg-black/20 p-4 text-sm text-gray-300">
                      <Shield size={14} className="mr-1 inline text-primary" />
                      SanssHut Combat Athlete
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedFighter(null)}
                  className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-dark"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}