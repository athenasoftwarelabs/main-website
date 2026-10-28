import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/blog/post-card"
import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { SectionHeading } from "@/components/shared/section-heading"
import { getAllPosts } from "@/content/blog"
import { cn } from "@/lib/utils"

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3)
  if (!posts.length) return null

  return (
    <section className="bg-section px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="From our blog"
          title={
            <>
              Guides to help you <span className="text-gradient">go digital</span>
            </>
          }
          description="Practical advice on school LMS, billing software and more, written for schools and businesses in Nepal."
        />
        <Stagger
          className={cn("mx-auto mt-14 grid gap-6 md:grid-cols-2", posts.length >= 3 ? "lg:grid-cols-3" : "max-w-5xl")}
          stagger={0.1}
        >
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="xl">
            <Link href="/blog">
              Read all articles
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
