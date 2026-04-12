# forgeblog

A Next.js blog template with automated scheduled publishing and a built-in agent skill layer — the first blog starter designed for vibe-coding with LLMs.

<!-- screenshot placeholder: add a screenshot or GIF of the blog here -->

## Why this exists

- **Write once, publish on schedule.** Add posts with future dates and they go live automatically via a daily rebuild.
- **SEO out of the box.** JSON-LD structured data, dynamic sitemap, OG tags, and canonical URLs — all generated from your post data.
- **Zero infrastructure.** Posts live in a single TypeScript file. No database, no CMS, no API layer.

## Quick start

```bash
git clone https://github.com/coenhewes/forgeblog.git
cd forgeblog
npm install
cp .env.example .env.local   # edit with your site details
npm run dev
```

Open [http://localhost:3000/blog](http://localhost:3000/blog) to see the seed posts.

## How scheduled publishing works

Every post in `src/content/blogPosts.ts` has a `publishedAt` date. At build time, a filter excludes any post whose date is in the future. Only past-dated posts appear on the site.

A GitHub Actions workflow runs daily (06:00 UTC by default) and hits a Vercel Deploy Hook, triggering a fresh build. When the build runs, the filter re-evaluates — any post whose `publishedAt` has now passed goes live automatically.

The result: you write posts in batches with future dates, and they appear on your site one by one, on schedule, with no manual intervention.

## Adding a post

Open `src/content/blogPosts.ts` and add an object to the array. Here's a minimal example:

```ts
{
  slug: "my-new-post",
  title: "My New Post",
  description: "A short meta description for search engines.",
  excerpt: "A one-liner shown on the blog list page.",
  heroImage: "https://images.unsplash.com/photo-example?w=1200&h=630&fit=crop",
  heroImageAlt: "Description of the image",
  publishedAt: "2025-03-01T08:00:00Z",  // future date = not yet live
  updatedAt: "2025-03-01T08:00:00Z",
  readingTime: "5 min read",
  tags: ["topic"],
  keywords: ["keyword one", "keyword two"],
  primaryKeyword: "keyword one",
  author: { name: "Your Name" },
  sections: [
    {
      heading: "Section title",
      paragraphs: ["Your content goes here."],
    },
  ],
}
```

See `src/lib/types.ts` for the full `BlogPost` type with all optional fields (stats, checklist, takeaways, FAQs).

## Agent-readable skill layer (the vibe-coding workflow)

This template ships with a machine-readable instruction manual at `/skill.md` and a live state file at `/skill.json`. Together they let any LLM agent — Claude Code, Cursor, ChatGPT, Cowork, or anything else — write and schedule posts without needing you to explain the project.

**Setup (one time):** Fill in the `SITE_NICHE`, `SITE_AUDIENCE`, `SITE_TONE`, and `SITE_DESCRIPTION` fields in your `.env`. These are baked into the skill manual at build time.

**Usage:** Paste this into your agent:

> *Read https://forgeblog-mauve.vercel.app/skill.md and follow the instructions to write and commit 5 posts about [topic], one per week starting next Monday.*

That's it. The agent fetches the manual, fetches the live JSON state to see what's already been written, drafts posts that match the schema, appends them to `blogPosts.ts`, and commits. The scheduled deploy workflow takes it from there.

**How it stays fresh:** `skill.json` is regenerated on every build from the actual contents of `blogPosts.ts`, so it always reflects the live state of the site — existing posts, scheduled posts, tag frequencies, and linking rules. Agents that fetch it get the current picture, not a stale snapshot.

**Customising the skill manual:** Edit `public/skill.md.template`. The `{{TOKEN}}` placeholders are replaced at build time from your env vars. The rest of the file is yours to tune — add site-specific rules, prohibited topics, house style notes, whatever your blog needs.

## Using an LLM to generate posts (manual workflow)

If you prefer to generate posts manually rather than using the skill layer, the `BlogPost` type works as a prompt. Copy the type definition from `src/lib/types.ts` and ask any LLM to generate a post object conforming to it:

> Generate a blog post as a JSON object matching this TypeScript type: [paste type here]. Topic: "How to set up CI/CD for a static site."

Paste the output into `blogPosts.ts`, set a `publishedAt` date, and you're done. This works with Claude, GPT, Gemini, or any model that can output structured JSON.

## Deploying to Vercel

1. Push this repo to GitHub and import it into [Vercel](https://vercel.com).
2. Set environment variables in your Vercel project settings (see `.env.example`).
3. In Vercel → Project Settings → Git → Deploy Hooks, create a hook for your `main` branch. Copy the URL.
4. In your GitHub repo → Settings → Secrets → Actions, add a secret named `VERCEL_DEPLOY_HOOK` with the hook URL.
5. The included GitHub Actions workflow (`.github/workflows/scheduled-deploy.yml`) will trigger a rebuild daily at 06:00 UTC.

Every push to `main` also triggers a Vercel build, so you can publish immediately by pushing a commit.

## Customising

### Internal links

Edit `src/content/internalLinks.ts` to add regex-based rules that automatically convert matching text in your posts into internal links. See the file for examples and guidelines.

### Related callouts

Edit `src/content/relatedLinks.ts` to map specific post slugs to callout cards that appear at the bottom of articles. Useful for cross-linking to landing pages or related guides.

### Styling

The template uses Tailwind CSS with a neutral zinc palette and system fonts. Dark mode is automatic via `prefers-color-scheme`.

- Edit `src/app/globals.css` to change theme colours.
- To add a custom font, import it in `layout.tsx` (e.g. via `next/font/google`) and update the font-family in `globals.css`.
- Article body content uses `@tailwindcss/typography` for prose styling.

## What this is not

- **Not a CMS.** There is no admin UI, no editor, no content API.
- **Not a database app.** All content is in a TypeScript file, checked into git.
- **Not a plugin system.** It's a template — fork it and make it yours.
- **Not multi-framework.** Next.js App Router only.

If you need a CMS, database, or admin panel, this is not the right tool.

## License

MIT
