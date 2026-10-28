import { GraduationCap } from "lucide-react"
import type { Post } from "../types"

export const schoolLmsNepalGuide: Post = {
  slug: "school-lms-nepal-guide",
  title: "School LMS in Nepal: The Complete Guide for Schools Going Digital in 2026",
  seoTitle: "School LMS in Nepal: Complete Guide for 2026",
  description:
    "A practical guide to school LMS software in Nepal: automate results, mark sheets, attendance, fees and teacher salaries, and choose the right system.",
  excerpt:
    "Term-end results that take weeks, fee registers that never balance and attendance books nobody analyzes. Here is how a school LMS fixes that, which features matter for Nepali schools, and how to roll one out without stress.",
  category: "School LMS",
  keywords: [
    "school LMS Nepal",
    "school management software Nepal",
    "LMS for schools in Nepal",
    "school ERP Nepal",
    "result management system Nepal",
    "mark sheet software Nepal",
    "school fee management software",
  ],
  author: "Aayush Dhakal",
  datePublished: "2026-10-28",
  dateModified: "2026-10-28",
  cover: { icon: GraduationCap, chips: ["Results & GPA", "Attendance", "Fees & Payroll"] },
  takeaways: [
    "A school LMS brings results, attendance, fees, salaries and parent communication into one system, so data is entered once and used everywhere.",
    "For Nepali schools, the must-haves are letter grading (GPA) support, Bikram Sambat dates, mobile access and reliable local support.",
    "Results and fee management usually deliver the fastest wins, so start there and expand module by module.",
    "A good rollout takes a few weeks: collect data, configure, train staff, pilot one terminal exam, then onboard parents.",
    "Judge vendors on training, support and data ownership, not only on price.",
  ],
  body: [
    {
      type: "p",
      text: "It is the week after the first terminal exam. Class teachers are copying marks from answer sheets into registers, the computer teacher is fighting with an Excel file that keeps breaking its GPA formula, and the principal still has a stack of mark sheets to sign. At the same time, the accounts desk is chasing fee dues in a receipt book and parents keep calling the office to ask how their child performed.",
    },
    {
      type: "p",
      text: "If this sounds familiar, you are not alone. Schools across Nepal, from community schools in Koshi Province to large institutional schools in Kathmandu, still run most of their administration on paper and spreadsheets. The good news is that this is exactly the problem a **school LMS** is built to solve.",
    },
    {
      type: "p",
      text: "In this guide, we explain what a school LMS is, which features matter most for schools in Nepal, how pricing usually works, and a step-by-step plan to go digital without disrupting your academic year.",
    },

    { type: "h2", id: "what-is-a-school-lms", text: "What is a school LMS?" },
    {
      type: "p",
      text: "LMS stands for Learning Management System. Strictly speaking, an LMS manages learning content such as lessons, assignments and online classes, while **school management software** (sometimes called a school ERP) manages administration: students, exams, attendance, fees and staff.",
    },
    {
      type: "p",
      text: "In Nepal, schools often use these terms interchangeably, and modern systems combine both. When we talk about a school LMS in this guide, we mean one platform that handles the full life of a school: academics, administration and finance, with apps for teachers and parents.",
    },
    {
      type: "callout",
      tone: "note",
      title: "A simple definition",
      text: "A school LMS is one secure system where a school records everything once (students, marks, attendance, fees and salaries) and then uses that data everywhere, from printed mark sheets to parent notifications and financial reports.",
    },

    { type: "h2", id: "common-challenges", text: "The problems Nepali schools face without a digital system" },
    {
      type: "p",
      text: "Most schools do not struggle because their staff are not working hard. They struggle because the same information is written down again and again in different places. The most common pain points are:",
    },
    {
      type: "ul",
      items: [
        "**Slow, error-prone results.** Calculating grade points and GPA by hand or in fragile spreadsheets takes days, and one wrong formula can affect an entire class.",
        "**Attendance that cannot be analyzed.** Paper registers record who was absent, but nobody can quickly see which students are missing too many days.",
        "**Fee dues that slip through the cracks.** Receipt books make it hard to know who has paid, who owes and how much the school will collect this month.",
        "**Manual salary processing.** Calculating teacher salaries, allowances and deductions every month eats into the accountant's time.",
        "**Weak communication with parents.** Notices get lost in school bags and parents only learn about problems at the end of the term.",
        "**No clear picture for management.** Principals and school owners cannot easily compare class performance, income and expenses across terms.",
      ],
    },
    {
      type: "p",
      text: "Each of these costs the school time, money and sometimes its reputation with parents. A well-designed LMS removes most of this repeated work.",
    },

    { type: "h2", id: "core-features", text: "Core features every school LMS in Nepal should have" },
    {
      type: "p",
      text: "Not every system is built for the way Nepali schools actually work. Here are the modules that make the biggest difference, and what to look for in each one.",
    },
    { type: "h3", text: "Results, mark sheets and grade sheets" },
    {
      type: "p",
      text: "This is usually the module schools need most. Teachers should be able to enter marks subject by subject, and the system should calculate grades, grade points and GPA automatically using the **letter grading system** followed in Nepal. Look for:",
    },
    {
      type: "ul",
      items: [
        "Support for multiple exams such as first terminal, second terminal and final exams, plus internal assessment marks",
        "A grading scale you can update whenever national guidelines from the Curriculum Development Centre (CDC) or the National Examinations Board (NEB) change",
        "Print-ready mark sheets and grade sheets with your school logo, ready to sign",
        "Class-wise result analysis, toppers lists and subject averages",
      ],
    },
    { type: "h3", text: "Student and staff attendance" },
    {
      type: "p",
      text: "Teachers should be able to take attendance on a phone in under a minute. The real value comes afterwards: monthly summaries, alerts for students with low attendance and the option to notify parents when a child is absent.",
    },
    { type: "h3", text: "Fee management" },
    {
      type: "p",
      text: "A good fee module lets you set up class-wise fee structures, monthly and one-time fees, transport and hostel charges, scholarships and discounts. It should print receipts, track dues automatically and show exactly how much each class owes at any moment.",
    },
    { type: "h3", text: "Teacher salary and payroll" },
    {
      type: "p",
      text: "Monthly salary sheets, allowances, deductions and advance payments should be calculated in a few clicks, with clear payslips for staff. This alone can save the accounts team several days every month.",
    },
    { type: "h3", text: "Income and expense tracking" },
    {
      type: "p",
      text: "Beyond fees and salaries, schools spend on stationery, maintenance, events and utilities. Recording every income and expense in the same system gives management an honest, up-to-date financial picture.",
    },
    { type: "h3", text: "Performance analytics" },
    {
      type: "p",
      text: "Dashboards should answer questions in seconds. Which class improved this term? Which subject needs attention? How much fee is still due? Data you can see is data you can act on.",
    },
    { type: "h3", text: "Mobile app for parents and teachers" },
    {
      type: "p",
      text: "Most parents in Nepal use a smartphone every day. An Android and iOS app that shows results, attendance, fee dues and school notices builds trust and greatly reduces phone calls to the office.",
    },
    {
      type: "table",
      caption: "Manual process vs a school LMS",
      head: ["Task", "Manual process", "With a school LMS"],
      rows: [
        ["Preparing terminal results", "Several days of calculation and checking", "Grades and GPA calculated as soon as marks are entered"],
        ["Printing mark sheets", "Typed or handwritten one by one", "Printed for a whole class in one go"],
        ["Tracking attendance", "Paper registers that are hard to summarize", "Daily records with monthly reports and alerts"],
        ["Collecting fees", "Receipt books and manual due lists", "Digital receipts and automatic due tracking"],
        ["Paying salaries", "Calculated by hand every month", "Salary sheets generated in minutes"],
        ["Informing parents", "Paper notices and phone calls", "Instant updates on the parent app"],
      ],
    },

    { type: "h2", id: "nepal-checklist", text: "Nepal-specific things to check before you choose" },
    {
      type: "p",
      text: "Many LMS products are designed for other countries and then lightly adapted. Before you commit, make sure the system fits the realities of running a school in Nepal.",
    },
    {
      type: "checklist",
      title: "Your Nepal readiness checklist",
      items: [
        "**Bikram Sambat (BS) dates** for attendance, exams, receipts and reports, not only AD dates",
        "**Letter grading and GPA** that match current national guidelines, with an editable grading scale",
        "**Nepali academic and fiscal years**, since the school session usually starts in Baisakh while the fiscal year runs from Shrawan to Ashadh",
        "**Works on slow internet and mobile data**, with lightweight pages and apps",
        "**Nepali language support** for names, notices and printed documents where needed",
        "**Local payment options** such as Fonepay QR, eSewa, Khalti or bank transfer for fee collection",
        "**Local training and support** from a team that can visit or respond quickly",
        "**Clear data ownership**, so your school can export its data at any time",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      title: "Ask for a demo with your own data",
      text: "Give the vendor a sample of your real data, such as one class's student list and last term's marks. Watching your own results appear in a demo tells you far more than a sales presentation.",
    },

    { type: "h2", id: "cost", text: "How much does a school LMS cost in Nepal?" },
    {
      type: "p",
      text: "Pricing varies widely, so it is more useful to understand how vendors charge than to compare a single number. The most common models are:",
    },
    {
      type: "ul",
      items: [
        "**Per student, per year.** You pay according to enrolment, which keeps costs fair for smaller schools.",
        "**Fixed annual subscription.** One yearly fee for a set of modules, often with tiers for different school sizes.",
        "**One-time license plus annual maintenance.** A larger upfront payment followed by a yearly fee for updates and support.",
      ],
    },
    {
      type: "p",
      text: "When comparing quotes, check what is actually included: setup and data migration, staff training, the parent mobile app, SMS charges, hosting, backups and how quickly support responds during exam season. A cheaper system that staff cannot use properly will cost far more in lost time.",
    },

    { type: "h2", id: "implementation-steps", text: "How to implement an LMS in your school, step by step" },
    {
      type: "p",
      text: "Going digital does not have to disrupt your academic year. Schools that succeed usually follow a simple, staged plan.",
    },
    {
      type: "ol",
      items: [
        "**List your biggest problems.** Decide what must improve first, for example results, fee dues or parent communication.",
        "**See demos and shortlist.** Compare two or three systems using your own sample data.",
        "**Collect your data.** Prepare student lists, classes and sections, subjects, fee structures and staff records in a spreadsheet.",
        "**Configure the system.** Set up classes, subjects, exams, grading, fee heads and user roles for teachers, accountants and administrators.",
        "**Train your staff.** Run short, hands-on sessions for each role. Teachers need marks and attendance, while accounts staff need fees and payroll.",
        "**Pilot with one exam.** Run a single terminal exam through the LMS and compare the results with your old method.",
        "**Onboard parents.** Share app login details at a parents' meeting and explain what they can see.",
        "**Review and expand.** After the first term, review what worked and switch on more modules.",
      ],
    },
    {
      type: "quote",
      text: "The goal is not to buy software. The goal is to give teachers back the hours they spend on paperwork, so they can spend them on students.",
    },

    { type: "h2", id: "athena-school-lms", text: "How Athena's School LMS helps Nepali schools" },
    {
      type: "p",
      text: "At Athena Software Labs, we built our [School LMS](/services#school-lms) for schools in Nepal. It brings academics, attendance, finance and analytics into one platform, with Android and iOS apps for parents, teachers and administrators.",
    },
    {
      type: "ul",
      items: [
        "**Results in minutes:** automatic grade and GPA calculation with printable mark sheets and grade sheets",
        "**Daily attendance:** fast attendance for students and staff, with summaries and parent alerts",
        "**Complete finance:** student fees, teacher salaries, and every income and expense in one place",
        "**Clear insights:** dashboards for class performance, student progress and fee collection",
        "**Local support:** setup, data migration and staff training from our team in Urlabari, Koshi Province",
      ],
    },
    {
      type: "cta",
      title: "See the School LMS with your own data",
      text: "Book a free demo and we will show you how your school's results, attendance and fees would look inside Athena's LMS.",
      href: "/contact?service=school-lms",
      label: "Book a free demo",
    },

    { type: "h2", id: "final-thoughts", text: "Final thoughts" },
    {
      type: "p",
      text: "A school LMS is no longer a luxury reserved for large city schools. With fair pricing, mobile apps and local support, schools of every size in Nepal can replace registers and spreadsheets with one reliable system. Start with the module that hurts most today, usually results or fees, and grow from there.",
    },
    {
      type: "p",
      text: "If you would like help choosing or setting up a system, [talk to our team](/contact). We are happy to answer questions, even if you are just getting started.",
    },
  ],
  faqs: [
    {
      q: "What is the difference between an LMS and school management software?",
      a: "An LMS traditionally manages learning content such as lessons and assignments, while school management software handles administration such as exams, attendance, fees and staff. Most modern systems used by Nepali schools combine both in one platform.",
    },
    {
      q: "Can a school LMS calculate GPA using Nepal's letter grading system?",
      a: "Yes. A good LMS calculates grades, grade points and GPA automatically from the marks teachers enter. Make sure the grading scale is editable so you can follow the latest national guidelines.",
    },
    {
      q: "Is a school LMS suitable for small schools?",
      a: "Yes. Many vendors price by the number of students, so smaller schools pay less. Small schools often benefit the most, because a few administrative staff handle many different jobs.",
    },
    {
      q: "Do parents need a smartphone to use the LMS?",
      a: "A parent app works best on a smartphone, but schools can still print mark sheets and send SMS notices, so families without smartphones are not left out.",
    },
    {
      q: "How long does it take to set up a school LMS?",
      a: "Most schools are up and running within one to two weeks, depending on how quickly student, staff and fee data can be collected. Training and a pilot exam usually happen in the same period.",
    },
    {
      q: "Is our school's data safe in an online LMS?",
      a: "Choose a system with role-based access, encrypted connections and regular backups, and confirm in writing that your school owns its data and can export it at any time.",
    },
  ],
}
