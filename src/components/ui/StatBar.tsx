"use client";

import { motion } from "framer-motion";

interface StatBarProps {
  label: string;
  valueA: number;
  valueB: number;
  maxValue: number;
  unit?: string;
}

export default function StatBar({
  label,
  valueA,
  valueB,
  maxValue,
  unit = "",
}: StatBarProps) {
  const percentA = (valueA / maxValue) * 100;
  const percentB = (valueB / maxValue) * 100;

  return (
    <div className="py-3">
      <div className="mb-2 flex items-center justify-between text-sm font-display font-semibold uppercase tracking-wide">
        <span className="text-primary-light">
          {valueA}
          {unit}
        </span>
        <span className="text-gray-400 tracking-[0.2em] text-xs">{label}</span>
        <span className="text-gold">
          {valueB}
          {unit}
        </span>
      </div>
      <div className="flex h-2 w-full gap-1 overflow-hidden rounded-full bg-white/5">
        <div className="flex w-1/2 justify-end overflow-hidden rounded-l-full">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percentA}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-l from-primary to-primary-light"
          />
        </div>
        <div className="flex w-1/2 justify-start overflow-hidden rounded-r-full">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percentB}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-gold to-gold-light"
          />
        </div>
      </div>
    </div>
  );
}
