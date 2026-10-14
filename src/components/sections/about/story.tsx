import Image from "next/image"
import { Reveal } from "@/components/motion/reveal"
import { Eyebrow } from "@/components/shared/section-heading"

export function Story() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="right">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl bg-[#0b1220] ring-1 ring-white/10">
            <div aria-hidden className="absolute -top-20 -left-20 size-72 rounded-full bg-brand-blue/40 blur-3xl motion-safe:animate-blob" />
            <div aria-hidden className="absolute -right-16 -bottom-24 size-72 rounded-full bg-brand-teal/30 blur-3xl [animation-delay:-7s] motion-safe:animate-blob" />
            <div aria-hidden className="absolute inset-0 bg-grid opacity-40 invert" />
            <div className="relative flex h-full flex-col items-center justify-center gap-6 p-8">
              <Image
                src="/brand/logo-mark.svg"
                alt="Athena Software Labs emblem"
                width={812}
                height={933}
                className="h-32 w-auto drop-shadow-[0_10px_30px_rgba(16,207,199,0.35)] motion-safe:animate-float sm:h-40"
              />
              <Image
                src="/brand/wordmark-dark.svg"
                alt=""
                width={763}
                height={175}
                className="h-8 w-auto opacity-90 sm:h-10"
              />
            </div>
          </div>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold text-balance sm:text-4xl">
            Born in Nepal, built to <span className="text-gradient">solve real problems</span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Athena Software Labs started with a simple observation: schools and businesses
              across Nepal were still running on paper registers, spreadsheets and disconnected
              tools. Results took weeks to prepare, fee records got lost, and owners had little
              visibility into how their organization was really doing.
            </p>
            <p>
              Named after Athena, the Greek goddess of wisdom and craft, we set out to change
              that with thoughtfully engineered, affordable software. Today we help schools go
              fully digital with our LMS, and help hotels, restaurants and businesses grow with
              billing systems, websites, e-commerce and mobile apps.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
