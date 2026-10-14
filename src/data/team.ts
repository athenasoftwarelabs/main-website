export type TeamMember = {
  name: string
  role: string
  linkedin: string
  initials: string
  bio: string
  /**
   * Background-removed square cutout in /public/images. `focus` is the CSS position the photo is
   * anchored to (keep y at 100% so the cutout sits on the card edge); `zoom` enlarges it from there.
   */
  photo?: { src: string; focus: string; zoom: number }
}

// Bios are placeholders - edit freely.
export const team: TeamMember[] = [
  {
    name: "Aayush Dhakal",
    role: "Chief Executive Officer",
    linkedin: "https://www.linkedin.com/in/aayush-dhakal-max",
    initials: "AD",
    bio: "Founder of Athena Software Labs. Aayush leads the company's vision of bringing modern, affordable digital solutions to schools and businesses across Nepal.",
    photo: { src: "/images/aayush_dhakal_pic.png", focus: "42% 100%", zoom: 1.25 },
  },
  {
    name: "Bibek Bhattarai",
    role: "Chief Technology Officer",
    linkedin: "https://www.linkedin.com/in/xspark/",
    initials: "BB",
    bio: "Bibek leads engineering and architecture at Athena, making sure every product we ship is secure, scalable and built to last.",
    photo: { src: "/images/bibek_bhattarai_pic.png", focus: "72% 100%", zoom: 1 },
  },
  {
    name: "Sanjog Karki",
    role: "Chief Marketing Officer",
    linkedin: "https://www.linkedin.com",
    initials: "SK",
    bio: "Sanjog connects Athena with schools and businesses, understanding their needs and helping them get the most out of our solutions.",
    // Tightly cropped photo: zoom out from the bottom-right so his head sits level with the others
    photo: { src: "/images/sanjog_karki.png", focus: "100% 100%", zoom: 0.88 },
  },
]
