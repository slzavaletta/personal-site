import "server-only";

const GITHUB_USER = "slzavaletta";
const REVALIDATE_SECONDS = 60 * 60;

/*
 * The portfolio's own repository is excluded: a ledger row that reports the
 * page's last deploy is the site talking about itself, not evidence of work.
 */
const EXCLUDED_REPOS = new Set([`${GITHUB_USER}/personal-site`]);

export type LatestActivity = {
  repo: string;
  url: string;
  message: string | null;
  at: string;
};

type PublicEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    commits?: { message: string }[];
  };
};

type Repo = {
  full_name: string;
  html_url: string;
  pushed_at: string;
  fork: boolean;
};

/*
 * Runs on the server only, so the token — when there is one — never reaches
 * the client. Without it the public API allows sixty requests an hour per IP,
 * which an hourly revalidation never approaches.
 */
function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "slzavaletta.com",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

/**
 * The most recent public push to one of the owner's own repositories, with
 * its commit message when the events feed has one. Falls back to the most
 * recently pushed repository, and to `null` when GitHub is unreachable — the
 * ledger simply omits the row.
 */
export async function getLatestActivity(): Promise<LatestActivity | null> {
  const events = await fetchJson<PublicEvent[]>(
    `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=50`,
  );

  const push = events?.find(
    (event) =>
      event.type === "PushEvent" &&
      event.payload?.commits?.length &&
      !EXCLUDED_REPOS.has(event.repo.name),
  );

  if (push) {
    const commits = push.payload?.commits ?? [];
    const last = commits[commits.length - 1];
    return {
      repo: push.repo.name,
      url: `https://github.com/${push.repo.name}`,
      message: last ? firstLine(last.message) : null,
      at: push.created_at,
    };
  }

  const repos = await fetchJson<Repo[]>(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=10&type=owner`,
  );
  const repo = repos?.find(
    (candidate) => !candidate.fork && !EXCLUDED_REPOS.has(candidate.full_name),
  );
  if (!repo) return null;

  return {
    repo: repo.full_name,
    url: repo.html_url,
    message: null,
    at: repo.pushed_at,
  };
}

function firstLine(message: string): string {
  const line = message.split("\n")[0]?.trim() ?? "";
  return line.length > 96 ? `${line.slice(0, 93).trimEnd()}…` : line;
}
