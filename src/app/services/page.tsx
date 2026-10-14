import type { Metadata } from "next"
import Link from "next/link"
import { CtaBand } from "@/components/shared/cta-band"
import { PageHero } from "@/components/shared/page-hero"
import { Faq } from "@/components/sections/services/faq"
import { LmsModules } from "@/components/sections/services/lms-modules"
import { ServiceDetail } from "@/components/sections/services/service-detail"
import { services } from "@/data/services"

export const metadata: Metadata = {
  title: "Services",
  description:
    "School LMS, custom software, Android & iOS apps, billing & POS, CMS websites, e-commerce and IT consulting from Athena Software Labs, Nepal.",
}

export default function ServicesPage() {
  const [lms, ...rest] = services

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={
          <>
            Software that moves your <span className="text-gradient">organization forward</span>
          </>
        }
        description="From a complete school management platform to mobile apps and online stores, we build reliable digital solutions tailored to Nepal."
      >
        <nav aria-label="Services" className="flex max-w-3xl flex-wrap justify-center gap-2">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:border-brand-blue/40 hover:text-foreground sm:text-sm"
            >
              {s.title}
            </Link>
          ))}
        </nav>
      </PageHero>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ServiceDetail service={lms} index={0} />
        </div>
      </section>

      <LmsModules />

      <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-24 lg:gap-32">
          {rest.map((s, i) => (
            <ServiceDetail key={s.id} service={s} index={i + 1} />
          ))}
        </div>
      </section>

      <div className="border-t bg-section">
        <Faq />
      </div>
      <CtaBand title="Have a project in mind?" />
    </>
  )
}
