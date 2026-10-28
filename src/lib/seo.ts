import type { Metadata } from "next"
import { siteConfig } from "@/data/site"
import { services } from "@/data/services"
import { team, type TeamMember } from "@/data/team"
import type { Faq, Post } from "@/content/blog/types"

export const SITE_URL = siteConfig.url
export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const BLOG_ID = `${SITE_URL}/blog#blog`

/** Last content update of the static pages. Bump it when page content changes (used in the sitemap). */
export const PAGES_UPDATED = "2026-10-28"

export const absoluteUrl = (path = "/") => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`)

const TITLE_SUFFIX = ` | ${siteConfig.name}`

type PageMetaInput = {
  /** Page title without the brand. The brand is appended when the result stays under about 70 characters. */
  title: string
  description: string
  /** Path of the page, e.g. "/services". Used for the canonical URL and og:url. */
  path: string
  keywords?: string[]
  /** Use the title exactly as given (no brand suffix) */
  absolute?: boolean
  /**
   * Share image path. Defaults to the site-wide image. Pages with their own opengraph-image file pass its path,
   * so og:image and twitter:image always match (pages that set openGraph don't inherit the root image otherwise).
   */
  image?: { path: string; alt: string }
  article?: {
    publishedTime: string
    modifiedTime: string
    authors: string[]
    section: string
    tags: string[]
  }
}

const DEFAULT_IMAGE = {
  path: "/opengraph-image",
  alt: "Athena Software Labs: school LMS, software and IT solutions in Nepal",
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  absolute,
  article,
  image = DEFAULT_IMAGE,
}: PageMetaInput): Metadata {
  const fullTitle = absolute || (title + TITLE_SUFFIX).length > 70 ? title : title + TITLE_SUFFIX
  const images = [{ url: image.path, width: 1200, height: 630, alt: image.alt }]
  const shared = {
    url: path,
    siteName: siteConfig.name,
    locale: "en_US",
    title: fullTitle,
    description,
    images,
  }

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: article
      ? {
          ...shared,
          type: "article",
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          authors: article.authors,
          section: article.section,
          tags: article.tags,
        }
      : { ...shared, type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  }
}

// ---------------------------------------------------------------------------
// Schema.org (JSON-LD) builders
// ---------------------------------------------------------------------------

type Schema = Record<string, unknown>

// Placeholder social links (bare domains like https://facebook.com) are not real profiles, so skip them
const isProfileUrl = (href: string) => {
  try {
    return new URL(href).pathname.replace(/\/$/, "").length > 0
  } catch {
    return false
  }
}

const phoneE164 = siteConfig.contact.phoneHref.replace("tel:", "")

const isoDateTime = (date: string) => `${date}T09:00:00+05:45`

export function organizationSchema(): Schema {
  const { contact } = siteConfig
  const sameAs = siteConfig.socials.map((s) => s.href).filter(isProfileUrl)

  return {
    // ProfessionalService is a LocalBusiness (and Organization) type, so it covers both
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/icon-512.png`, width: 512, height: 512 },
    image: `${SITE_URL}/brand/icon-512.png`,
    email: contact.email,
    telephone: phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.locality,
      addressRegion: contact.region,
      addressCountry: contact.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: contact.geo.latitude, longitude: contact.geo.longitude },
    hasMap: `https://www.openstreetmap.org/?mlat=${contact.geo.latitude}&mlon=${contact.geo.longitude}#map=15/${contact.geo.latitude}/${contact.geo.longitude}`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: contact.openingHours.days,
      opens: contact.openingHours.opens,
      closes: contact.openingHours.closes,
    },
    areaServed: { "@type": "Country", name: "Nepal" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: phoneE164,
      email: contact.email,
      areaServed: "NP",
      availableLanguage: ["English", "Nepali"],
    },
    // The first team member is the founder
    founder: { "@type": "Person", name: team[0].name, jobTitle: team[0].role },
    knowsAbout: [
      "School management software",
      "Learning management systems",
      "Billing and POS software",
      "Custom software development",
      "Mobile app development",
      "Website and CMS development",
      "E-commerce development",
      "IT consulting",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  }
}

export function websiteSchema(): Schema {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  }
}

export function webPageSchema({
  type = "WebPage",
  path,
  name,
  description,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage"
  path: string
  name: string
  description: string
}): Schema {
  const url = absoluteUrl(path)
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...(path !== "/" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    inLanguage: "en",
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Schema {
  const last = items[items.length - 1]
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(last.path)}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqSchema(faqs: readonly Faq[], path: string): Schema {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
}

export function personSchema(member: TeamMember): Schema {
  const sameAs = [member.linkedin].filter(isProfileUrl)
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/about#${member.initials.toLowerCase()}`,
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    url: `${SITE_URL}/about#team`,
    ...(member.photo ? { image: `${SITE_URL}${member.photo.src}` } : {}),
    worksFor: { "@id": ORG_ID },
    ...(sameAs.length ? { sameAs } : {}),
  }
}

export function servicesSchema(): Schema {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/services#services`,
    name: "Software and IT services by Athena Software Labs",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/services#${s.id}`,
        name: s.title,
        serviceType: s.title,
        description: s.description,
        url: `${SITE_URL}/services#${s.id}`,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "Nepal" },
      },
    })),
  }
}

export function blogPostingSchema(post: Post, author: TeamMember, wordCount: number): Schema {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    image: [`${url}/opengraph-image`],
    datePublished: isoDateTime(post.datePublished),
    dateModified: isoDateTime(post.dateModified),
    author: personSchema(author),
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": BLOG_ID },
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    wordCount,
    inLanguage: "en",
  }
}

export function blogSchema(posts: Post[]): Schema {
  return {
    "@type": "Blog",
    "@id": BLOG_ID,
    url: absoluteUrl("/blog"),
    name: `${siteConfig.name} Blog`,
    description: "Practical guides on school LMS, billing software and digital transformation in Nepal.",
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(`/blog/${p.slug}`)}#article`,
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: isoDateTime(p.datePublished),
      author: { "@type": "Person", name: p.author },
    })),
  }
}
