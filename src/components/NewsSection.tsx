"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollTrigger } from "./useScrollTrigger";
import styles from "./NewsSection.module.css";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  category?: string;
};

export default function NewsSection({
  newsItems,
}: {
  newsItems: NewsItem[];
}) {
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const { ref: listRef, visible: listVisible } = useScrollTrigger();

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  };

  return (
    <section id="news" className={styles.news}>
      <div className={styles.inner}>
        <div
          ref={titleRef}
          className={`${styles.titleWrap} ${titleVisible ? styles.visible : ""}`}
        >
          <div className={`${styles.titleIcon} c-iconTitle`}>
            <h2 className="c-iconTitle__text">お知らせ</h2>
            <Image
              className="c-iconTitle__icon"
              src="/images/common/icon_news.svg"
              alt=""
              width={120}
              height={126}
            />
          </div>
        </div>

        <div
          ref={listRef}
          className={`${styles.list} ${listVisible ? styles.visible : ""}`}
        >
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/news/${encodeURIComponent(item.id)}/`}
              className={styles.item}
            >
              <time className={styles.itemDate}>{formatDate(item.date)}</time>
              <p className={styles.itemTitle}>{item.title}</p>
            </Link>
          ))}
        </div>

        <div className={styles.more}>
          <Link href="/news/" className="c-moreBtn">
            もっと見る
          </Link>
        </div>
      </div>
    </section>
  );
}
