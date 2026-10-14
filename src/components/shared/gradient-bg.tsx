import { cn } from "@/lib/utils"

// Soft animated brand-colored glows over a faint grid, used behind hero sections.
export function GradientBg({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute -top-40 -left-32 size-[28rem] rounded-full bg-brand-blue/25 blur-3xl motion-safe:animate-blob dark:bg-brand-blue/20" />
      <div className="absolute top-10 -right-32 size-[26rem] rounded-full bg-brand-teal/20 blur-3xl [animation-delay:-6s] motion-safe:animate-blob dark:bg-brand-teal/15" />
      <div className="absolute -bottom-40 left-1/3 size-[22rem] rounded-full bg-brand-ocean/15 blur-3xl [animation-delay:-12s] motion-safe:animate-blob" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
