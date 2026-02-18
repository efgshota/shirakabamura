"use client";

import Image from "next/image";
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
          <div className={styles.titleIcon}>
            <Image
              src="/images/common/icon_comment.svg"
              alt=""
              width={100}
              height={100}
            />
          </div>
          <h2 className={`${styles.title} font-tsuku`}>お知らせ</h2>
          <p className={styles.subtitle}>
            白樺村で起きていることをお知らせ
          </p>
        </div>

        <div
          ref={listRef}
          className={`${styles.list} ${listVisible ? styles.visible : ""}`}
        >
          {newsItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemMeta}>
                <time className={styles.itemDate}>{formatDate(item.date)}</time>
                {item.category && (
                  <span className={styles.itemCategory}>{item.category}</span>
                )}
              </div>
              <p className={styles.itemTitle}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
