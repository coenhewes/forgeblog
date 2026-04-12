import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { blogPosts } from "@/content/blogPosts";
import { internalLinkRules } from "@/content/internalLinks";
import { relatedCallouts } from "@/content/relatedLinks";
import { site } from "@/lib/site";
import type { BlogPost } from "@/lib/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC = join(ROOT, "public");

if (!existsSync(PUBLIC)) mkdirSync(PUBLIC, { recursive: true });

// ---------- partition posts ----------

const now = new Date();

function isPublished(post: BlogPost): boolean {
  return new Date(post.publishedAt) <= now;
}

const published = blogPosts
  .filter(isPublished)
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

const scheduled = blogPosts
  .filter((p) => !isPublished(p))
  .sort(
    (a, b) =>
      new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
  );

// ---------- tag counts ----------

const tagMap = new Map<string, number>();
for (const post of published) {
  for (const tag of post.tags) {
    tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
  }
}
const tagCounts = Object.fromEntries(
  [...tagMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50),
);

// ---------- serialise link rules ----------

const serialisedRules = internalLinkRules.map((rule) => ({
  pattern: rule.pattern.source,
  flags: rule.pattern.flags,
  href: rule.href,
  ...(rule.title && { title: rule.title }),
}));

// ---------- serialise related callouts ----------

const serialisedCallouts: Record<
  string,
  { title: string; description: string; href: string; cta: string }
> = {};
for (const [slug, callout] of Object.entries(relatedCallouts)) {
  serialisedCallouts[slug] = {
    title: callout.title,
    description: callout.description,
    href: callout.href,
    cta: callout.cta,
  };
}

// ---------- build skill.json ----------

const generatedAt = now.toISOString();

const skillJson = {
  $schema: "https://forgeblog.dev/skill.schema.json",
  generatedAt,
  site: {
    url: site.url,
    name: site.name,
    description: site.description,
    niche: site.niche,
    audience: site.audience,
    tone: site.tone,
  },
  stats: {
    publishedCount: published.length,
    scheduledCount: scheduled.length,
    tagCounts,
  },
  posts: published.map((p) => ({
    slug: p.slug,
    title: p.title,
    primaryKeyword: p.primaryKeyword,
    tags: p.tags,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    excerpt: p.excerpt,
    url: `${site.url}/blog/${p.slug}`,
  })),
  scheduled: scheduled.map((p) => ({
    slug: p.slug,
    title: p.title,
    publishedAt: p.publishedAt,
  })),
  internalLinkRules: serialisedRules,
  relatedCallouts: serialisedCallouts,
};

writeFileSync(
  join(PUBLIC, "skill.json"),
  JSON.stringify(skillJson, null, 2) + "\n",
);

// ---------- resolve templates ----------

function resolveTemplate(templatePath: string, outputPath: string): void {
  if (!existsSync(templatePath)) return;
  const template = readFileSync(templatePath, "utf-8");
  const resolved = template
    .replaceAll("{{SITE_URL}}", site.url)
    .replaceAll("{{SITE_NAME}}", site.name)
    .replaceAll("{{SITE_DESCRIPTION}}", site.description)
    .replaceAll("{{SITE_NICHE}}", site.niche)
    .replaceAll("{{SITE_AUDIENCE}}", site.audience)
    .replaceAll("{{SITE_TONE}}", site.tone)
    .replaceAll("{{GENERATED_AT}}", generatedAt)
    .replaceAll("{{PUBLISHED_COUNT}}", String(published.length))
    .replaceAll("{{SCHEDULED_COUNT}}", String(scheduled.length));
  writeFileSync(outputPath, resolved);
}

resolveTemplate(
  join(PUBLIC, "skill.md.template"),
  join(PUBLIC, "skill.md"),
);

resolveTemplate(
  join(PUBLIC, "llms.txt.template"),
  join(PUBLIC, "llms.txt"),
);

// ---------- summary ----------

console.log(
  `Generated public/skill.json (${published.length} published, ${scheduled.length} scheduled, ${serialisedRules.length} link rules)`,
);
