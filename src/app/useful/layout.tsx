import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お役立ち帳",
  description:
    "白樺湖周辺での暮らしに役立つ連絡先をまとめました。行政・移住支援・交通・ガソリンスタンド・EV充電・コンビニ・生産者直売所・ごみ処理・除雪情報など。",
  openGraph: {
    title: "お役立ち帳｜白樺村",
    description:
      "白樺湖周辺での暮らしに役立つ連絡先をまとめました。行政・移住支援・交通・ガソリンスタンド・EV充電・コンビニ・生産者直売所・ごみ処理・除雪情報など。",
  },
};

export default function UsefulLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
