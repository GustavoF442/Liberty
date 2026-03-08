import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Liberty Imóveis — Imobiliária em São João Batista SC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #2D5A3D 0%, #1a3a25 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "white",
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: "-1px",
            }}
          >
            Liberty Imóveis
          </div>
          <div
            style={{
              width: 80,
              height: 4,
              background: "#C4784A",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: 28,
              color: "#E8DCC8",
              textAlign: "center",
              lineHeight: 1.5,
              maxWidth: 700,
            }}
          >
            Casas, apartamentos e terrenos em São João Batista e região
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#E8DCC8",
              opacity: 0.6,
              marginTop: 16,
              letterSpacing: "3px",
              textTransform: "uppercase" as const,
            }}
          >
            libertyimoveis.com.br
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
