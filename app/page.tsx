import { Approach } from "@/app/components/Approach";
import { CaseStudies } from "@/app/components/CaseStudies";
import { ContactSection, SiteFooter } from "@/app/components/ContactFooter";
import { EditorialHero } from "@/app/components/EditorialHero";
import { Experience } from "@/app/components/Experience";
import { HashTarget } from "@/app/components/HashTarget";
import { Ledger } from "@/app/components/Ledger";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SystemsAndTools } from "@/app/components/SystemsAndTools";
import { formatLocalClock } from "@/app/lib/time";

/*
 * Keep an hourly internal page cache. The root HTTP response is no-store
 * because Next 15 replaces Vary on rendered HTML; see next.config.mjs.
 */
export const revalidate = 3600;

export default function Home() {
  const initialClock = formatLocalClock(new Date());

  return (
    <>
      <SiteHeader initialClock={initialClock} />
      <HashTarget />
      <main id="main" tabIndex={-1}>
        <EditorialHero />
        <CaseStudies />
        <div className="band band--wash">
          <Approach />
        </div>
        <div className="band band--field">
          <SystemsAndTools />
        </div>
        <Experience />
        <div className="band band--field">
          <Ledger />
        </div>
        <div className="night night--enter">
          <ContactSection />
        </div>
      </main>
      <div className="night">
        <SiteFooter />
      </div>
    </>
  );
}
