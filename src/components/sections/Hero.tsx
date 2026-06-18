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
      className="relative flex min-h-[760px] items-center overflow-hidden sm:min-h-screen"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/poster.png"
          alt="Combat sports arena with stadium lights"
          fill
          priority
          className="object-cover object-top sm:object-center"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 -z-10 bg-hero-gradient" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/90 via-background/30 to-background/70 sm:from-background/80 sm:via-transparent sm:to-background/60" />

      {/* Glow accents */}
      <div className="absolute -left-32 top-1/3 -z-10 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
      <div className="absolute right-0 top-10 -z-10 h-96 w-96 rounded-full bg-gold/20 blur-[120px]" />

      <div className="relative w-full px-4 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-label mb-5 block sm:mb-6"
        >
          Global Combat Sports Network
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="heading-xl max-w-4xl text-4xl sm:text-6xl lg:text-7xl"
        >
          The Ultimate{" "}
          <span className="text-gradient-red">Combat Sports</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-gray-300 sm:mt-6 sm:text-lg"
        >
          Explore fighters, matchups, venues, and upcoming combat sport events
          from around the world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
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
          className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-6"
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card flex flex-col items-center gap-1 px-3 py-4 text-center sm:px-4 sm:py-6"
            >
              <span className="font-display text-2xl font-bold text-gradient-red sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>

              <span className="text-[10px] uppercase tracking-wider text-gray-400 sm:text-sm">
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
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
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