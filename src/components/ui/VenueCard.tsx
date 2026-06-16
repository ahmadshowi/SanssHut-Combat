"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Users, Trophy } from "lucide-react";
import { Venue } from "@/types";

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="glass-card group overflow-hidden transition-all duration-300 hover:border-gold/40 hover:shadow-glow-gold"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={venue.image}
          alt={venue.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-sm text-gray-200">
          <MapPin size={14} className="text-gold" />
          {venue.city}, {venue.country}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-bold uppercase tracking-wide">
          {venue.name}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
          <Users size={16} className="text-primary" />
          <span>{venue.capacity.toLocaleString()} capacity</span>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
            <Trophy size={14} />
            Major Events Hosted
          </div>
          <div className="flex flex-wrap gap-2">
            {venue.majorEvents.map((event) => (
              <span
                key={event}
                className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300"
              >
                {event}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
