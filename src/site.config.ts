// ─────────────────────────────────────────────────────────────────────────
//  EDIT ME — this is the one file you change most. Everything else reads from
//  here: your name, links, and your GitHub username (powers the live repo
//  feed + stats).
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Aditya Kaleeswar",             // your display name
  // Shown in the browser tab + footer.
  title: "Aditya Kaleeswar",
  // One-liner under your name on the homepage hero.
  tagline: "Computer science graduate exploring robotics, machine learning, and language models.",
  // A slightly longer intro used on the homepage / about.
  intro:
    "I’m Aditya, a computer science graduate exploring robotics, machine learning, and language models. I like building stuff.",

  // Path to your résumé PDF (lives in /public). To update it, just replace
  // the file at public/resume.pdf — no code change needed.
  resumeUrl: "/resume.pdf",

  // Hero / profile image (lives in /public).
  heroImage: "/hero.jpg",

  // Your GitHub handle — powers the live repo feed + the stats panel.
  githubUsername: "AdityaKaleeswarGK",

  // Social / contact links. Remove any you don't want; they render as footer links.
  links: {
    github: "https://github.com/AdityaKaleeswarGK",
    email: "adityakaleeswargk04@gmail.com",
    twitter: "https://x.com/AdityaKaleeswar",
    linkedin: "https://www.linkedin.com/in/aditya-kaleeswar-gk",
  },
} as const;

// Top nav items. Order matters. Add/remove freely.
export const nav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Resume", href: "/resume" },
  { label: "Writing", href: "/blog" },
] as const;
