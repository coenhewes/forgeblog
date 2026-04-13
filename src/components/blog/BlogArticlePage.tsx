import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { getRelatedPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { relatedCallouts } from "@/content/relatedLinks";
import { RelatedCallout } from "@/components/blog/RelatedCallout";
import { TextWithLinks } from "@/components/blog/TextWithLinks";
import { InlineText } from "@/components/blog/InlineFormat";
import { FAQAccordion } from "@/components/blog/FAQAccordion";

/** Full blog article page with all optional sections. */
export function BlogArticlePage({ post }: { post: BlogPost }) {
  const related = getRelatedPosts(post, 3);
  const callout = relatedCallouts[post.slug];
  const shareUrl = `${SITE_URL}/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
        <article className="min-w-0">
          {/* Header */}
          <header>
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <Link
                href="/blog"
                className="hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                Blog
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-zinc-700 dark:text-zinc-200">
                {post.title}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="mt-2 text-xl text-zinc-600 dark:text-zinc-400">
                {post.subtitle}
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span>{post.author.name}</span>
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span>{post.readingTime}</span>
            </div>
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Hero image */}
          <div className="relative mt-8 aspect-[2/1] w-full overflow-hidden rounded-xl">
            <Image
              src={post.heroImage}
              alt={post.heroImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 768px"
              priority
            />
          </div>

          {/* Share buttons */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Share:
            </span>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              X / Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              LinkedIn
            </a>
          </div>

          {/* Stats cards */}
          {post.stats && post.stats.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {post.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800"
                >
                  <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {stat.label}
                  </p>
                  {stat.description && (
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {stat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Body sections — border-t + pt on non-first sections creates visual
              separation. Adjust pt-8 for tighter/looser spacing, or remove
              border-t for whitespace-only separation. */}
          <div className="prose prose-zinc mt-10 max-w-none dark:prose-invert">
            {post.sections.map((section, sectionIdx) => (
              <section
                key={section.heading}
                className={
                  sectionIdx > 0
                    ? "border-t border-zinc-200 pt-6 dark:border-zinc-800"
                    : undefined
                }
              >
                {section.label && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {section.label}
                  </p>
                )}
                <h2>{section.heading}</h2>
                {section.paragraphs.map((para, i) => (
                  <p key={i}>
                    <TextWithLinks text={para} currentSlug={post.slug} />
                  </p>
                ))}
                {section.highlights && section.highlights.length > 0 && (
                  <div className="not-prose my-6 rounded-lg border-l-4 border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-800/50">
                    <ul className="space-y-2">
                      {section.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                        >
                          <span
                            className="mt-0.5 text-zinc-400"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <InlineText text={h} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {section.bullets && section.bullets.length > 0 && (
                  <ul>
                    {section.bullets.map((b, i) => (
                      <li key={i}>
                        <InlineText text={b} />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Checklist */}
          {post.checklist && post.checklist.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Action checklist
              </h2>
              <div className="mt-4 space-y-3">
                {post.checklist.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-zinc-300 text-xs dark:border-zinc-600">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        <InlineText text={item.title} />
                      </p>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        <InlineText text={item.description} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key takeaways */}
          {post.takeaways && post.takeaways.length > 0 && (
            <div className="mt-10 rounded-xl bg-zinc-50 p-6 dark:bg-zinc-800/50">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Key takeaways
              </h2>
              <ul className="mt-4 space-y-2">
                {post.takeaways.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300"
                  >
                    <span
                      className="mt-1 text-sm text-zinc-400"
                      aria-hidden="true"
                    >
                      &bull;
                    </span>
                    <InlineText text={t} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related callout */}
          {callout && <RelatedCallout callout={callout} />}

          {/* FAQ */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Frequently asked questions
              </h2>
              <FAQAccordion faqs={post.faqs} />
            </div>
          )}
        </article>

        {/* Sidebar: related posts */}
        {related.length > 0 && (
          <aside className="mt-12 lg:mt-0">
            <div className="sticky top-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Related posts
              </h2>
              <div className="mt-4 space-y-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                      <Image
                        src={r.heroImage}
                        alt={r.heroImageAlt}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {r.readingTime}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
