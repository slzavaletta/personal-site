import Link from "next/link";
import { DeploymentMap } from "@/app/components/DeploymentMap";
import { HashTarget } from "@/app/components/HashTarget";
import { HERO, PROOF_LINE, SITE_LINKS, WORK_INTRO } from "@/app/lib/content";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="page-shell atlas-page">
      <HashTarget />
      <section className="atlas-hero" id="top" aria-labelledby="hero-title">
        <div>
          <h1 id="hero-title">
            {HERO.display} <em>{HERO.displayEmphasis}</em>
          </h1>
          <p className="role-line">{HERO.role}</p>
        </div>
        <div className="atlas-hero__aside">
          <p className="body-copy">{HERO.statement}</p>
          <a href={HERO.primaryAction.href} className="text-link">
            {HERO.primaryAction.label} ↓
          </a>
        </div>
      </section>
      <section id="work" aria-labelledby="work-heading">
        <DeploymentMap />
        <p className="proof-line">{PROOF_LINE}</p>
        <div className="work-foot">
          <p>{WORK_INTRO.body}</p>
          <div className="link-row">
            <a href={SITE_LINKS.resume} download>
              {HERO.secondaryAction.label} ↗
            </a>
            <Link href="/contact">Get in touch ↗</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
