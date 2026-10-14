import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientBg } from "@/components/shared/gradient-bg"

export default function NotFound() {
  return (
    <section className="relative isolate -mt-16 flex min-h-[80vh] items-center justify-center overflow-hidden px-4 pt-24 pb-16 lg:-mt-[4.5rem]">
      <GradientBg />
      <div className="flex flex-col items-center text-center">
        <Image
          src="/brand/logo-mark.svg"
          alt=""
          width={812}
          height={933}
          className="h-24 w-auto motion-safe:animate-float"
        />
        <p className="mt-8 font-heading text-7xl font-extrabold sm:text-8xl">
          <span className="text-gradient">404</span>
        </p>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Page not found</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button asChild variant="brand" size="xl" className="mt-8">
          <Link href="/">
            <ArrowLeft data-icon="inline-start" />
            Back to home
          </Link>
        </Button>
      </div>
    </section>
  )
}
