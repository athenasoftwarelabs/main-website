import { Eye, Target } from "lucide-react"
import { Stagger, StaggerItem } from "@/components/motion/stagger"

const items = [
  {
    title: "Our Mission",
    icon: Target,
    text: "To empower every school and business in Nepal with simple, reliable and affordable digital solutions that save time, reduce costs and enable better decisions.",
  },
  {
    title: "Our Vision",
    icon: Eye,
    text: "A Nepal where every institution, from a small community school to a growing enterprise, runs on modern technology built by local talent.",
  },
]

export function MissionVision() {
  return (
    <section className="bg-section px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <Stagger className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2" stagger={0.12}>
        {items.map(({ title, icon: Icon, text }) => (
          <StaggerItem key={title}>
            <div className="group relative h-full overflow-hidden rounded-3xl border bg-card p-8 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-blue/10 sm:p-10">
              <div
                aria-hidden
                className="absolute -top-24 -right-24 size-56 rounded-full bg-brand-gradient opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
              />
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-blue/25">
                <Icon className="size-7" />
              </span>
              <h2 className="relative mt-6 text-2xl font-bold">{title}</h2>
              <p className="relative mt-3 leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
