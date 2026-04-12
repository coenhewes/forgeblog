/**
 * Related callout mapping: slug → callout data.
 *
 * When a blog post's slug has an entry here, a callout card is rendered
 * at the bottom of the article. Use this for cross-linking to other pages
 * on your site (product pages, landing pages, related guides, etc.).
 *
 * Example:
 *   'understanding-static-site-generation': {
 *     title: 'Build your own static blog',
 *     description: 'Use our template to launch a blog with scheduled publishing in minutes.',
 *     href: '/getting-started',
 *     cta: 'Get started',
 *   },
 */
export type RelatedCallout = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

export const relatedCallouts: Record<string, RelatedCallout> = {
  // Add your callouts here. See the doc block above for usage.
};
