import { SYSTEMS, TOOL_GROUPS } from "@/app/lib/content";

export function SystemsAndTools() {
  return (
    <>
      <div className="system-grid">
        {SYSTEMS.projects.map((project) => (
          <article key={project.id} className="system-card">
            <p className="eyebrow">Delivery tool</p>
            <h2>{project.name}</h2>
            <p className="body-copy">{project.body}</p>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="action action--outline"
            >
              Source on GitHub ↗
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </article>
        ))}
      </div>
      <div className="tool-groups">
        {TOOL_GROUPS.map((group) => (
          <section key={group.id} className="tool-group">
            <h2>{group.label}</h2>
            <ul>
              {group.tools.map((tool) => (
                <li key={tool.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tool.logoSrc}
                    width={18}
                    height={18}
                    alt=""
                    loading="lazy"
                    className="tool-mark"
                  />
                  {tool.name}
                </li>
              ))}
            </ul>
            <p>{group.note}</p>
          </section>
        ))}
      </div>
      <p className="infrastructure body-copy">{SYSTEMS.infrastructure}</p>
    </>
  );
}
