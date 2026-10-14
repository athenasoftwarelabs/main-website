import { HeartHandshake, Lightbulb, ShieldCheck, Sparkles } from "lucide-react"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { SectionHeading } from "@/components/shared/section-heading"

const values = [
  {
    title: "Wisdom",
    desc: "We think before we build, choosing the right solution, not just the newest one.",
    icon: Lightbulb,
  },
  {
    title: "Craftsmanship",
    desc: "Clean code, thoughtful design and attention to detail in everything we ship.",
    icon: Sparkles,
  },
  {
    title: "Integrity",
    desc: "Honest advice, transparent pricing and keeping our promises.",
    icon: ShieldCheck,
  },
  {
    title: "Partnership",
    desc: "Your success is our success. We're with you long after launch.",
    icon: HeartHandshake,
  },
]

export function Values() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our values"
          title={
            <>
              What we <span className="text-gradient">stand for</span>
            </>
          }
          description="The principles that guide every project, every line of code and every conversation."
        />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {values.map(({ title, desc, icon: Icon }) => (
            <StaggerItem key={title}>
              <div className="group h-full rounded-2xl border bg-card p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-lg hover:shadow-brand-blue/5">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-teal/15 text-brand-blue transition-transform duration-300 group-hover:scale-110 dark:text-brand-teal">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
