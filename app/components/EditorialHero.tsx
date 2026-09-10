import { ArrowDown, ArrowDownToLine } from "lucide-react";
import { HERO } from "@/app/lib/content";
import { DeliveryAssembly } from "@/app/components/DeliveryAssembly";

export function EditorialHero() {
  return (
    <section id="top" className="cover">
      <div className="page-shell">
        <div className="cover-grid">
          <div className="cover-copy">
            <p className="hero-role">
              <span className="status-dot" aria-hidden="true" />
              {HERO.role}
            </p>
            <h1 className="cover-display">
              {HERO.display} <em>{HERO.displayEmphasis}</em>
            </h1>
            <p className="hero-statement">{HERO.statement}</p>
            <div className="hero-actions">
              <a href={HERO.primaryAction.href} className="primary-link">
                {HERO.primaryAction.label}
                <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a
                href={HERO.secondaryAction.href}
                download
                className="text-link"
              >
                {HERO.secondaryAction.label}
                <ArrowDownToLine size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <DeliveryAssembly />
        </div>
        <div className="hero-context">
          <p>{HERO.supporting}</p>
          <p>{HERO.direction}</p>
        </div>
      </div>
    </section>
  );
}
