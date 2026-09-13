import Image from "next/image";
import { ANTHEM } from "@/app/lib/content";
import { SITE_NAME } from "@/app/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer page-shell">
      <div className="footer-identity">
        <span className="footer-name">{SITE_NAME}</span>
        <div className="signature" lang="es-AR">
          <Image
            src="/art/sol-de-mayo.webp"
            alt="Sol de Mayo"
            width={64}
            height={64}
            className="signature__sun"
          />
          <div>
            <p className="signature__line">{ANTHEM.line}</p>
            <p className="signature__source">{ANTHEM.source}</p>
          </div>
        </div>
      </div>
      <a className="footer-top" href="#main">
        Back to top ↑
      </a>
    </footer>
  );
}
