import Link from "next/link"
import { ArrowRight, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { PostCard } from "@/components/blog/post-card"
import { JsonLd } from "@/components/seo/json-ld"
import { CtaBand } from "@/components/shared/cta-band"
import { PageHero } from "@/components/shared/page-hero"
import { getAllPosts } from "@/content/blog"
import { blogSchema, breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo"
import { cn } from "@/lib/utils"

const title = "Blog: Software Guides for Nepali Schools & Businesses"
const description =
  "Practical guides on school LMS, billing and POS software, websites and going digital, written for schools and businesses in Nepal by Athena Software Labs."

export const metadata = pageMetadata({
  title,
  description,
  path: "/blog",
  keywords: ["software blog Nepal", "school LMS guide", "billing software guide Nepal", "digital transformation Nepal"],
  image: { path: "/blog/opengraph-image", alt: "Athena Software Labs blog: software guides for Nepali schools and businesses" },
})

export default function BlogPage() {
  const [featured, ...rest] = getAllPosts()
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ type: "CollectionPage", path: "/blog", name: title, description }),
          breadcrumbSchema(crumbs),
          blogSchema(getAllPosts()),
        ]}
      />
      <PageHero
        eyebrow="Blog & insights"
        title={
          <>
            Guides for Nepal&apos;s <span className="text-gradient">schools & businesses</span>
          </>
        }
        description="Practical, jargon-free advice on school LMS, billing and POS software, websites and going digital, from the team at Athena Software Labs."
      />

      <section className="px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          {featured && (
            <Reveal>
              <h2 className="sr-only">Latest article</h2>
              <PostCard post={featured} featured headingLevel="h3" />
            </Reveal>
          )}

          {rest.length > 0 && (
            <>
              <Reveal className="mt-20 mb-8 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-bold sm:text-3xl">More articles</h2>
              </Reveal>
              {/* Size the grid to its content while there are only a few posts */}
              <Stagger
                className={cn("grid gap-6 sm:grid-cols-2", rest.length >= 2 && "lg:grid-cols-3")}
                stagger={0.1}
              >
                {rest.map((post) => (
                  <StaggerItem key={post.slug}>
                    <PostCard post={post} />
                  </StaggerItem>
                ))}
                {rest.length % 3 !== 0 && (
                  <StaggerItem>
                    <TopicCard />
                  </StaggerItem>
                )}
              </Stagger>
            </>
          )}
        </div>
      </section>

      <CtaBand
        title="Have a question about going digital?"
        description="Talk to our team about school LMS, billing systems, websites or apps. We're happy to give honest, free advice."
      />
    </>
  )
}

function TopicCard() {
  return (
    <div className="relative isolate flex h-full flex-col justify-center overflow-hidden rounded-3xl border bg-[#0b1220] p-8 text-white">
      <div aria-hidden className="absolute -top-20 -right-16 -z-10 size-64 rounded-full bg-brand-blue/40 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 -left-10 -z-10 size-64 rounded-full bg-brand-teal/25 blur-3xl" />
      <span className="flex size-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
        <PenLine className="size-6" />
      </span>
      <p className="mt-6 font-heading text-2xl font-bold text-balance">What should we write about next?</p>
      <p className="mt-3 text-slate-300">
        Have a question about school software, billing or going digital in Nepal? Send it to us and we may turn
        it into a guide.
      </p>
      <Button asChild variant="brand" size="xl" className="mt-8 w-fit">
        <Link href="/contact">
          Suggest a topic
          <ArrowRight data-icon="inline-end" />
        </Link>
      </Button>
    </div>
  )
}
