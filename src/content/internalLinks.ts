/**
 * Internal link rules for automatic in-content linking.
 *
 * Each rule maps a regex pattern to an internal URL. When a paragraph of text
 * is rendered through the TextWithLinks component, the first occurrence of
 * each matching pattern is converted to a <Link>.
 *
 * Guidelines:
 * - Use word boundaries (\b) to avoid partial matches.
 * - Add the `i` flag for case-insensitive matching if desired.
 * - Order matters: if two patterns could match the same text, the first wins.
 * - Avoid overlapping patterns — the component does not handle nested matches.
 * - Self-links (linking a post to itself) are automatically skipped.
 *
 * Example:
 *   { pattern: /\bstatic site generation\b/i, href: '/blog/understanding-static-site-generation', title: 'Learn about SSG' },
 */
export type InternalLinkRule = {
  pattern: RegExp;
  href: string;
  title?: string;
};

export const internalLinkRules: InternalLinkRule[] = [
  // Add your rules here. See the doc block above for usage.
];
