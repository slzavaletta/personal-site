import { ArrowUpRight } from "lucide-react";

import {
  SYSTEMS,
  TOOL_GROUPS,
  TOOL_SECTION,
} from "@/app/lib/content";
import { Reveal } from "@/app/components/motion/Reveal";
import { ScopeSentinelDemo } from "@/app/components/ScopeSentinelDemo";

export function SystemsAndTools() {
  return (
    <>
      <section id="systems" className="section-block scroll-mt-8 bg-paper">
        <div className="page-shell">
          <Reveal className="grid gap-8 border-t border-rule-strong pt-4 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="utility-label text-signal-ink">
                02 / Built around the work
              </p>
              <h2 className="editorial-heading mt-5">{SYSTEMS.heading}</h2>
            </div>
            <p className="reading-copy self-end lg:col-span-4">
              These tools keep scope and evidence visible, so the next delivery
              decision doesn&apos;t depend on memory.
            </p>
          </Reveal>

          <div className="mt-9 grid border-y border-rule-strong lg:grid-cols-12">
            {SYSTEMS.projects.map((project) => (
              <article
                key={project.id}
                className="system-card border-b border-rule p-6 sm:p-7 lg:col-span-5 lg:border-b-0 lg:border-r lg:border-rule"
              >
                <p className="utility-label text-graphite">Delivery system</p>
                <h3 className="mt-8 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                  {project.name}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-graphite">
                  {project.body}
                </p>
                <div className="mt-8 flex flex-col items-start gap-1">
                  {project.actions.map((action) => (
                    <a
                      key={action.href + action.label}
                      href={action.href}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noreferrer" : undefined}
                      className="text-link"
                    >
                      {action.label}
                      {action.external ? (
                        <>
                          <span className="sr-only"> (opens in new tab)</span>
                          <ArrowUpRight aria-hidden="true" className="size-4" />
                        </>
                      ) : null}
                    </a>
                  ))}
                </div>
              </article>
            ))}

            <div
              className="flex flex-col justify-between bg-field p-6 sm:p-7 lg:col-span-2"
            >
              <p className="utility-label text-signal-ink">
                {SYSTEMS.infrastructure.label}
              </p>
              <p className="mt-8 text-sm leading-relaxed text-ink">
                {SYSTEMS.infrastructure.body}
              </p>
            </div>
          </div>

          <div id="scope-sentinel" className="scroll-mt-24 pt-10 sm:pt-12">
            <Reveal className="grid gap-7 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="utility-label text-signal-ink">
                  Scope Sentinel / Walkthrough
                </p>
                <h3 className="mt-5 max-w-[16ch] text-3xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-5xl">
                  Follow a client request from SOW clause to next step.
                </h3>
              </div>
              <p className="reading-copy lg:col-span-4 lg:col-start-9">
                Choose a fictional client request. The walkthrough checks it
                against a sample SOW, cites the clause, sizes the impact, and
                drafts the next step.
              </p>
            </Reveal>
            <ScopeSentinelDemo />
          </div>
        </div>
      </section>

      <section id="tools" className="scroll-mt-8 bg-inverse text-paper">
        <div className="page-shell section-block">
          <Reveal className="grid gap-8 border-t border-paper/35 pt-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="utility-label text-signal-on-dark">
                03 / Working set
              </p>
              <h2 className="mt-5 max-w-[13ch] text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                {TOOL_SECTION.heading}
              </h2>
            </div>
            <p className="text-xl leading-relaxed text-paper/68 lg:col-span-4">
              {TOOL_SECTION.body}
            </p>
          </Reveal>

          <div className="tool-groups">
            {TOOL_GROUPS.map((group) => (
              <article key={group.id} className="tool-group">
                <h3 className="utility-label text-paper">{group.label}</h3>
                <p className="mt-4 text-sm leading-relaxed text-paper/58">
                  {group.note}
                </p>
                <ul className="mt-5">
                  {group.tools.map((tool) => (
                    <li key={tool.name} className="tool-cell">
                      <img
                        src={tool.logoSrc}
                        alt=""
                        width={20}
                        height={20}
                        loading="lazy"
                        decoding="async"
                        className="tool-mark"
                      />
                      <span className="text-sm font-semibold">{tool.name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
