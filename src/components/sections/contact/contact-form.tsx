"use client"

import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "motion/react"
import { CircleCheck, Loader2, Send } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  contactSchema,
  serviceOptions,
  type ContactResponse,
  type ContactValues,
} from "@/lib/contact-schema"

const inputClass = "h-11 rounded-xl bg-background px-3.5 text-[0.95rem] md:text-[0.95rem]"

async function sendContact(values: ContactValues, website: string): Promise<ContactResponse> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, website }),
    })
    return (await res.json()) as ContactResponse
  } catch {
    return { ok: false, message: "Network error. Please check your connection and try again." }
  }
}

// Reads ?service=<id> (set by "Discuss your project" links) to preselect a service.
export function ContactFormWithParams() {
  const params = useSearchParams()
  const service = params.get("service") ?? ""
  const valid = serviceOptions.some((o) => o.value === service)
  return <ContactForm defaultService={valid ? service : ""} />
}

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [pending, startTransition] = useTransition()
  const [sent, setSent] = useState(false)

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      service: defaultService as ContactValues["service"],
      message: "",
    },
    mode: "onTouched",
  })

  const onSubmit = (values: ContactValues, event?: React.BaseSyntheticEvent) => {
    // The honeypot isn't a form-library field, so read it straight from the submitted form
    const formEl = event?.target instanceof HTMLFormElement ? event.target : null
    const website = String((formEl && new FormData(formEl).get("website")) ?? "")
    startTransition(async () => {
      const result = await sendContact(values, website)
      if (result.ok) {
        toast.success("Message sent!", {
          description: "Thanks for reaching out. We'll get back to you within one business day.",
        })
        form.reset()
        setSent(true)
      } else {
        Object.entries(result.fieldErrors ?? {}).forEach(([name, messages]) => {
          if (messages?.[0]) {
            form.setError(name as keyof ContactValues, { message: messages[0] })
          }
        })
        toast.error("Couldn't send your message", { description: result.message })
      }
    })
  }

  return (
    <div className="relative rounded-3xl border bg-card p-6 shadow-xl shadow-brand-blue/5 sm:p-8 lg:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="flex size-20 items-center justify-center rounded-full bg-brand-gradient text-white shadow-xl shadow-brand-blue/30"
            >
              <CircleCheck className="size-10" />
            </motion.span>
            <h3 className="mt-6 text-2xl font-bold">Thank you!</h3>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Your message has been received. Our team will contact you within one business day.
            </p>
            <Button variant="outline" size="xl" className="mt-8" onClick={() => setSent(false)}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            {/* Spam honeypot: hidden from people and screen readers; bots that fill it are ignored by the API */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in the form and we&apos;ll get back to you within one business day.
            </p>

            <FieldGroup className="mt-8 grid gap-5 sm:grid-cols-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Full name *</FieldLabel>
                    <Input {...field} id="name" autoComplete="name" placeholder="Your name" aria-invalid={fieldState.invalid} className={inputClass} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email *</FieldLabel>
                    <Input {...field} id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={fieldState.invalid} className={inputClass} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input {...field} id="phone" type="tel" autoComplete="tel" placeholder="+977 98XXXXXXXX" aria-invalid={fieldState.invalid} className={inputClass} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="organization"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="organization">School / Organization</FieldLabel>
                    <Input {...field} id="organization" autoComplete="organization" placeholder="Organization name" aria-invalid={fieldState.invalid} className={inputClass} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="service"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
                    <FieldLabel htmlFor="service">I&apos;m interested in *</FieldLabel>
                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="service"
                        aria-invalid={fieldState.invalid}
                        onBlur={field.onBlur}
                        className="w-full rounded-xl bg-background px-3.5 text-[0.95rem] data-[size=default]:h-11"
                      >
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {serviceOptions.map((o) => (
                          <SelectItem key={o.value} value={o.value} className="py-2">
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
                    <FieldLabel htmlFor="message">Message *</FieldLabel>
                    <Textarea
                      {...field}
                      id="message"
                      rows={5}
                      placeholder="Tell us about your project, goals or questions…"
                      aria-invalid={fieldState.invalid}
                      className="min-h-32 resize-y rounded-xl bg-background px-3.5 py-3 text-[0.95rem] md:text-[0.95rem]"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit" variant="brand" size="xl" disabled={pending} className="mt-8 w-full sm:w-auto">
              {pending ? (
                <>
                  <Loader2 data-icon="inline-start" className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <Send data-icon="inline-end" />
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
