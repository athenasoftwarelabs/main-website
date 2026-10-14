"use server"

import { contactSchema, type ContactValues } from "@/lib/contact-schema"

export type ContactResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Partial<Record<keyof ContactValues, string[]>> }

// Mock submission: validates on the server and logs the enquiry.
// TODO: send via email (e.g. Resend) or store in a database before launch.
export async function submitContact(values: ContactValues): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  await new Promise((r) => setTimeout(r, 800))
  console.info("[contact] New enquiry:", parsed.data)

  return { ok: true }
}
