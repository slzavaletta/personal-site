import { Experience } from "@/app/components/Experience";
import { Ledger } from "@/app/components/Ledger";
import { HERO } from "@/app/lib/content";
import { pageMetadata } from "@/app/lib/page-metadata";

export const metadata = pageMetadata("Profile", HERO.supporting, "/profile");
export const revalidate = 3600;
export default function ProfilePage() {
  return (
    <main id="main" tabIndex={-1} className="page-shell atlas-page">
      <div className="profile-intro">
        <div>
          <p className="eyebrow">Profile / Buenos Aires, Argentina</p>
          <h1>
            Santiago
            <br />
            López Zavaletta.
          </h1>
          <p className="body-copy">{HERO.supporting}</p>
          <p className="body-copy">{HERO.direction}</p>
          <p className="role-line">{HERO.role}</p>
        </div>
        <Ledger />
      </div>
      <Experience />
    </main>
  );
}
