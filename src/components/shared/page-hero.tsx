import { GradientBg } from "@/components/shared/gradient-bg"
import { Eyebrow } from "@/components/shared/section-heading"

// Above-the-fold, so it animates with CSS and paints before JavaScript loads.
const enter = "animate-in fade-in-0 slide-in-from-bottom-6 duration-700 fill-mode-both motion-reduce:animate-none"

// Compact hero used at the top of inner pages
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  description: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="relative isolate -mt-16 overflow-hidden pt-36 pb-20 lg:-mt-[4.5rem] lg:pt-44 lg:pb-28">
      <GradientBg />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <div className={enter}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1
          className={`${enter} mt-6 text-4xl leading-[1.1] font-extrabold text-balance delay-100 sm:text-5xl lg:text-6xl`}
        >
          {title}
        </h1>
        <p
          className={`${enter} mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground delay-200 sm:text-lg`}
        >
          {description}
        </p>
        {children && <div className={`${enter} mt-8 delay-300`}>{children}</div>}
      </div>
    </section>
  )
}
