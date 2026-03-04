// WordPress WXR XML → microCMS property 移行スクリプト
//
// 使い方:
//   node scripts/import-wp-properties.mjs --preview   # データ確認
//   node scripts/import-wp-properties.mjs             # 実際にインポート

import { readFileSync } from "fs";

const XML_PATH = "/Users/efgshota/Downloads/WordPress.2026-03-04.xml";
const SERVICE_DOMAIN = "shirakabamura";
const API_KEY = "hQDy4WfeV3mdWgui4lzRPqrY4MVweO4iIKaL";
const ENDPOINT = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/property`;

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, "").trim();
}

// "939㎡（約...）" → 939 のように先頭の数値を抽出
function parseArea(str) {
  const match = stripHtml(str).match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

// repeat フィールドを HTML テーブルに変換
function detailsToHtml(details) {
  if (!details.length) return "";
  const rows = details
    .map(
      (d) =>
        `<tr><th colspan="1" rowspan="1"><p>${d.label}</p></th><td colspan="1" rowspan="1"><p>${d.value}</p></td></tr>`
    )
    .join("");
  return `<table><tbody>${rows}</tbody></table>`;
}

function parseWpXml(xmlContent) {
  const attachments = {}; // 添付ファイル ID → URL

  const items = [...xmlContent.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(
    (m) => m[1]
  );

  // attachment を先に処理してIDとURLのマップを作る
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

  const properties = [];

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
    const rawSlug =
      item.match(
        /<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/
      )?.[1] ?? "";
    const slug = decodeURIComponent(rawSlug);

    // propertycat から売/貸を判定
    const catNicename = item.match(
      /<category domain="propertycat" nicename="(.*?)"/
    )?.[1];
    const propType = catNicename === "sale" ? ["sell"] : ["rent"];

    // メタフィールド抽出（_thumbnail_id だけ例外的に含める）
    const meta = {};
    for (const m of item.matchAll(
      /<wp:postmeta>\s*<wp:meta_key><!\[CDATA\[(.*?)\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[([\s\S]*?)\]\]><\/wp:meta_value>\s*<\/wp:postmeta>/g
    )) {
      const key = m[1];
      const val = m[2].trim();
      if (!key.startsWith("_") || key === "_thumbnail_id") {
        meta[key] = val;
      }
    }

    // 画像URL収集
    const imageCount = parseInt(meta["images"] ?? "0");
    const imageUrls = [];
    for (let i = 0; i < imageCount; i++) {
      const id = meta[`images_${i}_image`];
      if (id && attachments[id]) imageUrls.push(attachments[id]);
    }
    // 重複排除
    const uniqueImageUrls = [...new Set(imageUrls)];

    const thumbnailUrl =
      (meta["_thumbnail_id"] ? attachments[meta["_thumbnail_id"]] : null) ??
      uniqueImageUrls[0] ??
      "";

    const floorPlan = meta["floor"] ?? "";
    const floorAreaNum = parseArea(meta["total"] ?? "");
    const landAreaNum = parseArea(meta["land"] ?? "");

    // repeat フィールド（価格・間取り・面積など）
    const repeatCount = parseInt(meta["repeat"] ?? "0");
    const detailRows = [];
    for (let i = 0; i < repeatCount; i++) {
      const label = meta[`repeat_${i}_item`];
      const value = meta[`repeat_${i}_cont`];
      if (label && value) detailRows.push({ label, value });
    }

    properties.push({
      title,
      location: meta["place"] ?? "",
      type: propType,
      price: meta["price"] ?? "",
      floorPlan,
      floorArea: floorAreaNum,
      landArea: landAreaNum,
      description: meta["catch"] ? `<p>${meta["catch"]}</p>` : "",
      specs: [floorPlan, stripHtml(meta["total"] ?? "")].filter(Boolean).join(" / "),
      details: detailsToHtml(detailRows),
      _thumbnailUrl: thumbnailUrl,
      _imageUrls: uniqueImageUrls,
    });
  }

  return properties;
}

async function postProperty(property) {
  const body = {
    title: property.title,
    location: property.location,
    type: property.type,
    price: property.price,
  };

  // slug はmicroCMSのproperty エンドポイントに存在しないためスキップ
  if (property.floorPlan) body.floorPlan = property.floorPlan;
  if (property.floorArea != null) body.floorArea = property.floorArea;
  if (property.landArea != null) body.landArea = property.landArea;
  if (property.description) body.description = property.description;
  if (property.specs) body.specs = property.specs;
  if (property.details) body.details = property.details;

  // 画像は microCMS CDN へのアップロードが必要なためスキップ
  // → インポート後に管理画面から各物件に追加してください
  // WordPress 画像URL参考:
  //   image:  property._thumbnailUrl
  //   images: property._imageUrls

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "X-MICROCMS-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }
  return (await res.json()).id;
}

async function main() {
  const isPreview = process.argv.includes("--preview");
  const xmlContent = readFileSync(XML_PATH, "utf-8");
  const properties = parseWpXml(xmlContent);

  console.log(`\n📦 物件数: ${properties.length}件\n`);

  if (isPreview) {
    for (const p of properties) {
      console.log(`─────────────────────────────`);
      console.log(`タイトル : ${p.title}`);
      console.log(`場所     : ${p.location}`);
      console.log(`種別     : ${p.type}`);
      console.log(`価格     : ${p.price}`);
      console.log(`間取り   : ${p.floorPlan}`);
      console.log(`延床面積 : ${p.floorArea}`);
      console.log(`土地面積 : ${p.landArea}`);
      console.log(`説明     : ${p.description.slice(0, 40)}...`);
      console.log(`画像     : ${p._imageUrls.length}枚`);
      if (p._thumbnailUrl) console.log(`サムネ   : ${p._thumbnailUrl}`);
    }
    console.log(`\n✅ プレビュー完了。--preview を外すと実際にインポートします。`);
    return;
  }

  let success = 0;
  for (const property of properties) {
    try {
      const id = await postProperty(property);
      console.log(`✓ [${id}] ${property.title}`);
      success++;
    } catch (e) {
      console.error(`✗ ${property.title}: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 500)); // レートリミット回避
  }
  console.log(`\n完了: ${success}/${properties.length}件`);
  if (success < properties.length) {
    console.log("※ 失敗した物件は microCMS 管理画面から手動で登録してください。");
  }
}

main();
