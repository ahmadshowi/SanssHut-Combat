"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { sportCategories } from "@/data/categories";

export default function Categories() {
  return (
    <section id="categories" className="section-padding relative">
      {/* Background glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <SectionHeading
        label="Disciplines"
        title="Sport Categories"
        description="From striking arts to ground grappling — explore every major combat sport discipline covered on SanssHut Combat."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sportCategories.map((category, idx) => (
          <FadeIn key={category.id} delay={idx * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-card"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity duration-300 group-hover:from-primary/40" />

              {/* Glow ring on hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-primary group-hover:shadow-glow" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-24">
                  {category.description}
                </p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
