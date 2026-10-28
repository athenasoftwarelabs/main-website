import { Reveal } from "@/components/motion/reveal"
import { FaqList } from "@/components/shared/faq-list"
import { SectionHeading } from "@/components/shared/section-heading"
import { faqs } from "@/data/faqs"

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Can't find what you're looking for? Reach out and we'll be happy to help."
        />
        <Reveal delay={0.1}>
          <FaqList faqs={faqs} name="services-faq" className="mt-12" />
        </Reveal>
      </div>
    </section>
  )
}
