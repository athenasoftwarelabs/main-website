"use client"

import { useRef } from "react"
import { useReveal } from "@/components/motion/use-reveal"

// Reveals each StaggerItem as it scrolls into view; items entering together animate one after another.
export function Stagger({
  stagger = 0.08,
  children,
  ...props
}: React.ComponentProps<"div"> & { stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { selector: "[data-stagger-item]", stagger })

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
}

export function StaggerItem({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-stagger-item="" {...props}>
      {children}
    </div>
  )
}
