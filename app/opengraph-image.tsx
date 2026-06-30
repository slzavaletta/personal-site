import { ImageResponse } from "next/og";

export const alt =
  "Santiago López Zavaletta, Senior AI Project Manager. Project Manager who builds.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c0c0c",
          padding: "72px",
          // subtle on-palette dot field, mono / low-contrast
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(250,250,250,0.06) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 24,
            color: "#a1a1a1",
            fontFamily: "monospace",
            letterSpacing: "0.04em",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 12,
              backgroundColor: "#3fb950",
              marginRight: 16,
            }}
          />
          Senior Project Manager · AI Delivery &amp; Program Management
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 104,
              fontWeight: 600,
              color: "#fafafa",
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
            }}
          >
            <span>Project Manager who&nbsp;</span>
            <span style={{ color: "#3fb950" }}>builds.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "#a1a1a1",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            I lead software and AI delivery, and build the agentic tooling and
            infrastructure that runs it.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#fafafa",
            fontFamily: "monospace",
          }}
        >
          <span>Santiago López Zavaletta</span>
          <span style={{ color: "#6b6b6b" }}>slzavaletta.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
