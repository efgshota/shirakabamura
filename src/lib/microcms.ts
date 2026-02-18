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

// 物件情報（MicroCMS実スキーマ準拠）
// image は単体・配列どちらの設定でも動作するよう両方を許容する
export type Property = {
  title: string;
  location: string;
  type: string[];
  image: MicroCMSImage | MicroCMSImage[];   // 単体または複数画像
  images?: MicroCMSImage | MicroCMSImage[]; // ギャラリー用
  price: string;
  floorPlan?: string | null;
  floorArea?: string | null;
  specs?: string;
  details?: string;         // リッチエディタ（HTML）
  comment?: string;
  description?: string;     // リッチエディタ（HTML）
  address?: string;
  access?: string;
} & MicroCMSListContent;

// MicroCMS imageフィールドから最初のURLを安全に取得するヘルパー
export function getFirstImageUrl(
  image: MicroCMSImage | MicroCMSImage[] | null | undefined
): string {
  if (!image) return "";
  if (Array.isArray(image)) return image[0]?.url ?? "";
  return image.url ?? "";
}

// MicroCMS imageフィールドから全URLを配列で取得するヘルパー
export function getAllImageUrls(
  image: MicroCMSImage | MicroCMSImage[] | null | undefined
): string[] {
  if (!image) return [];
  if (Array.isArray(image)) return image.map((img) => img.url);
  return [image.url];
}

// お役立ち帳（生活情報）
export type UsefulInfo = {
  title: string;
  category: string;
  description: string;
  address?: string;
  phone?: string;
  url?: string;
  image?: MicroCMSImage;
} & MicroCMSListContent;

// 事業者紹介
export type Business = {
  name: string;
  description: string;
  image: MicroCMSImage;
  url?: string;
  category?: string;
} & MicroCMSListContent;

// お知らせ
export type News = {
  title: string;
  date: string;
  content?: string;
  category?: string;
} & MicroCMSListContent;

// ===== API関数 =====

// 物件一覧取得
export async function getProperties(queries?: MicroCMSQueries) {
  if (!client) throw new Error("MicroCMS client is not configured");
  return client.getList<Property>({
    endpoint: "property",
    queries,
  });
}

// 物件詳細取得（contentId で取得）
export async function getProperty(
  contentId: string,
  queries?: MicroCMSQueries
) {
  if (!client) throw new Error("MicroCMS client is not configured");
  return client.getListDetail<Property>({
    endpoint: "property",
    contentId,
    queries,
  });
}

// お役立ち帳一覧取得
export async function getUsefulInfos(queries?: MicroCMSQueries) {
  if (!client) throw new Error("MicroCMS client is not configured");
  return client.getList<UsefulInfo>({
    endpoint: "useful-infos",
    queries,
  });
}

// 事業者一覧取得
export async function getBusinesses(queries?: MicroCMSQueries) {
  if (!client) throw new Error("MicroCMS client is not configured");
  return client.getList<Business>({
    endpoint: "businesses",
    queries,
  });
}

// お知らせ一覧取得
export async function getNews(queries?: MicroCMSQueries) {
  return client.getList<News>({
    endpoint: "news",
    queries,
  });
}
