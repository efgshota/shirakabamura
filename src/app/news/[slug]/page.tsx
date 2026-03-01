import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getNewsItem, getNews } from "@/lib/microcms";
import { news as staticNews } from "@/data/news";
import styles from "./page.module.css";

export const revalidate = 3600;

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
    ids.push(...contents.map((n) => n.slug ?? n.id));
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
}): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);

  let title = "";
  let description = "";
  try {
    const { contents } = await getNews({ limit: 100 });
    const found = contents.find((n) => (n.slug ?? n.id) === decoded);
    if (found) {
      const item = await getNewsItem(found.id);
      title = item.title;
      description = item.content
        ? item.content.replace(/<[^>]+>/g, "").slice(0, 120)
        : "";
    }
  } catch {
    // fallback
  }
  if (!title) {
    const s = staticNews.find((n) => n.slug === decoded);
    if (s) {
      title = s.title;
      description = s.content
        ? s.content.replace(/<[^>]+>/g, "").slice(0, 120)
        : "";
    }
  }

  if (!title) return { title: "お知らせ" };
  return {
    title,
    description: description || undefined,
    openGraph: { title: `${title}｜白樺村`, description: description || undefined },
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
    const { contents } = await getNews({ limit: 100 });
    const found = contents.find((n) => (n.slug ?? n.id) === decoded);
    if (found) {
      const n = await getNewsItem(found.id);
      item = {
        id: n.id,
        title: n.title,
        date: n.date,
        category: n.category ?? undefined,
        content: n.content ?? undefined,
      };
    }
  } catch {
    // fallback
  }
  if (!item) {
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    datePublished: item.date,
    publisher: {
      "@type": "Organization",
      name: "白樺村",
      url: "https://shirakabamura.com",
    },
  };

  return (
    <div className={styles.page}>
      <Header />
      <JsonLd data={articleSchema} />
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
