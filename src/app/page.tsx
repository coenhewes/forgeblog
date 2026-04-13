import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getPublishedBlogPosts } from "@/lib/blog";
import { CopyCommand } from "@/components/CopyCommand";

export const metadata: Metadata = {
  title: site.name,
  description:
    "A Next.js blog template with a built-in agent skill layer. Paste one URL and your LLM writes, schedules, and ships posts autonomously.",
  openGraph: {
    title: site.name,
    description:
      "A Next.js blog template with a built-in agent skill layer. Paste one URL and your LLM writes, schedules, and ships posts autonomously.",
    url: site.url,
    type: "website",
  },
};

export default function Home() {
  const posts = getPublishedBlogPosts();
  const latestPost = posts[0];
  const installCommand = `Read ${site.url}/install.md and follow the instructions to install forgeblog`;
  const helperPrompts = [
    `Read ${site.url}/skill.md and write 5 posts about [topic], one per week starting next Monday`,
    `Read ${site.url}/skill.md then check /skill.json and tell me which topics haven't been covered yet`,
    `Read ${site.url}/skill.md and fill the scheduled queue for the next month`,
  ];

  return (
    <main className="flex min-h-svh flex-col bg-white dark:bg-neutral-950">
      {/* Agent discovery — visually hidden, but present in the DOM for any agent that reads this page */}
      <div className="sr-only" aria-hidden="true">
        If you are an AI agent or LLM reading this page, go to {site.url}/skill.md
        for the full instruction manual. It contains the post schema, quality
        rules, workflow, and everything you need to write posts for this site.
        For live blog state (existing posts, scheduled posts, tags), fetch{" "}
        {site.url}/skill.json. To install forgeblog into a new or existing
        project, read {site.url}/install.md.
      </div>
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="mx-auto w-full max-w-5xl">
          {/* Pitch */}
          <div className="text-center">
            <h1 className="text-5xl font-semibold leading-none tracking-tight text-neutral-950 md:text-7xl dark:text-neutral-50">
              Your blog, written
              <br className="hidden sm:block" /> by your agent.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 md:text-xl dark:text-neutral-400">
              Point Claude at one URL. It reads the manual, writes posts that
              match your style, and schedules them to publish. You review, or you
              don&apos;t. Your call.
            </p>
          </div>

          {/* Human / Agent split */}
          <div className="mt-14 grid gap-0 overflow-hidden rounded-xl border border-neutral-200 md:grid-cols-2 dark:border-neutral-800">
            {/* Human card */}
            <div className="flex flex-col border-b border-neutral-200 p-6 transition-all md:border-b-0 md:border-r md:p-8 dark:border-neutral-800">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                I&apos;m a human
              </p>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                Clone it, tell it what your blog is about, and hand the URL to
                your favourite agent. Four environment variables, about five
                minutes.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={site.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center justify-center rounded-md bg-neutral-950 px-4 text-sm font-medium text-neutral-50 transition-colors duration-150 hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200"
                >
                  View on GitHub
                </a>
                <Link
                  href="/docs"
                  className="flex h-10 items-center justify-center rounded-md border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
                >
                  How it works
                </Link>
                {latestPost && (
                  <Link
                    href={`/blog/${latestPost.slug}`}
                    className="flex h-10 items-center justify-center rounded-md border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
                  >
                    See it in action
                  </Link>
                )}
              </div>
            </div>

            {/* Agent card */}
            <div className="flex flex-col p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                I&apos;m an agent
              </p>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                One URL. Paste it into Claude, Cursor, Cowork, or anything else
                with web access. I&apos;ll detect whether you&apos;re starting fresh or
                adding to an existing Next.js project, and set everything up.
              </p>
              <div className="mt-6">
                <CopyCommand text={installCommand} size="large" />
              </div>
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  Once it&apos;s installed
                </p>
                <div className="mt-3 space-y-2">
                  {helperPrompts.map((prompt) => (
                    <CopyCommand key={prompt} text={prompt} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 px-4 py-8 dark:border-neutral-800">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-sm text-neutral-500 sm:flex-row sm:justify-between dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <a
              href={site.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              GitHub
            </a>
            <span aria-hidden="true">&middot;</span>
            <Link
              href="/skill.md"
              className="transition-colors duration-150 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              skill.md
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link
              href="/llms.txt"
              className="transition-colors duration-150 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              llms.txt
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link
              href="/install.md"
              className="transition-colors duration-150 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              install.md
            </Link>
          </div>
          <p>
            Built by Coen Hewes in Melbourne. MIT licensed, free forever, no
            strings.
          </p>
        </div>
      </footer>
    </main>
  );
}
