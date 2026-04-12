# CLAUDE.md — forgeblog

A Next.js blog template with scheduled publishing and a built-in agent skill layer. Posts live in a single TypeScript array (`src/content/blogPosts.ts`), filtered by date at build time. A daily GitHub Actions cron triggers a Vercel rebuild so future-dated posts go live automatically.

## Agent-readable skill layer

This project includes a machine-readable instruction layer that lets any LLM agent understand and contribute to the blog from a single URL.

- **`public/skill.md.template`** and **`public/llms.txt.template`** are checked into the repo. They contain `{{TOKEN}}` placeholders (e.g. `{{SITE_NAME}}`, `{{PUBLISHED_COUNT}}`).
- **`scripts/generate-skill-json.ts`** runs on `prebuild` (via `npm run generate:skill`). It reads `blogPosts.ts`, `internalLinks.ts`, and `relatedLinks.ts`, then writes three files to `public/`:
  - `skill.json` — live blog state (published posts, scheduled posts, tag counts, link rules)
  - `skill.md` — the resolved instruction manual (from `skill.md.template`)
  - `llms.txt` — a short pointer file (from `llms.txt.template`)
- The generated files (`skill.md`, `skill.json`, `llms.txt`) are in **`.gitignore`** — they are build artifacts, not source.
- The purpose is to give any LLM agent a one-URL entry point (`/skill.md`) to understand the blog's schema, tone, existing content, and workflow, then write correctly-formatted posts autonomously.

**If you modify the project:** update `public/skill.md.template` whenever you change the `BlogPost` type, the internal linking system, the deploy workflow, or the file structure. The template is the single source of truth for agent instructions.
