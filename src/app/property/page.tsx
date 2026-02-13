import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProperties } from "@/lib/microcms";
import { properties as staticProperties } from "@/data/properties";
import PropertyListClient, { PropertyCardData } from "./PropertyListClient";
import styles from "./page.module.css";

export default async function PropertyListPage() {
  let properties: PropertyCardData[] = [];

  try {
    const { contents } = await getProperties({ limit: 100 });
    if (contents.length > 0) {
      properties = contents.map((p) => ({
        id: p.id,
        title: p.title,
        image: p.image?.[0]?.url ?? "",
        specs: p.specs,
        description: p.description?.replace(/<[^>]*>/g, ""),
        price: p.price,
        type: (p.type?.[0] ?? "sell") as "sell" | "rent",
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
    }));
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <div className={styles.titleIcon}>
              <Image
                src="/images/common/icon_property.svg"
                alt=""
                width={100}
                height={100}
              />
            </div>
            <h1 className={`${styles.title} font-tsuku`}>白樺村の物件</h1>
            <p className={styles.subtitle}>
              美しい白樺湖周辺の物件をご紹介します
            </p>
          </div>
        </section>

        <PropertyListClient properties={properties} />
      </main>
      <Footer />
    </div>
  );
}
