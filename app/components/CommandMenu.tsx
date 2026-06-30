"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowElbowDownRight,
  ArrowUpRight,
  EnvelopeSimple,
  MagnifyingGlass,
} from "@phosphor-icons/react";

type Item = {
  label: string;
  group: "Go to" | "Links";
  type: "section" | "external" | "mailto";
  target: string;
};

const ITEMS: Item[] = [
  { label: "Top", group: "Go to", type: "section", target: "top" },
  { label: "Built things", group: "Go to", type: "section", target: "lab" },
  { label: "Selected work", group: "Go to", type: "section", target: "work" },
  { label: "Experience", group: "Go to", type: "section", target: "experience" },
  { label: "Get in touch", group: "Go to", type: "section", target: "contact" },
  {
    label: "GitHub",
    group: "Links",
    type: "external",
    target: "https://github.com/slzavaletta",
  },
  {
    label: "Agentic skills repo",
    group: "Links",
    type: "external",
    target: "https://github.com/slzavaletta/skills",
  },
  {
    label: "LinkedIn",
    group: "Links",
    type: "external",
    target: "https://www.linkedin.com/in/slzavaletta",
  },
  {
    label: "Email Santiago",
    group: "Links",
    type: "mailto",
    target: "mailto:santiago@slzavaletta.com",
  },
  {
    label: "Download CV (PDF)",
    group: "Links",
    type: "external",
    target: "/SantiagoLopezZavaletta_CV.pdf",
  },
];

const GROUPS: Item["group"][] = ["Go to", "Links"];

function ItemIcon({ type }: { type: Item["type"] }) {
  const cls = "size-4 shrink-0 text-faint group-aria-selected:text-accent";
  if (type === "section")
    return <ArrowElbowDownRight weight="bold" className={cls} aria-hidden="true" />;
  if (type === "mailto")
    return <EnvelopeSimple weight="regular" className={cls} aria-hidden="true" />;
  return <ArrowUpRight weight="bold" className={cls} aria-hidden="true" />;
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [hint, setHint] = useState("⌘K");
  const [mounted, setMounted] = useState(false);

  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter((i) => i.label.toLowerCase().includes(q));
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const run = useCallback(
    (item: Item | undefined) => {
      if (!item) return;
      setOpen(false);
      requestAnimationFrame(() => {
        if (item.type === "section") {
          const el = document.getElementById(item.target);
          el?.scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
            block: "start",
          });
          el?.focus?.({ preventScroll: true });
        } else if (item.type === "mailto") {
          window.location.href = item.target;
        } else {
          window.open(item.target, "_blank", "noopener,noreferrer");
        }
      });
    },
    [reduce],
  );

  // Global shortcut: Cmd/Ctrl + K toggles
  useEffect(() => {
    setMounted(true);
    setHint(
      typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform)
        ? "⌘K"
        : "Ctrl K",
    );
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        // close from anywhere, regardless of where focus currently is
        setOpen((o) => {
          if (o) triggerRef.current?.focus();
          return false;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // On open: reset, focus input, lock scroll. (Escape is handled by the
  // always-mounted global keydown listener above, so it closes from anywhere.)
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) =>
        filtered.length ? (a - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[active]);
    } else if (e.key === "Tab") {
      // focus trap: only the input is focusable inside the dialog
      e.preventDefault();
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        aria-label="Open command menu"
        className="hidden h-9 items-center gap-2 rounded-md border border-line-strong px-3 font-mono text-xs text-muted transition-colors duration-150 hover:border-muted hover:text-text sm:inline-flex"
      >
        <MagnifyingGlass weight="bold" className="size-3.5" aria-hidden="true" />
        <span suppressHydrationWarning>{hint}</span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                onClick={close}
                className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[18vh]"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onPanelKeyDown}
              initial={reduce ? false : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-line-strong bg-surface shadow-2xl shadow-black/50"
            >
              <div className="flex items-center gap-3 border-b border-line px-4 transition-colors duration-150 focus-within:border-line-strong">
                <MagnifyingGlass
                  weight="bold"
                  className="size-4 shrink-0 text-faint"
                  aria-hidden="true"
                />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="cmd-listbox"
                  aria-activedescendant={
                    filtered.length ? `cmd-opt-${active}` : undefined
                  }
                  aria-autocomplete="list"
                  placeholder="Jump to a section or open a link"
                  // inline outline:none beats the unlayered global :focus-visible
                  // accent outline (a Tailwind utility cannot, due to cascade layers).
                  // Neutral focus is shown by the wrapper's focus-within border.
                  style={{ outline: "none", boxShadow: "none" }}
                  className="w-full bg-transparent py-3.5 font-mono text-sm text-text placeholder:text-faint focus:outline-none"
                />
                <kbd className="hidden shrink-0 rounded border border-line-strong px-1.5 py-0.5 font-mono text-[10px] text-faint sm:block">
                  esc
                </kbd>
              </div>

              <ul
                id="cmd-listbox"
                role="listbox"
                aria-label="Commands"
                className="max-h-[min(60vh,360px)] overflow-y-auto p-2"
              >
                {filtered.length === 0 && (
                  <li className="px-3 py-6 text-center font-mono text-sm text-faint">
                    No matches
                  </li>
                )}
                {GROUPS.map((group) => {
                  const groupItems = filtered.filter((i) => i.group === group);
                  if (!groupItems.length) return null;
                  return (
                    <li key={group} role="presentation">
                      <div className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                        {group}
                      </div>
                      <ul role="presentation">
                        {groupItems.map((item) => {
                          const idx = filtered.indexOf(item);
                          const selected = idx === active;
                          return (
                            <li
                              key={item.label}
                              id={`cmd-opt-${idx}`}
                              role="option"
                              aria-selected={selected}
                              onMouseMove={() => setActive(idx)}
                              onClick={() => run(item)}
                              className="group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm aria-selected:bg-bg aria-selected:text-text aria-selected:ring-1 aria-selected:ring-inset aria-selected:ring-accent/40"
                            >
                              <ItemIcon type={item.type} />
                              <span className="flex-1 text-muted group-aria-selected:text-text">
                                {item.label}
                              </span>
                              {item.type !== "section" && (
                                <span className="font-mono text-[10px] text-faint">
                                  ↗
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
