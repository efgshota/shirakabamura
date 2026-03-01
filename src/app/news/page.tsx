import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNews, type NewsListItem } from "@/lib/microcms";
import { news as staticNews } from "@/data/news";
import styles from "./page.module.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "お知らせ",
  description: "白樺村からのお知らせ一覧です。",
  openGraph: {
    title: "お知らせ｜白樺村",
    description: "白樺村からのお知らせ一覧です。",
  },
};

const PER_PAGE = 20;

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const offset = (page - 1) * PER_PAGE;

  let newsItems: NewsListItem[] = [];
  let totalCount = 0;

  try {
    const { contents, totalCount: total } = await getNews({
      limit: PER_PAGE,
      offset,
      orders: "-date",
    });
    if (total > 0) {
      totalCount = total;
      newsItems = contents.map((n) => ({
        id: n.slug ?? n.id,
        title: n.title,
        date: n.date,
        category: n.category ?? undefined,
      }));
    }
  } catch {
    // fallback
  }

  if (newsItems.length === 0) {
    const all = staticNews.map((n) => ({
      id: n.slug,
      title: n.title,
      date: n.date,
      category: n.category,
    }));
    totalCount = all.length;
    newsItems = all.slice(offset, offset + PER_PAGE);
  }

  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const showPager = totalPages > 1;

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

            {showPager && (
              <nav className={styles.pager} aria-label="ページナビゲーション">
                {page > 1 && (
                  <Link
                    href={page === 2 ? "/news/" : `/news/?page=${page - 1}`}
                    className={styles.pagerBtn}
                  >
                    ← 前へ
                  </Link>
                )}
                <div className={styles.pagerPages}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={p === 1 ? "/news/" : `/news/?page=${p}`}
                      className={`${styles.pagerPage} ${p === page ? styles.pagerPageActive : ""}`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>
                {page < totalPages && (
                  <Link
                    href={`/news/?page=${page + 1}`}
                    className={styles.pagerBtn}
                  >
                    次へ →
                  </Link>
                )}
              </nav>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
