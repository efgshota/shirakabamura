export type BusinessData = {
  slug: string;
  name: string;
  operator: string;
  businessType: string;
  previousJob: string;
  image: string;
  phone?: string;
  website?: string;
  qa: { question: string; answer: string }[];
};

export const businesses: BusinessData[] = [
  {
    slug: "hygge",
    name: "HYGGE",
    operator: "福井五大さん",
    businessType: "セレクトショップ",
    previousJob: "スキープレイヤー、都内ショップ",
    image: "/images/business/hygge.png",
    phone: "050-5526-4408",
    website: "https://camp.hygge-shirakaba.com/",
    qa: [
      {
        question: "なぜ白樺湖で開業することにしたのか？",
        answer:
          "白樺湖を訪れたお客様に、ここならではの自然の遊びを提案したかったからです！",
      },
      {
        question: "開業するまでに、どんな苦労があったか？",
        answer:
          "スタート時は資金がなくて、外観や内装を自分達でやったことですね。",
      },
      {
        question:
          "白樺湖でお店を始めてよかったなと思うことはなんですか？",
        answer:
          "宿泊やガイドツアー以外のお客さまとの接点がうまれて、新たなコミュニティができてきたことです！",
      },
      {
        question:
          "もっとこうだったら良いのになと思うことはなんですか？",
        answer:
          "ガイドツアーも併設しているので、ゆっくりできるカフェなども今後は作れたらいいなと思ってます。",
      },
      {
        question:
          "ここで開業したい人に向けて、伝えたいことはありますか？",
        answer:
          "事業をおこすことで地域がにぎやかになる、そんな未来をめざして地域の人はみんな応援してくれるので、ぜひ白樺湖を一緒に盛り上げていきましょう！！",
      },
    ],
  },
  {
    slug: "珈琲&beans-カリオモン",
    name: "珈琲＆BEANS カリオモン",
    operator: "海野さん",
    businessType: "カフェ経営",
    previousJob: "会社員",
    image: "/images/business/kariomon.png",
    phone: "0266-55-2139",
    website: "https://kariomon.shop/index.html",
    qa: [
      {
        question: "なぜ白樺湖で開業することにしたのか？",
        answer:
          "蓼科エリアの雰囲気的なものが好きだったことと、現実的にはいまの物件が売りに出ていたことが理由です。ほかのエリアも行ってみたけど、ここがいちばんよかったです。",
      },
      {
        question: "開業するまでに、どんな苦労があったか？",
        answer:
          "そんなになかったです。その気になれば（できた）って感じですね。",
      },
      {
        question:
          "白樺湖でお店を始めてよかったなと思うことはなんですか？",
        answer:
          "冬以外は気候がいいことです。あと、人口密度が高くないところもいいですね。（立地以外の事業的な部分ではとくに思いつかないとのこと）",
      },
      {
        question:
          "もっとこうだったら良いのになと思うことはなんですか？",
        answer:
          "もっと冬にも人が来てほしいということと、GWやお盆は（集中するので）分散してほしいなぁと思います。",
      },
      {
        question:
          "ここで開業したい人に向けて、伝えたいことはありますか？",
        answer:
          "移住というといろいろ人間関係の不安とかがあるかもしれませんが、ここはいい人が多いです。外から来ている人が多いエリアということもあり、移住者を受け入れる素地があるので、田舎が怖いとかはないと思います。あとは、地域の活動に参加してくれるといいですね。",
      },
    ],
  },
  {
    slug: "ペンション湖風",
    name: "ペンション湖風",
    operator: "浅野さん",
    businessType: "ペンション経営",
    previousJob: "自衛隊員",
    image: "/images/business/pension-kofu.png",
    phone: "00000000000",
    website: "https://shirakabamura.com/",
    qa: [
      {
        question: "なぜ白樺湖で開業することにしたのか？",
        answer:
          "ずっとペンションをやりたくて、山がきれいに見えるところを探してて、ここにしました。",
      },
      {
        question: "開業するまでに、どんな苦労があったか？",
        answer:
          "趣味で探してたから、場所を見つけるまではそんなに苦労はなかったです。ネットで探して問い合わせて、決めました。入居から開業までは、冬に水道管破裂しちゃったり電源位置が不便だったり色々あったけど、建物の時代を考えても基本的には想定内だったかなぁ。",
      },
      {
        question:
          "白樺湖でお店を始めてよかったなと思うことはなんですか？",
        answer:
          "大自然、景観ですね！山が良い。車山、ビーナスラインとか、諏訪方面とかに足を伸ばすとまた違う山が見えるから良い！",
      },
      {
        question:
          "もっとこうだったら良いのになと思うことはなんですか？",
        answer:
          "交通の便があまり良くないこと。観光地ならもっと充実したほうが平日とかにも人が増えるんじゃないかなと感じますし、住民としても助かると思います。あとは、白樺がもっと綺麗に元気に育つようにケアできたらいいなと思いますね。",
      },
      {
        question:
          "ここで開業したい人に向けて、伝えたいことはありますか？",
        answer:
          "はじめての人は大変だと思うよ〜。でも若い人に来てもらってむしろいろいろ教えてもらいたいですね。木造の建物が多いと思うので、柱とかも含めて、購入を決める前に専門家にチェックしてもらうのはおすすめです。",
      },
    ],
  },
  {
    slug: "おやまのおうち",
    name: "おやまのおうち",
    operator: "",
    businessType: "別荘",
    previousJob: "",
    image: "/images/business/oyamano-ouchi.jpg",
    qa: [],
  },
];
