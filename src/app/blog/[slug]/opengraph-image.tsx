import { getAllPosts, getPost } from "@/content/blog"
import { renderOgImage } from "@/lib/og-image"

export const alt = "Athena Software Labs blog article"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)

  return renderOgImage({
    eyebrow: post ? `Blog · ${post.category}` : "Athena Software Labs Blog",
    title: post?.title ?? "Software guides for Nepal's schools & businesses",
    subtitle: post ? `By ${post.author}` : undefined,
  })
}
