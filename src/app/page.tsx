import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Welcome to your blog
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          A statically generated blog with scheduled publishing. Edit{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono dark:bg-zinc-800">
            src/content/blogPosts.ts
          </code>{" "}
          to add your own posts.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-block rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Read the blog
        </Link>
      </div>
    </main>
  );
}
