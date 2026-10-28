import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Faq = { q: string; a: string }

/**
 * FAQ accordion built on native <details>, so every answer is in the server HTML for search engines
 * (unlike JS accordions that only render the open item). Items sharing `name` open one at a time.
 */
export function FaqList({
  faqs,
  name,
  className,
}: {
  faqs: readonly Faq[]
  name: string
  className?: string
}) {
  return (
    <div className={cn("divide-y rounded-2xl border bg-card px-5 sm:px-7", className)}>
      {faqs.map((f, i) => (
        <details key={f.q} name={name} open={i === 0} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-semibold text-pretty transition-colors group-hover:text-primary sm:text-[1.05rem] dark:group-hover:text-brand-teal">
              {f.q}
            </h3>
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <p className="pb-5 text-[0.95rem] leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
