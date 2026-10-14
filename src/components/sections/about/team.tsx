import { Mail } from "lucide-react"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { SectionHeading } from "@/components/shared/section-heading"
import { socialIcons } from "@/components/shared/social-icons"
import { team } from "@/data/team"
import { siteConfig } from "@/data/site"

export function Team() {
  const LinkedIn = socialIcons.LinkedIn

  return (
    <section className="bg-section px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our team"
          title={
            <>
              The people behind <span className="text-gradient">Athena</span>
            </>
          }
          description="A small, focused team of builders who care deeply about the schools and businesses we serve."
        />
        <Stagger className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
          {team.map((m) => (
            <StaggerItem key={m.name}>
              <article className="group gradient-border relative h-full overflow-hidden rounded-3xl border bg-card p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl hover:shadow-brand-blue/10">
                <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-brand-gradient opacity-[0.08] transition-opacity duration-500 group-hover:opacity-20" />
                <div className="relative mx-auto flex size-28 items-center justify-center rounded-full bg-brand-gradient p-1 shadow-lg shadow-brand-blue/25 transition-transform duration-500 group-hover:scale-105">
                  <div className="flex size-full items-center justify-center rounded-full bg-card">
                    <span className="text-gradient font-heading text-3xl font-extrabold">{m.initials}</span>
                  </div>
                </div>
                <h3 className="relative mt-6 text-xl font-bold">{m.name}</h3>
                <p className="relative mt-1 text-sm font-semibold text-brand-teal-text">{m.role}</p>
                <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
                <div className="relative mt-6 flex justify-center gap-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on LinkedIn`}
                    className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-brand-blue/50 hover:text-brand-blue"
                  >
                    <LinkedIn className="size-4" />
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    aria-label={`Email ${m.name}`}
                    className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-brand-blue/50 hover:text-brand-blue"
                  >
                    <Mail className="size-4" />
                  </a>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
