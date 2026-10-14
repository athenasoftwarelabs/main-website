import {
  Cloud,
  Code2,
  GraduationCap,
  Lightbulb,
  MonitorSmartphone,
  Palette,
  Receipt,
  ShoppingCart,
  Smartphone,
  type LucideIcon,
} from "lucide-react"

export type Service = {
  id: string
  title: string
  short: string
  description: string
  icon: LucideIcon
  features: string[]
  featured?: boolean
}

export const services: Service[] = [
  {
    id: "school-lms",
    title: "School LMS & ERP",
    short:
      "One platform to run your entire school: academics, attendance, finance and analytics.",
    description:
      "Our flagship Learning Management System digitalizes every part of school administration. Publish results and mark sheets in minutes, track attendance daily, manage fees and teacher salaries, and get a clear picture of your school's performance, all from the web or our mobile app.",
    icon: GraduationCap,
    featured: true,
    features: [
      "Results, mark sheets & grade sheets",
      "Student & teacher attendance",
      "Fee collection & teacher payroll",
      "Income & expense tracking",
      "Performance analytics & reports",
      "Parent & teacher mobile app",
    ],
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    short:
      "Tailor-made software built around the way your organization actually works.",
    description:
      "From internal tools to complete management systems, we design and build secure, scalable software that automates repetitive work and gives your team better information.",
    icon: Code2,
    features: [
      "Requirement analysis & planning",
      "Web-based management systems",
      "API & third-party integrations",
      "Scalable, secure architecture",
    ],
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    short: "Beautiful, fast Android and iOS apps that your customers will love.",
    description:
      "We build native-quality mobile apps for Android and iOS from a single, maintainable codebase. We handle design, development, Play Store and App Store publishing, and ongoing updates.",
    icon: Smartphone,
    features: [
      "Android & iOS apps",
      "Cross-platform development",
      "Push notifications & offline support",
      "Play Store & App Store publishing",
    ],
  },
  {
    id: "billing-pos",
    title: "Billing & POS Solutions",
    short:
      "Fast, reliable billing for hotels, restaurants, retail stores and more.",
    description:
      "Modern billing and point-of-sale software with inventory, table and order management, and clear daily reports, built for how businesses in Nepal operate.",
    icon: Receipt,
    features: [
      "VAT-ready invoicing",
      "Inventory & stock management",
      "Table & order management for restaurants",
      "Daily sales & profit reports",
    ],
  },
  {
    id: "cms-websites",
    title: "CMS & Website Development",
    short:
      "Modern, responsive websites you can update yourself, no coding needed.",
    description:
      "We craft fast, SEO-friendly websites with an easy content management system, so your team can publish news, notices, galleries and pages on their own.",
    icon: MonitorSmartphone,
    features: [
      "Responsive, mobile-first design",
      "Easy-to-use admin panel",
      "SEO & performance optimized",
      "Notices, blogs & galleries",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    short: "Online stores that help you sell more, anywhere in Nepal.",
    description:
      "Complete e-commerce platforms with product catalogs, carts, local payment gateway integration, and order and delivery management.",
    icon: ShoppingCart,
    features: [
      "Product & catalog management",
      "Local payment gateway integration",
      "Order & delivery tracking",
      "Sales dashboards",
    ],
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    short:
      "Expert guidance to plan, choose and adopt the right technology.",
    description:
      "Not sure where to start with digitalization? We assess your current processes, recommend the right technology, and guide you through a smooth transition.",
    icon: Lightbulb,
    features: [
      "Digital transformation strategy",
      "Technology selection",
      "Process automation advice",
      "Staff training & onboarding",
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    short: "Clean, intuitive interfaces designed around real users.",
    description:
      "We research, wireframe and design user-friendly interfaces for web and mobile, so your product is easy to use from day one.",
    icon: Palette,
    features: [
      "User research & wireframes",
      "Interactive prototypes",
      "Design systems",
      "Usability testing",
    ],
  },
  {
    id: "cloud-maintenance",
    title: "Cloud Hosting & Maintenance",
    short: "Secure hosting, backups and support that keep you running.",
    description:
      "We deploy, monitor and maintain your applications on reliable cloud infrastructure, with regular backups, security updates and responsive local support.",
    icon: Cloud,
    features: [
      "Cloud deployment & hosting",
      "Automated backups",
      "Security updates & monitoring",
      "Ongoing support & maintenance",
    ],
  },
]
