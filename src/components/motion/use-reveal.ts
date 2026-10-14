"use client"

import { useEffect, type RefObject } from "react"

type RevealOptions = {
  /** Reveal matching descendants instead of the element itself */
  selector?: string
  /** Seconds between items that are revealed together */
  stagger?: number
  /** Base delay in seconds */
  delay?: number
}

type Entry = { stagger: number; delay: number }

// One shared, rAF-throttled scroll check for every pending element. Unlike an IntersectionObserver,
// it also reveals elements that a fast fling or anchor jump skipped past, so nothing stays hidden.
const pending = new Map<HTMLElement, Entry>()
let frame = 0

function check() {
  frame = 0
  const limit = window.innerHeight - 60
  const counts = new Map<Entry, number>()
  for (const [el, entry] of pending) {
    if (el.getBoundingClientRect().top > limit) continue
    const i = counts.get(entry) ?? 0
    counts.set(entry, i + 1)
    el.style.setProperty("--reveal-delay", `${entry.delay + i * entry.stagger}s`)
    el.dataset.reveal = "shown"
    pending.delete(el)
  }
  if (!pending.size) stopListening()
}

function schedule() {
  // Background tabs don't run rAF callbacks, so check right away there
  if (document.hidden) check()
  else if (!frame) frame = requestAnimationFrame(check)
}

function startListening() {
  window.addEventListener("scroll", schedule, { passive: true })
  window.addEventListener("resize", schedule, { passive: true })
}

function stopListening() {
  window.removeEventListener("scroll", schedule)
  window.removeEventListener("resize", schedule)
}

// Progressive scroll reveal: content is visible by default (server HTML, no JS, slow networks).
// After hydration, only elements still below the fold are hidden, then faded in as they scroll into view.
export function useReveal(ref: RefObject<HTMLElement | null>, { selector, stagger = 0, delay = 0 }: RevealOptions = {}) {
  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = selector ? Array.from(root.querySelectorAll<HTMLElement>(selector)) : [root]
    const below = targets.filter((el) => el.getBoundingClientRect().top > window.innerHeight)
    if (!below.length) return

    const entry: Entry = { stagger, delay }
    if (!pending.size) startListening()
    for (const el of below) {
      el.dataset.reveal = "pending"
      pending.set(el, entry)
    }

    return () => {
      // Never leave content hidden if the component re-runs or unmounts mid-way
      for (const el of below) {
        if (pending.delete(el)) delete el.dataset.reveal
      }
      if (!pending.size) stopListening()
    }
  }, [ref, selector, stagger, delay])
}
