import type { BlogPost } from "@/lib/types";

/**
 * All blog posts. Add new posts to this array.
 *
 * Posts with a `publishedAt` date in the future will be excluded from the
 * build. A daily GitHub Actions cron triggers a Vercel rebuild, so future-dated
 * posts go live automatically on their publish date.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-static-site-generation",
    title: "Understanding Static Site Generation",
    subtitle: "Why pre-rendering pages at build time is making a comeback",
    description:
      "Learn how static site generation works, why it delivers fast page loads, and when to choose it over server-side rendering.",
    excerpt:
      "Static site generation pre-renders pages at build time, delivering blazing-fast load times and excellent SEO. Here is everything you need to know.",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop",
    heroImageAlt: "Code editor showing HTML markup on a dark background",
    publishedAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-20T10:00:00Z",
    readingTime: "6 min read",
    featured: true,
    tags: ["web development", "performance", "next.js"],
    keywords: [
      "static site generation",
      "SSG",
      "pre-rendering",
      "next.js static",
      "build time rendering",
    ],
    primaryKeyword: "static site generation",
    author: { name: "Coen Hewes", role: "Developer", url: "https://github.com/coenhewes" },
    stats: [
      {
        label: "Faster TTFB",
        value: "3×",
        description: "Compared to server-rendered pages on average",
      },
      {
        label: "Build once",
        value: "100%",
        description: "Pages served directly from a CDN edge node",
      },
      {
        label: "SEO score",
        value: "95+",
        description: "Typical Lighthouse score for SSG pages",
      },
    ],
    sections: [
      {
        label: "Basics",
        heading: "What is static site generation?",
        paragraphs: [
          "Static site generation (SSG) is a rendering strategy where HTML pages are generated at build time rather than on each request. The resulting files are plain HTML, CSS, and JavaScript that can be served from any CDN.",
          "Unlike server-side rendering, where every request triggers a render on the server, SSG does the heavy lifting once. The output is a set of static files that load almost instantly for the end user.",
        ],
        highlights: [
          "Pages are generated once at build time",
          "No server required at runtime — just a CDN",
          "Ideal for content that doesn't change on every request",
        ],
      },
      {
        heading: "How SSG works in Next.js",
        paragraphs: [
          "In Next.js, any page that exports a generateStaticParams function will be statically generated. At build time, Next.js calls your data-fetching logic, renders the page to HTML, and writes the result to disk.",
          "These pre-rendered pages are then deployed to a CDN. When a user requests a page, the CDN serves the static file directly — no server-side computation needed.",
        ],
        bullets: [
          "Define your routes with generateStaticParams",
          "Fetch data at build time, not at request time",
          "Deploy the output to any static hosting provider",
          "Optionally use Incremental Static Regeneration to update pages without a full rebuild",
        ],
      },
      {
        heading: "When to choose SSG over SSR",
        paragraphs: [
          "SSG is the right choice when your content changes infrequently and can be pre-built. Blog posts, documentation, marketing pages, and product catalogs are all great candidates.",
          "If your content changes on every request — personalised dashboards, real-time feeds — server-side rendering or client-side fetching is a better fit. The key question is: can this page be the same for every visitor?",
        ],
      },
    ],
    checklist: [
      {
        title: "Identify static content",
        description: "Audit your pages and flag those that can be pre-rendered.",
      },
      {
        title: "Set up generateStaticParams",
        description: "Export the function from each page that should be statically generated.",
      },
      {
        title: "Configure your build pipeline",
        description:
          "Ensure your CI/CD pipeline triggers a rebuild when content changes.",
      },
    ],
    takeaways: [
      "SSG generates pages at build time for near-instant load times.",
      "It is ideal for content that doesn't change on every request.",
      "Next.js makes SSG straightforward with generateStaticParams.",
      "Pair SSG with a scheduled rebuild for content that updates on a known cadence.",
    ],
    faqs: [
      {
        question: "Is static site generation good for SEO?",
        answer:
          "Yes. Search engines receive fully rendered HTML immediately, which improves crawlability and indexing speed compared to client-rendered pages.",
      },
      {
        question: "Can I use SSG with dynamic data?",
        answer:
          "You can pre-render pages at build time and hydrate them with client-side data for dynamic elements. Incremental Static Regeneration also lets you update static pages without a full rebuild.",
      },
      {
        question: "How often should I rebuild my static site?",
        answer:
          "It depends on how frequently your content changes. A daily rebuild via a cron job works well for blogs. For faster updates, consider on-demand revalidation or ISR.",
      },
    ],
  },
  {
    slug: "guide-to-structured-data",
    title: "A Practical Guide to Structured Data for Developers",
    description:
      "Add JSON-LD structured data to your site to improve search engine visibility and earn rich results.",
    excerpt:
      "Structured data tells search engines exactly what your content is. Learn how to implement JSON-LD schemas that unlock rich results.",
    heroImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=630&fit=crop",
    heroImageAlt: "Abstract data visualisation with connected nodes",
    publishedAt: "2025-02-10T08:00:00Z",
    updatedAt: "2025-02-10T08:00:00Z",
    readingTime: "8 min read",
    tags: ["seo", "structured data", "web development"],
    keywords: [
      "structured data",
      "JSON-LD",
      "schema.org",
      "rich results",
      "SEO markup",
    ],
    primaryKeyword: "structured data",
    author: { name: "Coen Hewes", role: "Developer", url: "https://github.com/coenhewes" },
    sections: [
      {
        heading: "What is structured data?",
        paragraphs: [
          "Structured data is a standardised format for describing the content of a web page to search engines. The most common format is JSON-LD (JavaScript Object Notation for Linked Data), embedded in a <script> tag in your HTML.",
          "When Google encounters structured data, it can use it to generate rich results — enhanced search listings with star ratings, FAQ accordions, breadcrumbs, and more.",
        ],
      },
      {
        heading: "Common schema types you should know",
        paragraphs: [
          "Schema.org defines hundreds of types, but a handful cover most use cases. Article and BlogPosting for content sites, Product and Offer for ecommerce, FAQPage for support content, and Organization for company info.",
        ],
        bullets: [
          "BlogPosting — for blog posts with author, date, and image",
          "FAQPage — renders an expandable FAQ in search results",
          "BreadcrumbList — shows a breadcrumb trail below the page title",
          "Organization — provides company details in the knowledge panel",
        ],
      },
      {
        heading: "Implementing JSON-LD in Next.js",
        paragraphs: [
          "The cleanest approach is to create a helper function that builds the JSON-LD object, then render it in a <script type='application/ld+json'> tag. Keep the schema construction separate from the rendering so you can test it independently.",
          "In a Next.js App Router project, you can include the script tag directly in your page or layout component. Since it is a server component, the JSON-LD is embedded in the initial HTML — no client-side JavaScript required.",
        ],
      },
      {
        heading: "Testing and validating your markup",
        paragraphs: [
          "Google provides a Rich Results Test that checks whether your structured data is eligible for enhanced search features. Schema.org also maintains a validator for checking syntax.",
          "Always test after deploying. The most common issues are missing required fields, incorrect data types, and mismatched URLs between your canonical tag and the structured data.",
        ],
      },
    ],
    takeaways: [
      "JSON-LD is the recommended format for structured data.",
      "Focus on BlogPosting, FAQPage, and BreadcrumbList for content sites.",
      "Build schema objects in helper functions for testability.",
      "Validate with Google's Rich Results Test before deploying.",
    ],
    faqs: [
      {
        question: "Does structured data directly improve rankings?",
        answer:
          "Structured data does not directly boost rankings, but rich results can significantly improve click-through rates, which indirectly benefits your SEO.",
      },
      {
        question: "Can I have multiple JSON-LD blocks on one page?",
        answer:
          "Yes. It is common to have separate blocks for the article schema, FAQ schema, and breadcrumb schema on the same page.",
      },
    ],
  },
  {
    slug: "automating-content-publishing-with-ci-cd",
    title: "Automating Content Publishing with CI/CD",
    subtitle: "Set it, forget it, and let your pipeline do the publishing",
    description:
      "Learn how to automate blog publishing using GitHub Actions, deploy hooks, and scheduled builds — no CMS required.",
    excerpt:
      "Tired of manually publishing posts? Set up a CI/CD pipeline that publishes your content automatically on a schedule.",
    heroImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&h=630&fit=crop",
    heroImageAlt: "Automated assembly line in a modern factory",
    publishedAt: "2027-06-01T08:00:00Z",
    updatedAt: "2027-06-01T08:00:00Z",
    readingTime: "5 min read",
    tags: ["ci/cd", "automation", "web development"],
    keywords: [
      "automated publishing",
      "github actions",
      "deploy hooks",
      "scheduled builds",
      "CI/CD blog",
    ],
    primaryKeyword: "automated content publishing",
    author: { name: "Coen Hewes", role: "Developer", url: "https://github.com/coenhewes" },
    stats: [
      {
        label: "Time saved",
        value: "100%",
        description: "No manual publishing steps needed",
      },
      {
        label: "Deploy frequency",
        value: "Daily",
        description: "Automatic rebuild every 24 hours",
      },
    ],
    sections: [
      {
        heading: "The problem with manual publishing",
        paragraphs: [
          "Most static blogs require someone to click a deploy button or merge a PR to publish new content. This works fine for occasional posts, but it breaks down when you want to schedule content in advance.",
          "If you are writing posts in batches — or using an LLM to generate them — you need a way to queue posts for future dates and have them go live automatically.",
        ],
      },
      {
        heading: "How scheduled deploys work",
        paragraphs: [
          "The solution is surprisingly simple. Each post has a publishedAt date. At build time, a filter excludes any post whose date is in the future. A daily cron job triggers a fresh build, and the filter re-evaluates — any post whose date has now passed appears on the site.",
          "The cron job is a GitHub Actions workflow that fires a Vercel Deploy Hook via curl. The entire workflow is about five lines of YAML.",
        ],
        highlights: [
          "Posts are filtered by date at build time",
          "A daily cron triggers a rebuild via deploy hook",
          "Future-dated posts go live automatically when their date passes",
        ],
      },
      {
        heading: "Setting up the workflow",
        paragraphs: [
          "Create a deploy hook in your Vercel project settings. Copy the URL and add it as a GitHub Actions secret. Then create a workflow file with a cron schedule and a single curl step.",
          "The cron runs daily at a time you choose — 06:00 UTC is a reasonable default. You can also add workflow_dispatch to trigger a manual rebuild at any time.",
        ],
        bullets: [
          "Create a Vercel Deploy Hook in your project dashboard",
          "Store the hook URL as a GitHub secret (VERCEL_DEPLOY_HOOK)",
          "Write a GitHub Actions workflow with a cron trigger",
          "Add workflow_dispatch for manual rebuilds",
        ],
      },
    ],
    checklist: [
      {
        title: "Create a deploy hook",
        description:
          "In Vercel → Project Settings → Git → Deploy Hooks, create a hook for the main branch.",
      },
      {
        title: "Add the GitHub secret",
        description:
          "Go to your repo's Settings → Secrets and add VERCEL_DEPLOY_HOOK with the hook URL.",
      },
      {
        title: "Create the workflow file",
        description:
          "Add .github/workflows/scheduled-deploy.yml with a cron schedule and curl command.",
      },
    ],
    takeaways: [
      "Scheduled builds eliminate manual publishing steps entirely.",
      "A date filter at build time is all you need to gate content.",
      "GitHub Actions + Vercel Deploy Hooks make this trivial to set up.",
    ],
    faqs: [
      {
        question: "What if I need a post to go live immediately?",
        answer:
          "Add workflow_dispatch to your GitHub Actions workflow so you can trigger a rebuild manually at any time, or just push a commit to trigger a Vercel build.",
      },
      {
        question: "How precise is the publish timing?",
        answer:
          "The cron runs once per day, so posts go live within 24 hours of their publishedAt date. If you need tighter control, increase the cron frequency.",
      },
    ],
  },
];
