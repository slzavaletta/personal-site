import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import type { LabCard as LabCardType } from "@/app/lib/content";

export function LabCard({ card }: { card: LabCardType }) {
  // The whole card is a link only when it has a single destination. When it
  // also has an in-page demo, we render explicit footer links instead (nesting
  // a second link inside an anchor is invalid).
  const wholeCardLink = Boolean(card.href) && !card.demoHref;

  const inner = (
    <>
      {card.featured && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        />
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          {card.featured && (
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
            />
          )}
          <h3 className="text-xl font-semibold tracking-tight text-text">
            {card.name}
          </h3>
        </div>
        {wholeCardLink && (
          <ArrowUpRight
            weight="bold"
            className="size-5 shrink-0 text-muted transition-colors duration-150 group-hover:text-accent"
            aria-hidden="true"
          />
        )}
      </div>

      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
        {card.blurb}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {card.stack.map((s) => (
          <li
            key={s}
            className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-xs text-muted"
          >
            {s}
          </li>
        ))}
      </ul>

      {card.demoHref && (
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={card.demoHref}
            className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-colors duration-150 hover:text-text"
          >
            Try the demo
            <ArrowDown
              weight="bold"
              className="size-3.5 transition-transform duration-150 group-hover/link:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
          {card.href && (
            <a
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors duration-150 hover:text-text"
            >
              GitHub
              <ArrowUpRight
                weight="bold"
                className="size-3.5"
                aria-hidden="true"
              />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      )}
    </>
  );

  const base =
    "hover-glow group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border bg-surface/50 p-6 sm:p-7";
  const tone = card.featured ? "border-line-strong" : "border-line";

  if (wholeCardLink) {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${tone}`}
      >
        {inner}
        <span className="sr-only">
          {" "}
          (opens {card.name} on GitHub in a new tab)
        </span>
      </a>
    );
  }

  return <div className={`${base} ${tone}`}>{inner}</div>;
}
