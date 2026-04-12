import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedBlogPosts, getPostBySlug } from "@/lib/blog";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { BlogArticlePage } from "@/components/blog/BlogArticlePage";
import { StructuredData } from "@/components/StructuredData";
import {
  buildBlogPostingSchema,
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from "@/components/StructuredData";

export function generateStaticParams() {
  return getPublishedBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [{ url: post.heroImage, alt: post.heroImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.heroImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ];

  return (
    <>
      <StructuredData data={buildBlogPostingSchema(post)} />
      <StructuredData data={buildBreadcrumbSchema(breadcrumbs)} />
      {post.faqs && post.faqs.length > 0 && (
        <StructuredData data={buildFAQPageSchema(post)} />
      )}
      <BlogArticlePage post={post} />
    </>
  );
}
