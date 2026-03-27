import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

// MicroCMS クライアント（環境変数が未設定の場合は null）
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

export const client =
  serviceDomain && apiKey
    ? createClient({ serviceDomain, apiKey })
    : null;

// ===== 型定義 =====

// 物件情報
export type Property = {
  title: string;
  slug?: string;
  location: string;
  type: string[];
  kindscat?: string[]; // 建物 / 土地
  image: MicroCMSImage | MicroCMSImage[];
  images?: MicroCMSImage | MicroCMSImage[];
  price: string;
  floorPlan?: string | null;
  floorArea?: string | null;
  landArea?: string | null;
  specs?: string;
  details?: string;
  comment?: string;
  description?: string;
  address?: string;
  access?: string;
} & MicroCMSListContent;

// お役立ち帳
export type UsefulInfo = {
  title: string;
  category: string;
  description?: string;
  address?: string;
  phone?: string;
  url?: string;
  image?: MicroCMSImage;
} & MicroCMSListContent;

// 物件事例（caseエンドポイント）
export type Case = {
  title: string;
  slug?: string;
  image?: MicroCMSImage;
  operator?: string;
  businessType?: string;
  previousJob?: string;
  phone?: string;
  website?: string;
  qa?: { fieldId: string; question: string; answer: string }[];
} & MicroCMSListContent;

// 後方互換エイリアス
export type Business = Case;

// お知らせ
export type News = {
  title: string;
  slug?: string;
  date: string;
  content?: string;
  category?: string;
} & MicroCMSListContent;

// ===== UI用 正規化済み型 =====

// NewsListPage 共通型
export type NewsListItem = {
  id: string;
  title: string;
  date: string;
  category?: string;
};

// UsefulInfoSection / UsefulListPage 共通型
export type UsefulInfoItem = {
  id: string;
  title: string;
  category: string;
  phone?: string;
  url?: string;
};

// BusinessSection 共通型
export type BusinessItem = {
  id: string;
  slug?: string;
  name: string;
  image: string;
  businessType?: string;
};

// ===== 画像ヘルパー =====

export function getFirstImageUrl(
  image: MicroCMSImage | MicroCMSImage[] | null | undefined
): string {
  if (!image) return "";
  if (Array.isArray(image)) return image[0]?.url ?? "";
  return image.url ?? "";
}

export function getAllImageUrls(
  image: MicroCMSImage | MicroCMSImage[] | null | undefined
): string[] {
  if (!image) return [];
  if (Array.isArray(image)) return image.map((img) => img.url);
  return [image.url];
}

// ===== API関数 =====

export async function getProperties(queries?: MicroCMSQueries) {
  if (!client) throw new Error("MicroCMS client is not configured");
  return client.getList<Property>({ endpoint: "property", queries });
}

export async function getProperty(contentId: string, queries?: MicroCMSQueries) {
  if (!client) throw new Error("MicroCMS client is not configured");
  return client.getListDetail<Property>({ endpoint: "property", contentId, queries });
}

export async function getUsefulInfos(queries?: MicroCMSQueries) {
  if (!client) throw new Error("MicroCMS client is not configured");
  return client.getList<UsefulInfo>({ endpoint: "info", queries });
}

export async function getCases(queries?: MicroCMSQueries) {
  if (!client) throw new Error("MicroCMS client is not configured");
  return client.getList<Case>({ endpoint: "stories", queries });
}

export async function getCase(contentId: string, queries?: MicroCMSQueries) {
  if (!client) throw new Error("MicroCMS client is not configured");
  return client.getListDetail<Case>({ endpoint: "stories", contentId, queries });
}

// 後方互換エイリアス
export const getBusinesses = getCases;
export const getBusiness = getCase;

export async function getNews(queries?: MicroCMSQueries) {
  if (!client) throw new Error("MicroCMS client is not configured");
  return client.getList<News>({ endpoint: "news", queries });
}

export async function getNewsItem(contentId: string, queries?: MicroCMSQueries) {
  if (!client) throw new Error("MicroCMS client is not configured");
  return client.getListDetail<News>({ endpoint: "news", contentId, queries });
}
