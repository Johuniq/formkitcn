import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "FormKitCN — Open-Source shadcn/ui Form Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#09090b",
        backgroundImage:
          "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 50%, rgba(14,165,233,0.06) 100%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(59,130,246,0.12)",
          filter: "blur(100px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.3)",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
            <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
            <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 800,
              background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            formkitcn
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#a1a1aa",
              margin: 0,
              fontWeight: 500,
            }}
          >
            Open-Source shadcn/ui Form Builder
          </p>
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            "Drag & Drop",
            "18+ Fields",
            "Zod Validation",
            "Code Export",
            "Multi-Step",
          ].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 16px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                fontSize: "16px",
                color: "#e4e4e7",
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* URL */}
        <p
          style={{
            fontSize: "18px",
            color: "#52525b",
            marginTop: "24px",
            fontFamily: "monospace",
          }}
        >
          formkitcn.jolyui.dev
        </p>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
