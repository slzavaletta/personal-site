import Link from "next/link";
import { notFound } from "next/navigation";
import { BRIEF, CASE_STUDIES } from "@/app/lib/content";
import { pageMetadata } from "@/app/lib/page-metadata";
import { SITE_NAME, SITE_URL } from "@/app/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return CASE_STUDIES.map((item) => ({ slug: item.id }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = CASE_STUDIES.find((item) => item.id === slug);
  if (!item) notFound();
  return pageMetadata(item.label, item.summary, "/work/" + item.id);
}
export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const item = CASE_STUDIES.find((item) => item.id === slug);
  if (!item) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.summary,
    url: SITE_URL + "/work/" + item.id,
    author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  };
  return (
    <main id="main" tabIndex={-1} className="page-shell atlas-page case-page">
      <div className="case-top">
        <Link href="/#work">← Back to the map</Link>
        <p className="eyebrow">{item.period}</p>
      </div>
      <p className="eyebrow">{item.label}</p>
      <h1>{item.title}</h1>
      <div className="case-content">
        <p className="case-summary">{item.summary}</p>
        <dl>
          <div>
            <dt>Context</dt>
            <dd>{item.context}</dd>
          </div>
          <div>
            <dt>Constraint</dt>
            <dd>{item.constraint}</dd>
          </div>
        </dl>
      </div>
      <div className="case-related">
        <div>
          <h2>Approach</h2>
          <Link href="/approach" className="text-link">
            Explore the delivery brief ↗
          </Link>
        </div>
        <p className="body-copy">{BRIEF.body}</p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
