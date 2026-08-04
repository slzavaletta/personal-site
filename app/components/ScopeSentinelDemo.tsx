"use client";

import { useState } from "react";
import { Quote } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

const SOW = {
  project: "Customer Portal / Phase 1",
  commercialModel: "Fixed price",
  deliverables: [
    "D1 — SSO and role-based access, up to three roles",
    "D2 — Read-only account dashboard, four widgets",
    "D3 — Create and view your own support tickets",
  ],
  exclusions: [
    "Native mobile applications",
    "Third-party integrations beyond SSO",
    "Legacy data migration",
  ],
  assumption: "One round of UAT before go-live",
};

type Verdict = "IN SCOPE" | "OUT OF SCOPE" | "AMBIGUOUS";

type SampleRequest = {
  request: string;
  verdict: Verdict;
  citation: { source: string; text: string };
  reasoning: string;
  size: string;
  nextStep: string;
};

const REQUESTS: readonly SampleRequest[] = [
  {
    request: "Can users check tickets they already submitted?",
    verdict: "IN SCOPE",
    citation: {
      source: "Deliverable D3",
      text: "Create and view your own support tickets.",
    },
    reasoning:
      "Viewing an existing ticket is already part of the agreed deliverable.",
    size: "No additional size",
    nextStep: "Keep the request in the current delivery baseline.",
  },
  {
    request: "Can we also ship a native iOS app for the field team?",
    verdict: "OUT OF SCOPE",
    citation: {
      source: "Exclusions",
      text: "Native mobile applications.",
    },
    reasoning:
      "The request is explicitly excluded from the fixed-price baseline.",
    size: "T-shirt size L",
    nextStep:
      "Draft a change request for human review. Nothing is sent automatically.",
  },
  {
    request: "Can we add a second round of UAT before go-live?",
    verdict: "AMBIGUOUS",
    citation: {
      source: "Assumption",
      text: "One round of UAT before go-live.",
    },
    reasoning:
      "The SOW assumes one round but does not state how a second round should be treated.",
    size: "Not sized yet",
    nextStep:
      "Ask for a human decision before estimating or drafting a change request.",
  },
] as const;

const VERDICT_VARIANT = {
  "IN SCOPE": "secondary",
  "OUT OF SCOPE": "signal",
  AMBIGUOUS: "outline",
} as const;

export function ScopeSentinelDemo() {
  const [selection, setSelection] = useState(["0"]);
  const selectedIndex = Number(selection[0] ?? "0");
  const active = REQUESTS[selectedIndex] ?? REQUESTS[0];

  return (
    <div className="mt-12 grid border-y border-rule-strong lg:grid-cols-12">
      <div className="bg-field p-6 sm:p-8 lg:col-span-4 lg:border-r lg:border-rule-strong">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="utility-label text-signal-ink">
              Sample baseline
            </p>
            <h4 className="mt-4 text-2xl font-semibold tracking-[-0.035em]">
              {SOW.project}
            </h4>
          </div>
          <Badge variant="outline">{SOW.commercialModel}</Badge>
        </div>

        <dl className="mt-9 flex flex-col gap-7">
          <div>
            <dt className="utility-label text-graphite">Deliverables</dt>
            <dd className="mt-3 flex flex-col gap-2 font-mono text-[0.8125rem] leading-relaxed text-ink">
              {SOW.deliverables.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="utility-label text-graphite">Exclusions</dt>
            <dd className="mt-3 flex flex-col gap-2 font-mono text-[0.8125rem] leading-relaxed text-ink">
              {SOW.exclusions.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="utility-label text-graphite">Assumption</dt>
            <dd className="mt-3 font-mono text-[0.8125rem] leading-relaxed text-ink">
              {SOW.assumption}
            </dd>
          </div>
        </dl>
      </div>

      <div className="p-6 sm:p-8 lg:col-span-8 lg:p-10">
        <p className="utility-label text-graphite">
          Pick an incoming client request
        </p>
        <ToggleGroup
          value={selection}
          onValueChange={(value) => {
            if (value[0]) {
              setSelection([String(value[0])]);
            }
          }}
          orientation="vertical"
          variant="editorial"
          size="lg"
          className="mt-5 w-full items-stretch"
          aria-label="Sample client requests"
        >
          {REQUESTS.map((sample, index) => (
            <ToggleGroupItem
              key={sample.request}
              value={String(index)}
              aria-label={`Analyze request ${index + 1}: ${sample.request}`}
            >
              <span className="mr-3 font-mono text-[0.8125rem] text-signal-ink group-aria-pressed/toggle:text-signal-on-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              {sample.request}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div
          aria-live="polite"
          aria-atomic="true"
          className="mt-8 border-t border-rule-strong pt-7"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={VERDICT_VARIANT[active.verdict]}>
              {active.verdict}
            </Badge>
            <span className="utility-label text-graphite">
              Classification
            </span>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="utility-label flex items-center gap-2 text-graphite">
                <Quote className="size-3.5" aria-hidden="true" />
                Citation / {active.citation.source}
              </p>
              <blockquote className="mt-4 border-l-2 border-signal pl-4 font-mono text-sm leading-relaxed text-ink">
                “{active.citation.text}”
              </blockquote>
            </div>

            <div>
              <p className="utility-label text-graphite">Reasoning</p>
              <p className="mt-4 text-base leading-relaxed text-ink">
                {active.reasoning}
              </p>
            </div>

            <div>
              <p className="utility-label text-graphite">Size</p>
              <p className="mt-4 font-mono text-sm font-medium text-ink">
                {active.size}
              </p>
            </div>

            <div>
              <p className="utility-label text-graphite">Next step</p>
              <p className="mt-4 text-base leading-relaxed text-ink">
                {active.nextStep}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-9 border-t border-rule pt-5 text-[0.8125rem] leading-relaxed text-graphite">
          Fictional sample data. The real skill works inside Claude against an
          actual SOW and request; citations and draft actions remain subject to
          human review.
        </p>
      </div>
    </div>
  );
}
