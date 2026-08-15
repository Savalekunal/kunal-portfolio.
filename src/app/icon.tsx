import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default function Icon() {
  const photoBase64 = readFileSync(join(process.cwd(), "public", "photo-v2.jpg")).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070c09",
          borderRadius: 14,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse (satori) requires a plain <img>, not next/image */}
        <img
          src={`data:image/jpeg;base64,${photoBase64}`}
          alt=""
          width={64}
          height={64}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", borderRadius: 14 }}
        />
      </div>
    ),
    { ...size }
  );
}
