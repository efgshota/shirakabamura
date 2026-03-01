import { MetadataRoute } from "next";
import { getProperties, getBusinesses, getNews } from "@/lib/microcms";
import { properties as staticProperties } from "@/data/properties";
import { businesses as staticBusinesses } from "@/data/businesses";
import { news as staticNews } from "@/data/news";

const siteUrl = "https://shirakabamura.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/property/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/location-rental/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/info/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/stories/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/news/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 物件詳細ページ（MicroCMS → 静的データフォールバック）
  let propertyRoutes: MetadataRoute.Sitemap = [];
  try {
    const { contents } = await getProperties({ limit: 100 });
    propertyRoutes = contents.map((p) => ({
      url: `${siteUrl}/property/${encodeURIComponent(p.slug ?? p.id)}/`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    propertyRoutes = staticProperties.map((p) => ({
      url: `${siteUrl}/property/${encodeURIComponent(p.slug)}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  }

  // 物件事例詳細ページ（MicroCMS → 静的データフォールバック）
  let storiesRoutes: MetadataRoute.Sitemap = [];
  try {
    const { contents } = await getBusinesses({ limit: 100 });
    storiesRoutes = contents.map((b) => ({
      url: `${siteUrl}/stories/${encodeURIComponent(b.slug ?? b.id)}/`,
      lastModified: new Date(b.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    storiesRoutes = staticBusinesses.map((b) => ({
      url: `${siteUrl}/stories/${encodeURIComponent(b.slug)}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  }

  // ニュース詳細ページ（MicroCMS → 静的データフォールバック）
  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const { contents } = await getNews({ limit: 100 });
    newsRoutes = contents.map((n) => ({
      url: `${siteUrl}/news/${encodeURIComponent(n.slug ?? n.id)}/`,
      lastModified: new Date(n.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    newsRoutes = staticNews.map((n) => ({
      url: `${siteUrl}/news/${encodeURIComponent(n.slug)}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  }

  return [...staticRoutes, ...propertyRoutes, ...storiesRoutes, ...newsRoutes];
}
