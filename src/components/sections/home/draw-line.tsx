"use client"

import { motion } from "motion/react"

// Horizontal connector between process steps that "draws" itself on scroll (desktop only).
export function DrawLine() {
  return (
    <div aria-hidden className="absolute top-10 right-[12.5%] left-[12.5%] hidden h-0.5 lg:block">
      <div className="absolute inset-0 rounded-full bg-border" />
      <motion.div
        className="absolute inset-0 origin-left rounded-full bg-brand-gradient"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -120px 0px" }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
      />
    </div>
  )
}
