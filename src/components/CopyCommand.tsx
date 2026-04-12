"use client";

import { useState } from "react";

/** Monospace command block with copy-to-clipboard button. */
export function CopyCommand({
  text,
  size = "default",
}: {
  text: string;
  size?: "large" | "default";
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isLarge = size === "large";

  return (
    <div
      className={`relative w-full rounded-lg border bg-neutral-100 dark:bg-neutral-900 ${
        isLarge
          ? "border-neutral-200 p-4 pr-14 md:p-5 md:pr-16 dark:border-neutral-800"
          : "border-neutral-200 p-3 pr-12 md:p-4 md:pr-14 dark:border-neutral-800"
      }`}
    >
      <pre
        className={`whitespace-pre-wrap break-words font-mono ${
          isLarge
            ? "text-sm leading-relaxed md:text-base text-neutral-900 dark:text-neutral-100"
            : "text-xs leading-relaxed md:text-sm text-neutral-700 dark:text-neutral-300"
        }`}
      >
        {text}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
        aria-label="Copy command"
      >
        {copied ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13.25 4.75 6 12 2.75 8.75" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 5.5V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h2.5" />
          </svg>
        )}
      </button>
      <span
        aria-live="polite"
        className={`absolute right-14 top-3.5 text-xs font-medium text-neutral-500 transition-opacity duration-150 dark:text-neutral-400 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied
      </span>
    </div>
  );
}
