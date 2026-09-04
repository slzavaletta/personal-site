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
 * The page is regenerated at most once an hour so the ledger's GitHub row
 * stays current without a deploy. Everything else is static content.
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
        <div className="band band--field">
          <Ledger />
        </div>
        <CaseStudies />
        <div className="band band--wash">
          <Approach />
        </div>
        <div className="band band--field">
          <SystemsAndTools />
        </div>
        <Experience />
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
