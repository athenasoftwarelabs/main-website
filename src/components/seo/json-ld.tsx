type Schema = Record<string, unknown>

/** Renders schema.org JSON-LD. Pass several nodes to publish them together as one @graph. */
export function JsonLd({ data }: { data: Schema | Schema[] }) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data }

  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag early
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, "\\u003c") }}
    />
  )
}
