"use client";

import { useEffect, useState } from "react";

import { LOCATION } from "@/app/lib/content";
import { formatLocalClock, getBuenosAiresHour } from "@/app/lib/time";

/**
 * The time in Buenos Aires. The server renders its own reading so the mark is
 * never empty; the client corrects it on mount and then ticks on the minute.
 * Each tick also writes `data-hour` on `<html>` so the paper can follow the
 * city. `aria-live` stays off — a clock that announces itself is noise.
 */
export function LocalClock({ initial }: { initial: string }) {
  const [time, setTime] = useState(initial);

  useEffect(() => {
    let timer = 0;

    const tick = () => {
      const now = new Date();
      setTime(formatLocalClock(now));
      document.documentElement.setAttribute(
        "data-hour",
        String(getBuenosAiresHour(now)),
      );
      const untilNextMinute =
        60_000 - (now.getSeconds() * 1000 + now.getMilliseconds());
      timer = window.setTimeout(tick, untilNextMinute + 20);
    };

    tick();
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span className="whitespace-nowrap">
      <span>{LOCATION.city}</span>
      <span aria-hidden="true"> · </span>
      <time
        className="tabular-nums"
        suppressHydrationWarning
        aria-label={`Local time ${time}`}
      >
        {time}
      </time>
    </span>
  );
}
