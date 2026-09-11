import { BriefInstrument } from "@/app/components/BriefInstrument";
import { BRIEF } from "@/app/lib/content";
import { pageMetadata } from "@/app/lib/page-metadata";

export const metadata = pageMetadata("Approach", BRIEF.body, "/approach");
export default function ApproachPage() {
  return (
    <main id="main" tabIndex={-1} className="page-shell atlas-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Approach / The delivery brief</p>
          <h1>{BRIEF.heading}</h1>
        </div>
        <p className="body-copy">{BRIEF.body}</p>
      </div>
      <BriefInstrument />
    </main>
  );
}
