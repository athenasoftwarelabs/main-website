import { AnimatedCounter } from "@/components/motion/animated-counter"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { stats } from "@/data/site"
import { cn } from "@/lib/utils"

// Cell dividers for a 2×2 grid on mobile and a single row of 4 on desktop
const dividers = [
  "border-b lg:border-b-0",
  "border-b border-l lg:border-b-0",
  "lg:border-l",
  "border-l",
]

export function StatsStrip() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <Stagger className="mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-3xl border bg-card shadow-sm lg:grid-cols-4">
        {stats.map((s, i) => (
          <StaggerItem key={s.label} className={cn("px-4 py-8 text-center sm:px-6 sm:py-10", dividers[i])}>
            <p className="font-heading text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              <span className="text-gradient">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
