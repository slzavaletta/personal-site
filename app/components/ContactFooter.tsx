import Image from "next/image";
import { ANTHEM, LOCATION } from "@/app/lib/content";
import { SITE_NAME } from "@/app/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer page-shell">
      <div className="signature" lang="es-AR">
        <Image
          src="/art/sol-de-mayo.webp"
          alt="Sol de Mayo"
          width={144}
          height={144}
          className="signature__sun"
        />
        <div>
          <p className="signature__line">{ANTHEM.line}</p>
          <p className="signature__source">{ANTHEM.source}</p>
        </div>
      </div>
      <div className="footer-meta">
        <span>
          {LOCATION.city}, {LOCATION.country}
        </span>
        <span>{SITE_NAME}</span>
        <a href="#main">Back to top ↑</a>
      </div>
    </footer>
  );
}
