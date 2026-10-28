import { JsonLd } from "@/components/seo/json-ld"
import { CtaBand } from "@/components/shared/cta-band"
import { Hero } from "@/components/sections/home/hero"
import { Industries } from "@/components/sections/home/industries"
import { LatestPosts } from "@/components/sections/home/latest-posts"
import { LmsSpotlight } from "@/components/sections/home/lms-spotlight"
import { Process } from "@/components/sections/home/process"
import { ServicesGrid } from "@/components/sections/home/services-grid"
import { StatsStrip } from "@/components/sections/home/stats-strip"
import { WhyUs } from "@/components/sections/home/why-us"
import { pageMetadata, webPageSchema } from "@/lib/seo"

const title = "Software & School LMS Company in Nepal | Athena Software Labs"
const description =
  "Athena Software Labs is a software company in Urlabari, Nepal building school LMS, billing & POS systems, websites, e-commerce and Android & iOS apps."

export const metadata = pageMetadata({ title, description, path: "/", absolute: true })

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/", name: title, description })} />
      <Hero />
      <StatsStrip />
      <ServicesGrid />
      <LmsSpotlight />
      <Industries />
      <Process />
      <WhyUs />
      <LatestPosts />
      <CtaBand />
    </>
  )
}
