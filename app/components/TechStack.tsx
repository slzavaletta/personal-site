"use client";

import { useEffect, useState } from "react";
import { Stagger, StaggerItem } from "./motion/Reveal";
import { STACK, type StackItem } from "@/app/lib/content";

const CHIP =
  "group inline-flex items-center gap-2.5 self-start whitespace-nowrap rounded-md border border-line bg-surface/40 px-3 py-1.5 text-sm text-muted transition-colors duration-150 hover:border-accent/40 hover:text-text";

/**
 * Resolve the first candidate URL that actually loads. Optimistic: starts on
 * the first mark (all verified 200), but advances on any runtime failure.
 */
function useResolvedMark(marks: string[]) {
  const [url, setUrl] = useState<string | null>(marks[0] ?? null);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const tryNext = () => {
      if (cancelled) return;
      if (i >= marks.length) {
        setUrl(null);
        return;
      }
      const img = new Image();
      img.onload = () => !cancelled && setUrl(marks[i]);
      img.onerror = () => {
        i += 1;
        tryNext();
      };
      img.src = marks[i];
    };
    tryNext();
    return () => {
      cancelled = true;
    };
  }, [marks]);

  return url;
}

/**
 * Every mark is forced to one flat monochrome via CSS mask + currentColor, so
 * logos from Simple Icons, Devicon, svgl, and brand SVGs render identically.
 */
function Logo({ item }: { item: StackItem }) {
  const url = useResolvedMark(item.marks);

  if (!url) {
    const letter = (
      item.mono ??
      item.name.match(/[a-z0-9]/i)?.[0] ??
      "•"
    ).toUpperCase();
    return (
      <span
        aria-hidden="true"
        className="flex size-4 items-center justify-center rounded-[3px] border border-line-strong font-mono text-[9px] text-muted transition-colors duration-150 group-hover:border-accent/50 group-hover:text-text"
      >
        {letter}
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="size-4 shrink-0 bg-current text-muted transition-colors duration-150 group-hover:text-text"
      style={{
        WebkitMaskImage: `url("${url}")`,
        maskImage: `url("${url}")`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

export function TechStack() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
      {STACK.map((group) => (
        <div key={group.group}>
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-5 bg-accent" />
            <h3 className="font-mono text-sm text-muted">{group.group}</h3>
          </div>
          <Stagger as="ul" className="mt-5 flex flex-col gap-2" amount={0.1}>
            {group.items.map((item) => (
              <StaggerItem as="li" key={item.name} className={CHIP}>
                <Logo item={item} />
                {item.name}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      ))}
    </div>
  );
}
