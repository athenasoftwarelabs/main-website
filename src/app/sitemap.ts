import type { MetadataRoute } from "next"
import { getAllPosts } from "@/content/blog"
import { mainNav } from "@/data/site"
import { absoluteUrl, PAGES_UPDATED } from "@/lib/seo"

const pagePriority: Record<string, { priority: number; changeFrequency: "weekly" | "monthly" }> = {
  "/": { priority: 1, changeFrequency: "weekly" },
  "/services": { priority: 0.9, changeFrequency: "monthly" },
  "/blog": { priority: 0.8, changeFrequency: "weekly" },
  "/about": { priority: 0.7, changeFrequency: "monthly" },
  "/contact": { priority: 0.7, changeFrequency: "monthly" },
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const latestPost = posts[0]?.dateModified ?? PAGES_UPDATED

  const pages: MetadataRoute.Sitemap = mainNav.map((item) => ({
    url: absoluteUrl(item.href),
    // The blog index changes whenever a post is published or updated
    lastModified: item.href === "/blog" && latestPost > PAGES_UPDATED ? latestPost : PAGES_UPDATED,
    ...(pagePriority[item.href] ?? { priority: 0.6, changeFrequency: "monthly" }),
  }))

  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.dateModified,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [absoluteUrl(`/blog/${post.slug}/opengraph-image`)],
  }))

  return [...pages, ...articles]
}
