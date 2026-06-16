"use client";

import Image from "next/image";
import { Database, CalendarRange, MapPin, BarChart3 } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const FEATURES = [
  {
    icon: Database,
    title: "Fighter Database",
    description:
      "Comprehensive profiles covering records, stats, and fighting styles from every corner of the globe.",
  },
  {
    icon: CalendarRange,
    title: "Fight Schedules",
    description:
      "Stay updated with upcoming cards from UFC, ONE Championship, Glory, and more — never miss a fight.",
  },
  {
    icon: MapPin,
    title: "Venue Information",
    description:
      "Discover legendary arenas and stadiums worldwide, including capacity and event history.",
  },
  {
    icon: BarChart3,
    title: "Matchup Analysis",
    description:
      "Deep statistical breakdowns and predictions for the most anticipated bouts in combat sports.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Image */}
        <FadeIn direction="left" className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-card">
            <Image
              src="/images/logo.png"
              alt="Fighters inside an arena"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-2xl bg-primary/20 blur-2xl -z-10" />
          <div className="absolute -top-6 -left-6 h-32 w-32 rounded-2xl bg-gold/20 blur-2xl -z-10" />
        </FadeIn>

        {/* Right: Content */}
        <div>
          <FadeIn direction="right">
            <span className="section-label">About SanssHut Combat</span>
            <h2 className="heading-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">
              Your Gateway to the World of Combat Sports
            </h2>
            <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed">
              SanssHut Combat is a premium digital hub built for fans who live
              and breathe combat sports. Our mission is to bring fighters,
              fans, and federations together under one platform — delivering
              real-time information on athletes, events, and venues across
              MMA, Boxing, Muay Thai, and beyond.
            </p>
            <p className="mt-4 text-gray-400 text-base sm:text-lg leading-relaxed">
              Fans love SanssHut Combat because it captures the energy of the
              sport: cinematic visuals, in-depth fighter analytics, and a
              constantly updated schedule of the biggest events on the planet
              — all in one place.
            </p>
          </FadeIn>

          {/* Feature cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((feature, idx) => (
              <FadeIn key={feature.title} delay={idx * 0.1}>
                <div className="glass-card group h-full p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-glow">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <feature.icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
