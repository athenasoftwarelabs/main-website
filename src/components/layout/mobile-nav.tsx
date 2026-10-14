"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ArrowRight, Mail, Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/layout/logo"
import { mainNav, siteConfig } from "@/data/site"
import { isActivePath } from "@/lib/nav"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="rounded-full md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] gap-0 overflow-y-auto p-0 sm:max-w-sm">
        <SheetHeader className="border-b p-5">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
          {/* The header persists across routes, so close the sheet when the logo navigates home */}
          <div onClick={() => setOpen(false)} className="w-fit">
            <Logo className="[&_img:first-child]:h-8 [&_img:not(:first-child)]:h-5" />
          </div>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1 p-3">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      active
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.title}
                    {active && <span className="size-2 rounded-full bg-brand-gradient" />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="space-y-4 border-t p-5">
          <div className="space-y-2 text-sm text-muted-foreground">
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-foreground">
              <Mail className="size-4" /> {siteConfig.contact.email}
            </a>
            <a href={siteConfig.contact.phoneHref} className="flex items-center gap-2 hover:text-foreground">
              <Phone className="size-4" /> {siteConfig.contact.phone}
            </a>
          </div>
          <Button asChild variant="brand" size="xl" className="w-full">
            <Link href="/contact" onClick={() => setOpen(false)}>
              Get a Free Quote
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
