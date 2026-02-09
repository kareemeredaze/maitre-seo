import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Maitre SEO — Partenaire Netlinking pour Agences et Experts SEO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,255,157,0.12) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* Logo */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          <span style={{ color: "#ffffff" }}>Maître</span>
          <span style={{ color: "#00ff9d" }}>SEO</span>
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#cccccc",
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Partenaire Netlinking pour Agences et Experts SEO
        </div>
        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: 32,
            fontSize: 18,
            color: "#888888",
          }}
        >
          <span>Guest Posts</span>
          <span style={{ color: "#00ff9d" }}>•</span>
          <span>Niche Edits</span>
          <span style={{ color: "#00ff9d" }}>•</span>
          <span>Marque Blanche</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
