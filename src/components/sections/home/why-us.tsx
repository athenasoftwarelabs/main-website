import Image from "next/image"
import { BadgeDollarSign, Headset, MapPin, ShieldCheck, Smartphone, Zap } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { SectionHeading } from "@/components/shared/section-heading"

const reasons = [
  {
    title: "Local Nepali team",
    desc: "We understand how schools and businesses in Nepal work, and speak your language.",
    icon: MapPin,
  },
  {
    title: "On-site & remote support",
    desc: "Fast help when you need it, with training for your staff included.",
    icon: Headset,
  },
  {
    title: "Affordable pricing",
    desc: "World-class software at prices designed for Nepali organizations.",
    icon: BadgeDollarSign,
  },
  {
    title: "Secure & reliable",
    desc: "Role-based access, encrypted data and regular backups keep your data safe.",
    icon: ShieldCheck,
  },
  {
    title: "Mobile-first",
    desc: "Every solution works beautifully on phones, with Android & iOS apps.",
    icon: Smartphone,
  },
  {
    title: "Fast delivery",
    desc: "Proven processes get you live in weeks, not months.",
    icon: Zap,
  },
]

export function WhyUs() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            eyebrow="Why Athena"
            title={
              <>
                A technology partner that <span className="text-gradient">grows with you</span>
              </>
            }
            description="We don't just deliver software and disappear. We work alongside you to make sure technology truly makes your work easier."
          />
          <Reveal delay={0.15} className="relative mt-10 hidden overflow-hidden rounded-3xl border bg-[#0b1220] p-8 lg:block">
            <div aria-hidden className="absolute -top-16 -right-16 size-56 rounded-full bg-brand-blue/40 blur-3xl" />
            <div aria-hidden className="absolute -bottom-20 -left-10 size-56 rounded-full bg-brand-teal/30 blur-3xl" />
            <div className="relative flex items-center gap-5">
              <Image src="/brand/logo-mark.svg" alt="" width={812} height={933} className="h-16 w-auto" />
              <div>
                <p className="font-heading text-lg font-bold text-white">Wisdom in every line of code</p>
                <p className="mt-1 text-sm text-slate-300">
                  Inspired by Athena, the goddess of wisdom and craft.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.07}>
          {reasons.map(({ title, desc, icon: Icon }) => (
            <StaggerItem key={title}>
              <div className="group h-full rounded-2xl border bg-card p-6 transition-all duration-300 hover:border-brand-blue/40 hover:shadow-lg hover:shadow-brand-blue/5">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-md shadow-brand-blue/20 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
