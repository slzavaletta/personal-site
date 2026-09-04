import type { ReactNode } from "react";

import { NOW, ROLE_TRANSITION } from "@/app/lib/content";
import { getLatestActivity } from "@/app/lib/github";
import { formatShortDate } from "@/app/lib/time";

type Row = {
  key: string;
  value: ReactNode;
  meta?: string;
};

/**
 * What is true right now. Most rows are edited by commit; the GitHub row is
 * fetched on the server and revalidated hourly, and simply disappears when
 * the API is unreachable. Nothing here runs in the browser.
 */
export async function Ledger() {
  const activity = await getLatestActivity();

  const rows: Row[] = [
    {
      key: "Role",
      value: `${ROLE_TRANSITION.current.title}, ${ROLE_TRANSITION.current.company}.`,
      meta: `Since ${ROLE_TRANSITION.current.since}`,
    },
  ];

  if (ROLE_TRANSITION.public) {
    rows.push({
      key: "Next",
      value: `${ROLE_TRANSITION.next.title}, ${ROLE_TRANSITION.next.company} — ${ROLE_TRANSITION.next.domain}.`,
      meta: `From ${ROLE_TRANSITION.startsOnLabel}`,
    });
  }

  rows.push(
    { key: "Building", value: NOW.building },
    { key: "Learning", value: NOW.learning },
  );

  /*
   * An absolute date, not "3 days ago": the page is cached for up to an hour,
   * and a relative time frozen at render reads as wrong the moment it is not.
   */
  if (activity) {
    rows.push({
      key: "Last push",
      value: (
        <>
          <a href={activity.url} target="_blank" rel="noopener noreferrer">
            {activity.repo}
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          {activity.message ? ` — ${activity.message}` : null}
        </>
      ),
      meta: formatShortDate(activity.at),
    });
  }

  rows.push({
    key: "Availability",
    value: (
      <>
        <span aria-hidden="true" className="live-dot" />
        {NOW.availability}
      </>
    ),
  });

  return (
    <section
      aria-labelledby="ledger-heading"
      className="page-shell py-10 sm:py-12"
    >
      <h2 id="ledger-heading" className="utility-label pb-3">
        {NOW.label}
      </h2>

      <dl className="ledger">
        {rows.map((row) => (
          <div key={row.key} className="ledger__row">
            <dt className="ledger__key utility-label">{row.key}</dt>
            <dd className="ledger__value">
              {row.value}
              {row.meta ? (
                <span className="ledger__meta figure block sm:mt-0.5">
                  {row.meta}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
