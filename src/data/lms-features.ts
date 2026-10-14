import {
  BarChart3,
  BookOpenCheck,
  CalendarCheck,
  FileSpreadsheet,
  Smartphone,
  UsersRound,
  Wallet,
  WalletCards,
  type LucideIcon,
} from "lucide-react"

// Tabs on the home page LMS spotlight
export const lmsTabs = [
  {
    id: "academics",
    label: "Academics",
    title: "Results in minutes, not weeks",
    description:
      "Enter marks once and generate accurate mark sheets, grade sheets and report cards automatically, following Nepal's grading system.",
    points: [
      "Exam & subject setup",
      "Automatic GPA and grade calculation",
      "Printable mark sheets & grade sheets",
      "Results published to parents instantly",
    ],
  },
  {
    id: "attendance",
    label: "Attendance",
    title: "Daily attendance, effortlessly",
    description:
      "Teachers take attendance from their phones in seconds. Parents are notified and admins see trends at a glance.",
    points: [
      "Student & staff attendance",
      "Class-wise daily reports",
      "Absence alerts to parents",
      "Monthly attendance summaries",
    ],
  },
  {
    id: "finance",
    label: "Finance",
    title: "Your school's finances, fully digital",
    description:
      "Collect fees, pay teacher salaries and record every income and expense in one place, with no more spreadsheets or paper ledgers.",
    points: [
      "Student fee billing & receipts",
      "Teacher salary & payroll",
      "Income & expense tracking",
      "Dues reminders & financial reports",
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    title: "See how your school is really doing",
    description:
      "Interactive dashboards turn academic and financial data into insights that help you make better decisions.",
    points: [
      "Class & subject performance",
      "Student progress over time",
      "Fee collection insights",
      "Exportable reports",
    ],
  },
  {
    id: "management",
    label: "Management",
    title: "Every student, teacher and class organized",
    description:
      "Keep complete, secure records for everyone in your school and manage classes, sections, routines and notices with ease.",
    points: [
      "Student & staff profiles",
      "Classes, sections & routines",
      "Notices & announcements",
      "Role-based secure access",
    ],
  },
] as const

// Module grid on the services page
export const lmsModules: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Results & Mark Sheets",
    description: "Automated grade sheets, mark sheets and report cards.",
    icon: FileSpreadsheet,
  },
  {
    title: "Attendance",
    description: "Fast daily attendance for students and staff.",
    icon: CalendarCheck,
  },
  {
    title: "Student & Staff Records",
    description: "Complete, secure profiles for everyone in school.",
    icon: UsersRound,
  },
  {
    title: "Fee Management",
    description: "Billing, receipts, dues tracking and reminders.",
    icon: WalletCards,
  },
  {
    title: "Teacher Payroll",
    description: "Salary processing with clear payslips.",
    icon: Wallet,
  },
  {
    title: "Income & Expenses",
    description: "Track every rupee coming in and going out.",
    icon: BookOpenCheck,
  },
  {
    title: "Performance Analytics",
    description: "Dashboards for academic and financial insights.",
    icon: BarChart3,
  },
  {
    title: "Mobile App",
    description: "Android & iOS apps for parents, teachers and admins.",
    icon: Smartphone,
  },
]
