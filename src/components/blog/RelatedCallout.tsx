import Link from "next/link";
import type { RelatedCallout as CalloutType } from "@/content/relatedLinks";

/** Renders a callout card linking to related content. */
export function RelatedCallout({ callout }: { callout: CalloutType }) {
  return (
    <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-800/50">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {callout.title}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {callout.description}
      </p>
      <Link
        href={callout.href}
        className="mt-4 inline-block rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {callout.cta}
      </Link>
    </div>
  );
}
