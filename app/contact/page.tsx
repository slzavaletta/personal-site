import { CONTACT, SITE_LINKS } from "@/app/lib/content";
import { SITE_EMAIL } from "@/app/lib/site";
import { pageMetadata } from "@/app/lib/page-metadata";

export const metadata = pageMetadata("Contact", CONTACT.body, "/contact");
export default function ContactPage() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="page-shell atlas-page contact-page"
    >
      <p className="eyebrow">Contact / Open to conversations</p>
      <h1>{CONTACT.heading}</h1>
      <p className="contact-copy">{CONTACT.body}</p>
      <a href={SITE_LINKS.email} className="contact-email">
        {SITE_EMAIL} ↗
      </a>
      <div className="link-row">
        <a href={SITE_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗<span className="sr-only"> (opens in new tab)</span>
        </a>
        <a href={SITE_LINKS.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗<span className="sr-only"> (opens in new tab)</span>
        </a>
        <a href={SITE_LINKS.resume} download>
          Download résumé ↗
        </a>
      </div>
    </main>
  );
}
