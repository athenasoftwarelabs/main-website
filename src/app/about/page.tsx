import type { Metadata } from "next"
import { CtaBand } from "@/components/shared/cta-band"
import { PageHero } from "@/components/shared/page-hero"
import { MissionVision } from "@/components/sections/about/mission-vision"
import { Story } from "@/components/sections/about/story"
import { Team } from "@/components/sections/about/team"
import { Values } from "@/components/sections/about/values"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Athena Software Labs, a Nepal-based team building modern software, school LMS and digital solutions. Learn about our story, mission and team.",
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Wisdom and craft, <span className="text-gradient">built in Nepal</span>
          </>
        }
        description="We're a software company from Urlabari, Koshi Province, on a mission to bring modern, affordable technology to every school and business in Nepal."
      />
      <Story />
      <MissionVision />
      <Values />
      <Team />
      <CtaBand title="Let's build something great together" />
    </>
  )
}
