import Link from "next/link";
import { internalLinkRules } from "@/content/internalLinks";
import type { InternalLinkRule } from "@/content/internalLinks";
import { formatInline } from "@/components/blog/InlineFormat";

/**
 * Renders a text string with internal link rules and inline formatting applied.
 *
 * Processing order: internal link rules are applied first (regex-based), then
 * inline markdown formatting (**bold**, *italic*, `code`, [text](url)) is
 * parsed within each remaining text segment.
 *
 * Each link rule's regex is tested against the text. Only the first match per
 * rule is replaced with a <Link>. Self-links (where the rule's href points to
 * the current post) are automatically skipped.
 */
export function TextWithLinks({
  text,
  currentSlug,
}: {
  text: string;
  currentSlug: string;
}) {
  if (internalLinkRules.length === 0) {
    return <>{formatInline(text)}</>;
  }

  const selfPath = `/blog/${currentSlug}`;
  const applicableRules = internalLinkRules.filter(
    (rule) => rule.href !== selfPath,
  );

  if (applicableRules.length === 0) {
    return <>{formatInline(text)}</>;
  }

  return <>{applyRules(text, applicableRules)}</>;
}

type Segment = string | { text: string; href: string; title?: string };

function applyRules(
  text: string,
  rules: InternalLinkRule[],
): React.ReactNode[] {
  let segments: Segment[] = [text];

  for (const rule of rules) {
    const next: Segment[] = [];
    let matched = false;

    for (const seg of segments) {
      if (typeof seg !== "string" || matched) {
        next.push(seg);
        continue;
      }

      const match = seg.match(rule.pattern);
      if (!match || match.index === undefined) {
        next.push(seg);
        continue;
      }

      matched = true;
      const before = seg.slice(0, match.index);
      const after = seg.slice(match.index + match[0].length);
      if (before) next.push(before);
      next.push({ text: match[0], href: rule.href, title: rule.title });
      if (after) next.push(after);
    }

    segments = next;
  }

  return segments.map((seg, i) =>
    typeof seg === "string" ? (
      <span key={i}>{formatInline(seg)}</span>
    ) : (
      <Link
        key={i}
        href={seg.href}
        title={seg.title}
        className="text-zinc-900 underline decoration-zinc-400 underline-offset-2 hover:decoration-zinc-900 dark:text-zinc-100 dark:decoration-zinc-500 dark:hover:decoration-zinc-100"
      >
        {seg.text}
      </Link>
    ),
  );
}
