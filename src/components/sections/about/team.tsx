import Image from "next/image"
import { Mail } from "lucide-react"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { SectionHeading } from "@/components/shared/section-heading"
import { socialIcons } from "@/components/shared/social-icons"
import { team, type TeamMember } from "@/data/team"
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
              <article className="group gradient-border relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl hover:shadow-brand-blue/10">
                <Portrait member={m} />
                <div className="relative flex flex-1 flex-col px-7 pt-2 pb-7 text-center">
                  <h3 className="text-xl font-bold">{m.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-teal-text">{m.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
                  <div className="mt-auto flex justify-center gap-2 pt-6">
                    <a
                      href={m.linkedin}
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
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

// Branded backdrop for the background-removed cutouts; members without a photo get their initials.
function Portrait({ member }: { member: TeamMember }) {
  const { photo } = member

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-brand-blue/[0.07] to-brand-teal/[0.16] dark:from-brand-blue/[0.18] dark:to-brand-teal/[0.08]">
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div
        aria-hidden
        className="absolute top-[42%] left-1/2 size-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gradient opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-45 dark:opacity-35"
      />

      {photo ? (
        // Wrapper handles the hover zoom so it doesn't fight the per-photo framing transform
        <div className="absolute inset-0 origin-bottom transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <Image
            src={photo.src}
            alt={`Portrait of ${member.name}, ${member.role}`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
            className="object-cover drop-shadow-[0_12px_24px_rgba(4,125,252,0.18)]"
            style={{
              objectPosition: photo.focus,
              transform: `scale(${photo.zoom})`,
              transformOrigin: photo.focus,
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-36 items-center justify-center rounded-full bg-brand-gradient p-1 shadow-xl shadow-brand-blue/25 transition-transform duration-500 group-hover:scale-105">
            <div className="flex size-full items-center justify-center rounded-full bg-card">
              <span className="text-gradient font-heading text-5xl font-extrabold">{member.initials}</span>
            </div>
          </div>
        </div>
      )}

      {/* Fades the bottom of the photo into the card body */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />
    </div>
  )
}
