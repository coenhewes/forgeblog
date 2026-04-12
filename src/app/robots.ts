import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Robots.txt — allow all crawlers, point to sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
