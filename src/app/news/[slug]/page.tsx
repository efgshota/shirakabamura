import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNewsItem, getNews } from "@/lib/microcms";
import { news as staticNews } from "@/data/news";
import styles from "./page.module.css";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

type NewsDetail = {
  id: string;
  title: string;
  date: string;
  category?: string;
  content?: string;
};

export async function generateStaticParams() {
  const ids: string[] = [];
  try {
    const { contents } = await getNews({ limit: 100 });
    ids.push(...contents.map((n) => n.id));
  } catch {
    // fallback
  }
  const staticIds = staticNews.map((n) => n.slug);
  const allIds = Array.from(new Set([...ids, ...staticIds]));
  return allIds.map((id) => ({ slug: encodeURIComponent(id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);

  let title = "";
  try {
    const item = await getNewsItem(decoded);
    title = item.title;
  } catch {
    const s = staticNews.find((n) => n.slug === decoded);
    if (s) title = s.title;
  }

  if (!title) return { title: "お知らせ" };
  return {
    title,
    openGraph: { title: `${title}｜白樺村` },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);

  let item: NewsDetail | null = null;

  try {
    const n = await getNewsItem(decoded);
    item = {
      id: n.id,
      title: n.title,
      date: n.date,
      category: n.category ?? undefined,
      content: n.content ?? undefined,
    };
  } catch {
    const s = staticNews.find((n) => n.slug === decoded);
    if (s) {
      item = {
        id: s.slug,
        title: s.title,
        date: s.date,
        category: s.category,
        content: s.content,
      };
    }
  }

  if (!item) notFound();

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.inner}>
            <div className={styles.meta}>
              <time className={styles.date}>{formatDate(item.date)}</time>
              {item.category && (
                <span className={styles.category}>{item.category}</span>
              )}
            </div>
            <h1 className={styles.title}>{item.title}</h1>
            <div className={styles.divider} />
            {item.content ? (
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            ) : (
              <p className={styles.noContent}>
                本文はまだ準備中です。
              </p>
            )}
            <div className={styles.backLink}>
              <Link href="/news/" className="c-moreBtn">
                一覧に戻る
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
