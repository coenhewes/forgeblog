/** Consolidated site config, read from env at build time. */
export const site = {
  url: process.env.SITE_URL ?? "https://forgeblog-mauve.vercel.app",
  name: process.env.SITE_NAME ?? "ForgeBlog",
  description:
    process.env.SITE_DESCRIPTION ??
    "A Next.js blog template with scheduled publishing and a machine-readable agent skill layer.",
  niche: process.env.SITE_NICHE ?? "General",
  audience: process.env.SITE_AUDIENCE ?? "Readers",
  tone: process.env.SITE_TONE ?? "Direct and practical.",
  repoUrl:
    process.env.SITE_REPO_URL ??
    "https://github.com/coenhewes/forgeblog",
  author: {
    name: process.env.SITE_AUTHOR_NAME ?? "Coen Hewes",
    url: process.env.SITE_AUTHOR_URL ?? "https://github.com/coenhewes",
  },
};

// Re-export individual constants for backward compatibility with existing components.
/** Base URL for the site, used for canonical URLs and OG tags. */
export const SITE_URL = site.url;
/** Display name of the site, used in titles and metadata. */
export const SITE_NAME = site.name;
/** Default author name for posts that don't specify one. */
export const SITE_AUTHOR_NAME = site.author.name;
/** Default author URL. */
export const SITE_AUTHOR_URL = site.author.url;
