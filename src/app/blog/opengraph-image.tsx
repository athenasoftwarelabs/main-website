import { renderOgImage } from "@/lib/og-image"

export const alt = "Athena Software Labs blog: software guides for Nepali schools and businesses"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Athena Software Labs Blog",
    title: "Software guides for Nepal's schools & businesses",
    subtitle: "School LMS, billing & POS, websites and going digital",
  })
}
