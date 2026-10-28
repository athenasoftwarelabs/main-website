import { team } from "@/data/team"
import { restaurantHotelBillingSoftwareNepal } from "./posts/restaurant-hotel-billing-software-nepal"
import { schoolLmsNepalGuide } from "./posts/school-lms-nepal-guide"
import type { Block, Post } from "./types"

export type { Block, Faq, Post } from "./types"

// Add new posts here. Newest first when dates are equal.
const posts: Post[] = [schoolLmsNepalGuide, restaurantHotelBillingSoftwareNepal]

export function getAllPosts() {
  return [...posts].sort((a, b) => b.datePublished.localeCompare(a.datePublished))
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export function getAuthor(post: Post) {
  return team.find((m) => m.name === post.author) ?? team[0]
}

export function getRelatedPosts(post: Post, limit = 2) {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, limit)
}

/** Removes the inline **bold** and [link](href) markup, leaving readable text */
export function stripInline(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\((.+?)\)/g, "$1")
}

function blockText(block: Block): string {
  switch (block.type) {
    case "ul":
    case "ol":
      return block.items.join(" ")
    case "checklist":
      return [block.title, ...block.items].join(" ")
    case "callout":
      return `${block.title} ${block.text}`
    case "table":
      return [block.caption, ...block.head, ...block.rows.flat()].join(" ")
    case "cta":
      return `${block.title} ${block.text}`
    default:
      return block.text
  }
}

export function getWordCount(post: Post) {
  const text = [
    post.excerpt,
    ...post.takeaways,
    ...post.body.map(blockText),
    ...post.faqs.flatMap((f) => [f.q, f.a]),
  ].join(" ")
  return stripInline(text).split(/\s+/).filter(Boolean).length
}

/** Minutes to read at about 220 words per minute */
export function getReadingTime(post: Post) {
  return Math.max(1, Math.round(getWordCount(post) / 220))
}

export function getToc(post: Post) {
  const toc = post.body.flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text }] : []))
  return post.faqs.length ? [...toc, { id: "faq", text: "Frequently asked questions" }] : toc
}

/** Full post as Markdown, used by /llms-full.txt so AI assistants can read articles without HTML */
export function postToMarkdown(post: Post, siteUrl: string) {
  const link = (text: string) =>
    text.replace(/\[(.+?)\]\((\/.*?)\)/g, (_, label, href) => `[${label}](${siteUrl}${href})`)
  const lines: string[] = [
    `# ${post.title}`,
    "",
    `URL: ${siteUrl}/blog/${post.slug}`,
    `Author: ${post.author} | Published: ${post.datePublished} | Category: ${post.category}`,
    "",
    `> ${post.excerpt}`,
    "",
    "## Key takeaways",
    ...post.takeaways.map((t) => `- ${t}`),
    "",
  ]
  for (const b of post.body) {
    switch (b.type) {
      case "p":
        lines.push(link(b.text), "")
        break
      case "h2":
        lines.push(`## ${b.text}`, "")
        break
      case "h3":
        lines.push(`### ${b.text}`, "")
        break
      case "ul":
        lines.push(...b.items.map((i) => `- ${link(i)}`), "")
        break
      case "ol":
        lines.push(...b.items.map((i, n) => `${n + 1}. ${link(i)}`), "")
        break
      case "checklist":
        lines.push(`**${b.title}**`, ...b.items.map((i) => `- [ ] ${link(i)}`), "")
        break
      case "callout":
        lines.push(`> **${b.title}:** ${link(b.text)}`, "")
        break
      case "quote":
        lines.push(`> ${b.text}`, "")
        break
      case "table":
        lines.push(
          `**${b.caption}**`,
          "",
          `| ${b.head.join(" | ")} |`,
          `| ${b.head.map(() => "---").join(" | ")} |`,
          ...b.rows.map((r) => `| ${r.join(" | ")} |`),
          ""
        )
        break
      case "cta":
        lines.push(`**${b.title}.** ${b.text} ${siteUrl}${b.href}`, "")
        break
    }
  }
  if (post.faqs.length) {
    lines.push("## Frequently asked questions", "")
    for (const f of post.faqs) lines.push(`### ${f.q}`, "", f.a, "")
  }
  return lines.join("\n")
}
