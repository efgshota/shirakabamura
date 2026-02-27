"use client";

import Image from "next/image";
import { useState } from "react";
import type { UsefulInfoItem } from "@/lib/microcms";
import styles from "./page.module.css";

export default function UsefulListClient({
  infos,
  categories,
}: {
  infos: UsefulInfoItem[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("すべて");

  const filtered =
    activeCategory === "すべて"
      ? infos
      : infos.filter((info) => info.category === activeCategory);

  return (
    <>
      <section className={styles.filter}>
        <div className={styles.inner}>
          <div className={styles.cateList}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${styles.cateBtn} ${activeCategory === cat ? styles.active : ""} font-tsuku`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.list}>
        <div className={styles.inner}>
          <div className={styles.grid}>
            {filtered.map((info) => (
              <div key={info.id} className={styles.card}>
                <div className={styles.cardText}>
                  <span className={styles.cardCategory}>{info.category}</span>
                  <h3 className={styles.cardName}>{info.title}</h3>
                </div>
                <div className={styles.cardIcons}>
                  {info.url && (
                    <a
                      href={info.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                    >
                      <Image
                        src="/images/common/icon_web.svg"
                        alt="Web"
                        width={44}
                        height={44}
                      />
                    </a>
                  )}
                  {info.phone && (
                    <a href={`tel:${info.phone}`} className={styles.iconLink}>
                      <Image
                        src="/images/common/icon_tel.svg"
                        alt="電話"
                        width={44}
                        height={44}
                      />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
