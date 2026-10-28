"use client"

import { useState } from "react"
import { Check, Link2, MessageCircle } from "lucide-react"
import { socialIcons } from "@/components/shared/social-icons"

const btn =
  "flex size-10 items-center justify-center rounded-full border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-brand-blue/50 hover:text-brand-blue"

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const Facebook = socialIcons.Facebook
  const LinkedIn = socialIcons.LinkedIn

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="text-sm font-semibold">Share this article</p>
      <div className="flex gap-2">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className={btn}>
          <Facebook className="size-4" />
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className={btn}>
          <LinkedIn className="size-4" />
        </a>
        <a href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className={btn}>
          <MessageCircle className="size-4" />
        </a>
        <button type="button" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"} className={btn}>
          {copied ? <Check className="size-4 text-success" /> : <Link2 className="size-4" />}
        </button>
      </div>
    </div>
  )
}
