import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

// Shared renderer for the Open Graph / social share images (1200 x 630).
// Satori needs real font files (ttf, otf or woff), so these come from @fontsource rather than next/font.

const fontDir = join(process.cwd(), "node_modules/@fontsource/plus-jakarta-sans/files")
const brandDir = join(process.cwd(), "public/brand")

const svgDataUri = (svg: Buffer) => `data:image/svg+xml;base64,${svg.toString("base64")}`

// Load once per server instance and reuse for every image
const assets = Promise.all([
  readFile(join(fontDir, "plus-jakarta-sans-latin-800-normal.woff")),
  readFile(join(fontDir, "plus-jakarta-sans-latin-500-normal.woff")),
  readFile(join(brandDir, "logo-mark.svg")),
  readFile(join(brandDir, "wordmark-dark.svg")),
])

export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  const [bold, medium, logo, wordmark] = await assets
  const titleSize = title.length > 80 ? 52 : title.length > 55 ? 60 : 70

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          backgroundColor: "#0b1220",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(4,125,252,0.55), transparent 42%), radial-gradient(circle at 0% 100%, rgba(16,207,199,0.4), transparent 45%)",
          color: "#ffffff",
          fontFamily: "Jakarta",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori only renders plain <img> */}
          <img src={svgDataUri(logo)} width={62} height={71} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori only renders plain <img> */}
          <img src={svgDataUri(wordmark)} width={196} height={45} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1000 }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 500,
              color: "#10cfc7",
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 28, fontWeight: 500, color: "#a5b4c8", lineHeight: 1.4 }}>
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 500,
            color: "#cbd5e1",
          }}
        >
          <div style={{ display: "flex" }}>www.athenasoftwarelabs.com</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", width: 10, height: 10, borderRadius: 10, backgroundColor: "#10cfc7" }} />
            Urlabari, Koshi Province, Nepal
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 8,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, #047dfc, #10cfc7)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Jakarta", data: bold, weight: 800, style: "normal" },
        { name: "Jakarta", data: medium, weight: 500, style: "normal" },
      ],
    }
  )
}
