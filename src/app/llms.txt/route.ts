import { buildLlmsTxt } from "@/lib/llms"

// Uses no request data, so it is prerendered as a static file at build time
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
