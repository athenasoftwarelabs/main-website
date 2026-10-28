import type { LucideIcon } from "lucide-react"

// Inline text in blocks supports **bold** and [link text](/path) only.
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; tone: "tip" | "note" | "warning"; title: string; text: string }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "checklist"; title: string; items: string[] }
  | { type: "quote"; text: string }
  | { type: "cta"; title: string; text: string; href: string; label: string }

export type Faq = { q: string; a: string }

export type Post = {
  slug: string
  /** Visible H1 */
  title: string
  /** <title> tag; keep the main keyword first and under about 60 characters */
  seoTitle: string
  /** Meta description, about 140 to 160 characters */
  description: string
  /** Short intro used on cards and under the H1 */
  excerpt: string
  category: string
  keywords: string[]
  /** Must match a name in src/data/team.ts */
  author: string
  /** ISO dates (YYYY-MM-DD) */
  datePublished: string
  dateModified: string
  cover: { icon: LucideIcon; chips: string[] }
  takeaways: string[]
  body: Block[]
  faqs: Faq[]
}
