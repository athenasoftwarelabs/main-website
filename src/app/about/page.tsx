import { CtaBand } from "@/components/shared/cta-band"
import { PageHero } from "@/components/shared/page-hero"
import { MissionVision } from "@/components/sections/about/mission-vision"
import { Story } from "@/components/sections/about/story"
import { Team } from "@/components/sections/about/team"
import { Values } from "@/components/sections/about/values"
import { JsonLd } from "@/components/seo/json-ld"
import { team } from "@/data/team"
import { breadcrumbSchema, pageMetadata, personSchema, webPageSchema } from "@/lib/seo"

const title = "About Us: Software Company in Urlabari, Nepal"
const description =
  "Meet Athena Software Labs, a software company in Urlabari, Koshi Province. Learn our story, mission and the team building digital solutions for Nepal."
const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]

export const metadata = pageMetadata({ title, description, path: "/about" })

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ type: "AboutPage", path: "/about", name: title, description }),
          breadcrumbSchema(crumbs),
          ...team.map(personSchema),
        ]}
      />
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
