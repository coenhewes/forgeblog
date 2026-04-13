import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Get started with ForgeBlog — clone, configure, and let your agent write posts.",
};

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/"
        className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        &larr; Home
      </Link>

      <article className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        <h1>Getting started with ForgeBlog</h1>

        <p>
          ForgeBlog is a Next.js blog template with scheduled publishing and a
          machine-readable agent skill layer. Posts live in a single TypeScript
          file, are filtered by date at build time, and go live automatically
          via a daily cron rebuild.
        </p>

        <h2>Quick start</h2>
        <pre>
          <code>{`git clone ${site.repoUrl}.git
cd forgeblog
npm install
cp .env.example .env.local   # edit with your site details
npm run dev`}</code>
        </pre>
        <p>
          Open{" "}
          <a href="http://localhost:3000/blog">http://localhost:3000/blog</a> to
          see the seed posts.
        </p>

        <h2>Configure your site</h2>
        <p>
          Edit <code>.env.local</code> with your details. These values are baked
          into the skill files at build time:
        </p>
        <table>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>SITE_URL</code>
              </td>
              <td>Your deployed URL (used for canonical links, OG tags, sitemap)</td>
            </tr>
            <tr>
              <td>
                <code>SITE_NAME</code>
              </td>
              <td>Display name shown in titles and metadata</td>
            </tr>
            <tr>
              <td>
                <code>SITE_NICHE</code>
              </td>
              <td>What the blog covers (baked into the agent skill manual)</td>
            </tr>
            <tr>
              <td>
                <code>SITE_AUDIENCE</code>
              </td>
              <td>Who the blog is for</td>
            </tr>
            <tr>
              <td>
                <code>SITE_TONE</code>
              </td>
              <td>Writing style guidance for agents</td>
            </tr>
            <tr>
              <td>
                <code>SITE_DESCRIPTION</code>
              </td>
              <td>One-sentence description used in meta tags and llms.txt</td>
            </tr>
            <tr>
              <td>
                <code>SITE_REPO_URL</code>
              </td>
              <td>GitHub repo URL (used in landing page and install scripts)</td>
            </tr>
          </tbody>
        </table>

        <h2>How scheduled publishing works</h2>
        <p>
          Every post in <code>src/content/blogPosts.ts</code> has a{" "}
          <code>publishedAt</code> date. At build time, posts whose date is in
          the future are filtered out. They exist in the code but don&apos;t appear
          on the site.
        </p>
        <p>
          A GitHub Actions workflow runs daily (06:00 UTC) and hits a Vercel
          Deploy Hook, triggering a fresh build. When the build runs, the date
          filter re-evaluates, and any post whose date has now passed goes live.
        </p>
        <p>
          Write ten posts today with dates spread over the next ten weeks, commit
          them all at once, and they appear one by one. No manual publishing
          step.
        </p>

        <h2>Adding a post</h2>
        <p>
          Open <code>src/content/blogPosts.ts</code> and add an object to the
          array. Every post must conform to the <code>BlogPost</code> type
          defined in <code>src/lib/types.ts</code>.
        </p>
        <p>Minimal example:</p>
        <pre>
          <code>{`{
  slug: "my-new-post",
  title: "My New Post",
  description: "A short meta description.",
  excerpt: "A one-liner for the blog list.",
  heroImage: "https://images.unsplash.com/photo-example?w=1200&h=630&fit=crop",
  heroImageAlt: "Description of the image",
  publishedAt: "2025-06-01T06:00:00Z",
  updatedAt: "2025-06-01T06:00:00Z",
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
}`}</code>
        </pre>
        <p>
          Optional fields like <code>stats</code>, <code>checklist</code>,{" "}
          <code>takeaways</code>, and <code>faqs</code> add extra sections to
          the article. FAQs also generate FAQPage structured data for Google
          rich results.
        </p>

        <h2>The agent skill layer</h2>
        <p>
          ForgeBlog ships three machine-readable files that let any LLM agent
          understand and contribute to the blog:
        </p>
        <ul>
          <li>
            <strong>
              <a href="/skill.md">/skill.md</a>
            </strong>{" "}
            — The full instruction manual. Covers the post schema, quality rules,
            SEO requirements, and a step-by-step workflow.
          </li>
          <li>
            <strong>
              <a href="/skill.json">/skill.json</a>
            </strong>{" "}
            — Live blog state: every published and scheduled post, tag
            frequencies, internal linking rules. Regenerated on every build.
          </li>
          <li>
            <strong>
              <a href="/install.md">/install.md</a>
            </strong>{" "}
            — Install instructions for agents setting up ForgeBlog in a new or
            existing project.
          </li>
        </ul>
        <p>To use it, paste this into any agent:</p>
        <pre>
          <code>{`Read ${site.url}/skill.md and write me a blog post about [your topic]`}</code>
        </pre>
        <p>
          The agent fetches the manual, fetches <code>skill.json</code> to check
          existing content, drafts a post matching the schema, and appends it to{" "}
          <code>blogPosts.ts</code>.
        </p>

        <h2>Deploy to Vercel</h2>
        <ol>
          <li>
            Push this repo to GitHub and import it into{" "}
            <a href="https://vercel.com">Vercel</a>.
          </li>
          <li>
            Set your environment variables in the Vercel project settings.
          </li>
          <li>
            Create a Deploy Hook in Vercel (Project Settings &rarr; Git &rarr;
            Deploy Hooks) for your <code>main</code> branch.
          </li>
          <li>
            Add the hook URL as a GitHub secret named{" "}
            <code>VERCEL_DEPLOY_HOOK</code>.
          </li>
          <li>
            The included GitHub Actions workflow triggers a rebuild daily at
            06:00 UTC.
          </li>
        </ol>

        <h2>Customising</h2>
        <h3>Internal links</h3>
        <p>
          Edit <code>src/content/internalLinks.ts</code> to add regex-based
          rules that automatically convert matching text in your posts into
          internal links. The file includes documentation and examples.
        </p>
        <h3>Related callouts</h3>
        <p>
          Edit <code>src/content/relatedLinks.ts</code> to map post slugs to
          callout cards that appear at the bottom of articles.
        </p>
        <h3>Styling</h3>
        <p>
          Tailwind CSS with Geist fonts and a neutral palette. Dark mode is
          automatic via <code>prefers-color-scheme</code>.
        </p>
        <ul>
          <li>
            Theme colours: <code>src/app/globals.css</code>
          </li>
          <li>
            Custom fonts: import in <code>layout.tsx</code> via{" "}
            <code>next/font/google</code>
          </li>
          <li>
            Prose styling: <code>@tailwindcss/typography</code>
          </li>
        </ul>
        <h3>Skill manual</h3>
        <p>
          Edit <code>public/skill.md.template</code> to change agent
          instructions. The <code>{"{{TOKEN}}"}</code> placeholders are resolved
          at build time from your env vars. Add site-specific rules, prohibited
          topics, or house style notes.
        </p>

        <h3>Post format</h3>
        <p>
          The renderer (<code>src/components/blog/BlogArticlePage.tsx</code>)
          only requires <code>sections</code> for the article body. Every
          other block — <code>stats</code>, <code>checklist</code>,{" "}
          <code>takeaways</code>, and <code>faqs</code> — is conditional and
          renders nothing when omitted. A minimal essay-style post needs only
          the required fields plus a <code>sections</code> array:
        </p>
        <pre>
          <code>{`{
  slug: "my-essay",
  title: "An Essay-Style Post",
  description: "A short meta description.",
  excerpt: "Preview text for the blog list.",
  heroImage: "https://images.unsplash.com/photo-example?w=1200&h=630&fit=crop",
  heroImageAlt: "Description of the image",
  publishedAt: "2026-06-01T06:00:00Z",
  updatedAt: "2026-06-01T06:00:00Z",
  readingTime: "4 min read",
  tags: ["essays"],
  keywords: ["essay writing"],
  primaryKeyword: "essay writing",
  author: { name: "Your Name" },
  sections: [
    { heading: "Opening", paragraphs: ["First paragraph...", "Second paragraph..."] },
    { heading: "The argument", paragraphs: ["..."] },
  ],
  // no stats, no checklist, no takeaways, no faqs — the renderer skips them
}`}</code>
        </pre>
        <p>
          To get the full structured layout (stats cards, action checklist,
          key takeaways, FAQ accordion), include those optional fields. You
          can mix and match — for example, include <code>faqs</code> but skip{" "}
          <code>stats</code>. Each block is independent.
        </p>

        <h3>Agent quality rules</h3>
        <p>
          The skill manual at{" "}
          <code>public/skill.md.template</code> tells agents to write 5–8
          sections, exactly 3 stats cards, 3–6 checklist items, and 4–8 FAQs.
          These ranges are best-practice guidance for rich, structured posts —
          the renderer does not enforce them. If you want agents to write
          looser essay-style or interview posts, edit the &ldquo;Quality
          rules&rdquo; section of the template:
        </p>
        <ul>
          <li>
            Change <code>5 to 8 sections</code> to <code>1 to 8 sections</code>{" "}
            to allow shorter posts
          </li>
          <li>
            Remove or soften the <code>3 stats cards (not 2, not 4)</code> line
            to make stats truly optional
          </li>
          <li>
            Update step 5 in the workflow section — it currently says
            &ldquo;do not skip optional sections unless there&apos;s a
            reason&rdquo;, which nudges agents toward the full structure
          </li>
        </ul>

        <h3>Renderer layout</h3>
        <p>
          The article renderer at{" "}
          <code>src/components/blog/BlogArticlePage.tsx</code> renders
          sections in this fixed order: header, hero image, share buttons,
          stats cards, body sections, checklist, takeaways, related callout,
          FAQ. To reorder, remove, or add sections, edit that component
          directly. Each block is a self-contained JSX chunk guarded by a
          conditional check.
        </p>

        <h3>Extending the post type</h3>
        <p>
          To add a new field (e.g. a <code>videoUrl</code> for embedded
          video), update three files:
        </p>
        <ol>
          <li>
            Add the field to the <code>BlogPost</code> type in{" "}
            <code>src/lib/types.ts</code> (mark it optional with{" "}
            <code>?</code> to avoid breaking existing posts)
          </li>
          <li>
            Render it in{" "}
            <code>src/components/blog/BlogArticlePage.tsx</code> with a
            conditional guard (e.g.{" "}
            <code>{"post.videoUrl && (<div>...</div>)"}</code>)
          </li>
          <li>
            Document it in <code>public/skill.md.template</code> so agents
            know the field exists and when to use it
          </li>
        </ol>

        <h3>Pagination</h3>
        <p>
          The blog list shows 9 posts per page. To change this, edit the{" "}
          <code>POSTS_PER_PAGE</code> constant at the top of{" "}
          <code>src/components/blog/BlogListPage.tsx</code>.
        </p>

        <h3>Structured data</h3>
        <p>
          JSON-LD schemas are built in{" "}
          <code>src/components/StructuredData.tsx</code>. It exports helpers
          for BlogPosting, FAQPage, BreadcrumbList, Organization, and
          CollectionPage schemas. FAQPage is only generated when a post
          includes <code>faqs</code>. To modify the schemas (e.g. add a{" "}
          <code>VideoObject</code> for a new video field), edit the relevant
          builder function in that file.
        </p>

        <h2>Project structure</h2>
        <pre>
          <code>{`src/
├── app/
│   ├── layout.tsx          # root layout + Organization JSON-LD
│   ├── page.tsx            # landing page
│   ├── blog/
│   │   ├── page.tsx        # paginated blog list
│   │   └── [slug]/
│   │       └── page.tsx    # individual post page
│   ├── docs/
│   │   └── page.tsx        # this page
│   ├── sitemap.ts          # dynamic sitemap
│   └── robots.ts           # robots.txt
├── components/
│   ├── blog/               # article renderer, list, FAQ, linking
│   ├── StructuredData.tsx   # JSON-LD schema builders
│   └── CopyCommand.tsx      # clipboard UI
├── content/
│   ├── blogPosts.ts        # all posts (the single source of truth)
│   ├── internalLinks.ts    # regex → URL linking rules
│   └── relatedLinks.ts     # slug → callout mapping
├── lib/
│   ├── blog.ts             # query helpers (published, by slug, related)
│   ├── types.ts            # BlogPost type definition
│   └── site.ts             # site config from env vars
scripts/
└── generate-skill-json.ts  # prebuild: skill.json + template resolution
public/
├── skill.md.template       # agent manual (source)
├── llms.txt.template       # agent pointer (source)
├── install.md.template     # install manual (source)
└── install.sh.template     # curl install script (source)`}</code>
        </pre>

        <hr />
        <p>
          Full source and contribution guide on{" "}
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </article>
    </main>
  );
}
