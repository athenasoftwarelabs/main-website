import Image from "next/image"
import Link from "next/link"
import { cacheLife } from "next/cache"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { socialIcons } from "@/components/shared/social-icons"
import { mainNav, siteConfig } from "@/data/site"
import { services } from "@/data/services"

async function CopyrightYear() {
  "use cache"
  cacheLife("days")
  return <>{new Date().getFullYear()}</>
}

export function SiteFooter() {
  const { contact } = siteConfig

  return (
    <footer className="relative overflow-hidden border-t bg-section">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[48rem] -translate-x-1/2 rounded-full bg-brand-gradient opacity-[0.07] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Athena Software Labs — home">
              <Image src="/brand/logo-mark.svg" alt="" width={812} height={933} className="h-12 w-auto" />
              <Image src="/brand/wordmark-light.svg" alt="Athena Software Labs" width={763} height={175} className="h-7 w-auto dark:hidden" />
              <Image src="/brand/wordmark-dark.svg" alt="Athena Software Labs" width={763} height={175} className="hidden h-7 w-auto dark:block" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building modern software, LMS and digital solutions that help schools and
              businesses across Nepal work smarter.
            </p>
            <ul className="mt-6 flex gap-2">
              {siteConfig.socials.map((s) => {
                const Icon = socialIcons[s.label]
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex size-10 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-brand-blue/50 hover:text-brand-blue"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="text-muted-foreground transition-colors hover:text-foreground">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                {contact.address}
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex gap-3 break-all transition-colors hover:text-foreground">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="flex gap-3 transition-colors hover:text-foreground">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                {contact.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            © <CopyrightYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p>Proudly made in Nepal 🇳🇵</p>
        </div>
      </div>
    </footer>
  )
}
