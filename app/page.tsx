import { CaseStudies } from "@/app/components/CaseStudies";
import {
  ContactSection,
  SiteFooter,
} from "@/app/components/ContactFooter";
import { CurrentAndNext } from "@/app/components/CurrentAndNext";
import { EditorialHero } from "@/app/components/EditorialHero";
import { ExperienceAndCredentials } from "@/app/components/ExperienceAndCredentials";
import { PilotDecisionBrief } from "@/app/components/PilotDecisionBrief";
import { ProofBand } from "@/app/components/ProofBand";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SystemsAndTools } from "@/app/components/SystemsAndTools";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <EditorialHero />
        <ProofBand />
        <CurrentAndNext />
        <CaseStudies />
        <PilotDecisionBrief />
        <SystemsAndTools />
        <ExperienceAndCredentials />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
