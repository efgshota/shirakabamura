import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FloatingButtons from "@/components/FloatingButtons";
import IntroSection from "@/components/IntroSection";
import PropertiesSection from "@/components/PropertiesSection";
import UsefulInfoSection from "@/components/UsefulInfoSection";
import NakanojimaSection from "@/components/NakanojimaSection";
import BusinessSection from "@/components/BusinessSection";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  getProperties,
  getNews,
  getUsefulInfos,
  getBusinesses,
  getFirstImageUrl,
  type UsefulInfoItem,
  type BusinessItem,
} from "@/lib/microcms";
import { properties as staticProperties } from "@/data/properties";
import { news as staticNews } from "@/data/news";
import { usefulInfos as staticUsefulInfos } from "@/data/useful-infos";
import { businesses as staticBusinesses } from "@/data/businesses";
import styles from "./page.module.css";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "白樺村",
  alternateName: "株式会社白樺村",
  description:
    "「50年先も続くレイクリゾート」をめざして設立。白樺湖周辺での移住・開業支援、不動産物件紹介、ロケーションレンタル（中之島）など、地域での新たなくらしを幅広くサポートします。",
  url: "https://shirakabamura.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "茅野市",
    addressRegion: "長野県",
    postalCode: "391-0301",
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 36.07,
    longitude: 138.2,
  },
  areaServed: "白樺湖周辺（長野県茅野市・立科町）",
  serviceType: ["移住支援", "開業支援", "不動産物件紹介", "ロケーションレンタル"],
  knowsAbout: [
    "白樺湖への移住",
    "長野県茅野市での開業",
    "別荘・民宿・カフェ等の物件取得",
    "中之島ロケーションレンタル",
  ],
  slogan: "50年先も続くレイクリゾート",
};

export default async function Home() {
  // 物件データ（MicroCMS → 静的データフォールバック）
  let propertyItems: {
    id: string;
    title: string;
    image: string;
    area: string;
    price?: string;
    floorPlan?: string;
    floorArea?: string;
    highlight?: string;
    type?: string;
  }[] = [];

  try {
    const { contents } = await getProperties({ limit: 6 });
    if (contents.length > 0) {
      propertyItems = contents.map((p) => ({
        id: p.id,
        title: p.title,
        image: getFirstImageUrl(p.image),
        area: p.location,
        price: p.price,
        floorPlan: p.floorPlan ?? undefined,
        floorArea: p.floorArea ?? undefined,
        landArea: p.landArea ?? undefined,
        highlight: p.comment ?? undefined,
        type: p.type?.[0] ?? undefined,
      }));
    }
  } catch {
    // fallback
  }

  if (propertyItems.length === 0) {
    propertyItems = staticProperties.map((p) => ({
      id: p.slug,
      title: p.title,
      image: p.image,
      area: p.area,
      price: p.price,
      floorPlan: p.floorPlan,
      floorArea: p.floorArea,
      highlight: p.comment,
      type: p.type,
    }));
  }

  // ニュースデータ（MicroCMS → 静的データフォールバック）
  let newsItems: {
    id: string;
    title: string;
    date: string;
    category?: string;
  }[] = [];

  try {
    const { contents } = await getNews({ limit: 3, orders: "-publishedAt" });
    if (contents.length > 0) {
      newsItems = contents.map((n) => ({
        id: n.id,
        title: n.title,
        date: n.date,
        category: n.category ?? undefined,
      }));
    }
  } catch {
    // fallback
  }

  if (newsItems.length === 0) {
    newsItems = staticNews.map((n) => ({
      id: n.slug,
      title: n.title,
      date: n.date,
      category: n.category,
    }));
  }

  // お役立ち帳データ（MicroCMS → 静的データフォールバック）
  let usefulInfoItems: UsefulInfoItem[] = [];

  try {
    const { contents } = await getUsefulInfos({ limit: 100 });
    if (contents.length > 0) {
      usefulInfoItems = contents.map((u) => ({
        id: u.id,
        title: u.title,
        category: u.category,
        phone: u.phone,
        url: u.url,
      }));
    }
  } catch {
    // fallback
  }

  if (usefulInfoItems.length === 0) {
    usefulInfoItems = staticUsefulInfos.map((u) => ({
      id: u.slug,
      title: u.name,
      category: u.category,
      phone: u.phone,
      url: u.website,
    }));
  }

  // 事業者データ（MicroCMS優先、接続エラー時のみ静的データフォールバック）
  let businessItems: BusinessItem[] = [];
  let businessFetched = false;

  try {
    const { contents } = await getBusinesses({ limit: 100 });
    businessFetched = true;
    businessItems = contents.map((b) => ({
      id: b.id,
      name: b.title,
      image: getFirstImageUrl(b.image),
      businessType: b.businessType,
    }));
  } catch {
    // 接続エラー時のみ静的データを使用
  }

  if (!businessFetched) {
    businessItems = staticBusinesses.map((b) => ({
      id: b.slug,
      name: b.name,
      image: b.image,
      businessType: b.businessType,
    }));
  }

  return (
    <div className={styles.page}>
      <JsonLd data={localBusinessSchema} />
      <Header />
      <HeroSection />
      <FloatingButtons />
      <main className={styles.main}>
        <IntroSection />
        <PropertiesSection properties={propertyItems} />
        <UsefulInfoSection infos={usefulInfoItems} />
        <NakanojimaSection />
        <BusinessSection businesses={businessItems} />
        <NewsSection newsItems={newsItems} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
