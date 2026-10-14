import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { socialIcons } from "@/components/shared/social-icons"
import { siteConfig } from "@/data/site"

export function ContactInfo() {
  const { contact } = siteConfig
  const items = [
    { icon: Mail, label: "Email us", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Call us", value: contact.phone, href: contact.phoneHref },
    { icon: MapPin, label: "Visit us", value: contact.address },
    { icon: Clock, label: "Office hours", value: contact.hours },
  ]

  return (
    <div className="flex flex-col gap-6">
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" stagger={0.08}>
        {items.map(({ icon: Icon, label, value, href }) => {
          const content = (
            <>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-md shadow-brand-blue/20 transition-transform duration-300 group-hover:scale-110">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</span>
                <span className="mt-1 block font-semibold break-words">{value}</span>
              </span>
            </>
          )
          const cls =
            "group flex h-full items-center gap-4 rounded-2xl border bg-card p-5 transition-all duration-300 hover:border-brand-blue/40 hover:shadow-lg hover:shadow-brand-blue/5"
          return (
            <StaggerItem key={label}>
              {href ? (
                <a href={href} className={cls}>
                  {content}
                </a>
              ) : (
                <div className={cls}>{content}</div>
              )}
            </StaggerItem>
          )
        })}
      </Stagger>

      <Reveal delay={0.3} className="rounded-2xl border bg-card p-5">
        <p className="text-sm font-semibold">Follow us</p>
        <ul className="mt-3 flex gap-2">
          {siteConfig.socials.map((s) => {
            const Icon = socialIcons[s.label]
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-brand-blue/50 hover:text-brand-blue"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </div>
  )
}
