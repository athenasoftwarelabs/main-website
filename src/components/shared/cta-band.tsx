import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/data/site"

export function CtaBand({
  title = "Ready to take your school or business digital?",
  description = "Tell us about your goals. We'll get back within one business day with ideas and a free, no-obligation quote.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <Reveal className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#0b1220] px-6 py-14 text-center shadow-2xl shadow-brand-blue/10 ring-1 ring-white/10 sm:px-12 lg:py-20">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 size-80 rounded-full bg-brand-blue/40 blur-3xl motion-safe:animate-blob" />
          <div className="absolute -right-20 -bottom-28 size-80 rounded-full bg-brand-teal/30 blur-3xl [animation-delay:-8s] motion-safe:animate-blob" />
          <Image
            src="/brand/logo-mark.svg"
            alt=""
            width={812}
            height={933}
            className="absolute -right-10 -bottom-16 h-80 w-auto opacity-[0.08] sm:right-6"
          />
        </div>
        <h2 className="mx-auto max-w-3xl text-3xl font-bold text-balance text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-pretty text-slate-300 sm:text-lg">
          {description}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="brand" size="xl" className="w-full sm:w-auto">
            <Link href="/contact">
              Start Your Project
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="xl"
            className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <a href={siteConfig.contact.phoneHref}>
              <Phone data-icon="inline-start" />
              Call {siteConfig.contact.phone}
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
