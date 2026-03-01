import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProperties, getFirstImageUrl } from "@/lib/microcms";
import { properties as staticProperties } from "@/data/properties";
import PropertyListClient, { PropertyCardData } from "./PropertyListClient";
import styles from "./page.module.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "白樺村の物件",
  description:
    "湖のほとり、森の中、山の景色——白樺湖周辺の自然ゆたかな物件をご案内します。売物件・賃貸・土地など、移住・開業・別荘利用に向けた物件情報を掲載中。",
  openGraph: {
    title: "白樺村の物件｜白樺村",
    description:
      "湖のほとり、森の中、山の景色——白樺湖周辺の自然ゆたかな物件をご案内します。売物件・賃貸・土地など、移住・開業・別荘利用に向けた物件情報を掲載中。",
  },
};

export default async function PropertyListPage() {
  let properties: PropertyCardData[] = [];

  try {
    const { contents } = await getProperties({ limit: 100 });
    if (contents.length > 0) {
      properties = contents.map((p) => ({
        id: p.id,
        title: p.title,
        image: getFirstImageUrl(p.image),
        specs: p.specs,
        description: p.description?.replace(/<[^>]*>/g, ""),
        price: p.price,
        type: (p.type?.[0] ?? "sell") as "sell" | "rent",
        location: p.location,
      }));
    }
  } catch {
    // MicroCMS 取得失敗時はフォールバック
  }

  // CMS にデータがない場合は静的データを使用
  if (properties.length === 0) {
    properties = staticProperties.map((p) => ({
      id: p.slug,
      title: p.title,
      image: p.image,
      specs: p.specs,
      description: p.description,
      price: p.price,
      type: p.type,
      location: p.location,
    }));
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <div className={`${styles.titleIcon} c-iconTitle`}>
              <h1 className="c-iconTitle__text font-tsuku">白樺村の物件</h1>
              <Image
                className="c-iconTitle__icon"
                src="/images/common/icon_property.svg"
                alt=""
                width={100}
                height={100}
              />
            </div>
            <p className={styles.subtitle}>
              湖のほとり、森の中、山の景色、
              <br />
              自然ゆたかで穏やかな環境の物件を
              <br />
              ご案内します。
            </p>
          </div>
        </section>

        <PropertyListClient properties={properties} />
      </main>
      <Footer />
    </div>
  );
}
