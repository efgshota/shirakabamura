"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import styles from "./page.module.css";
import { AREA_PATHS } from "./mapPaths";

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

// マップ上のエリア定義（インラインSVGパス + ラベル位置）
const MAP_AREAS: {
  name: string;
  pathKey: keyof typeof AREA_PATHS;
  fillColor: string;
  labelX: number;
  labelY: number;
  color: string;
}[] = [
  { name: "湖畔・西", pathKey: "lakeWest", fillColor: "#3A9A9D", labelX: 28, labelY: 27, color: "#4FB2B5" },
  { name: "湖畔・南", pathKey: "lakeSouth", fillColor: "#2D6E63", labelX: 48, labelY: 44, color: "#2D6E63" },
  { name: "森・東", pathKey: "forestEast", fillColor: "#1B7A4A", labelX: 68, labelY: 55, color: "#1B7A4A" },
  { name: "森・西", pathKey: "forestWest", fillColor: "#135C27", labelX: 28, labelY: 68, color: "#3A650E" },
];

export default function PropertyListClient({
  properties,
}: {
  properties: PropertyCardData[];
}) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [usageFilter, setUsageFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");

  const locations = useMemo(() => {
    const set = new Set(properties.map((p) => p.location).filter(Boolean));
    return Array.from(set) as string[];
  }, [properties]);

  const filtered = useMemo(() => {
    let result = [...properties];
    if (typeFilter !== "all") result = result.filter((p) => p.type === typeFilter);
    if (areaFilter !== "all") result = result.filter((p) => p.location === areaFilter);
    return result;
  }, [properties, typeFilter, usageFilter, areaFilter]);

  return (
    <>
      {/* フィルター + マップ */}
      <section className={styles.filterSection}>
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
            <span className={styles.filterLabel}>用途：</span>
            <div className={styles.selectWrap}>
              <select
                value={usageFilter}
                onChange={(e) => setUsageFilter(e.target.value)}
                className={styles.select}
              >
                <option value="all">居住用</option>
                <option value="business">事業用</option>
                <option value="vacation">別荘</option>
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
        </div>

        <div className={styles.mapWrap}>
          <div className={styles.mapContainer}>
            <Image
              src="/images/property/map.svg"
              alt="白樺湖周辺エリアマップ"
              width={740}
              height={607}
              className={styles.mapImg}
            />
            {/* クリッカブルエリアオーバーレイ（インラインSVG） */}
            <svg
              viewBox="0 0 740 607"
              className={styles.mapSvgOverlay}
            >
              {MAP_AREAS.map((area) => (
                <path
                  key={area.name}
                  d={AREA_PATHS[area.pathKey]}
                  fill={area.fillColor}
                  className={`${styles.mapAreaPath} ${areaFilter === area.name ? styles.mapAreaPathActive : ""}`}
                  onClick={() => setAreaFilter(areaFilter === area.name ? "all" : area.name)}
                  role="button"
                  aria-label={`${area.name}で絞り込み`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setAreaFilter(areaFilter === area.name ? "all" : area.name);
                    }
                  }}
                />
              ))}
            </svg>
            {/* エリアテキストラベル */}
            {MAP_AREAS.map((area) => (
              <button
                key={`label-${area.name}`}
                className={`${styles.mapLabel} ${areaFilter === area.name ? styles.mapLabelActive : ""}`}
                style={{
                  left: `${area.labelX}%`,
                  top: `${area.labelY}%`,
                  "--label-color": area.color,
                } as React.CSSProperties}
                onClick={() => setAreaFilter(areaFilter === area.name ? "all" : area.name)}
              >
                {area.name}
              </button>
            ))}
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
