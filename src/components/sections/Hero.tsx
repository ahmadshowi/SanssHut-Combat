"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { heroStats } from "@/data/stats";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/poster.png"
          alt="Combat sports arena with stadium lights"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 -z-10 bg-hero-gradient" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/80 via-transparent to-background/60" />

      {/* Glow accents */}
      <div className="absolute -left-32 top-1/3 -z-10 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
      <div className="absolute right-0 top-10 -z-10 h-96 w-96 rounded-full bg-gold/20 blur-[120px]" />

      <div className="relative w-full px-4 sm:px-8 lg:px-16 pt-32 pb-24">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-label mb-6 block"
        >
          Global Combat Sports Network
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="heading-xl max-w-4xl text-4xl sm:text-6xl lg:text-7xl"
        >
          The Ultimate <span className="text-gradient-red">Combat Sports</span>{" "}
          Hub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-gray-300"
        >
          Explore fighters, matchups, venues, and upcoming combat sport events
          from around the world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="#fighters" className="btn-primary">
            Explore Fighters
            <ArrowRight size={18} />
          </a>
          <a href="#schedule" className="btn-secondary">
            Upcoming Events
            <CalendarDays size={18} />
          </a>
        </motion.div>

        {/* Animated statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-3xl"
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card flex flex-col items-center gap-1 px-4 py-6 text-center"
            >
              <span className="font-display text-3xl sm:text-4xl font-bold text-gradient-red">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-wider text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-gray-500 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
