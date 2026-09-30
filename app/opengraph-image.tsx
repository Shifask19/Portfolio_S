import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const runtime = "edge";
export const alt = profile.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.08)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.06)",
            filter: "blur(80px)",
          }}
        />

        {/* Initials badge */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "rgba(34,197,94,0.15)",
            border: "2px solid rgba(34,197,94,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            fontSize: 32,
            fontWeight: 700,
            color: "#22c55e",
          }}
        >
          SS
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#f1f5f9",
            letterSpacing: "-1px",
            marginBottom: 16,
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#22c55e",
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          {profile.title}
        </div>

        <div
          style={{
            fontSize: 18,
            color: "#64748b",
            maxWidth: 700,
            textAlign: "center",
          }}
        >
          {profile.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
