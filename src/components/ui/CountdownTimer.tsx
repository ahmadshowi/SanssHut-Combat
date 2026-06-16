"use client";

import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [time, setTime] = useState(() => getCountdown(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCountdown(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (time.isPast) {
    return (
      <span className="text-sm font-display font-semibold uppercase tracking-wider text-gray-500">
        Event has started
      </span>
    );
  }

  const units = [
    { label: "Days", value: time.days },
    { label: "Hrs", value: time.hours },
    { label: "Min", value: time.minutes },
    { label: "Sec", value: time.seconds },
  ];

  return (
    <div className="flex items-center gap-2">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center rounded-lg bg-white/5 px-2.5 py-1.5 min-w-[3rem]"
        >
          <span className="font-display text-lg font-bold text-primary-light">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-gray-500">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
