import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import {
  buildSolDeMayoSvg,
  SOL_GOLD,
  SOL_NAVY,
} from "@/app/components/SolDeMayo";
import { CURRENT_TITLE, HERO, ROLE_TRANSITION } from "@/app/lib/content";
import { SITE_NAME } from "@/app/lib/site";

export const alt = `Santiago López Zavaletta — ${CURRENT_TITLE}. Enterprise AI and software delivery.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = {
  paper: "#E8EEF4",
  ink: SOL_NAVY,
  mute: "#3A4E66",
  gold: SOL_GOLD,
  navy: SOL_NAVY,
};

async function loadFont(filename: string) {
  return readFile(join(process.cwd(), "app/fonts", filename));
}

export default async function OpengraphImage() {
  const [fraunces, frauncesItalic] = await Promise.all([
    loadFont("Fraunces-SemiBold.ttf"),
    loadFont("Fraunces-Italic.ttf"),
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
        backgroundColor: colors.navy,
        color: colors.paper,
        padding: "48px 56px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          backgroundColor: colors.paper,
          color: colors.ink,
          padding: "48px 52px 40px",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: colors.mute,
          }}
        >
          <span>
            {SITE_NAME} · {CURRENT_TITLE}
          </span>
          <img
            alt=""
            width={58}
            height={58}
            src={`data:image/svg+xml,${encodeURIComponent(buildSolDeMayoSvg())}`}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: 980,
            fontFamily: "Fraunces",
            fontSize: 76,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
          }}
        >
          <span>{`${HERO.display}\u00A0`}</span>
          <span
            style={{
              fontFamily: "Fraunces Italic",
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
            borderTop: `3px solid ${colors.gold}`,
            paddingTop: 22,
            fontSize: 21,
          }}
        >
          <span style={{ color: colors.ink }}>{nextLine}</span>
          <span style={{ color: colors.mute }}>Buenos Aires</span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Fraunces",
          data: fraunces,
          weight: 600,
          style: "normal",
        },
        {
          name: "Fraunces Italic",
          data: frauncesItalic,
          weight: 400,
          style: "italic",
        },
      ],
    },
  );
}
