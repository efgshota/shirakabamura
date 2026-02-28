"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import styles from "./page.module.css";

export type PropertyCardData = {
  id: string;
  title: string;
  image: string;
  specs?: string;
  description?: string;
  price: string;
  type: string;
  location?: string;
};

type SortKey = "default" | "price_asc" | "price_desc";

function parsePrice(priceStr: string): number {
  const manMatch = priceStr.match(/(\d+(?:\.\d+)?)万/);
  if (manMatch) return parseFloat(manMatch[1]) * 10000;
  const numMatch = priceStr.match(/(\d+(?:\.\d+)?)/);
  if (numMatch) return parseFloat(numMatch[1]);
  return 0;
}

export default function PropertyListClient({
  properties,
}: {
  properties: PropertyCardData[];
}) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("default");

  const locations = useMemo(() => {
    const set = new Set(properties.map((p) => p.location).filter(Boolean));
    return Array.from(set) as string[];
  }, [properties]);

  const filtered = useMemo(() => {
    let result = [...properties];
    if (typeFilter !== "all") result = result.filter((p) => p.type === typeFilter);
    if (areaFilter !== "all") result = result.filter((p) => p.location === areaFilter);
    if (sortKey === "price_asc") result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortKey === "price_desc") result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    return result;
  }, [properties, typeFilter, areaFilter, sortKey]);

  return (
    <>
      {/* フィルター + マップ */}
      <section className={styles.filterSection}>
        <div className={styles.inner}>
          <div className={styles.filterBox}>
            <div className={styles.filterRow}>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>種類：</span>
                <div className={styles.selectWrap}>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className={styles.select}
                  >
                    <option value="all">全て</option>
                    <option value="sell">建物つき</option>
                    <option value="land">土地のみ</option>
                    <option value="rent">賃貸</option>
                  </select>
                </div>
              </div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>区画：</span>
                <div className={styles.selectWrap}>
                  <select
                    value={areaFilter}
                    onChange={(e) => setAreaFilter(e.target.value)}
                    className={styles.select}
                  >
                    <option value="all">全て</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>並び順：</span>
                <div className={styles.selectWrap}>
                  <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value as SortKey)}
                    className={styles.select}
                  >
                    <option value="default">標準順</option>
                    <option value="price_asc">価格が安い順</option>
                    <option value="price_desc">価格が高い順</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.mapWrap}>
              <Image
                src="/images/property/map.png"
                alt="白樺湖周辺エリアマップ"
                width={580}
                height={360}
                className={styles.mapImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 物件リスト */}
      <section className={styles.listSection}>
        <div className={styles.inner}>
          {filtered.length === 0 ? (
            <p className={styles.empty}>該当する物件がありません</p>
          ) : (
            <div className={styles.grid}>
              {filtered.map((prop) => (
                <Link
                  key={prop.id}
                  href={`/property/${encodeURIComponent(prop.id)}/`}
                  className={styles.card}
                >
                  <div className={styles.cardImage}>
                    {prop.image && (
                      <Image
                        src={prop.image}
                        alt={prop.title}
                        width={280}
                        height={200}
                        className={styles.cardImg}
                      />
                    )}
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
          )}
        </div>
      </section>

      {/* ボトムCTA */}
      <section className={styles.ctaSection}>
        <div className={styles.inner}>
          <p className={styles.ctaText}>
            土地購入や既存物件購入の良さと、注意点。転貸は基本的には禁止で、白樺村はサポートできます。
          </p>
          <Link href="/#contact" className={styles.ctaLink}>
            借りて暮らしてみたい人のお問合せ
          </Link>
        </div>
      </section>
    </>
  );
}
