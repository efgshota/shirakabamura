"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import styles from "./page.module.css";

const filterOptions = [
  { key: "all", label: "すべて" },
  { key: "sell", label: "売物件" },
  { key: "rent", label: "賃貸" },
];

export default function PropertyListPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? properties
      : properties.filter((p) => p.type === activeFilter);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <div className={styles.titleIcon}>
              <Image
                src="/images/common/icon_property.svg"
                alt=""
                width={100}
                height={100}
              />
            </div>
            <h1 className={`${styles.title} font-tsuku`}>白樺村の物件</h1>
            <p className={styles.subtitle}>
              美しい白樺湖周辺の物件をご紹介します
            </p>
          </div>
        </section>

        <section className={styles.filter}>
          <div className={styles.inner}>
            <div className={styles.filterList}>
              {filterOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setActiveFilter(opt.key)}
                  className={`${styles.filterBtn} ${activeFilter === opt.key ? styles.active : ""} font-tsuku`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.list}>
          <div className={styles.inner}>
            <div className={styles.grid}>
              {filtered.map((prop) => (
                <Link
                  key={prop.slug}
                  href={`/property/${encodeURIComponent(prop.slug)}/`}
                  className={styles.card}
                >
                  <div className={styles.cardImage}>
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      width={280}
                      height={200}
                      className={styles.cardImg}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    {prop.specs && (
                      <p className={styles.cardSpecs}>{prop.specs}</p>
                    )}
                    {prop.description && (
                      <p className={styles.cardDesc}>
                        {prop.description.split("\n").map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < prop.description!.split("\n").length - 1 && (
                              <br />
                            )}
                          </span>
                        ))}
                      </p>
                    )}
                    {prop.price && (
                      <p className={styles.cardPrice}>{prop.price}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
