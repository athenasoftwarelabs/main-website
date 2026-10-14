import Link from "next/link"
import { ArrowRight, CircleCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { LmsMock } from "@/components/sections/home/lms-mock"
import { lmsTabs } from "@/data/lms-features"

export function LmsSpotlight() {
  return (
    <section className="relative overflow-hidden bg-section px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 size-[32rem] rounded-full bg-brand-teal/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Flagship product · School LMS"
          title={
            <>
              Run your entire school from <span className="text-gradient">one platform</span>
            </>
          }
          description="Academics, attendance, finance and analytics, fully digital. Our LMS replaces registers, spreadsheets and paper ledgers with one simple system for admins, teachers and parents."
        />

        <Reveal delay={0.1}>
          <Tabs defaultValue={lmsTabs[0].id} className="mt-12 gap-10">
            <div className="-mx-4 flex justify-start overflow-x-auto px-4 pb-1 sm:mx-0 sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden">
              <TabsList className="h-auto! gap-1 rounded-full border bg-card p-1.5 shadow-sm">
                {lmsTabs.map((t) => (
                  <TabsTrigger
                    key={t.id}
                    value={t.id}
                    className="h-9 flex-none rounded-full px-4 text-sm data-active:bg-brand-gradient! data-active:text-white! data-active:shadow-md data-active:shadow-brand-blue/25 sm:px-5"
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {lmsTabs.map((t) => (
              <TabsContent
                key={t.id}
                value={t.id}
                className="grid animate-in items-center text-base gap-10 duration-500 fade-in-0 slide-in-from-bottom-3 lg:grid-cols-[1fr_1.2fr] lg:gap-16"
              >
                <div>
                  <h3 className="text-2xl font-bold sm:text-3xl">{t.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{t.description}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {t.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm">
                        <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand-teal-text" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="brand" size="xl" className="mt-8">
                    <Link href="/services#school-lms">
                      Explore the LMS
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                  </Button>
                </div>
                <LmsMock view={t.id} />
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  )
}
