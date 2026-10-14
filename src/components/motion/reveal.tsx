"use client"

import { useRef } from "react"
import { useReveal } from "@/components/motion/use-reveal"

type Direction = "up" | "down" | "left" | "right" | "none"

const from: Record<Direction, string> = {
  up: "translateY(24px)",
  down: "translateY(-24px)",
  left: "translateX(32px)",
  right: "translateX(-32px)",
  none: "none",
}

type RevealProps = React.ComponentProps<"div"> & {
  delay?: number
  direction?: Direction
}

// Fades and slides its children in the first time they scroll into view.
export function Reveal({ delay = 0, direction = "up", style, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { delay })

  return (
    <div
      ref={ref}
      style={{ "--reveal-from": from[direction], ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}
