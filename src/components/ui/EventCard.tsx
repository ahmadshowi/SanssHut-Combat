"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, Swords } from "lucide-react";
import { CombatEvent } from "@/types";
import { formatDate } from "@/lib/utils";
import CountdownTimer from "./CountdownTimer";

interface EventCardProps {
  event: CombatEvent;
}

const STATUS_STYLES: Record<CombatEvent["status"], string> = {
  upcoming: "bg-gold/15 text-gold border border-gold/30",
  live: "bg-primary/20 text-primary-light border border-primary/40 animate-pulse",
  completed: "bg-white/5 text-gray-400 border border-white/10",
};

const STATUS_LABELS: Record<CombatEvent["status"], string> = {
  upcoming: "Upcoming",
  live: "Live Now",
  completed: "Completed",
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="glass-card group overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-glow"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
        <span
          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-display font-semibold uppercase tracking-wider ${STATUS_STYLES[event.status]}`}
        >
          {STATUS_LABELS[event.status]}
        </span>
        <span className="absolute top-3 left-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-display font-semibold uppercase tracking-wider text-white shadow-glow">
          {event.organization}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-bold uppercase tracking-wide">
          {event.name}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-gold">
          <Swords size={16} />
          <span className="font-medium">{event.mainEvent}</span>
        </div>

        <div className="mt-3 space-y-1.5 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>
              {formatDate(event.date)} &middot; {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>
              {event.venue}, {event.location}
            </span>
          </div>
        </div>

        {event.status === "upcoming" && (
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">
              Countdown
            </p>
            <CountdownTimer targetDate={`${event.date}T${event.time}:00`} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
