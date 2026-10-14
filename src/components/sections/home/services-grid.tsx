import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { SectionHeading } from "@/components/shared/section-heading"
import { ServiceCard } from "@/components/shared/service-card"
import { services } from "@/data/services"

export function ServicesGrid() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Everything you need to <span className="text-gradient">go digital</span>
            </>
          }
          description="From school management to online stores, we design, build and support software that solves real problems for organizations in Nepal."
        />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <StaggerItem key={s.id}>
              <ServiceCard service={s} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="xl">
            <Link href="/services">
              View all services
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
