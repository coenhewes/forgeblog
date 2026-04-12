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
    paragraphs: string[];
    highlights?: string[];
    bullets?: string[];
  }>;
  checklist?: Array<{ title: string; description: string }>;
  takeaways?: string[];
  faqs?: Array<{ question: string; answer: string }>;
};
