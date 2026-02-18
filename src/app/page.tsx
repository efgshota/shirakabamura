import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HeroLogo from "@/components/HeroLogo";
import FloatingButtons from "@/components/FloatingButtons";
import IntroSection from "@/components/IntroSection";
import PropertiesSection from "@/components/PropertiesSection";
import UsefulInfoSection from "@/components/UsefulInfoSection";
import NakanojimaSection from "@/components/NakanojimaSection";
import BusinessSection from "@/components/BusinessSection";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getProperties, getNews, getFirstImageUrl } from "@/lib/microcms";
import { properties as staticProperties } from "@/data/properties";
import { news as staticNews } from "@/data/news";
import styles from "./page.module.css";

export default async function Home() {
  // 物件データを取得（MicroCMS → 静的データフォールバック）
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

  // ニュースデータを取得（MicroCMS → 静的データフォールバック）
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

  return (
    <div className={styles.page}>
      <Header />
      <HeroSection />
      <HeroLogo />
      <FloatingButtons />
      <main className={styles.main}>
        <IntroSection />
        <PropertiesSection properties={propertyItems} />
        <UsefulInfoSection />
        <NakanojimaSection />
        <BusinessSection />
        <NewsSection newsItems={newsItems} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
