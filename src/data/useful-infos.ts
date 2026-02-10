export type UsefulInfoData = {
  slug: string;
  category: string;
  name: string;
  phone?: string;
  website?: string;
};

export const usefulInfos: UsefulInfoData[] = [
  {
    slug: "chino",
    category: "行政",
    name: "茅野市",
    phone: "0266-72-2101",
    website: "https://www.city.chino.lg.jp/index2.html",
  },
  {
    slug: "tateshina",
    category: "行政",
    name: "立科町",
    phone: "0267-56-2311",
    website: "https://www.town.tateshina.nagano.jp/index.html",
  },
  {
    slug: "tateshina-immigrationsupport",
    category: "移住支援",
    name: "立科町移住支援サイト",
    phone: "0267-78-5645",
    website: "https://www.tateshina-iju.jp/support/qa/",
  },
  {
    slug: "shirakabako-postoffice",
    category: "郵便局",
    name: "白樺湖簡易郵便局",
    phone: "0266-68-2622",
    website: "https://map.japanpost.jp/p/search/dtl/300111643000/",
  },
  {
    slug: "lawson-atm",
    category: "ATM",
    name: "ローソン銀行ATM",
    website: "https://map.lawsonbank.jp/smt/lbankatm/inf/74435/",
  },
  {
    slug: "eneos-himekidaira",
    category: "ガソリンスタンド",
    name: "ENEOS姫木平",
    phone: "0268-60-2938",
    website: "https://eneos-ss.com/search/ss/pc/detail.php?SCODE=460493",
  },
  {
    slug: "eneos-megamiko",
    category: "ガソリンスタンド",
    name: "ENEOS女神湖",
    phone: "0267-55-6303",
    website: "https://eneos-ss.com/search/ss/pc/detail.php?SCODE=460552",
  },
  {
    slug: "minamishirakabakoparking",
    category: "EV充電スタンド",
    name: "南白樺湖駐車場",
    phone: "0266-68-3424",
    website: "https://maps.app.goo.gl/kymLbM1AWZ5nbm8b9",
  },
  {
    slug: "shirakabakohotel-seimeisou",
    category: "EV充電スタンド",
    name: "白樺湖ホテル 晴明荘",
    phone: "0266-68-2041",
    website: "https://maps.app.goo.gl/CeDgJEJaXYQtWWRT9",
  },
  {
    slug: "shinsyusougoukaihatsukanko",
    category: "EV充電スタンド",
    name: "車山高原 信州総合開発観光",
    website: "https://maps.app.goo.gl/cLWDzTFjmRaw7iTS7",
  },
  {
    slug: "kurumayamahighlandhotel",
    category: "EV充電スタンド",
    name: "車山ハイランドホテル",
    phone: "0266-68-2116",
    website: "https://maps.app.goo.gl/T2KDfyaMLP6RMfuV8",
  },
  {
    slug: "ikenotairahotel",
    category: "EV充電スタンド",
    name: "池の平ホテル（宿泊者専用）",
    phone: "0266-68-2100",
    website: "https://www.shirakabaresort.jp/contact/faq.html",
  },
  {
    slug: "tateshinacablevision",
    category: "インターネット・電話・テレビ",
    name: "蓼科ケーブルビジョン株式会社",
    phone: "0267-56-3101",
    website: "https://tcv21.com/",
  },
  {
    slug: "chinobus",
    category: "バス",
    name: "茅野駅〜白樺湖・車山高原線",
    phone: "0266-72-2101",
    website:
      "https://www.city.chino.lg.jp/soshiki/chiikisenryaku/1058.html",
  },
  {
    slug: "lakeresortshuttlebus",
    category: "バス",
    name: "レイクリゾートシャトル",
    phone: "0266-73-8550",
    website: "https://navi.chinotabi.jp/bus/",
  },
  {
    slug: "alpicotaxichino",
    category: "タクシー",
    name: "アルピコタクシー 茅野営業所",
    phone: "0266-71-1181",
    website: "http://www.alpico.co.jp/taxi/usageguidance/reserve.php",
  },
  {
    slug: "suwaminamirecyclingcenter",
    category: "ごみ処理施設",
    name: "諏訪南リサイクルセンター / 清掃センター",
    phone: "0266-72-2905",
    website: "https://www.city.chino.lg.jp/soshiki/bisaikuru/",
  },
  {
    slug: "chinosnowremovalmap",
    category: "除雪",
    name: "茅野市 除雪マップ",
    phone: "0266-72-2101",
    website:
      "https://www.city.chino.lg.jp/soshiki/kenchiku/josetsu.html",
  },
  {
    slug: "tateshinafreefarm-haramura",
    category: "生産者直売マーケット",
    name: "たてしな自由農園 原村店",
    phone: "0266-74-1740",
    website: "https://www.tateshinafree.co.jp/haramura/",
  },
  {
    slug: "tateshinafreefarm-chino",
    category: "生産者直売マーケット",
    name: "たてしな自由農園 茅野店",
    phone: "0266-75-5510",
    website: "https://www.tateshinafree.co.jp/chino/",
  },
  {
    slug: "lawson",
    category: "コンビニエンスストア",
    name: "ローソン ビーナスライン白樺湖店",
    phone: "0267-55-7321",
    website: "https://www.shirakabaresort.jp/shop/lawson/",
  },
  {
    slug: "marutomofarm",
    category: "八百屋",
    name: "マルトモ農園",
    website: "https://maps.app.goo.gl/UA8Qp1eD8otuDG847",
  },
  {
    slug: "yamanchi",
    category: "子育てシェアハウス",
    name: "山ん家",
    website: "https://www.yamanchi.com/",
  },
];

export const usefulCategories = [
  "すべて",
  "行政",
  "移住支援",
  "郵便局",
  "ATM",
  "ガソリンスタンド",
  "EV充電スタンド",
  "インターネット・電話・テレビ",
  "バス",
  "タクシー",
  "ごみ処理施設",
  "除雪",
  "生産者直売マーケット",
  "コンビニエンスストア",
  "八百屋",
  "子育てシェアハウス",
];
