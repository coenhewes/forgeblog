import type { Metadata } from "next";
import { getPublishedBlogPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { BlogListPage } from "@/components/blog/BlogListPage";
import {
  StructuredData,
  buildBlogCollectionSchema,
  buildBreadcrumbSchema,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: `Read the latest posts on ${SITE_NAME}.`,
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page, 10) : 1;
  const posts = getPublishedBlogPosts();

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
  ];

  return (
    <>
      <StructuredData data={buildBlogCollectionSchema(posts)} />
      <StructuredData data={buildBreadcrumbSchema(breadcrumbs)} />
      <BlogListPage posts={posts} page={isNaN(page) ? 1 : page} />
    </>
  );
}
