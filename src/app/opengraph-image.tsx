import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#070c09",
          backgroundImage:
            "linear-gradient(rgba(232,243,236,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,243,236,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#e8f3ec",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#ff7a29", display: "flex" }} />
          <span style={{ fontSize: 26, color: "#ff7a29" }}>kunal.savale()</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 72, fontWeight: 700, letterSpacing: -1 }}>Kunal Savale</span>
          <span style={{ fontSize: 34, color: "#8fa89a", marginTop: 14 }}>
            QA Automation Engineer | SDET
          </span>
          <span style={{ fontSize: 24, color: "#ff7a29", marginTop: 26 }}>
            Breaking software before users do. Automating quality. Testing AI.
          </span>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Playwright", "Selenium", "CI/CD", "GenAI Testing", "API Testing"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                border: "1px solid rgba(232,243,236,0.2)",
                borderRadius: 999,
                padding: "10px 20px",
                fontSize: 20,
                color: "#c7d8ce",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
