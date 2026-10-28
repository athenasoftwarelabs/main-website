import { faqs } from "@/data/faqs"
import { lmsModules } from "@/data/lms-features"
import { services } from "@/data/services"
import { mainNav, siteConfig } from "@/data/site"
import { team } from "@/data/team"
import { getAllPosts, postToMarkdown } from "@/content/blog"
import { SITE_URL } from "@/lib/seo"

// Builds /llms.txt (a short, link-rich summary for AI assistants, see llmstxt.org)
// and /llms-full.txt (the same plus full service details and every blog article).

const pageSummaries: Record<string, string> = {
  "/": "Overview of the company, services, the School LMS and who we serve",
  "/services": "Every service in detail, the School LMS modules and frequently asked questions",
  "/about": "Company story, mission, values and team",
  "/blog": "Practical guides for schools and businesses in Nepal",
  "/contact": "Contact form, phone, email, office hours and map",
}

function header() {
  const { contact } = siteConfig
  return [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.name} is a software and IT company based in ${contact.address}. It builds school LMS and school management software, billing and POS systems, websites and CMS platforms, e-commerce stores, custom software and Android and iOS apps for schools, colleges, hotels, restaurants, shops and businesses across Nepal.`,
    "",
    "Key facts:",
    `- Location: ${contact.address} (serves clients across Nepal, with on-site support in Koshi Province)`,
    `- Phone: ${contact.phone}`,
    `- Email: ${contact.email}`,
    `- Office hours: ${contact.hours} (Nepal Time)`,
    `- Website: ${SITE_URL}`,
    `- Flagship product: School LMS covering ${lmsModules.map((m) => m.title.toLowerCase()).join(", ")}`,
    `- Team: ${team.map((m) => `${m.name} (${m.role})`).join(", ")}`,
    "",
  ]
}

export function buildLlmsTxt() {
  const lines = [
    ...header(),
    "## Main pages",
    "",
    ...mainNav.map(
      (item) => `- [${item.title}](${item.href === "/" ? `${SITE_URL}/` : SITE_URL + item.href}): ${pageSummaries[item.href] ?? ""}`
    ),
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${SITE_URL}/services#${s.id}): ${s.short}`),
    "",
    "## Blog",
    "",
    ...getAllPosts().map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`),
    "",
    "## Optional",
    "",
    `- [Full content for AI assistants](${SITE_URL}/llms-full.txt): Service details and the full text of every blog article`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ]
  return lines.join("\n")
}

export function buildLlmsFullTxt() {
  const lines = [...header(), "## Services", ""]
  for (const s of services) {
    lines.push(`### ${s.title}`, "", `URL: ${SITE_URL}/services#${s.id}`, "", s.description, "", ...s.features.map((f) => `- ${f}`), "")
  }
  lines.push("## Frequently asked questions", "")
  for (const f of faqs) lines.push(`### ${f.q}`, "", f.a, "")
  lines.push("## Blog articles", "")
  for (const post of getAllPosts()) lines.push(postToMarkdown(post, SITE_URL), "", "---", "")
  return lines.join("\n")
}
