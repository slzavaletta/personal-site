import { ArrowUpRight } from "lucide-react";

import { SYSTEMS, TOOL_GROUPS } from "@/app/lib/content";

export function SystemsAndTools() {
  return (
    <section id="systems" className="section-block scroll-mt-8">
      <div className="page-shell">
        <div className="section-head">
          <h2 className="editorial-heading">{SYSTEMS.heading}</h2>
          <p className="reading-copy">{SYSTEMS.body}</p>
        </div>

        <div className="mt-8 border-b border-rule-strong">
          {SYSTEMS.projects.map((project) => (
            <article key={project.id} className="system-row">
              <h3 className="text-xl font-semibold tracking-[-0.015em]">
                {project.name}
              </h3>
              <p className="max-w-[62ch] text-base leading-relaxed text-mute">
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
          <p className="system-row text-sm leading-relaxed text-mute sm:grid-cols-1">
            {SYSTEMS.infrastructure}
          </p>
        </div>

        <div className="tool-strip">
          {TOOL_GROUPS.map((group) => (
            <div key={group.id} className="tool-strip__row">
              <h3 className="tool-strip__label">{group.label}</h3>
              {group.tools.map((tool) => (
                <span key={tool.name} className="tool-strip__item">
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
              {group.id === "explore" ? (
                <p className="w-full text-sm leading-relaxed text-mute">
                  {group.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
