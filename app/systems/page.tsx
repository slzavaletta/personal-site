import { SystemsAndTools } from "@/app/components/SystemsAndTools";
import { SYSTEMS } from "@/app/lib/content";
import { pageMetadata } from "@/app/lib/page-metadata";

export const metadata = pageMetadata("Systems", SYSTEMS.body, "/systems");
export default function SystemsPage() {
  return (
    <main id="main" tabIndex={-1} className="page-shell atlas-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Systems / Source available</p>
          <h1>{SYSTEMS.heading}</h1>
        </div>
        <p className="body-copy">{SYSTEMS.body}</p>
      </div>
      <SystemsAndTools />
    </main>
  );
}
