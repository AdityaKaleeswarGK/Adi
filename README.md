# Portfolio

A fast, dark-themed personal site built with **Astro + Tailwind v4**. Content
(blog posts, reading log, projects) is just Markdown files — add a file, push,
and it's live. Includes a live **GitHub repo feed** and a **GitHub stats**
dashboard.

## Run it

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # production build → ./dist
pnpm preview    # preview the build
```

## First things to edit

1. **`src/site.config.ts`** — your name, tagline, intro, social links, and your
   **`githubUsername`** (powers the GitHub feed + stats; leave blank to hide them).
2. **Accent color** — change `--color-accent` in `src/styles/global.css`. If you
   use the GitHub stats panel, also update `accentHex` in
   `src/components/GitHubStats.astro` to match.
3. **Hero gif/visual** — drop a file at `public/hero.gif`, then in
   `src/pages/index.astro` swap the dashed placeholder `<div>` for the `<img>`
   shown in the comment right above it.

## Adding content (the whole point)

Every section is Markdown in `src/content/`. Create a file, fill the frontmatter,
push — it deploys automatically.

**Blog** → `src/content/blog/my-post.md`
```md
---
title: "My first post"
description: "What it's about"
date: 2026-06-15
tags: [astro, web]
draft: false
---
Body in Markdown.
```

**Reading log** → `src/content/reading/2026-06-attention.md`
```md
---
title: "Attention Is All You Need"
url: "https://arxiv.org/abs/1706.03762"
date: 2026-06-15
kind: paper          # paper | article | book
tags: [transformers]
---
Optional one-liner on what you took from it.
```

**Projects** (curated, with repo/demo links) → `src/content/projects/thing.md`
```md
---
title: "My Project"
description: "What it does"
repo: "https://github.com/you/thing"
demo: "https://thing.example.com"
tags: [typescript]
featured: true
order: 1
---
```

> The "collection is empty" warnings during build are normal until you add your
> first file in each folder.

## GitHub feed

`src/components/GitHubFeed.astro` fetches your top public repos **at build time**.
To keep it fresh without manual deploys, set up a daily rebuild (Vercel → Project
→ Settings → Cron Jobs, or a Deploy Hook on a schedule). Optionally set a
`GITHUB_TOKEN` env var in your build environment to raise the API rate limit.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it on [vercel.com](https://vercel.com) — it auto-detects Astro, no
   config needed.
3. Add a custom domain in the Vercel dashboard if you have one.

(Cloudflare Pages / Netlify work the same way.)

## Visual CMS (optional, later)

To edit content from a browser instead of files, add
[Decap CMS](https://decapcms.org) — it commits Markdown to this same repo, so the
file-based workflow above keeps working. Hook it up when you want it.

# Adi
