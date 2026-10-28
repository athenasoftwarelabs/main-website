import { NextResponse, type NextRequest } from "next/server"
import { getPost } from "@/content/blog"

// With Partial Prefetching, an unknown /blog/<slug> streams the page shell (HTTP 200) before notFound() runs,
// which search engines report as a "soft 404". Rejecting unknown slugs here, before rendering starts,
// returns a real 404 status.
export function proxy(request: NextRequest) {
  const slug = decodeURIComponent(request.nextUrl.pathname.split("/")[2] ?? "")

  // Let file-convention routes under /blog through (e.g. the blog's share image)
  if (!slug || slug === "opengraph-image" || slug.includes(".")) return NextResponse.next()

  if (!getPost(slug)) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: "/blog/:slug",
}
