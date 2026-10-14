import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { SectionHeading } from "@/components/shared/section-heading"
import { lmsModules } from "@/data/lms-features"

export function LmsModules() {
  return (
    <section className="bg-section px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Inside the School LMS"
          title={
            <>
              Every module your school <span className="text-gradient">needs</span>
            </>
          }
          description="Academic and financial workflows, connected in one secure platform and accessible from any device."
        />
        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {lmsModules.map(({ title, description, icon: Icon }) => (
            <StaggerItem key={title}>
              <div className="group gradient-border h-full rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl hover:shadow-brand-blue/10">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white dark:bg-brand-blue/15">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
