"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Quotes } from "@phosphor-icons/react";

/* ------------------------------------------------------------------ *
 * Faithful, pre-computed illustration of the Scope Sentinel skill.
 * NOTHING here calls an API or runs an LLM. The classifications,
 * citations, sizing and change-request draft are canned sample data,
 * revealed in the skill's real pipeline order (classify -> cite ->
 * size -> draft). All sample data is fictional.
 *
 * Verdict status colours are intentionally scoped to this widget only
 * (inline styles, never global tokens) so they cannot leak into the
 * single-accent page. Text always carries the verdict label, never
 * colour alone.
 * ------------------------------------------------------------------ */

const SOW = {
  project: "Customer Portal - Phase 1 (Fixed-price)",
  deliverables: [
    {
      id: "D1",
      text: "Authentication & access (SSO via SAML, role-based access, up to 3 roles)",
    },
    {
      id: "D2",
      text: "Account dashboard (read-only views, 4 predefined widgets)",
    },
    {
      id: "D3",
      text: "Support tickets (users create and view their own tickets)",
    },
  ],
  exclusions: [
    "Native mobile applications (iOS/Android)",
    "Third-party integrations beyond the specified SSO",
    "Legacy data migration",
  ],
  assumptions: [
    "Client provides the design system",
    "One (1) round of UAT pre go-live",
  ],
  changeControl:
    "All changes go through a change request, sized and priced separately",
};

type Verdict = "IN-SCOPE" | "OUT-OF-SCOPE" | "AMBIGUOUS";

type Request = {
  request: string;
  verdict: Verdict;
  clause: { source: string; text: string };
  reasoning: string;
  sizing: string;
  cr:
    | { kind: "none"; note: string }
    | {
        kind: "draft";
        ref: string;
        request: string;
        basis: string;
        size: string;
        status: string;
      };
};

const REQUESTS: Request[] = [
  {
    request: "Can users check the status of tickets they've already submitted?",
    verdict: "IN-SCOPE",
    clause: {
      source: "Deliverable D3",
      text: "Support tickets - users create and view their own tickets.",
    },
    reasoning:
      "Viewing the status of one's own submitted tickets falls under the existing D3 deliverable.",
    sizing: "None (already in scope)",
    cr: {
      kind: "none",
      note: "No change request needed. Covered by the current baseline.",
    },
  },
  {
    request:
      "We'd like the portal delivered as a native iOS app for our field team.",
    verdict: "OUT-OF-SCOPE",
    clause: {
      source: "Exclusions",
      text: "Native mobile applications (iOS/Android).",
    },
    reasoning: "A native iOS app is explicitly excluded from the current SOW.",
    sizing: "T-shirt size L",
    cr: {
      kind: "draft",
      ref: "CR-001",
      request: "Native iOS application for field team",
      basis: "Out-of-scope per Exclusions clause",
      size: "L",
      status: "Draft - pending human approval",
    },
  },
  {
    request: "Can we get a second round of UAT before go-live?",
    verdict: "AMBIGUOUS",
    clause: {
      source: "Assumptions",
      text: "One (1) round of UAT pre go-live.",
    },
    reasoning:
      "The SOW assumes one round of UAT but does not explicitly exclude a second. The skill does not assume - it escalates to human review rather than guessing.",
    sizing: "Not sized (pending clarification)",
    cr: {
      kind: "none",
      note: "Escalated for human review. The baseline is ambiguous here; a person decides before anything is drafted.",
    },
  },
];

// widget-only status colours (desaturated, functional, like a linter)
const VERDICT_STYLE: Record<
  Verdict,
  { color: string; bg: string; border: string }
> = {
  "IN-SCOPE": {
    color: "#3fb950",
    bg: "rgba(63, 185, 80, 0.10)",
    border: "rgba(63, 185, 80, 0.40)",
  },
  "OUT-OF-SCOPE": {
    color: "#d6776b",
    bg: "rgba(214, 119, 107, 0.10)",
    border: "rgba(214, 119, 107, 0.40)",
  },
  AMBIGUOUS: {
    color: "#d2a24c",
    bg: "rgba(210, 162, 76, 0.10)",
    border: "rgba(210, 162, 76, 0.40)",
  },
};

const STAGE_LABEL =
  "font-mono text-[11px] uppercase tracking-[0.14em] text-faint";

function Stage({ children }: { children: ReactNode }) {
  return <motion.div variants={stageVariant}>{children}</motion.div>;
}

const groupVariant: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.03 } },
};
const stageVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

