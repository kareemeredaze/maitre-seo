import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Contact Maitre SEO — Discutons de votre stratégie netlinking";
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
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
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          <span style={{ color: "#ffffff" }}>Maître</span>
          <span style={{ color: "#00ff9d" }}>SEO</span>
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#ffffff",
            marginBottom: 16,
          }}
        >
          Contactez-nous
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#cccccc",
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Notre équipe vous répond sous 24h pour discuter de votre stratégie de
          netlinking
        </div>
      </div>
    ),
    { ...size }
  );
}
