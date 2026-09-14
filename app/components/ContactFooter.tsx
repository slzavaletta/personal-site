import Image from "next/image";
import brandSignature from "@/app/brand/slz-signature.png";
import { ANTHEM } from "@/app/lib/content";
import { SITE_NAME } from "@/app/lib/site";
import { BackToTop } from "./BackToTop";

export function SiteFooter() {
  return (
    <footer id="footer" className="site-footer page-shell">
      <div className="footer-identity">
        <div className="footer-brand">
          <Image
            src={brandSignature}
            alt=""
            aria-hidden="true"
            sizes="(max-width: 760px) 96px, 176px"
            className="footer-brand__signature"
          />
          <span className="footer-name">{SITE_NAME}</span>
        </div>
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
      <BackToTop />
    </footer>
  );
}
