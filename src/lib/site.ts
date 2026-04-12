/** Base URL for the site, used for canonical URLs and OG tags. */
export const SITE_URL =
  process.env.SITE_URL ?? "https://example.com";

/** Display name of the site, used in titles and metadata. */
export const SITE_NAME = process.env.SITE_NAME ?? "My Blog";

/** Default author name for posts that don't specify one. */
export const SITE_AUTHOR_NAME =
  process.env.SITE_AUTHOR_NAME ?? "Your Name";

/** Default author URL. */
export const SITE_AUTHOR_URL =
  process.env.SITE_AUTHOR_URL ?? "https://example.com";
