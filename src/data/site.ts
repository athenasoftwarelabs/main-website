// Central company info.
export const siteConfig = {
  name: "Athena Software Labs",
  shortName: "Athena",
  url: "https://athenasoftwarelabs.com",
  tagline: "Digital solutions for Nepal's schools & businesses",
  description:
    "Athena Software Labs is a Nepal-based IT company building school LMS, billing systems, websites, e-commerce, and Android & iOS apps for schools, hotels, restaurants and growing businesses.",
  contact: {
    email: "info@athenasoftwarelabs.com",
    phone: "+977 9768643712",
    phoneHref: "tel:+9779768643712",
    address: "Urlabari, Koshi Province, Nepal",
    hours: "Sun – Fri, 10:00 AM – 6:00 PM",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=87.59%2C26.64%2C87.65%2C26.69&layer=mapnik&marker=26.6655%2C87.6200",
  },
  socials: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ],
} as const

export const mainNav = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
] as const

// Numbers for the stats strip - update as the company grows.
export const stats = [
  { value: 5, suffix: "+", label: "Schools & businesses served" },
  { value: 10, suffix: "+", label: "Projects delivered" },
  { value: 1500, suffix: "+", label: "Students managed on our LMS" },
  { value: 24, suffix: "/7", label: "Local support" },
] as const
