import { NOW, ROLE_TRANSITION } from "@/app/lib/content";
import { getLatestActivity } from "@/app/lib/github";
import { CONTENT_UPDATED_ON } from "@/app/lib/site";
import { formatLongDate, formatRelative } from "@/app/lib/time";

type Row = {
  key: string;
  value: React.ReactNode;
  meta?: string;
};

/**
 * What is true right now. Most rows are edited by commit; the GitHub row is
 * fetched on the server and revalidated hourly, and simply disappears when
 * the API is unreachable. Nothing here runs in the browser.
 */
export async function Ledger() {
  const activity = await getLatestActivity();
  const now = new Date();

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

  if (activity) {
    rows.push({
      key: "Last commit",
      value: (
        <>
          <a href={activity.url} target="_blank" rel="noopener noreferrer">
            {activity.repo}
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          {activity.message ? ` — ${activity.message}` : null}
        </>
      ),
      meta: formatRelative(activity.at, now),
    });
  }

  rows.push(
    {
      key: "Availability",
      value: (
        <>
          <span aria-hidden="true" className="ledger__pulse" />
          {NOW.availability}
        </>
      ),
    },
    {
      key: "Page updated",
      value: formatLongDate(CONTENT_UPDATED_ON),
    },
  );

  return (
    <section
      aria-labelledby="ledger-heading"
      className="page-shell pb-12 sm:pb-14"
    >
      <div className="flex items-center gap-5 pb-4">
        <h2 id="ledger-heading" className="utility-label text-signal-ink">
          {NOW.label}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-rule-strong" />
      </div>

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
