import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

const POSTS_PER_PAGE = 9;

/** Paginated blog post list with optional featured post highlight. */
export function BlogListPage({
  posts,
  page,
}: {
  posts: BlogPost[];
  page: number;
}) {
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);
  const featured =
    currentPage === 1 ? pagePosts.find((p) => p.featured) : undefined;
  const rest = featured
    ? pagePosts.filter((p) => p.slug !== featured.slug)
    : pagePosts;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Blog
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Thoughts, guides, and deep dives.
      </p>

      {featured && (
        <Link href={`/blog/${featured.slug}`} className="group mt-8 block">
          <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src={featured.heroImage}
                alt={featured.heroImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1152px) 100vw, 1152px"
                priority
              />
            </div>
            <div className="p-6">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Featured
              </span>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                {featured.title}
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {featured.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <time dateTime={featured.publishedAt}>
                  {formatDate(featured.publishedAt)}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>{featured.readingTime}</span>
              </div>
            </div>
          </article>
        </Link>
      )}

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group"
          >
            <article className="flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={post.heroImage}
                  alt={post.heroImageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Blog pagination"
          className="mt-12 flex items-center justify-center gap-2"
        >
          {currentPage > 1 && (
            <Link
              href={currentPage === 2 ? "/blog" : `/blog?page=${currentPage - 1}`}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Previous
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={p === 1 ? "/blog" : `/blog?page=${p}`}
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                p === currentPage
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Next
            </Link>
          )}
        </nav>
      )}
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
