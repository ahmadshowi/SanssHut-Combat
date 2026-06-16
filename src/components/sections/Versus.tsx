"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, CalendarDays } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import VersusFighterCard from "@/components/ui/VersusFighterCard";
import StatBar from "@/components/ui/StatBar";
import { matchups } from "@/data/stats";
import { formatDate } from "@/lib/utils";

export default function Versus() {
  return (
    <section id="versus" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=2000&auto=format&fit=crop"
          alt="Arena background"
          fill
          className="object-cover object-center opacity-25"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <SectionHeading
        label="Fight Card"
        title="Sansshut Combat Night"
        description="Every fight has its own rivalry, pressure, and storyline."
      />

      <div className="space-y-28">
        {matchups.map((matchup, index) => {
          const { fighterA, fighterB, fighterC, eventName, date, prediction } =
            matchup;

          const isHandicap = Boolean(fighterC);

          return (
            <div key={matchup.id} className="relative">
              <FadeIn className="mb-8 text-center">
                <p className="font-display text-sm font-bold uppercase tracking-[0.35em] text-primary">
                  Fight #{index + 1}
                </p>

                <h3 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-wide">
                  {isHandicap ? "1 VS 2 Handicap Match" : "1 VS 1 Matchup"}
                </h3>

                <p className="mt-3 text-sm text-gray-400">{eventName}</p>
              </FadeIn>

              <div className="relative grid grid-cols-1 sm:grid-cols-3 items-center gap-10 sm:gap-4">
                <FadeIn
                  direction="left"
                  className="order-1 sm:order-1 flex justify-center sm:justify-end"
                >
                  <VersusFighterCard fighter={fighterA} align="left" />
                </FadeIn>

                <FadeIn className="order-3 sm:order-2 flex justify-center">
                  <div className="relative flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full border-2 border-dashed border-gold/40"
                    />

                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 25px rgba(232,19,31,0.5)",
                          "0 0 50px rgba(232,19,31,0.9)",
                          "0 0 25px rgba(232,19,31,0.5)",
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark"
                    >
                      <span className="font-display text-2xl sm:text-4xl font-extrabold italic text-white">
                        VS
                      </span>
                    </motion.div>
                  </div>
                </FadeIn>

                <FadeIn
                  direction="right"
                  className="order-2 sm:order-3 flex justify-center sm:justify-start"
                >
                  <div className="flex flex-col gap-4">
                    <VersusFighterCard fighter={fighterB} align="right" />
                    {fighterC && (
                      <VersusFighterCard fighter={fighterC} align="right" />
                    )}
                  </div>
                </FadeIn>
              </div>

              <FadeIn className="mt-14 mx-auto max-w-3xl">
                <div className="glass-card p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
                    <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-gold">
                      {eventName}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <CalendarDays size={16} />
                      {formatDate(date)}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm font-display font-semibold uppercase tracking-wider text-gray-300">
                    <TrendingUp size={18} className="text-primary" />
                    Win Probability Prediction
                  </div>

                  <div className="mt-4 flex h-4 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${prediction.fighterAChance}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="flex items-center justify-center bg-gradient-to-r from-primary to-primary-light text-xs font-bold"
                    >
                      {prediction.fighterAChance}%
                    </motion.div>

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${prediction.fighterBChance}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="flex items-center justify-center bg-gradient-to-r from-gold-dark to-gold text-xs font-bold text-charcoal"
                    >
                      {prediction.fighterBChance}%
                    </motion.div>
                  </div>

                  <div className="mt-2 flex justify-between gap-4 text-xs text-gray-400">
                    <span>{fighterA.name}</span>
                    <span className="text-right">
                      {fighterB.name}
                      {fighterC ? ` & ${fighterC.name}` : ""}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-gray-400">
                    {prediction.analysis}
                  </p>
                </div>
              </FadeIn>

              <FadeIn className="mt-12 mx-auto max-w-3xl">
                <div className="glass-card p-6 sm:p-8">
                  <h3 className="text-center font-display text-xl sm:text-2xl font-bold uppercase tracking-wide">
                    Fight{" "}
                    <span className="text-gradient-red">Analytics</span>
                  </h3>

                  <p className="mt-2 text-center text-sm text-gray-400">
                    {fighterA.name} compared against {fighterB.name}
                  </p>

                  <div className="mt-6 flex flex-col divide-y divide-white/5">
                    <StatBar
                      label="Win Rate"
                      valueA={fighterA.stats.winRate}
                      valueB={fighterB.stats.winRate}
                      maxValue={100}
                      unit="%"
                    />
                    <StatBar
                      label="KO Rate"
                      valueA={fighterA.stats.koRate}
                      valueB={fighterB.stats.koRate}
                      maxValue={100}
                      unit="%"
                    />
                    <StatBar
                      label="Submission Rate"
                      valueA={fighterA.stats.submissionRate}
                      valueB={fighterB.stats.submissionRate}
                      maxValue={100}
                      unit="%"
                    />
                    <StatBar
                      label="Reach"
                      valueA={fighterA.stats.reach}
                      valueB={fighterB.stats.reach}
                      maxValue={250}
                      unit=" cm"
                    />
                    <StatBar
                      label="Height"
                      valueA={fighterA.stats.height}
                      valueB={fighterB.stats.height}
                      maxValue={220}
                      unit=" cm"
                    />
                    <StatBar
                      label="Age"
                      valueA={fighterA.stats.age}
                      valueB={fighterB.stats.age}
                      maxValue={50}
                      unit=" yrs"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          );
        })}
      </div>
    </section>
  );
}