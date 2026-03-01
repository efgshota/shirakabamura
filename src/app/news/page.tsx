import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNews } from "@/lib/microcms";
import { news as staticNews } from "@/data/news";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "白樺村からのお知らせ一覧です。",
  openGraph: {
    title: "お知らせ｜白樺村",
    description: "白樺村からのお知らせ一覧です。",
  },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function NewsPage() {
  let newsItems: { id: string; title: string; date: string; category?: string }[] = [];

  try {
    const { contents } = await getNews({ limit: 100, orders: "-publishedAt" });
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
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <div className={`${styles.titleIcon} c-iconTitle`}>
              <h1 className="c-iconTitle__text">お知らせ</h1>
              <Image
                className="c-iconTitle__icon"
                src="/images/common/icon_news.svg"
                alt=""
                width={120}
                height={126}
              />
            </div>
          </div>
        </section>

        <section className={styles.listSection}>
          <div className={styles.inner}>
            {newsItems.length === 0 ? (
              <p className={styles.empty}>お知らせはまだありません。</p>
            ) : (
              <ul className={styles.list}>
                {newsItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/news/${encodeURIComponent(item.id)}/`}
                      className={styles.item}
                    >
                      <time className={styles.itemDate}>{formatDate(item.date)}</time>
                      <p className={styles.itemTitle}>{item.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
