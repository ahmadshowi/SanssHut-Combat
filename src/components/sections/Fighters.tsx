"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X, Search } from "lucide-react";
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
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-charcoal p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedFighter(null)}
              className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-primary"
            >
              <X size={20} />
            </button>

            <div className="grid gap-8 md:grid-cols-[300px_1fr]">
              <div className="relative h-[380px] overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src={selectedFighter.image}
                  alt={selectedFighter.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  {selectedFighter.sport} Fighter
                </p>

                <h3 className="mt-3 font-display text-3xl font-extrabold uppercase text-white">
                  {selectedFighter.name}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {selectedFighter.countryFlag} {selectedFighter.country} •{" "}
                  {selectedFighter.weightClass}
                </p>

                <p className="mt-5 text-gray-300 leading-relaxed">
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
                      {selectedFighter.record.wins}
                    </p>
                    <p className="text-xs uppercase text-gray-400">Wins</p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4 text-center">
                    <p className="text-2xl font-bold text-gold">
                      {selectedFighter.stats.koRate}%
                    </p>
                    <p className="text-xs uppercase text-gray-400">KO Rate</p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4 text-center">
                    <p className="text-2xl font-bold text-white">
                      {selectedFighter.stats.winRate}%
                    </p>
                    <p className="text-xs uppercase text-gray-400">Win Rate</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 p-4">
                    <p className="text-gray-500">Style</p>
                    <p className="font-semibold text-white">
                      {selectedFighter.style}
                    </p>
                  </div>

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