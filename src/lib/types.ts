/**
 * A blog post. All string fields in the article body support inline markdown
 * formatting: **bold**, *italic*, `code`, and [text](url) for external links.
 * Internal links are handled automatically by the linking engine — just
 * mention matching phrases in plain text.
 */
export type BlogPost = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  excerpt: string;
  heroImage: string;
  heroImageAlt: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  featured?: boolean;
  tags: string[];
  keywords: string[];
  primaryKeyword: string;
  author: { name: string; role?: string; url?: string };
  stats?: Array<{ label: string; value: string; description?: string }>;
  sections: Array<{
    label?: string;
    heading: string;
    /** Supports inline formatting: **bold**, *italic*, `code`, [text](url). */
    paragraphs: string[];
    /** Supports inline formatting: **bold**, *italic*, `code`, [text](url). */
    highlights?: string[];
    /** Supports inline formatting: **bold**, *italic*, `code`, [text](url). */
    bullets?: string[];
  }>;
  /** Supports inline formatting in title and description. */
  checklist?: Array<{ title: string; description: string }>;
  /** Supports inline formatting: **bold**, *italic*, `code`, [text](url). */
  takeaways?: string[];
  /** Supports inline formatting in answer field. */
  faqs?: Array<{ question: string; answer: string }>;
};
