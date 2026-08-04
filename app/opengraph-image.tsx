import { ImageResponse } from "next/og";

export const alt =
  "Santiago López Zavaletta — Technical Delivery Leader, Enterprise AI Deployment.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = {
  paper: "#F6F7F5",
  ink: "#111411",
  signal: "#C23B2A",
  field: "#E6EBE8",
  graphite: "#59625D",
  inverse: "#151715",
};

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.paper,
          color: colors.ink,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            height: 82,
            margin: "0 58px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `2px solid ${colors.ink}`,
            fontFamily: "monospace",
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>SLZ / Buenos Aires</span>
          <span style={{ color: colors.graphite }}>
            Technical Delivery Leader
          </span>
        </div>

        <div
          style={{
            flex: 1,
            padding: "34px 58px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 88,
                fontWeight: 800,
                letterSpacing: "-0.055em",
                lineHeight: 0.87,
                textTransform: "uppercase",
              }}
            >
              <span>Santiago</span>
              <span style={{ marginLeft: 102 }}>López</span>
              <span>Zavaletta</span>
            </div>

            <div
              style={{
                width: 300,
                display: "flex",
                flexDirection: "column",
                borderTop: `5px solid ${colors.signal}`,
                paddingTop: 15,
              }}
            >
              <span
                style={{
                  color: colors.signal,
                  fontFamily: "monospace",
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                The work
              </span>
              <span
                style={{
                  marginTop: 9,
                  fontSize: 27,
                  fontWeight: 600,
                  lineHeight: 1.12,
                }}
              >
                AI + software delivery
              </span>
              <span
                style={{
                  marginTop: 10,
                  color: colors.graphite,
                  fontSize: 20,
                  lineHeight: 1.25,
                }}
              >
                Staffing, P&amp;L, Scrum, risk, and client decisions.
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              borderTop: `2px solid ${colors.ink}`,
              fontFamily: "monospace",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.045em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                paddingTop: 16,
              }}
            >
              <span style={{ color: colors.signal, marginRight: 10 }}>Now</span>
              Technical project management
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                paddingTop: 16,
                paddingLeft: 28,
                borderLeft: `1px solid ${colors.ink}`,
              }}
            >
              <span style={{ color: colors.signal, marginRight: 10 }}>Next</span>
              AI deployment
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: 16,
                paddingLeft: 28,
                color: colors.graphite,
              }}
            >
              slzavaletta.com
            </div>
          </div>
        </div>

        <div
          style={{
            height: 18,
            display: "flex",
            backgroundColor: colors.inverse,
          }}
        >
          <div
            style={{
              width: 246,
              display: "flex",
              backgroundColor: colors.signal,
            }}
          />
          <div
            style={{
              width: 142,
              display: "flex",
              backgroundColor: colors.field,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
