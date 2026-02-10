import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

// MicroCMS クライアント
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

// ===== 型定義 =====

// 物件情報
export type Property = {
  title: string;
  description: string;
  image: MicroCMSImage;
  area?: string;
  price?: string;
  status?: string;
} & MicroCMSListContent;

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

// ===== API関数 =====

// 物件一覧取得
export async function getProperties(queries?: MicroCMSQueries) {
  return client.getList<Property>({
    endpoint: "property",
    queries,
  });
}

// 物件詳細取得
export async function getProperty(
  contentId: string,
  queries?: MicroCMSQueries
) {
  return client.getListDetail<Property>({
    endpoint: "property",
    contentId,
    queries,
  });
}

// お役立ち帳一覧取得
export async function getUsefulInfos(queries?: MicroCMSQueries) {
  return client.getList<UsefulInfo>({
    endpoint: "useful-infos",
    queries,
  });
}

// 事業者一覧取得
export async function getBusinesses(queries?: MicroCMSQueries) {
  return client.getList<Business>({
    endpoint: "businesses",
    queries,
  });
}
