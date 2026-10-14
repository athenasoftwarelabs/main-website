import {
  BarChart3,
  CalendarCheck,
  FileSpreadsheet,
  LayoutDashboard,
  UsersRound,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Illustrative, CSS-only LMS screens for the spotlight tabs. All data is fictional.
type View = "academics" | "attendance" | "finance" | "analytics" | "management"

const nav = [
  { id: "academics", icon: FileSpreadsheet },
  { id: "attendance", icon: CalendarCheck },
  { id: "finance", icon: Wallet },
  { id: "analytics", icon: BarChart3 },
  { id: "management", icon: UsersRound },
] as const

export function LmsMock({ view }: { view: View }) {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-brand-blue/10 dark:shadow-black/40"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b bg-muted/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 truncate rounded-md bg-background px-3 py-0.5 text-[0.65rem] text-muted-foreground">
          lms.yourschool.edu.np/{view}
        </span>
      </div>
      <div className="flex min-h-[19rem]">
        <div className="hidden w-14 shrink-0 flex-col items-center gap-2 border-r bg-muted/30 py-4 sm:flex">
          <span className="mb-2 flex size-8 items-center justify-center rounded-lg bg-brand-gradient text-white">
            <LayoutDashboard className="size-4" />
          </span>
          {nav.map(({ id, icon: Icon }) => (
            <span
              key={id}
              className={cn(
                "flex size-8 items-center justify-center rounded-lg text-muted-foreground",
                id === view && "bg-brand-blue/10 text-brand-blue"
              )}
            >
              <Icon className="size-4" />
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1 p-4 sm:p-5">
          {view === "academics" && <Academics />}
          {view === "attendance" && <Attendance />}
          {view === "finance" && <Finance />}
          {view === "analytics" && <Analytics />}
          {view === "management" && <Management />}
        </div>
      </div>
    </div>
  )
}

function Title({ children, sub }: { children: React.ReactNode; sub: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-2">
      <p className="text-sm font-semibold">{children}</p>
      <p className="text-[0.65rem] text-muted-foreground">{sub}</p>
    </div>
  )
}

function Academics() {
  const rows = [
    { name: "Aarav Shrestha", gpa: "3.85", grade: "A+" },
    { name: "Sita Gurung", gpa: "3.70", grade: "A+" },
    { name: "Rohan Thapa", gpa: "3.45", grade: "A" },
    { name: "Priya Magar", gpa: "3.20", grade: "B+" },
    { name: "Bikash Rai", gpa: "2.95", grade: "B" },
  ]
  return (
    <>
      <Title sub="First Terminal · 2083">Grade 10 · Results</Title>
      <div className="overflow-hidden rounded-xl border text-xs">
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 bg-muted/60 px-3 py-2 font-medium text-muted-foreground">
          <span>Student</span>
          <span>GPA</span>
          <span className="w-8 text-center">Grade</span>
        </div>
        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-t px-3 py-2.5">
            <span className="truncate">{r.name}</span>
            <span className="tabular-nums">{r.gpa}</span>
            <span className="w-8 rounded-md bg-brand-blue/10 py-0.5 text-center font-semibold text-brand-blue">
              {r.grade}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <span className="rounded-md bg-brand-gradient px-2.5 py-1 text-[0.65rem] font-medium text-white">
          Print mark sheets
        </span>
        <span className="rounded-md border px-2.5 py-1 text-[0.65rem] font-medium">Publish to parents</span>
      </div>
    </>
  )
}

function Attendance() {
  const days = [
    { d: "Sun", v: 94 },
    { d: "Mon", v: 97 },
    { d: "Tue", v: 92 },
    { d: "Wed", v: 96 },
    { d: "Thu", v: 89 },
    { d: "Fri", v: 98 },
  ]
  return (
    <>
      <Title sub="This week">Attendance overview</Title>
      <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
        <div className="flex items-center gap-4 rounded-xl border p-4 sm:flex-col sm:justify-center">
          <div
            className="relative size-20 rounded-full"
            style={{ background: "conic-gradient(var(--brand-teal) 0 96%, var(--muted) 96% 100%)" }}
          >
            <div className="absolute inset-2 flex items-center justify-center rounded-full bg-card text-sm font-bold">
              96%
            </div>
          </div>
          <p className="text-[0.65rem] text-muted-foreground sm:text-center">Today · 1,248 present</p>
        </div>
        <div className="flex h-40 items-end gap-2 rounded-xl border p-4">
          {days.map((x) => (
            <div key={x.d} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-28 w-full items-end">
                <div
                  className="w-full rounded-t-md bg-brand-gradient"
                  style={{ height: `${(x.v - 80) * 5}%` }}
                />
              </div>
              <span className="text-[0.6rem] text-muted-foreground">{x.d}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function Finance() {
  const months = [
    { m: "Bai", inc: 70, exp: 45 },
    { m: "Jes", inc: 82, exp: 50 },
    { m: "Ash", inc: 64, exp: 48 },
    { m: "Shr", inc: 90, exp: 55 },
    { m: "Bha", inc: 76, exp: 52 },
  ]
  return (
    <>
      <Title sub="FY 2083/84">Finance</Title>
      <div className="mb-4 grid grid-cols-3 gap-2">
        {[
          { l: "Fees collected", v: "Rs 45.2L", c: "text-brand-blue" },
          { l: "Salaries paid", v: "Rs 18.6L", c: "text-brand-teal-text" },
          { l: "Expenses", v: "Rs 9.4L", c: "text-warning" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border p-2.5">
            <p className="truncate text-[0.6rem] text-muted-foreground">{k.l}</p>
            <p className={cn("mt-0.5 text-sm font-bold", k.c)}>{k.v}</p>
          </div>
        ))}
      </div>
      <div className="flex h-36 items-end gap-3 rounded-xl border p-4">
        {months.map((x) => (
          <div key={x.m} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex h-24 w-full items-end gap-1">
              <div className="flex-1 rounded-t bg-brand-blue" style={{ height: `${x.inc}%` }} />
              <div className="flex-1 rounded-t bg-brand-teal/70" style={{ height: `${x.exp}%` }} />
            </div>
            <span className="text-[0.6rem] text-muted-foreground">{x.m}</span>
          </div>
        ))}
      </div>
    </>
  )
}

function Analytics() {
  const subjects = [
    { s: "Mathematics", v: 82 },
    { s: "Science", v: 76 },
    { s: "English", v: 88 },
    { s: "Nepali", v: 91 },
  ]
  return (
    <>
      <Title sub="Last 6 terms">School performance</Title>
      <div className="rounded-xl border p-3">
        <svg viewBox="0 0 300 90" className="h-24 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lms-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--brand-blue)" stopOpacity="0.35" />
              <stop offset="1" stopColor="var(--brand-blue)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 70 L60 58 L120 62 L180 40 L240 32 L300 14 L300 90 L0 90 Z" fill="url(#lms-area)" />
          <path
            d="M0 70 L60 58 L120 62 L180 40 L240 32 L300 14"
            fill="none"
            stroke="var(--brand-blue)"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="mt-4 space-y-2.5">
        {subjects.map((x) => (
          <div key={x.s} className="grid grid-cols-[5.5rem_1fr_2rem] items-center gap-3 text-[0.7rem]">
            <span className="truncate text-muted-foreground">{x.s}</span>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${x.v}%` }} />
            </div>
            <span className="text-right font-medium tabular-nums">{x.v}%</span>
          </div>
        ))}
      </div>
    </>
  )
}

function Management() {
  const classes = [
    { c: "Grade 10", s: "A, B, C", n: 132, t: "Ram Sharma" },
    { c: "Grade 9", s: "A, B", n: 98, t: "Gita Adhikari" },
    { c: "Grade 8", s: "A, B, C", n: 121, t: "Hari KC" },
    { c: "Grade 7", s: "A, B", n: 87, t: "Maya Tamang" },
  ]
  return (
    <>
      <Title sub="1,296 students · 64 staff">Classes & sections</Title>
      <div className="grid gap-2 sm:grid-cols-2">
        {classes.map((x) => (
          <div key={x.c} className="rounded-xl border p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold">{x.c}</p>
              <span className="rounded-full bg-brand-teal/10 px-2 py-0.5 text-[0.6rem] font-medium text-brand-teal-text">
                {x.n} students
              </span>
            </div>
            <p className="mt-1.5 text-[0.65rem] text-muted-foreground">Sections {x.s}</p>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-brand-gradient text-[0.5rem] font-bold text-white">
                {x.t
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </span>
              <span className="truncate text-[0.65rem]">{x.t}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
