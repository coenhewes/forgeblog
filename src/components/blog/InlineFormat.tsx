import type { ReactNode } from "react";

/**
 * Parses inline markdown formatting in a string and returns React nodes.
 *
 * Supported syntax (in match priority order):
 * - **bold** → <strong>
 * - *italic* → <em>
 * - `code` → <code>
 * - [text](url) → <a> (opens in new tab)
 *
 * The regex engine tries alternatives left-to-right, so ** is matched before *
 * and bold text won't be misinterpreted as nested italics. Nesting (e.g.
 * **bold *and italic***) is not supported — keep formatting flat.
 */

const INLINE_PATTERN =
  /\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;

/** Parses inline markdown formatting and returns React nodes. */
export function formatInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // Create a fresh regex each call so lastIndex resets
  const regex = new RegExp(INLINE_PATTERN.source, "g");
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      // **bold**
      nodes.push(<strong key={key++}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      // *italic*
      nodes.push(<em key={key++}>{match[2]}</em>);
    } else if (match[3] !== undefined) {
      // `code`
      nodes.push(
        <code
          key={key++}
          className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.875em] before:content-none after:content-none dark:bg-zinc-800"
        >
          {match[3]}
        </code>,
      );
    } else if (match[4] !== undefined && match[5] !== undefined) {
      // [text](url)
      nodes.push(
        <a
          key={key++}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-900 underline decoration-zinc-400 underline-offset-2 hover:decoration-zinc-900 dark:text-zinc-100 dark:decoration-zinc-500 dark:hover:decoration-zinc-100"
        >
          {match[4]}
        </a>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

/** Convenience component that renders a string with inline formatting applied. */
export function InlineText({ text }: { text: string }) {
  return <>{formatInline(text)}</>;
}

/**
 * Strips inline markdown markers from a string, returning plain text.
 * Used for structured data (JSON-LD) where markup is not appropriate.
 */
export function stripInlineMarkers(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
