import Image from "next/image"
import Link from "next/link"
import type { TeamMember } from "@/data/team"
import { socialIcons } from "@/components/shared/social-icons"
import { cn } from "@/lib/utils"

/** Round avatar cropped to the face of a background-removed team photo, or initials as a fallback */
export function Avatar({ member, className }: { member: TeamMember; className?: string }) {
  const face = member.photo?.face

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-teal/25 ring-2 ring-background",
        className
      )}
    >
      {member.photo && face ? (
        <Image
          src={member.photo.src}
          alt=""
          width={256}
          height={256}
          sizes="128px"
          className="absolute max-w-none"
          // Scale the photo and shift it so the face centre lands in the middle of the circle
          style={{
            width: `${face.zoom * 100}%`,
            height: `${face.zoom * 100}%`,
            left: `${50 - face.x * face.zoom * 100}%`,
            top: `${50 - face.y * face.zoom * 100}%`,
          }}
        />
      ) : (
        <span className="m-auto font-heading text-sm font-bold text-primary">{member.initials}</span>
      )}
    </span>
  )
}

export function AuthorBox({ member }: { member: TeamMember }) {
  const LinkedIn = socialIcons.LinkedIn
  const hasProfile = new URL(member.linkedin).pathname.length > 1

  return (
    <section
      aria-label="About the author"
      className="mt-12 flex flex-col gap-5 rounded-3xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:p-8"
    >
      <Avatar member={member} className="size-20" />
      <div className="flex-1">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Written by</p>
        <p className="mt-1 font-heading text-xl font-bold">{member.name}</p>
        <p className="text-sm font-semibold text-brand-teal-text">
          {member.role}, Athena Software Labs
        </p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{member.bio}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/about#team" className="text-primary hover:underline dark:text-brand-teal">
            Meet the team
          </Link>
          {hasProfile && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:underline dark:text-brand-teal"
            >
              <LinkedIn className="size-4" /> LinkedIn
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
