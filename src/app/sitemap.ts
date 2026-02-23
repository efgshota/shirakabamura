import { MetadataRoute } from "next";
import { getProperties } from "@/lib/microcms";
import { properties as staticProperties } from "@/data/properties";
import { businesses } from "@/data/businesses";

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
      url: `${siteUrl}/useful/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 物件詳細ページ（MicroCMS → 静的データフォールバック）
  let propertyRoutes: MetadataRoute.Sitemap = [];
  try {
    const { contents } = await getProperties({ limit: 100 });
    propertyRoutes = contents.map((p) => ({
      url: `${siteUrl}/property/${encodeURIComponent(p.id)}/`,
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

  // 事業者詳細ページ
  const businessRoutes: MetadataRoute.Sitemap = businesses.map((b) => ({
    url: `${siteUrl}/business/${encodeURIComponent(b.slug)}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes, ...businessRoutes];
}
