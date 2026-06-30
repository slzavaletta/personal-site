"use client";

import {
  Kanban,
  ShieldCheck,
  ChartLineUp,
  UsersThree,
  Sparkle,
  HardDrives,
  FlowArrow,
  Terminal,
  type Icon,
} from "@phosphor-icons/react";
import { Stagger, StaggerItem } from "./motion/Reveal";
import { LEAD, BUILD } from "@/app/lib/content";

const LEAD_ICONS: Icon[] = [Kanban, ShieldCheck, ChartLineUp, UsersThree];
const BUILD_ICONS: Icon[] = [Sparkle, HardDrives, FlowArrow, Terminal];

function Column({
  label,
  items,
  icons,
  accent,
}: {
  label: string;
  items: string[];
  icons: Icon[];
  accent: boolean;
}) {
  return (
    <div
      className={`bg-bg p-5 sm:p-7 ${
        accent ? "md:border-l-2 md:border-l-accent/30" : ""
      }`}
    >
      <p
        className={`flex items-center gap-2 px-2 font-mono text-sm ${
          accent ? "text-accent" : "text-muted"
        }`}
      >
        {accent && (
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
        )}
        {label}
      </p>
      <Stagger as="ul" className="mt-4">
        {items.map((item, i) => {
          const Glyph = icons[i];
          return (
            <StaggerItem as="li" key={item}>
              <div className="group flex items-center gap-3 rounded-md px-2 py-3 transition-[background-color,transform] duration-150 hover:translate-x-0.5 hover:bg-surface/70 motion-reduce:hover:translate-x-0">
                <Glyph
                  weight="regular"
                  className={`size-5 shrink-0 ${
                    accent ? "text-accent" : "text-muted"
                  }`}
                  aria-hidden="true"
                />
                <span className="text-[15px] leading-relaxed text-text">
                  {item}
                </span>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}

export function WhatIDo() {
  return (
    <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line md:grid-cols-2">
      <Column label="What I lead" items={LEAD} icons={LEAD_ICONS} accent={false} />
      <Column
        label="What I build"
        items={BUILD}
        icons={BUILD_ICONS}
        accent
      />
    </div>
  );
}
