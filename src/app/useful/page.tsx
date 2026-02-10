"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usefulInfos, usefulCategories } from "@/data/useful-infos";
import styles from "./page.module.css";

export default function UsefulListPage() {
  const [activeCategory, setActiveCategory] = useState("すべて");

  const filtered =
    activeCategory === "すべて"
      ? usefulInfos
      : usefulInfos.filter((info) => info.category === activeCategory);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <h1 className={`${styles.title} font-tsuku`}>お役立ち帳</h1>
            <p className={styles.subtitle}>
              暮らしに関わる便利な連絡先集めてます
            </p>
          </div>
        </section>

        <section className={styles.filter}>
          <div className={styles.inner}>
            <div className={styles.cateList}>
              {usefulCategories.map((cat) => (
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
                <div key={info.slug} className={styles.card}>
                  <div className={styles.cardText}>
                    <span className={styles.cardCategory}>
                      {info.category}
                    </span>
                    <h3 className={styles.cardName}>{info.name}</h3>
                  </div>
                  <div className={styles.cardIcons}>
                    {info.website && (
                      <a
                        href={info.website}
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
                      <a
                        href={`tel:${info.phone}`}
                        className={styles.iconLink}
                      >
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
      </main>
      <Footer />
    </div>
  );
}
