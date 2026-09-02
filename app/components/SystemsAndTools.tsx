import { ArrowUpRight } from "lucide-react";

import { SYSTEMS, TOOL_GROUPS } from "@/app/lib/content";

export function SystemsAndTools() {
  return (
    <section id="systems" className="section-block scroll-mt-8">
      <div className="page-shell">
        <div className="section-head">
          <div>
            <p className="utility-label text-signal-ink">Systems and tools</p>
            <h2 className="editorial-heading mt-5">{SYSTEMS.heading}</h2>
          </div>
          <p className="reading-copy">{SYSTEMS.body}</p>
        </div>

        <div className="mt-10 border-b border-rule-strong">
          {SYSTEMS.projects.map((project) => (
            <article key={project.id} className="system-row">
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                {project.name}
              </h3>
              <p className="max-w-[62ch] text-base leading-relaxed text-graphite">
                {project.body}
              </p>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link text-sm"
              >
                Source on GitHub
                <span className="sr-only"> (opens in new tab)</span>
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </article>
          ))}
          <p className="system-row text-sm leading-relaxed text-graphite sm:grid-cols-1">
            {SYSTEMS.infrastructure}
          </p>
        </div>

        <div className="tool-groups">
          {TOOL_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="utility-label text-ink">{group.label}</h3>
              <p className="mt-3 min-h-[3.2em] text-sm leading-relaxed text-graphite">
                {group.note}
              </p>
              <ul className="tool-group__list">
                {group.tools.map((tool) => (
                  <li key={tool} className="text-sm">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
