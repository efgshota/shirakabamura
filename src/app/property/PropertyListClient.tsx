"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

export type PropertyCardData = {
  id: string;
  title: string;
  image: string;
  specs?: string;
  description?: string;
  price: string;
  type: "sell" | "rent";
};

const filterOptions = [
  { key: "all", label: "すべて" },
  { key: "sell", label: "売物件" },
  { key: "rent", label: "賃貸" },
];

export default function PropertyListClient({
  properties,
}: {
  properties: PropertyCardData[];
}) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? properties
      : properties.filter((p) => p.type === activeFilter);

  return (
    <>
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
                key={prop.id}
                href={`/property/${encodeURIComponent(prop.id)}/`}
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
                      {prop.description.split("\n").map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
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
    </>
  );
}
