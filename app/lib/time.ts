import { LOCATION } from "@/app/lib/content";

/** "16:32" in Buenos Aires, whatever the server or reader's zone. */
export function formatLocalClock(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: LOCATION.timeZone,
  }).format(date);
}

/**
 * Hour of day in Buenos Aires, 0–23. Drives `data-hour` on `<html>` so the
 * paper's colour temperature can follow the city without a second accent.
 */
export function getBuenosAiresHour(date: Date = new Date()): number {
  const hour = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    hourCycle: "h23",
    timeZone: LOCATION.timeZone,
  })
    .formatToParts(date)
    .find((part) => part.type === "hour")?.value;

  return Number(hour) % 24;
}

/** "13 Aug 2026", in the owner's time zone. */
export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: LOCATION.timeZone,
  }).format(new Date(iso));
}
