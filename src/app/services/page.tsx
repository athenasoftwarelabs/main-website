import Link from "next/link"
import { CtaBand } from "@/components/shared/cta-band"
import { PageHero } from "@/components/shared/page-hero"
import { Faq } from "@/components/sections/services/faq"
import { LmsModules } from "@/components/sections/services/lms-modules"
import { ServiceDetail } from "@/components/sections/services/service-detail"
import { JsonLd } from "@/components/seo/json-ld"
import { faqs } from "@/data/faqs"
import { services } from "@/data/services"
import { breadcrumbSchema, faqSchema, pageMetadata, servicesSchema, webPageSchema } from "@/lib/seo"

const title = "Software & IT Services in Nepal"
const description =
  "School LMS, billing & POS, custom software, Android & iOS apps, websites, e-commerce and IT consulting for schools and businesses across Nepal."
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]

export const metadata = pageMetadata({
  title,
  description,
  path: "/services",
  keywords: [
    "IT services Nepal",
    "school LMS Nepal",
    "billing software Nepal",
    "custom software development Nepal",
    "mobile app development Nepal",
    "website development Nepal",
    "e-commerce website Nepal",
    "IT consulting Nepal",
  ],
})

export default function ServicesPage() {
  const [lms, ...rest] = services

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: "/services", name: title, description }),
          breadcrumbSchema(crumbs),
          servicesSchema(),
          faqSchema(faqs, "/services"),
        ]}
      />
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
