import {
  ANTHEM,
  BRIEF,
  CASE_STUDIES,
  CERTIFICATIONS,
  CONTACT,
  EXPERIENCE,
  EXPERIENCE_SECTION,
  HERO,
  INDUSTRIES,
  LOCATION,
  NOW,
  PROOF_LINE,
  ROLE_TRANSITION,
  SITE_LINKS,
  SYSTEMS,
  TOOL_GROUPS,
  WORK_INTRO,
} from "@/app/lib/content";
import { CONTENT_UPDATED_ON, SITE_NAME, SITE_URL } from "@/app/lib/site";

export const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=no";
export const DISCOVERY_LINKS = `<${SITE_URL}/llms.txt>; rel="describedby"; type="text/plain", <${SITE_URL}/index.md>; rel="alternate"; type="text/markdown"`;

/** The public Markdown and HTML read the same facts; no second biography to drift. */
export function portfolioMarkdown() {
  const caseText = (item: (typeof CASE_STUDIES)[number]) =>
    `### ${item.title}\n\n${item.label} · ${item.period}\n\n${item.summary}\n\n**Context:** ${item.context}\n\n**Constraint:** ${item.constraint}`;
  const blueCrab = EXPERIENCE.find(
    (item) => item.company === "Blue Crab Consulting",
  )!;
  return (
    [
      `# ${SITE_NAME}`,
      `> ${HERO.display} ${HERO.displayEmphasis}`,
      `Source: ${SITE_URL}/\n\nContent updated: ${CONTENT_UPDATED_ON}\n\nLocation: ${LOCATION.city}, ${LOCATION.country}`,
      HERO.role,
      HERO.statement,
      HERO.supporting,
      HERO.direction,
      `## Website pages\n\n[Work](${SITE_URL}/) · [Approach](${SITE_URL}/approach) · [Systems](${SITE_URL}/systems) · [Profile](${SITE_URL}/profile) · [Contact](${SITE_URL}/contact)`,
      `[${HERO.primaryAction.label}](${SITE_URL}/#work) · [${HERO.secondaryAction.label}](${SITE_URL}${SITE_LINKS.resume})`,
      `## ${WORK_INTRO.heading}`,
      WORK_INTRO.body,
      ...CASE_STUDIES.map(
        (item) => `[${item.label}](${SITE_URL}/work/${item.id})`,
      ),
      PROOF_LINE,
      caseText(CASE_STUDIES[0]),
      `### ${blueCrab.company}\n\n${blueCrab.title} · ${blueCrab.period}\n\nConcurrent with Globant\n\n${blueCrab.body}`,
      caseText(CASE_STUDIES[1]),
      `## ${BRIEF.label}\n\n### ${BRIEF.heading}`,
      BRIEF.body,
      ...BRIEF.fields.map(
        (item) =>
          `### ${item.title}\n\n**${BRIEF.panelLabels.prompt}:** ${item.prompt}\n\n**${BRIEF.panelLabels.whenMissing}:** ${item.whenMissing}\n\n**${BRIEF.panelLabels.fromTheWork}:** ${item.fromTheWork}`,
      ),
      `## ${SYSTEMS.heading}`,
      SYSTEMS.body,
      ...SYSTEMS.projects.map(
        (item) =>
          `### ${item.name}\n\n${item.body}\n\n[Source on GitHub](${item.href})`,
      ),
      SYSTEMS.infrastructure,
      ...TOOL_GROUPS.map(
        (group) =>
          `### ${group.label}\n\n${group.tools.map((tool) => tool.name).join(", ")}\n\n${group.note}`,
      ),
      `## ${EXPERIENCE_SECTION.heading}`,
      EXPERIENCE_SECTION.note,
      ...EXPERIENCE.map(
        (item) =>
          `### ${item.company}\n\n${item.period} · ${item.title}${"upcoming" in item && item.upcoming ? "\n\nUpcoming" : ""}${"concurrent" in item && item.concurrent ? "\n\nConcurrent with Globant" : ""}\n\n${item.body}`,
      ),
      caseText(CASE_STUDIES[2]),
      `### Credentials\n\n${CERTIFICATIONS.map((item) => `- ${item.name}${"issuer" in item ? ` — ${item.issuer}, ${item.year}` : ""}. ${item.status}.`).join("\n")}`,
      `### Where I have worked\n\n${INDUSTRIES.slice(0, -1).join(", ")}, and ${INDUSTRIES.at(-1)}.`,
      `## ${NOW.label}`,
      `**Role:** ${ROLE_TRANSITION.current.title}, ${ROLE_TRANSITION.current.company}. Since ${ROLE_TRANSITION.current.since}`,
      ...(ROLE_TRANSITION.public
        ? [
            `**Next:** ${ROLE_TRANSITION.next.title}, ${ROLE_TRANSITION.next.company} — ${ROLE_TRANSITION.next.domain}. From ${ROLE_TRANSITION.startsOnLabel}`,
          ]
        : []),
      `**Building:** ${NOW.building}`,
      `**Learning:** ${NOW.learning}`,
      `**Availability:** ${NOW.availability}`,
      `## ${CONTACT.heading}`,
      CONTACT.body,
      `[Email](${SITE_LINKS.email}) · [LinkedIn](${SITE_LINKS.linkedin}) · [GitHub](${SITE_LINKS.github})`,
      `*${ANTHEM.line}*\n\n${ANTHEM.source}`,
    ].join("\n\n") + "\n"
  );
}

export function llmsText() {
  return `# ${SITE_NAME}\n\n> ${HERO.role}\n\n${HERO.statement}\n\nThis is a public personal portfolio. The HTML and full Markdown are generated from the same authored content. Dates, concurrent engagements, upcoming roles, and exploratory tools are explicitly labelled. No account or API key is needed to read it.\n\n## Public sources\n\n- [Full portfolio](${SITE_URL}/index.md): complete experience, selected work, approach, systems, credentials and contact details.\n- [Website](${SITE_URL}/): human-readable version; also accepts Accept: text/markdown.\n- [Approach](${SITE_URL}/approach): the full five-field delivery brief.\n- [Systems](${SITE_URL}/systems): tools, source links and infrastructure.\n- [Profile](${SITE_URL}/profile): experience, current and upcoming roles, credentials and Now.\n- [Contact](${SITE_URL}/contact): email, résumé and public profiles.\n${CASE_STUDIES.map((item) => `- [${item.label}](${SITE_URL}/work/${item.id}): ${item.title}.`).join("\n")}\n- [Résumé](${SITE_URL}${SITE_LINKS.resume}): downloadable PDF.\n- [Scope Sentinel](${SYSTEMS.projects[0].href}): source and documentation.\n- [SOW Intake](${SYSTEMS.projects[1].href}): source and documentation.\n\nContent updated: ${CONTENT_UPDATED_ON}.\n`;
}
