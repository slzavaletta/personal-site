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

/** "13 Aug 2026", in the owner's time zone. */
export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: LOCATION.timeZone,
  }).format(new Date(iso));
}

/** "2 September 2026" */
export function formatLongDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
