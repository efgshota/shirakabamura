import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UsefulListClient from "./UsefulListClient";
import { getUsefulInfos, type UsefulInfoItem } from "@/lib/microcms";
import { usefulInfos as staticUsefulInfos, usefulCategories as staticCategories } from "@/data/useful-infos";
import styles from "./page.module.css";

export default async function UsefulListPage() {
  let infos: UsefulInfoItem[] = [];
  let categories: string[] = ["すべて"];

  try {
    const { contents } = await getUsefulInfos({ limit: 100 });
    if (contents.length > 0) {
      infos = contents.map((u) => ({
        id: u.id,
        title: u.title,
        category: u.category,
        phone: u.phone,
        url: u.url,
      }));
      // カテゴリを重複なしで抽出
      const cats = Array.from(new Set(contents.map((u) => u.category)));
      categories = ["すべて", ...cats];
    }
  } catch {
    // fallback
  }

  if (infos.length === 0) {
    infos = staticUsefulInfos.map((u) => ({
      id: u.slug,
      title: u.name,
      category: u.category,
      phone: u.phone,
      url: u.website,
    }));
    categories = staticCategories;
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <h1 className={styles.title}>お役立ち帳</h1>
            <p className={styles.subtitle}>
              暮らしに関わる便利な連絡先集めてます
            </p>
          </div>
        </section>

        <UsefulListClient infos={infos} categories={categories} />
      </main>
      <Footer />
    </div>
  );
}
