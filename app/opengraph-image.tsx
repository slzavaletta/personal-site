import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { CURRENT_TITLE, HERO, ROLE_TRANSITION } from "@/app/lib/content";
import { SITE_NAME } from "@/app/lib/site";

export const alt = `Santiago López Zavaletta — ${CURRENT_TITLE}. Enterprise AI and software delivery.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = {
  paper: "#F3E6C8",
  ink: "#3A2C22",
  mute: "#5C4A3A",
};

async function loadFont(filename: string) {
  return readFile(join(process.cwd(), "app/fonts", filename));
}

export default async function OpengraphImage() {
  const [andada, andadaItalic, atkinsonBold] = await Promise.all([
    loadFont("AndadaPro-SemiBold.ttf"),
    loadFont("AndadaPro-Italic.ttf"),
    loadFont("AtkinsonHyperlegible-Bold.ttf"),
  ]);

  const nextLine = ROLE_TRANSITION.public
    ? `Next: ${ROLE_TRANSITION.next.title}, ${ROLE_TRANSITION.next.company} — from ${ROLE_TRANSITION.startsOnLabel}`
    : "AI deployment";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: colors.paper,
        color: colors.ink,
        padding: "60px 72px 54px",
        fontFamily: '"Atkinson Hyperlegible", Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 21,
          color: colors.mute,
        }}
      >
        <span>
          {SITE_NAME} · {CURRENT_TITLE}
        </span>
        <span>slzavaletta.com</span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: 980,
          fontFamily: '"Andada Pro", Georgia, serif',
          fontSize: 88,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.04,
        }}
      >
        <span>{`${HERO.display}\u00A0`}</span>
        <span
          style={{
            fontFamily: '"Andada Pro Italic"',
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          {HERO.displayEmphasis}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: `1px solid ${colors.ink}22`,
          paddingTop: 22,
          fontSize: 21,
        }}
      >
        <span style={{ color: colors.ink }}>{nextLine}</span>
        <span style={{ color: colors.mute }}>Buenos Aires</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Andada Pro",
          data: andada,
          weight: 600,
          style: "normal",
        },
        {
          name: "Andada Pro Italic",
          data: andadaItalic,
          weight: 400,
          style: "italic",
        },
        {
          name: "Atkinson Hyperlegible",
          data: atkinsonBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
