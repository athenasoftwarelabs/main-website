import { Suspense } from "react"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/shared/page-hero"
import { ContactForm, ContactFormWithParams } from "@/components/sections/contact/contact-form"
import { ContactInfo } from "@/components/sections/contact/contact-info"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/data/site"
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo"

const title = "Contact Us for a Free Consultation"
const description =
  "Contact Athena Software Labs in Urlabari, Nepal for a free consultation on school LMS, billing software, websites and apps. Call +977 9768643712."
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]

export const metadata = pageMetadata({ title, description, path: "/contact" })

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[webPageSchema({ type: "ContactPage", path: "/contact", name: title, description }), breadcrumbSchema(crumbs)]}
      />
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Let&apos;s talk about your <span className="text-gradient">next project</span>
          </>
        }
        description="Questions, ideas or ready to get started? Send us a message and our team will reply within one business day."
      />

      <section className="px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          <Reveal>
            {/* Search params are request-time data, so the preselecting form streams in behind a static fallback */}
            <Suspense fallback={<ContactForm />}>
              <ContactFormWithParams />
            </Suspense>
          </Reveal>
          <ContactInfo />
        </div>

        <Reveal className="mx-auto mt-10 max-w-7xl">
          <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
            <iframe
              title={`Map showing ${siteConfig.contact.address}`}
              src={siteConfig.contact.mapEmbed}
              className="h-80 w-full border-0 grayscale-[30%] dark:opacity-80 dark:invert-[90%] dark:hue-rotate-180 sm:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  )
}
