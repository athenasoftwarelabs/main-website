import Link from "next/link"
import { ArrowRight, CircleCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import type { Service } from "@/data/services"
import { cn } from "@/lib/utils"

// One alternating left/right block per service, anchored by id for /services#<id> links.
export function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon
  const reversed = index % 2 === 1

  return (
    <article
      id={service.id}
      className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20"
    >
      <Reveal direction={reversed ? "left" : "right"} className={cn(reversed && "lg:order-2")}>
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-lg shadow-brand-blue/25">
            <Icon className="size-6" />
          </span>
          {service.featured && (
            <span className="rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal-text">
              Flagship product
            </span>
          )}
        </div>
        <h2 className="mt-6 text-3xl font-bold text-balance sm:text-4xl">{service.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {service.description}
        </p>
        <Button asChild variant="link" className="mt-4 h-auto px-0 text-base">
          <Link href={`/contact?service=${service.id}`}>
            Discuss your project
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </Reveal>

      <Reveal
        direction={reversed ? "right" : "left"}
        delay={0.1}
        className={cn(reversed && "lg:order-1")}
      >
        <div className="relative overflow-hidden rounded-3xl border bg-card p-6 shadow-xl shadow-brand-blue/5 sm:p-8">
          <div
            aria-hidden
            className="absolute -top-20 -right-20 size-56 rounded-full bg-brand-gradient opacity-10 blur-2xl"
          />
          <Icon aria-hidden className="absolute -right-6 -bottom-6 size-40 text-brand-blue/[0.05] dark:text-brand-teal/[0.06]" />
          <p className="relative text-sm font-semibold text-muted-foreground">What&apos;s included</p>
          <ul className="relative mt-5 grid gap-3 sm:grid-cols-2">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 rounded-xl border bg-background/60 p-3.5 text-sm font-medium"
              >
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand-teal-text" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </article>
  )
}
