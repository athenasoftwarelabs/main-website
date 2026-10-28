import Link from "next/link"
import { ArrowRight, CircleCheck, Hash, Info, Lightbulb, Quote, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Inline } from "@/components/blog/inline"
import type { Block } from "@/content/blog"
import { cn } from "@/lib/utils"

const calloutStyles = {
  tip: { icon: Lightbulb, box: "border-brand-teal/30 bg-brand-teal/[0.07]", accent: "text-brand-teal-text" },
  note: { icon: Info, box: "border-brand-blue/25 bg-brand-blue/[0.06]", accent: "text-primary dark:text-brand-blue" },
  warning: { icon: TriangleAlert, box: "border-warning/35 bg-warning/[0.08]", accent: "text-amber-700 dark:text-warning" },
} as const

export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[1.0625rem] leading-[1.8] text-foreground/85">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-6 text-pretty">
          <Inline text={block.text} />
        </p>
      )

    case "h2":
      return (
        <h2 id={block.id} className="group mt-14 scroll-mt-28 text-2xl leading-tight font-bold text-foreground sm:text-[1.875rem]">
          <a href={`#${block.id}`} className="inline-flex items-start gap-2">
            {block.text}
            <Hash
              aria-hidden
              className="mt-1.5 size-5 shrink-0 text-brand-blue opacity-0 transition-opacity group-hover:opacity-100"
            />
          </a>
        </h2>
      )

    case "h3":
      return <h3 className="mt-9 text-xl font-bold text-foreground">{block.text}</h3>

    case "ul":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="relative pl-7">
              <span aria-hidden className="absolute top-[0.7em] left-1 size-2 rounded-full bg-brand-gradient" />
              <Inline text={item} />
            </li>
          ))}
        </ul>
      )

    case "ol":
      return (
        <ol className="mt-6 space-y-4">
          {block.items.map((item, n) => (
            <li key={item} className="relative pl-12">
              <span
                aria-hidden
                className="absolute top-0.5 left-0 flex size-8 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white shadow-md shadow-brand-blue/20"
              >
                {n + 1}
              </span>
              <Inline text={item} />
            </li>
          ))}
        </ol>
      )

    case "callout": {
      const style = calloutStyles[block.tone]
      const Icon = style.icon
      return (
        <aside className={cn("mt-8 flex gap-4 rounded-2xl border p-5 sm:p-6", style.box)}>
          <Icon aria-hidden className={cn("mt-0.5 size-6 shrink-0", style.accent)} />
          <div>
            <p className={cn("font-heading font-bold", style.accent)}>{block.title}</p>
            <p className="mt-1.5 text-[0.98rem] leading-relaxed">
              <Inline text={block.text} />
            </p>
          </div>
        </aside>
      )
    }

    case "table":
      return (
        <figure className="mt-8">
          <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[0.95rem]">
              <thead>
                <tr className="bg-muted">
                  {block.head.map((h, i) => (
                    <th key={i} scope="col" className="px-4 py-3 font-heading font-semibold text-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r} className="border-t transition-colors hover:bg-muted/40">
                    {row.map((cell, c) =>
                      c === 0 ? (
                        <th key={c} scope="row" className="px-4 py-3 align-top font-semibold text-foreground">
                          {cell}
                        </th>
                      ) : (
                        <td key={c} className="px-4 py-3 align-top">
                          {cell}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">{block.caption}</figcaption>
        </figure>
      )

    case "checklist":
      return (
        <div className="gradient-border mt-8 rounded-2xl border bg-card p-6 shadow-sm sm:p-7">
          <p className="font-heading text-lg font-bold text-foreground">{block.title}</p>
          <ul className="mt-4 space-y-3">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3">
                <CircleCheck aria-hidden className="mt-1 size-5 shrink-0 text-brand-teal-text" />
                <span>
                  <Inline text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )

    case "quote":
      return (
        <blockquote className="relative mt-10 rounded-2xl border-l-4 border-brand-blue bg-muted/60 py-6 pr-6 pl-7">
          <Quote aria-hidden className="absolute top-4 right-5 size-10 text-brand-blue/15" />
          <p className="font-heading text-xl leading-relaxed font-semibold text-foreground text-balance">
            {block.text}
          </p>
        </blockquote>
      )

    case "cta":
      return (
        <aside className="relative isolate mt-10 overflow-hidden rounded-3xl bg-[#0b1220] p-7 text-white ring-1 ring-white/10 sm:p-9">
          <div aria-hidden className="absolute -top-20 -right-16 -z-10 size-64 rounded-full bg-brand-blue/40 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -left-10 -z-10 size-64 rounded-full bg-brand-teal/25 blur-3xl" />
          <p className="font-heading text-2xl font-bold text-balance">{block.title}</p>
          <p className="mt-2 max-w-xl text-slate-300">{block.text}</p>
          <Button asChild variant="brand" size="xl" className="mt-6">
            <Link href={block.href}>
              {block.label}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </aside>
      )
  }
}
