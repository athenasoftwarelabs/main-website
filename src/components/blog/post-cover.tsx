import Image from "next/image"
import type { Post } from "@/content/blog"
import { cn } from "@/lib/utils"

// Branded, illustration-style cover art generated from the post's icon and topic chips (no stock photos needed)
export function PostCover({ post, size = "md", className }: { post: Post; size?: "md" | "lg"; className?: string }) {
  const Icon = post.cover.icon
  const lg = size === "lg"

  return (
    <div
      aria-hidden
      className={cn(
        "relative isolate overflow-hidden bg-[#0b1220]",
        lg ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[16/9]",
        className
      )}
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-50 invert" />
      <div className="absolute -top-1/3 -left-1/4 -z-10 size-3/4 rounded-full bg-brand-blue/45 blur-3xl" />
      <div className="absolute -right-1/4 -bottom-1/3 -z-10 size-3/4 rounded-full bg-brand-teal/35 blur-3xl" />
      <Image
        src="/brand/logo-mark.svg"
        alt=""
        width={812}
        height={933}
        className={cn("absolute -right-6 -bottom-10 -z-10 w-auto opacity-[0.07]", lg ? "h-[85%]" : "h-[90%]")}
      />

      <div className="flex h-full items-center justify-center gap-4 p-6 sm:gap-6">
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-3xl border border-white/15 bg-white/10 text-white shadow-2xl shadow-brand-blue/30 backdrop-blur-md transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3",
            lg ? "size-24 sm:size-32" : "size-16 sm:size-20"
          )}
        >
          <Icon className={lg ? "size-12 sm:size-16" : "size-8 sm:size-10"} strokeWidth={1.6} />
        </span>
        <div className={cn("flex flex-col gap-2", lg ? "sm:gap-3" : "max-sm:hidden")}>
          {post.cover.chips.map((chip, i) => (
            <span
              key={chip}
              className={cn(
                "w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 font-medium text-white/90 backdrop-blur-md",
                lg ? "text-xs sm:text-sm" : "text-[0.7rem]",
                i === 1 && "ml-4",
                i === 2 && "ml-2"
              )}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
