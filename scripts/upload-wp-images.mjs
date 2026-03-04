// WordPress画像をmicroCMSにアップロードして各物件に紐付けるスクリプト
//
// 使い方:
//   node scripts/upload-wp-images.mjs --preview   # マッチング確認のみ
//   node scripts/upload-wp-images.mjs             # 実際にアップロード

import { readFileSync } from "fs";

const XML_PATH = "/Users/efgshota/Downloads/WordPress.2026-03-04.xml";
const SERVICE_DOMAIN = "shirakabamura";
const API_KEY = "hQDy4WfeV3mdWgui4lzRPqrY4MVweO4iIKaL";
const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;

// 画像URLをmicroCMSにアップロードしてCDN URLを返す
async function uploadImage(imageUrl) {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`ダウンロード失敗: ${res.status} ${imageUrl}`);

  const blob = await res.blob();
  const filename = decodeURIComponent(imageUrl.split("/").pop() ?? "image.jpg");

  const formData = new FormData();
  formData.append("file", blob, filename);

  const uploadRes = await fetch(`${BASE_URL}/media`, {
    method: "POST",
    headers: { "X-MICROCMS-API-KEY": API_KEY },
    body: formData,
  });

  if (!uploadRes.ok) {
    const text = await uploadRes.text();
    throw new Error(`アップロード失敗: ${uploadRes.status} ${text}`);
  }

  const { url } = await uploadRes.json();
  return url;
}

// 物件の image / images フィールドを更新
async function patchPropertyImages(contentId, image, images) {
  const body = {};
  if (image) body.image = [{ url: image }];
  if (images.length > 0) body.images = images.map((url) => ({ url }));

  const res = await fetch(`${BASE_URL}/property/${contentId}`, {
    method: "PATCH",
    headers: {
      "X-MICROCMS-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PATCH失敗: ${res.status} ${text}`);
  }
}

// XMLから物件タイトル → 画像URL のマップを作成
function parseWpImages(xmlContent) {
  const items = [...xmlContent.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(
    (m) => m[1]
  );

  const attachments = {};
  for (const item of items) {
    const type = item.match(
      /<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/
    )?.[1];
    if (type !== "attachment") continue;
    const id = item.match(/<wp:post_id>(\d+)<\/wp:post_id>/)?.[1];
    const url = item.match(
      /<wp:attachment_url><!\[CDATA\[(.*?)\]\]><\/wp:attachment_url>/
    )?.[1];
    if (id && url) attachments[id] = url;
  }

  const result = new Map(); // title → { thumbnailUrl, imageUrls }
  for (const item of items) {
    const type = item.match(
      /<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/
    )?.[1];
    if (type !== "property") continue;
    const status = item.match(
      /<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/
    )?.[1];
    if (status === "trash") continue;

    const title =
      item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ?? "";

    const meta = {};
    for (const m of item.matchAll(
      /<wp:postmeta>\s*<wp:meta_key><!\[CDATA\[(.*?)\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[([\s\S]*?)\]\]><\/wp:meta_value>\s*<\/wp:postmeta>/g
    )) {
      const key = m[1];
      if (!key.startsWith("_") || key === "_thumbnail_id")
        meta[key] = m[2].trim();
    }

    const imageCount = parseInt(meta["images"] ?? "0");
    const imageUrls = [];
    for (let i = 0; i < imageCount; i++) {
      const id = meta[`images_${i}_image`];
      if (id && attachments[id]) imageUrls.push(attachments[id]);
    }
    const uniqueUrls = [...new Set(imageUrls)];
    const thumbnailUrl =
      (meta["_thumbnail_id"] ? attachments[meta["_thumbnail_id"]] : null) ??
      uniqueUrls[0] ??
      "";

    result.set(title, { thumbnailUrl, imageUrls: uniqueUrls });
  }

  return result;
}

async function main() {
  const isPreview = process.argv.includes("--preview");
  const xmlContent = readFileSync(XML_PATH, "utf-8");
  const wpImages = parseWpImages(xmlContent);

  // microCMSから全物件を取得
  const cmsRes = await fetch(`${BASE_URL}/property?limit=100&fields=id,title`, {
    headers: { "X-MICROCMS-API-KEY": API_KEY },
  });
  const { contents } = await cmsRes.json();

  console.log(
    `\nmicroCMS: ${contents.length}件 / WordPress: ${wpImages.size}件\n`
  );

  for (const cms of contents) {
    const wp = wpImages.get(cms.title);
    if (!wp?.thumbnailUrl) {
      console.log(`⚠  ${cms.title}: WordPressに画像なし`);
      continue;
    }

    if (isPreview) {
      console.log(`[${cms.id}] ${cms.title}`);
      console.log(`  thumb: ${wp.thumbnailUrl}`);
      wp.imageUrls
        .filter((u) => u !== wp.thumbnailUrl)
        .forEach((u) => console.log(`  image: ${u}`));
      continue;
    }

    // アップロード実行
    console.log(`\n📤 ${cms.title}`);
    try {
      const uploadedThumb = await uploadImage(wp.thumbnailUrl);
      console.log(`  ✓ image: ${uploadedThumb}`);

      const galleryUrls = wp.imageUrls.filter((u) => u !== wp.thumbnailUrl);
      const uploadedGallery = [];
      for (const url of galleryUrls) {
        await new Promise((r) => setTimeout(r, 300));
        const uploaded = await uploadImage(url);
        uploadedGallery.push(uploaded);
        console.log(`  ✓ gallery: ${uploaded}`);
      }

      await patchPropertyImages(cms.id, uploadedThumb, uploadedGallery);
      console.log(`  → PATCH完了`);
    } catch (e) {
      console.error(`  ✗ ${e.message}`);
    }

    await new Promise((r) => setTimeout(r, 500));
  }

  if (isPreview) {
    console.log("\n✅ --preview を外すと実際にアップロードします。");
  } else {
    console.log("\n🎉 完了！");
  }
}

main();
