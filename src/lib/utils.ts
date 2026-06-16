/**
 * Format a date string into a readable format, e.g. "Aug 15, 2026"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Calculate remaining time until a target date.
 * Returns days, hours, minutes, seconds.
 */
export function getCountdown(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = Math.max(target - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: diff === 0 };
}

/**
 * Combine class names conditionally.
 */
export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format a fight record into "W-L-D" string.
 */
export function formatRecord(record: {
  wins: number;
  losses: number;
  draws: number;
}): string {
  return `${record.wins}-${record.losses}-${record.draws}`;
}
