import { CtaBand } from "@/components/shared/cta-band"
import { Hero } from "@/components/sections/home/hero"
import { Industries } from "@/components/sections/home/industries"
import { LmsSpotlight } from "@/components/sections/home/lms-spotlight"
import { Process } from "@/components/sections/home/process"
import { ServicesGrid } from "@/components/sections/home/services-grid"
import { StatsStrip } from "@/components/sections/home/stats-strip"
import { WhyUs } from "@/components/sections/home/why-us"

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ServicesGrid />
      <LmsSpotlight />
      <Industries />
      <Process />
      <WhyUs />
      <CtaBand />
    </>
  )
}
