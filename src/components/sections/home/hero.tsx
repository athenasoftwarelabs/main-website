import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  FileSpreadsheet,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientBg } from "@/components/shared/gradient-bg"
import { Eyebrow } from "@/components/shared/section-heading"

// Above-the-fold content animates with CSS so it paints before JavaScript loads.
const enter = "animate-in fade-in-0 slide-in-from-bottom-6 duration-700 fill-mode-both motion-reduce:animate-none"

export function Hero() {
  return (
    <section className="relative isolate -mt-16 overflow-hidden pt-32 pb-20 sm:pt-36 lg:-mt-[4.5rem] lg:pt-44 lg:pb-32">
      <GradientBg />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:px-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className={enter}>
            <Eyebrow>Software · LMS · Apps — Made in Nepal</Eyebrow>
          </div>
          <h1
            className={`${enter} mt-6 text-[2.6rem] leading-[1.05] font-extrabold text-balance delay-100 sm:text-6xl lg:text-[4.25rem]`}
          >
            Digital solutions for Nepal&apos;s{" "}
            <span className="text-gradient">schools</span> &{" "}
            <span className="text-gradient">businesses</span>
          </h1>
          <p
            className={`${enter} mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground delay-200 sm:text-lg`}
          >
            Athena Software Labs builds smart school LMS, billing systems, websites,
            e-commerce and Android &amp; iOS apps that help organizations across Nepal
            work faster, smarter and paper-free.
          </p>
          <div className={`${enter} mt-9 flex w-full flex-col gap-3 delay-300 sm:w-auto sm:flex-row`}>
            <Button asChild variant="brand" size="xl">
              <Link href="/services">
                Explore Services
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="bg-background/60 backdrop-blur">
              <Link href="/contact">Talk to Us</Link>
            </Button>
          </div>
          <ul
            className={`${enter} mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground delay-500 lg:justify-start`}
          >
            {["Local support team", "Android & iOS", "Secure & reliable"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-brand-teal-text" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}

function HeroVisual() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[30rem] animate-in duration-1000 fill-mode-both zoom-in-95 fade-in-0 delay-200 motion-reduce:animate-none"
      aria-hidden
    >
      {/* Orbit rings */}
      <div className="absolute inset-[6%] rounded-full border border-dashed border-brand-blue/25 motion-safe:animate-spin-slow" />
      <div className="absolute inset-[20%] rounded-full border border-brand-teal/25" />
      <div className="absolute inset-[24%] rounded-full bg-brand-gradient opacity-20 blur-3xl" />

      {/* Logo mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex size-[46%] items-center justify-center rounded-[2rem] border border-white/60 bg-white/70 shadow-2xl shadow-brand-blue/20 backdrop-blur-md motion-safe:animate-float dark:border-white/10 dark:bg-white/[0.04]">
          <Image
            src="/brand/logo-mark.svg"
            alt=""
            width={812}
            height={933}
            loading="eager"
            fetchPriority="high"
            className="h-[70%] w-auto drop-shadow-[0_8px_24px_rgba(4,125,252,0.35)]"
          />
        </div>
      </div>

      {/* Floating stat cards */}
      <FloatCard className="top-[6%] left-0 sm:-left-4" delay="0s">
        <IconBubble className="bg-brand-blue/10 text-brand-blue">
          <FileSpreadsheet className="size-4" />
        </IconBubble>
        <div>
          <p className="text-[0.7rem] text-muted-foreground">Results published</p>
          <p className="text-sm font-semibold">Grade 10 · 2 min ago</p>
        </div>
      </FloatCard>

      <FloatCard className="top-[18%] right-0 sm:-right-6" delay="-2s">
        <IconBubble className="bg-success/15 text-success">
          <CalendarCheck className="size-4" />
        </IconBubble>
        <div>
          <p className="text-[0.7rem] text-muted-foreground">Today&apos;s attendance</p>
          <p className="text-sm font-semibold">96.4%</p>
        </div>
      </FloatCard>

      <FloatCard className="bottom-[16%] left-0 sm:-left-8" delay="-4s">
        <IconBubble className="bg-brand-teal/15 text-brand-teal-text">
          <Wallet className="size-4" />
        </IconBubble>
        <div>
          <p className="text-[0.7rem] text-muted-foreground">Fees collected</p>
          <p className="text-sm font-semibold">Rs. 4,52,000</p>
        </div>
      </FloatCard>

      <FloatCard className="right-[4%] bottom-[4%]" delay="-3s">
        <IconBubble className="bg-warning/15 text-warning">
          <TrendingUp className="size-4" />
        </IconBubble>
        <div>
          <p className="text-[0.7rem] text-muted-foreground">Performance</p>
          <p className="text-sm font-semibold">+12% this term</p>
        </div>
      </FloatCard>
    </div>
  )
}

function FloatCard({
  className,
  delay,
  children,
}: {
  className: string
  delay: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`absolute flex items-center gap-3 rounded-2xl border bg-card/90 px-3.5 py-2.5 shadow-xl shadow-black/5 backdrop-blur-md motion-safe:animate-float dark:shadow-black/30 ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  )
}

function IconBubble({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${className}`}>
      {children}
    </span>
  )
}
