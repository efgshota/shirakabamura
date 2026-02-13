import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import PropertiesSection from "@/components/PropertiesSection";
import UsefulInfoSection from "@/components/UsefulInfoSection";
import BirdDecoration from "@/components/BirdDecoration";
import BusinessSection from "@/components/BusinessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getProperties } from "@/lib/microcms";
import { properties as staticProperties } from "@/data/properties";
import styles from "./page.module.css";

export default async function Home() {
  // 物件データを取得（MicroCMS → 静的データフォールバック）
  let propertyItems: {
    id: string;
    title: string;
    image: string;
    area: string;
  }[] = [];

  try {
    const { contents } = await getProperties({ limit: 6 });
    if (contents.length > 0) {
      propertyItems = contents.map((p) => ({
        id: p.id,
        title: p.title,
        image: p.image?.[0]?.url ?? "",
        area: p.location,
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
    }));
  }

  return (
    <div className={styles.page}>
      <Header />
      <HeroSection />
      <main className={styles.main}>
        <IntroSection />
        <PropertiesSection properties={propertyItems} />
        <UsefulInfoSection />
        <BirdDecoration />
        <BusinessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
