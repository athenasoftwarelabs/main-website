import { Code2, LifeBuoy, PenTool, Search } from "lucide-react"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { SectionHeading } from "@/components/shared/section-heading"
import { DrawLine } from "@/components/sections/home/draw-line"

const steps = [
  {
    title: "Discover",
    desc: "We listen to your goals, study your workflow and define clear requirements.",
    icon: Search,
  },
  {
    title: "Design",
    desc: "We design intuitive interfaces and a solid technical plan you can review.",
    icon: PenTool,
  },
  {
    title: "Build",
    desc: "We develop, test and refine in short cycles, keeping you updated at every step.",
    icon: Code2,
  },
  {
    title: "Launch & Support",
    desc: "We deploy, train your team, and provide ongoing local support.",
    icon: LifeBuoy,
  },
]

export function Process() {
  return (
    <section className="bg-section px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              A simple, <span className="text-gradient">transparent</span> process
            </>
          }
          description="From the first conversation to long after launch, you always know what's happening and what comes next."
        />
        <div className="relative mt-16">
          <DrawLine />
          <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.15}>
            {steps.map(({ title, desc, icon: Icon }, i) => (
              <StaggerItem key={title} className="relative flex flex-col items-center text-center">
                <div className="relative">
                  <span className="relative z-10 flex size-20 items-center justify-center rounded-full border-4 border-section bg-card text-brand-blue shadow-lg shadow-brand-blue/10 ring-1 ring-border dark:text-brand-teal">
                    <Icon className="size-8" />
                  </span>
                  <span className="absolute -top-1 -right-1 z-20 flex size-7 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white shadow-md">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold">{title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
