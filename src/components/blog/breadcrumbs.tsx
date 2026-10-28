import Link from "next/link"
import { ChevronRight } from "lucide-react"

/** Visible breadcrumb trail. Pair it with breadcrumbSchema() so search results show the same path. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path} className="flex min-w-0 items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="truncate font-medium text-foreground">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="transition-colors hover:text-foreground">
                    {item.name}
                  </Link>
                  <ChevronRight aria-hidden className="size-3.5 shrink-0" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
