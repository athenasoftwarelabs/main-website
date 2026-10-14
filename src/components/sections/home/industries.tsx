import {
  Building2,
  ChefHat,
  GraduationCap,
  Hotel,
  School,
  Store,
} from "lucide-react"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { SectionHeading } from "@/components/shared/section-heading"

const industries = [
  { name: "Schools", desc: "LMS, results, attendance & fees", icon: School },
  { name: "Colleges", desc: "Academic & admin management", icon: GraduationCap },
  { name: "Hotels", desc: "Billing, bookings & websites", icon: Hotel },
  { name: "Restaurants", desc: "POS, orders & table management", icon: ChefHat },
  { name: "Retail & Shops", desc: "Billing, inventory & e-commerce", icon: Store },
  { name: "Businesses", desc: "Custom software & consulting", icon: Building2 },
]

export function Industries() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Who we serve"
          title={
            <>
              Built for organizations <span className="text-gradient">across Nepal</span>
            </>
          }
          description="Whether you run a school in Urlabari or a restaurant in Kathmandu, our solutions adapt to the way you work."
        />
        <Stagger className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6" stagger={0.06}>
          {industries.map(({ name, desc, icon: Icon }) => (
            <StaggerItem key={name}>
              <div className="group flex h-full flex-col items-center rounded-2xl border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-lg hover:shadow-brand-blue/5">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-teal/10 text-brand-blue transition-transform duration-300 group-hover:scale-110 dark:text-brand-teal">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-4 font-semibold">{name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
