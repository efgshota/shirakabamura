const SERVICE_DOMAIN = "shirakabamura";
const API_KEY = "hQDy4WfeV3mdWgui4lzRPqrY4MVweO4iIKaL";
const ENDPOINT = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/useful-infos`;

const usefulInfos = [
  { title: "茅野市", category: "行政", phone: "0266-72-2101", url: "https://www.city.chino.lg.jp/index2.html" },
  { title: "立科町", category: "行政", phone: "0267-56-2311", url: "https://www.town.tateshina.nagano.jp/index.html" },
  { title: "立科町移住支援サイト", category: "移住支援", phone: "0267-78-5645", url: "https://www.tateshina-iju.jp/support/qa/" },
  { title: "白樺湖簡易郵便局", category: "郵便局", phone: "0266-68-2622", url: "https://map.japanpost.jp/p/search/dtl/300111643000/" },
  { title: "ローソン銀行ATM", category: "ATM", url: "https://map.lawsonbank.jp/smt/lbankatm/inf/74435/" },
  { title: "ENEOS姫木平", category: "ガソリンスタンド", phone: "0268-60-2938", url: "https://eneos-ss.com/search/ss/pc/detail.php?SCODE=460493" },
  { title: "ENEOS女神湖", category: "ガソリンスタンド", phone: "0267-55-6303", url: "https://eneos-ss.com/search/ss/pc/detail.php?SCODE=460552" },
  { title: "南白樺湖駐車場", category: "EV充電スタンド", phone: "0266-68-3424", url: "https://maps.app.goo.gl/kymLbM1AWZ5nbm8b9" },
  { title: "白樺湖ホテル 晴明荘", category: "EV充電スタンド", phone: "0266-68-2041", url: "https://maps.app.goo.gl/CeDgJEJaXYQtWWRT9" },
  { title: "車山高原 信州総合開発観光", category: "EV充電スタンド", url: "https://maps.app.goo.gl/cLWDzTFjmRaw7iTS7" },
  { title: "車山ハイランドホテル", category: "EV充電スタンド", phone: "0266-68-2116", url: "https://maps.app.goo.gl/T2KDfyaMLP6RMfuV8" },
  { title: "池の平ホテル（宿泊者専用）", category: "EV充電スタンド", phone: "0266-68-2100", url: "https://www.shirakabaresort.jp/contact/faq.html" },
  { title: "蓼科ケーブルビジョン株式会社", category: "インターネット・電話・テレビ", phone: "0267-56-3101", url: "https://tcv21.com/" },
  { title: "茅野駅〜白樺湖・車山高原線", category: "バス", phone: "0266-72-2101", url: "https://www.city.chino.lg.jp/soshiki/chiikisenryaku/1058.html" },
  { title: "レイクリゾートシャトル", category: "バス", phone: "0266-73-8550", url: "https://navi.chinotabi.jp/bus/" },
  { title: "アルピコタクシー 茅野営業所", category: "タクシー", phone: "0266-71-1181", url: "http://www.alpico.co.jp/taxi/usageguidance/reserve.php" },
  { title: "諏訪南リサイクルセンター / 清掃センター", category: "ごみ処理施設", phone: "0266-72-2905", url: "https://www.city.chino.lg.jp/soshiki/bisaikuru/" },
  { title: "茅野市 除雪マップ", category: "除雪", phone: "0266-72-2101", url: "https://www.city.chino.lg.jp/soshiki/kenchiku/josetsu.html" },
  { title: "たてしな自由農園 原村店", category: "生産者直売マーケット", phone: "0266-74-1740", url: "https://www.tateshinafree.co.jp/haramura/" },
  { title: "たてしな自由農園 茅野店", category: "生産者直売マーケット", phone: "0266-75-5510", url: "https://www.tateshinafree.co.jp/chino/" },
  { title: "ローソン ビーナスライン白樺湖店", category: "コンビニエンスストア", phone: "0267-55-7321", url: "https://www.shirakabaresort.jp/shop/lawson/" },
  { title: "マルトモ農園", category: "八百屋", url: "https://maps.app.goo.gl/UA8Qp1eD8otuDG847" },
  { title: "山ん家", category: "子育てシェアハウス", url: "https://www.yamanchi.com/" },
];

async function postItem(item) {
  const body = { title: item.title, category: item.category };
  if (item.phone) body.phone = item.phone;
  if (item.url) body.url = item.url;

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
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  const json = await res.json();
  return json.id;
}

async function main() {
  console.log(`${usefulInfos.length}件を登録します...\n`);
  let success = 0;
  for (const item of usefulInfos) {
    try {
      const id = await postItem(item);
      console.log(`✓ [${id}] ${item.title}`);
      success++;
    } catch (e) {
      console.error(`✗ ${item.title}: ${e.message}`);
    }
  }
  console.log(`\n完了: ${success}/${usefulInfos.length}件`);
}

main();
