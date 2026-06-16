"use client";

import Image from "next/image";
import { Fighter } from "@/types";
import { formatRecord } from "@/lib/utils";

interface VersusFighterCardProps {
  fighter: Fighter;
  align: "left" | "right";
}

export default function VersusFighterCard({
  fighter,
  align,
}: VersusFighterCardProps) {
  const isLeft = align === "left";

  return (
    <div
      className={`flex flex-col items-center gap-4 text-center sm:items-${
        isLeft ? "end" : "start"
      } sm:text-${isLeft ? "right" : "left"}`}
    >
      <div className="relative h-56 w-56 sm:h-64 sm:w-64 overflow-hidden rounded-2xl border-2 border-white/10 shadow-card">
        <Image
          src={fighter.image}
          alt={fighter.name}
          fill
          className="object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-${
            isLeft ? "r" : "l"
          } ${isLeft ? "from-primary/40" : "from-gold/30"} via-transparent to-transparent`}
        />
      </div>

      <div>
        <span className="text-3xl">{fighter.countryFlag}</span>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide">
          {fighter.name}
        </h3>
        <p className="text-sm text-gray-400">{fighter.country}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:gap-6 text-sm">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Record
          </p>
          <p className="mt-1 font-display font-semibold">
            {formatRecord(fighter.record)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Reach
          </p>
          <p className="mt-1 font-display font-semibold">
            {fighter.stats.reach} cm
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Height
          </p>
          <p className="mt-1 font-display font-semibold">
            {fighter.stats.height} cm
          </p>
        </div>
      </div>
    </div>
  );
}
