import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Full wordmark; both variants are rendered and CSS shows the one matching the theme.
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Athena Software Labs - home"
      className={cn("flex items-center gap-2.5 rounded-md", className)}
    >
      <Image
        src="/brand/logo-mark.svg"
        alt=""
        width={812}
        height={933}
        loading="eager"
        className="h-9 w-auto"
      />
      <Image
        src="/brand/wordmark-light.svg"
        alt="Athena Software Labs"
        width={763}
        height={175}
        fetchPriority="high"
        className="h-7 w-auto dark:hidden"
      />
      <Image
        src="/brand/wordmark-dark.svg"
        alt="Athena Software Labs"
        width={763}
        height={175}
        fetchPriority="high"
        className="hidden h-7 w-auto dark:block"
      />
    </Link>
  )
}
