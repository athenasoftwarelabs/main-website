import { z } from "zod"
import { services } from "@/data/services"

export const serviceOptions = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: "other", label: "Something else" },
]

const serviceIds = serviceOptions.map((o) => o.value) as [string, ...string[]]

// Shared by the client form and the /api/contact route so both validate identically
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(80),
  email: z.email("Please enter a valid email address.").trim(),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{6,17}$/, "Please enter a valid phone number.")
    .or(z.literal("")),
  organization: z.string().trim().max(120).optional(),
  service: z.enum(serviceIds, "Please choose a service."),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(2000, "Message is too long."),
})

export type ContactValues = z.infer<typeof contactSchema>

/** JSON body returned by POST /api/contact */
export type ContactResponse =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Partial<Record<keyof ContactValues, string[]>> }
