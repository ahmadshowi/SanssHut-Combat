"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { Fighter } from "@/types";
import { formatRecord } from "@/lib/utils";

interface FighterCardProps {
  fighter: Fighter;
}

export default function FighterCard({ fighter }: FighterCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group glass-card overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-glow"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={fighter.image}
          alt={fighter.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

        {/* Sport badge */}
        <span className="absolute top-3 left-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-display font-semibold uppercase tracking-wider text-white shadow-glow">
          {fighter.sport}
        </span>

        {/* Country flag */}
        <span className="absolute top-3 right-3 text-2xl">
          {fighter.countryFlag}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-bold uppercase tracking-wide">
          {fighter.name}
        </h3>
        <p className="mt-1 text-sm text-gray-400">{fighter.country}</p>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Weight Class
            </p>
            <p className="mt-1 font-display font-semibold text-gold">
              {fighter.weightClass}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Record
            </p>
            <p className="mt-1 font-display font-semibold">
              {formatRecord(fighter.record)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
          <Swords size={16} className="text-primary" />
          <span>{fighter.style}</span>
        </div>
      </div>
    </motion.div>
  );
}
