import { renderOgImage } from "@/lib/og-image"

export const alt = "Athena Software Labs: school LMS, software and IT solutions in Nepal"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Software · School LMS · Apps",
    title: "Digital solutions for Nepal's schools & businesses",
    subtitle: "School LMS, billing & POS, websites, e-commerce and Android & iOS apps",
  })
}
