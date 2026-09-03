import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { CURRENT_TITLE, ROLE_TRANSITION } from "@/app/lib/content";
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
  const [andada, atkinson, atkinsonBold] = await Promise.all([
    loadFont("AndadaPro-SemiBold.ttf"),
    loadFont("AtkinsonHyperlegible-Regular.ttf"),
    loadFont("AtkinsonHyperlegible-Bold.ttf"),
  ]);

  const nowLine = `${CURRENT_TITLE} · ${ROLE_TRANSITION.current.company}`;
  const nextLine = ROLE_TRANSITION.public
    ? `${ROLE_TRANSITION.next.title}, ${ROLE_TRANSITION.next.company}`
    : "AI deployment";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        backgroundColor: colors.paper,
        color: colors.ink,
        padding: "56px 64px 52px",
        fontFamily: '"Atkinson Hyperlegible", Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 168,
          height: 2,
          backgroundColor: `${colors.ink}33`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 78,
          left: 660,
          width: 180,
          height: 180,
          borderRadius: 999,
          backgroundColor: colors.ink,
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: colors.mute,
        }}
      >
        <span>Buenos Aires</span>
        <span>slzavaletta.com</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontFamily: '"Andada Pro", Georgia, serif',
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            maxWidth: 920,
            fontFamily: '"Atkinson Hyperlegible", Arial, sans-serif',
            fontSize: 28,
            fontWeight: 400,
            lineHeight: 1.35,
          }}
        >
          I own the delivery around AI work: the team, the budget, the risk, and
          the decision the client has to make.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 48,
          borderTop: `1px solid ${colors.ink}22`,
          paddingTop: 22,
          fontSize: 22,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ color: colors.mute, fontSize: 16, fontWeight: 700 }}>
            Now
          </span>
          <span>{nowLine}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ color: colors.mute, fontSize: 16, fontWeight: 700 }}>
            Next
          </span>
          <span>{nextLine}</span>
        </div>
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
          name: "Atkinson Hyperlegible",
          data: atkinson,
          weight: 400,
          style: "normal",
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
