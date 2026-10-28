const longDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" })

/** "2026-10-28" -> "October 28, 2026" */
export const formatDate = (isoDate: string) => longDate.format(new Date(`${isoDate}T00:00:00Z`))
