import { Fragment } from "react"
import Link from "next/link"

const TOKEN = /(\*\*.+?\*\*|\[.+?\]\(.+?\))/g
const LINK = /^\[(.+?)\]\((.+?)\)$/

const linkClass =
  "font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary dark:text-brand-teal dark:decoration-brand-teal/40"

/** Renders the small inline syntax used in blog content: **bold** and [label](href) */
export function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          )
        }
        const link = part.match(LINK)
        if (link) {
          const [, label, href] = link
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={linkClass}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {label}
            </a>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
