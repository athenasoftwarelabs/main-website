export type TeamMember = {
  name: string
  role: string
  linkedin: string
  initials: string
  bio: string
  /**
   * Background-removed square cutout in /public/images. `focus` is the CSS position the photo is
   * anchored to (keep y at 100% so the cutout sits on the card edge); `zoom` enlarges it from there.
   * `face` is the face centre (0 to 1 of the image) and zoom for small round avatars, e.g. blog bylines.
   */
  photo?: { src: string; focus: string; zoom: number; face: { x: number; y: number; zoom: number } }
}

// Bios are placeholders - edit freely.
export const team: TeamMember[] = [
  {
    name: "Aayush Dhakal",
    role: "Founder and Director",
    linkedin: "https://www.linkedin.com/in/aayush-dhakal-max",
    initials: "AD",
    bio: "Founder of Athena Software Labs. Aayush leads the company's vision of bringing modern, affordable digital solutions to schools and businesses across Nepal.",
    photo: { src: "/images/aayush_dhakal_pic.png", focus: "42% 100%", zoom: 1.25, face: { x: 0.46, y: 0.47, zoom: 2.3 } },
  },
  {
    name: "Bibek Bhattarai",
    role: "Software Engineer",
    linkedin: "https://www.linkedin.com/in/xspark/",
    initials: "BB",
    bio: "Bibek is a software engineer at Athena, contributing to the development and testing of our school management products.",
    photo: { src: "/images/bibek_bhattarai_pic.png", focus: "72% 100%", zoom: 1, face: { x: 0.62, y: 0.38, zoom: 1.8 } },
  },
  {
    name: "Sanjog Karki",
    role: "Marketing Associate",
    linkedin: "https://www.linkedin.com",
    initials: "SK",
    bio: "Sanjog connects Athena with schools and businesses, understanding their needs and helping them get the most out of our solutions.",
    // Tightly cropped photo: zoom out from the bottom-right so his head sits level with the others
    photo: { src: "/images/sanjog_karki.png", focus: "100% 100%", zoom: 0.88, face: { x: 0.6, y: 0.32, zoom: 1.45 } },
  },
]
