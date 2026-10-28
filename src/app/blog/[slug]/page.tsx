import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CircleCheck, ListTree, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AuthorBox } from "@/components/blog/author"
import { Breadcrumbs } from "@/components/blog/breadcrumbs"
import { PostCard, PostMeta } from "@/components/blog/post-card"
import { PostBody } from "@/components/blog/post-body"
import { PostCover } from "@/components/blog/post-cover"
import { ShareLinks } from "@/components/blog/share-links"
import { Toc } from "@/components/blog/toc"
import { JsonLd } from "@/components/seo/json-ld"
import { CtaBand } from "@/components/shared/cta-band"
import { FaqList } from "@/components/shared/faq-list"
import { GradientBg } from "@/components/shared/gradient-bg"
import {
  getAllPosts,
  getAuthor,
  getPost,
  getRelatedPosts,
  getToc,
  getWordCount,
} from "@/content/blog"
import { formatDate } from "@/lib/format"
import {
  absoluteUrl,
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
  webPageSchema,
} from "@/lib/seo"

// Above-the-fold header animates with CSS so it paints before JavaScript loads
const enter = "animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both motion-reduce:animate-none"

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  return pageMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    image: { path: `/blog/${post.slug}/opengraph-image`, alt: post.title },
    article: {
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      section: post.category,
      tags: post.keywords,
    },
  })
}

// Articles opt out of instant-navigation validation on purpose. Streaming the article behind <Suspense>
// would make even the prerendered HTML ship a skeleton with the real content hidden until JavaScript runs,
// which crawlers that don't run JS (several AI and search bots) can't read. Blocking keeps the full article
// in the HTML, and since every post is prerendered (generateStaticParams), the blocking response is a fast
// static file. Unknown slugs get a real 404 from src/proxy.ts before rendering.
export const instant = false

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const author = getAuthor(post)
  const toc = getToc(post)
  const path = `/blog/${post.slug}`
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ]

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path, name: post.title, description: post.description }),
          breadcrumbSchema(crumbs),
          blogPostingSchema(post, author, getWordCount(post)),
          ...(post.faqs.length ? [faqSchema(post.faqs, path)] : []),
        ]}
      />

      <article>
        <header className="relative isolate -mt-16 overflow-hidden pt-28 pb-10 sm:pt-32 lg:-mt-[4.5rem] lg:pt-36 lg:pb-14">
          <GradientBg />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className={enter}>
              <Breadcrumbs items={crumbs} />
            </div>
            <p className={`${enter} mt-8 delay-75`}>
              <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-brand-teal/10 dark:text-brand-teal">
                {post.category}
              </span>
            </p>
            <h1
              className={`${enter} mt-5 text-[2rem] leading-[1.12] font-extrabold text-balance delay-100 sm:text-5xl lg:text-[3.25rem]`}
            >
              {post.title}
            </h1>
            <p className={`${enter} mt-6 text-lg leading-relaxed text-pretty text-muted-foreground delay-150`}>
              {post.excerpt}
            </p>
            <div className={`${enter} mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 delay-200`}>
              <div className="flex items-center gap-3">
                <Avatar member={author} className="size-12" />
                <div>
                  <p className="font-semibold">
                    <Link href="/about#team" rel="author" className="hover:underline">
                      {author.name}
                    </Link>
                  </p>
                  <p className="text-sm text-muted-foreground">{author.role}</p>
                </div>
              </div>
              <span aria-hidden className="hidden h-10 w-px bg-border sm:block" />
              <div>
                <PostMeta post={post} />
                {post.dateModified !== post.datePublished && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <PostCover post={post} size="lg" className="rounded-3xl shadow-2xl shadow-brand-blue/10 ring-1 ring-border" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16 lg:px-8 lg:py-20">
          <div className="min-w-0 lg:max-w-[46rem]">
            {/* Table of contents for small screens */}
            <details className="group mb-10 rounded-2xl border bg-card lg:hidden">
              <summary className="flex cursor-pointer list-none items-center gap-2 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                <ListTree aria-hidden className="size-5 text-brand-blue" />
                On this page
                <span className="ml-auto text-sm font-normal text-muted-foreground group-open:hidden">Show</span>
                <span className="ml-auto hidden text-sm font-normal text-muted-foreground group-open:inline">Hide</span>
              </summary>
              <ol className="space-y-2 border-t px-5 py-4 text-sm">
                {toc.map((item, i) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="flex gap-3 text-muted-foreground hover:text-foreground">
                      <span className="w-5 shrink-0 text-right tabular-nums">{i + 1}.</span>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <section
              aria-labelledby="key-takeaways"
              className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm sm:p-7"
            >
              <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" />
              <h2 id="key-takeaways" className="flex items-center gap-2 font-heading text-lg font-bold">
                <Sparkles aria-hidden className="size-5 text-brand-blue" />
                Key takeaways
              </h2>
              <ul className="mt-4 space-y-3 text-[0.98rem] leading-relaxed text-foreground/85">
                {post.takeaways.map((t) => (
                  <li key={t} className="flex gap-3">
                    <CircleCheck aria-hidden className="mt-1 size-4.5 shrink-0 text-brand-teal-text" />
                    {t}
                  </li>
                ))}
              </ul>
            </section>

            <PostBody blocks={post.body} />

            {post.faqs.length > 0 && (
              <section aria-labelledby="faq" className="mt-14">
                <h2 id="faq" className="scroll-mt-28 text-2xl leading-tight font-bold sm:text-[1.875rem]">
                  Frequently asked questions
                </h2>
                <FaqList faqs={post.faqs} name={`faq-${post.slug}`} className="mt-6" />
              </section>
            )}

            <div className="mt-12 border-t pt-8">
              <ShareLinks url={absoluteUrl(path)} title={post.title} />
            </div>
            <AuthorBox member={author} />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <Toc items={toc} />
              <div className="rounded-2xl border bg-card p-5">
                <p className="font-heading font-bold">Need expert advice?</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Get a free consultation from our team in Urlabari.
                </p>
                <Button asChild variant="brand" size="lg" className="mt-4 w-full rounded-xl">
                  <Link href="/contact">
                    Contact us
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <RelatedPosts slug={post.slug} />
      <CtaBand />
    </>
  )
}

function RelatedPosts({ slug }: { slug: string }) {
  const post = getPost(slug)
  const related = post ? getRelatedPosts(post) : []
  if (!related.length) return null

  return (
    <section aria-labelledby="related" className="border-t bg-section px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="related" className="text-2xl font-bold sm:text-3xl">
            Keep reading
          </h2>
          <Link href="/blog" className="text-sm font-semibold text-primary hover:underline dark:text-brand-teal">
            View all articles
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

