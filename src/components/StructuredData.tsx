import type { BlogPost } from "@/lib/types";
import { SITE_URL, SITE_NAME, SITE_AUTHOR_NAME } from "@/lib/site";
import { stripInlineMarkers } from "@/components/blog/InlineFormat";

/** Renders a JSON-LD script tag. No-ops if data is null. */
export function StructuredData({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Builds a BlogPosting JSON-LD schema from a post. */
export function buildBlogPostingSchema(post: BlogPost): object {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    articleBody: post.sections
      .flatMap((s) => s.paragraphs)
      .map(stripInlineMarkers)
      .join("\n\n"),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.url && { url: post.author.url }),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: post.heroImage,
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

/** Builds a FAQPage JSON-LD schema from a post's FAQs. Returns null if no FAQs. */
export function buildFAQPageSchema(post: BlogPost): object | null {
  if (!post.faqs || post.faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripInlineMarkers(faq.answer),
      },
    })),
  };
}

/** Builds a BreadcrumbList JSON-LD schema from a trail of breadcrumbs. */
export function buildBreadcrumbSchema(
  trail: Array<{ name: string; url: string }>,
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Builds an Organization JSON-LD schema for site-wide use. */
export function buildOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    founder: {
      "@type": "Person",
      name: SITE_AUTHOR_NAME,
    },
  };
}

/** Builds a CollectionPage JSON-LD schema for the blog list page. */
export function buildBlogCollectionSchema(
  posts: BlogPost[],
): object {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blog`,
    description: `Read the latest posts on ${SITE_NAME}.`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };
}
