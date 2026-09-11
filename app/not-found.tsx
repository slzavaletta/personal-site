import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="page-shell atlas-page">
      <p className="eyebrow">404</p>
      <h1>Page not found.</h1>
      <p className="body-copy">The page may have moved.</p>
      <Link href="/" className="action">
        Back to the map
      </Link>
    </main>
  );
}
