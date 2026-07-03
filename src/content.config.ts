import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ─── Blog ────────────────────────────────────────────────────────────────
// Write a post here (Markdown body) OR point to one you wrote elsewhere with
// `url:` (it then links out instead of opening an on-site page).
//   ---
//   title: "My post"
//   description: "What it's about"
//   date: 2026-06-15
//   tags: [astro]
//   url: "https://medium.com/..."   # optional — external post
//   draft: false
//   ---
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    url: z.string().url().optional(),
  }),
});

// ─── Exploring ──────────────────────────────────────────────────────────────
// A running, dated timeline of what you're working on / reading / exploring.
// Add an entry:
//   src/content/exploring/2026-06-some-paper.md
//   ---
//   title: "Attention Is All You Need"
//   description: "Re-reading for the attention math."
//   url: "https://arxiv.org/abs/1706.03762"   # optional
//   date: 2026-06-15
//   kind: paper        # working | paper | article | blog | reading
//   tags: [transformers]
//   ---
const exploring = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/exploring" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.string().url().optional(),
    date: z.coerce.date(),
    kind: z
      .enum(["working", "shipped", "course", "paper", "article", "blog", "reading"])
      .default("reading"),
    tags: z.array(z.string()).default([]),
  }),
});

// ─── Projects ───────────────────────────────────────────────────────────────
const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    // optional manual override — otherwise derived from the repo's last commit
    status: z.enum(["working", "done"]).optional(),
  }),
});

// ─── Experience ─────────────────────────────────────────────────────────────
const experience = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/experience" }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    location: z.string().optional(),
    start: z.string(),
    end: z.string().default("Present"),
    summary: z.string().optional(),
    order: z.number().default(99),
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    // optional career-progression timeline (joins, promotions, key milestones)
    milestones: z
      .array(
        z.object({
          date: z.string(),
          label: z.string(),
          promotion: z.boolean().default(false),
        }),
      )
      .default([]),
  }),
});

export const collections = { blog, exploring, projects, experience };
