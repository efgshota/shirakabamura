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
  comment?: string;
  price: string;
  type: string;
  kind?: string; // "建物" | "土地" — microCMS kindscat
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
  { name: "湖畔・西", pathKey: "lakeWest", fillColor: "#3A9A9D", labelX: 28, labelY: 27, color: "#253c30" },
  { name: "湖畔・南", pathKey: "lakeSouth", fillColor: "#2D6E63", labelX: 48, labelY: 44, color: "#253c30" },
  { name: "森・東", pathKey: "forestEast", fillColor: "#1B7A4A", labelX: 68, labelY: 55, color: "#253c30" },
  { name: "森・西", pathKey: "forestWest", fillColor: "#135C27", labelX: 28, labelY: 68, color: "#253c30" },
];

export default function PropertyListClient({
  properties,
}: {
  properties: PropertyCardData[];
}) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [kindFilter, setKindFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const locations = useMemo(() => {
    const set = new Set(properties.map((p) => p.location).filter(Boolean));
    return Array.from(set) as string[];
  }, [properties]);

  const filtered = useMemo(() => {
    let result = [...properties];
    if (typeFilter !== "all") result = result.filter((p) => p.type === typeFilter);
    if (kindFilter !== "all") result = result.filter((p) => p.kind === kindFilter);
    if (areaFilter !== "all") result = result.filter((p) => p.location === areaFilter);
    return result;
  }, [properties, typeFilter, kindFilter, areaFilter]);

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
                <option value="sell">売物件</option>
                <option value="rent">賃貸</option>
              </select>
            </div>
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterLabel}>建物/土地：</span>
            <div className={styles.selectWrap}>
              <select
                value={kindFilter}
                onChange={(e) => setKindFilter(e.target.value)}
                className={styles.select}
              >
                <option value="all">全て</option>
                <option value="建物">建物</option>
                <option value="土地">土地</option>
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
                <g key={area.name}>
                  {/* 透明なヒットゾーン（クリック領域を拡大） */}
                  <path
                    d={AREA_PATHS[area.pathKey]}
                    fill="transparent"
                    stroke="transparent"
                    strokeWidth={30}
                    className={styles.mapAreaHitZone}
                    onClick={() => setAreaFilter(areaFilter === area.name ? "all" : area.name)}
                    onMouseEnter={() => setHoveredArea(area.name)}
                    onMouseLeave={() => setHoveredArea(null)}
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
                  {/* 表示用パス */}
                  <path
                    d={AREA_PATHS[area.pathKey]}
                    fill={area.fillColor}
                    className={`${styles.mapAreaPath} ${areaFilter === area.name ? styles.mapAreaPathActive : ""} ${hoveredArea === area.name ? styles.mapAreaPathHovered : ""}`}
                  />
                </g>
              ))}
            </svg>
            {/* エリアテキストラベル */}
            {MAP_AREAS.map((area) => (
              <button
                key={`label-${area.name}`}
                className={`${styles.mapLabel} ${areaFilter === area.name ? styles.mapLabelActive : ""} ${hoveredArea === area.name ? styles.mapLabelHovered : ""}`}
                style={{
                  left: `${area.labelX}%`,
                  top: `${area.labelY}%`,
                  "--label-color": area.color,
                } as React.CSSProperties}
                onClick={() => setAreaFilter(areaFilter === area.name ? "all" : area.name)}
                onMouseEnter={() => setHoveredArea(area.name)}
                onMouseLeave={() => setHoveredArea(null)}
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
                        width={116}
                        height={128}
                        className={styles.cardImg}
                      />
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.cardTitle}>{prop.title}</p>
                    {prop.specs && (
                      <p className={styles.cardSpecs}>{prop.specs}</p>
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