export function ScopeSentinelDemo() {
  const [selected, setSelected] = useState(0);
  const reduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = REQUESTS[selected];
  const v = VERDICT_STYLE[active.verdict];

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      next = (i + 1) % REQUESTS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (i - 1 + REQUESTS.length) % REQUESTS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = REQUESTS.length - 1;
    else return;
    e.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-12">
      {/* 1. Baseline: the fixed SOW (always visible, monospace technical content) */}
      <aside className="lg:col-span-5">
        <div className="rounded-[var(--radius)] border border-line bg-surface/40 p-6">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-xs text-muted">Sample SOW</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              fixed-price
            </span>
          </div>
          <p className="mt-3 font-mono text-sm leading-relaxed text-text">
            {SOW.project}
          </p>

          <dl className="mt-6 space-y-5 font-mono text-[13px] leading-relaxed">
            <div>
              <dt className={STAGE_LABEL}>Deliverables</dt>
              <dd className="mt-2 space-y-1.5 text-muted">
                {SOW.deliverables.map((d) => (
                  <p key={d.id}>
                    <span className="text-accent">{d.id}</span>{" "}
                    <span className="break-words">{d.text}</span>
                  </p>
                ))}
              </dd>
            </div>
            <div>
              <dt className={STAGE_LABEL}>Exclusions</dt>
              <dd className="mt-2 space-y-1.5 text-muted">
                {SOW.exclusions.map((x) => (
                  <p key={x} className="break-words">
                    {x}
                  </p>
                ))}
              </dd>
            </div>
            <div>
              <dt className={STAGE_LABEL}>Assumptions</dt>
              <dd className="mt-2 space-y-1.5 text-muted">
                {SOW.assumptions.map((a) => (
                  <p key={a} className="break-words">
                    {a}
                  </p>
                ))}
              </dd>
            </div>
            <div>
              <dt className={STAGE_LABEL}>Change control</dt>
              <dd className="mt-2 break-words text-muted">
                {SOW.changeControl}
              </dd>
            </div>
          </dl>
        </div>
      </aside>

      {/* 2. Interaction: pick a request, see the classified output */}
      <div className="lg:col-span-7">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          Incoming client request
        </p>
        <div
          role="tablist"
          aria-label="Sample incoming client requests"
          aria-orientation="vertical"
          className="flex flex-col gap-2.5"
        >
          {REQUESTS.map((r, i) => {
            const isSel = i === selected;
            return (
              <button
                key={i}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`ssd-tab-${i}`}
                aria-selected={isSel}
                aria-controls="ssd-panel"
                tabIndex={isSel ? 0 : -1}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`rounded-[var(--radius)] border px-4 py-3 text-left text-[15px] leading-snug transition-colors duration-150 ${
                  isSel
                    ? "border-accent/60 bg-surface text-text"
                    : "border-line bg-surface/30 text-muted hover:border-muted hover:text-text"
                }`}
              >
                {r.request}
              </button>
            );
          })}
        </div>

        {/* Result region: accessible live region, re-runs the reveal on change */}
        <div
          id="ssd-panel"
          role="tabpanel"
          aria-labelledby={`ssd-tab-${selected}`}
          aria-live="polite"
          tabIndex={0}
          className="mt-6 rounded-[var(--radius)] border border-line bg-surface/40 p-6"
        >
          <motion.div
            key={selected}
            variants={reduce ? undefined : groupVariant}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="space-y-6"
          >
            {/* Verdict */}
            <Stage>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-semibold tracking-wide"
                  style={{ color: v.color, backgroundColor: v.bg, borderColor: v.border }}
                >
                  {active.verdict}
                </span>
                <span className={STAGE_LABEL}>Verdict</span>
              </div>
            </Stage>

            {/* Citation: verbatim quote pulled from the baseline */}
            <Stage>
              <div>
                <div className="flex items-center gap-2">
                  <Quotes
                    weight="fill"
                    className="size-3.5 text-faint"
                    aria-hidden="true"
                  />
                  <span className={STAGE_LABEL}>
                    Citation · {active.clause.source}
                  </span>
                </div>
                <blockquote
                  className="mt-2 border-l-2 pl-3 font-mono text-sm leading-relaxed text-text"
                  style={{ borderColor: v.border }}
                >
                  &ldquo;{active.clause.text}&rdquo;
                </blockquote>
              </div>
            </Stage>

            {/* Reasoning */}
            <Stage>
              <div>
                <span className={STAGE_LABEL}>Reasoning</span>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {active.reasoning}
                </p>
              </div>
            </Stage>

            {/* Sizing */}
            <Stage>
              <div>
                <span className={STAGE_LABEL}>Sizing</span>
                <p className="mt-2 font-mono text-sm text-text">
                  {active.sizing}
                </p>
              </div>
            </Stage>

            {/* Change request */}
            <Stage>
              <div>
                <span className={STAGE_LABEL}>Change request</span>
                {active.cr.kind === "none" ? (
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {active.cr.note}
                  </p>
                ) : (
                  <div
                    className="mt-2 rounded-[var(--radius)] border p-4 font-mono text-[13px] leading-relaxed"
                    style={{ borderColor: v.border, backgroundColor: v.bg }}
                  >
                    <dl className="space-y-1.5 text-muted">
                      <Row k="Ref" val={active.cr.ref} />
                      <Row k="Request" val={active.cr.request} />
                      <Row k="Basis" val={active.cr.basis} />
                      <Row k="Size" val={active.cr.size} />
                    </dl>
                    <p
                      className="mt-3 border-t pt-3 font-semibold"
                      style={{ color: v.color, borderColor: v.border }}
                    >
                      {active.cr.status}
                    </p>
                    <p className="mt-1 text-[12px] not-italic text-faint">
                      Nothing is sent or finalized. A human approves before
                      anything happens.
                    </p>
                  </div>
                )}
              </div>
            </Stage>
          </motion.div>
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-faint">
          Illustrative walkthrough with fictional sample data. The reveal mirrors
          the skill&apos;s real pipeline: classify, cite, size, draft. The skill
          itself runs inside Claude on actual SOWs and requests.
        </p>
      </div>
    </div>
  );
}

function Row({ k, val }: { k: string; val: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-16 shrink-0 text-faint">{k}</dt>
      <dd className="break-words text-text">{val}</dd>
    </div>
  );
}
