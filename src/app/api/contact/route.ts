import { appendRow, SheetsConfigError } from "@/lib/google-sheets"
import { contactSchema, serviceOptions, type ContactResponse } from "@/lib/contact-schema"

const SHEET_HEADER = ["Submitted at (NPT)", "Name", "Email", "Phone", "Organization", "Service", "Message"]

// Readable timestamp in Nepal time, e.g. "2026-10-14 13:05:22"
const nepalTime = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Kathmandu",
  dateStyle: "short",
  timeStyle: "medium",
})

function json(body: ContactResponse, status = 200) {
  return Response.json(body, { status })
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400)
  }

  // Honeypot: the hidden "website" field is invisible to people, so only bots fill it in.
  // Pretend success so they don't retry.
  if (body && typeof body === "object" && "website" in body && body.website) {
    return json({ ok: true })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return json(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      422
    )
  }

  const { name, email, phone, organization, service, message } = parsed.data
  const serviceLabel = serviceOptions.find((o) => o.value === service)?.label ?? service

  try {
    await appendRow(SHEET_HEADER, [
      nepalTime.format(new Date()),
      name,
      email,
      phone,
      organization ?? "",
      serviceLabel,
      message,
    ])
  } catch (error) {
    console.error("[api/contact] Could not save submission to Google Sheets:", error)
    const notConfigured = error instanceof SheetsConfigError
    return json(
      {
        ok: false,
        message: notConfigured
          ? "The contact form isn't set up yet. Please call or email us directly."
          : "We couldn't send your message right now. Please try again or call us.",
      },
      notConfigured ? 503 : 502
    )
  }

  return json({ ok: true })
}
