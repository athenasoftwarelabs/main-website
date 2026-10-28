"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type TocItem = { id: string; text: string }

/** Sticky "On this page" list that highlights the section currently being read */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    let frame = 0
    const update = () => {
      frame = 0
      // The active section is the last heading that has scrolled past the sticky header
      let current = items[0]?.id
      for (const el of headings) {
        if (el.getBoundingClientRect().top < 160) current = el.id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [items])

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">On this page</p>
      <ol className="mt-4 space-y-1 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors",
                active === item.id
                  ? "border-brand-blue font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
