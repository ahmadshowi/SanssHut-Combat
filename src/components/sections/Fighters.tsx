"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import FighterCard from "@/components/ui/FighterCard";
import { fighters } from "@/data/fighters";
import { SportType } from "@/types";

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
        description="Browse premium profiles of the world's most elite combat sport athletes."
      />

      {/* Search and filters */}
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

      {/* Fighter grid */}
      {filteredFighters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFighters.map((fighter, idx) => (
            <FadeIn key={fighter.id} delay={idx * 0.06}>
              <FighterCard fighter={fighter} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <FadeIn className="text-center py-16">
          <p className="text-gray-400">
            No fighters found matching your criteria.
          </p>
        </FadeIn>
      )}
    </section>
  );
}
