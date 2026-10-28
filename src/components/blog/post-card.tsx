import Link from "next/link"
import { ArrowRight, CalendarDays, Clock } from "lucide-react"
import { Avatar } from "@/components/blog/author"
import { PostCover } from "@/components/blog/post-cover"
import { getAuthor, getReadingTime, type Post } from "@/content/blog"
import { formatDate } from "@/lib/format"
import { cn } from "@/lib/utils"

export function PostMeta({ post, className }: { post: Post; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground", className)}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays aria-hidden className="size-4" />
        <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock aria-hidden className="size-4" />
        {getReadingTime(post)} min read
      </span>
    </div>
  )
}

/** Blog card. `featured` lays it out horizontally on large screens. `headingLevel` keeps the page outline valid. */
export function PostCard({
  post,
  featured,
  headingLevel = "h3",
}: {
  post: Post
  featured?: boolean
  headingLevel?: "h2" | "h3"
}) {
  const author = getAuthor(post)
  const Heading = headingLevel

  return (
    <article
      className={cn(
        "group gradient-border relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl hover:shadow-brand-blue/10",
        featured && "lg:flex-row"
      )}
    >
      <PostCover post={post} size={featured ? "lg" : "md"} className={cn(featured && "lg:aspect-auto lg:w-1/2")} />
      <div className={cn("flex flex-1 flex-col p-6 sm:p-7", featured && "lg:justify-center lg:p-10")}>
        <span className="w-fit rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-brand-teal/10 dark:text-brand-teal">
          {post.category}
        </span>
        <Heading
          className={cn(
            "mt-4 font-heading font-bold text-balance",
            featured ? "text-2xl leading-tight sm:text-3xl" : "text-xl leading-snug"
          )}
        >
          {/* The stretched link makes the whole card clickable while keeping one focusable link */}
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </Heading>
        <p className={cn("mt-3 text-muted-foreground", featured ? "line-clamp-4" : "line-clamp-3 text-[0.95rem]")}>
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <div className="flex items-center gap-3">
            <Avatar member={author} className="size-10" />
            <div className="text-sm">
              <p className="font-semibold">{author.name}</p>
              <PostMeta post={post} className="gap-x-3 text-xs" />
            </div>
          </div>
          <ArrowRight
            aria-hidden
            className="size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-blue"
          />
        </div>
      </div>
    </article>
  )
}
