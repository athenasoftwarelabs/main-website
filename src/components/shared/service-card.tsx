import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Service } from "@/data/services"
import { cn } from "@/lib/utils"

export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  const Icon = service.icon
  return (
    <Link
      href={`/services#${service.id}`}
      className={cn(
        "group gradient-border relative flex h-full flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl hover:shadow-brand-blue/10 sm:p-7",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-blue/30 dark:bg-brand-blue/15">
          <Icon className="size-6" />
        </span>
        <ArrowUpRight className="size-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-blue group-hover:opacity-100" />
      </div>
      <h3 className="mt-6 text-lg font-bold">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
      {service.featured && (
        <span className="mt-5 inline-flex w-fit items-center rounded-full bg-brand-teal/10 px-2.5 py-1 text-[0.7rem] font-semibold text-brand-teal-text">
          Flagship product
        </span>
      )}
    </Link>
  )
}
