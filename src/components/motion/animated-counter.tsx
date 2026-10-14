"use client"

import { useEffect, useRef } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

const format = (n: number) => Math.round(n).toLocaleString("en-US")

// Counts up from 0 to `value` once the number scrolls into view.
export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.8,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!inView || !node) return
    if (reduceMotion) {
      node.textContent = format(value) + suffix
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = format(v) + suffix
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix, duration, reduceMotion])

  // Server HTML shows the final value so no-JS visitors and crawlers see real numbers
  return (
    <span ref={ref} className="tabular-nums" suppressHydrationWarning>
      {format(value) + suffix}
    </span>
  )
}
