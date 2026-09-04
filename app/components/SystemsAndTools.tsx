import { ArrowUpRight } from "lucide-react";

import { SYSTEMS, TOOL_GROUPS } from "@/app/lib/content";

export function SystemsAndTools() {
  return (
    <section id="systems" className="section-block scroll-mt-8">
      <div className="page-shell">
        <div className="section-head reveal">
          <h2 className="editorial-heading">{SYSTEMS.heading}</h2>
          <p className="reading-copy">{SYSTEMS.body}</p>
        </div>

        <div className="systems-board">
          <div className="systems-board__projects">
            {SYSTEMS.projects.map((project) => (
              <article key={project.id} className="system-card reveal">
                <h3 className="system-card__title">{project.name}</h3>
                <p className="system-card__body">{project.body}</p>
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
            <p className="systems-board__infra">{SYSTEMS.infrastructure}</p>
          </div>

          <div className="tools-board">
            {TOOL_GROUPS.map((group) => (
              <div key={group.id} className="tool-card reveal">
                <h3 className="tool-card__label">{group.label}</h3>
                <div className="tool-card__items">
                  {group.tools.map((tool) => (
                    <span key={tool.name} className="tool-chip">
                      {/* Local 20px SVG marks: next/image would only add a wrapper. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tool.logoSrc}
                        alt=""
                        width={18}
                        height={18}
                        loading="lazy"
                        decoding="async"
                        className="tool-mark"
                      />
                      {tool.name}
                    </span>
                  ))}
                </div>
                <p className="tool-card__note">{group.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
