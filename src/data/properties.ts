export type PropertyData = {
  slug: string;
  title: string;
  location: string;
  image: string;
  images: string[];
  specs: string;
  description: string;
  price: string;
  type: "sell" | "rent";
  floorPlan: string;
  floorArea: string;
  landArea: string;
  details: { label: string; value: string }[];
  comment: string;
  // Legacy fields for compatibility
  area: string;
  address: string;
  access: string[];
};

export const properties: PropertyData[] = [
  {
    slug: "kashiwabara-19-16",
    title: "立派なお風呂と気持ち良いデッキ",
    location: "車山",
    image: "/images/property/plot-19-16.jpg",
    images: [
      "/images/property/plot-19-16.jpg",
      "/images/property/plot-19-16.jpg",
      "/images/property/plot-19-16.jpg",
      "/images/property/plot-19-16.jpg",
      "/images/property/plot-19-16.jpg",
      "/images/property/plot-19-16.jpg",
    ],
    specs: "6LDK / 290.14㎡",
    description: "立派なお風呂\n気持ち良いデッキ",
    price: "1300万円",
    type: "sell",
    floorPlan: "6LDK",
    floorArea: "290.14㎡（約87.9坪）",
    landArea: "4166㎡（約1262.4坪）",
    details: [
      { label: "管理費", value: "15,000円 / 月" },
      { label: "火災保険契約", value: "必要" },
      { label: "建物詳細（築年、構造）", value: "築25年、木造" },
      { label: "設備詳細", value: "IHコンロ、駐車場、駐輪場、バストイレ" },
      { label: "情報更新日", value: "2023年11月23日" },
      { label: "管理会社", value: "白樺村管理事務所" },
    ],
    comment:
      "どこまで手を入れていいか\nここから見える〇〇（景観 or 近隣の推しポイント）\nおとなりさん（→近隣事業者・白樺湖のことへのリンク）\nとかとか、独自の視点で自由にコメントを入れちゃう場所です。",
    area: "2,406㎡",
    address: "〒391-0301 長野県茅野市北山",
    access: [
      "バス停「グランド前」徒歩13分",
      "公共浴場すずらんの湯徒歩14分",
    ],
  },
  {
    slug: "柏原財産区-区画24-2",
    title: "立派なお風呂と気持ち良いデッキ",
    location: "車山",
    image: "/images/property/plot-24-2.jpg",
    images: [
      "/images/property/plot-24-2.jpg",
      "/images/property/plot-24-2.jpg",
      "/images/property/plot-24-2.jpg",
      "/images/property/plot-24-2.jpg",
      "/images/property/plot-24-2.jpg",
      "/images/property/plot-24-2.jpg",
    ],
    specs: "6LDK / 290.14㎡",
    description: "立派なお風呂\n気持ち良いデッキ",
    price: "1300万円",
    type: "sell",
    floorPlan: "6LDK",
    floorArea: "290.14㎡（約87.9坪）",
    landArea: "4166㎡（約1262.4坪）",
    details: [
      { label: "管理費", value: "15,000円 / 月" },
      { label: "火災保険契約", value: "必要" },
      { label: "建物詳細（築年、構造）", value: "築25年、木造" },
      { label: "設備詳細", value: "IHコンロ、駐車場、駐輪場、バストイレ" },
      { label: "情報更新日", value: "2023年11月23日" },
      { label: "管理会社", value: "白樺村管理事務所" },
    ],
    comment:
      "どこまで手を入れていいか\nここから見える〇〇（景観 or 近隣の推しポイント）\nおとなりさん（→近隣事業者・白樺湖のことへのリンク）\nとかとか、独自の視点で自由にコメントを入れちゃう場所です。",
    area: "1,571㎡",
    address: "〒391-0301 長野県茅野市北山",
    access: ["2in1スキー場まで車で3分"],
  },
  {
    slug: "柏原財産区-区画12-23",
    title: "立派なお風呂と気持ち良いデッキ",
    location: "車山",
    image: "/images/property/plot-12-23.jpg",
    images: [
      "/images/property/plot-12-23.jpg",
      "/images/property/plot-12-23.jpg",
      "/images/property/plot-12-23.jpg",
      "/images/property/plot-12-23.jpg",
      "/images/property/plot-12-23.jpg",
      "/images/property/plot-12-23.jpg",
    ],
    specs: "6LDK / 290.14㎡",
    description: "立派なお風呂\n気持ち良いデッキ",
    price: "1300万円",
    type: "sell",
    floorPlan: "6LDK",
    floorArea: "290.14㎡（約87.9坪）",
    landArea: "4166㎡（約1262.4坪）",
    details: [
      { label: "管理費", value: "15,000円 / 月" },
      { label: "火災保険契約", value: "必要" },
      { label: "建物詳細（築年、構造）", value: "築25年、木造" },
      { label: "設備詳細", value: "IHコンロ、駐車場、駐輪場、バストイレ" },
      { label: "情報更新日", value: "2023年11月23日" },
      { label: "管理会社", value: "白樺村管理事務所" },
    ],
    comment:
      "どこまで手を入れていいか\nここから見える〇〇（景観 or 近隣の推しポイント）\nおとなりさん（→近隣事業者・白樺湖のことへのリンク）\nとかとか、独自の視点で自由にコメントを入れちゃう場所です。",
    area: "939㎡",
    address: "〒391-0301 長野県茅野市北山",
    access: [
      "バス停「グランド前」徒歩7分",
      "公共浴場すずらんの湯徒歩8分",
      "ごみ集積場も隣接",
    ],
  },
];
