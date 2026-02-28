"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useScrollTrigger } from "./useScrollTrigger";
import styles from "./PropertiesSection.module.css";

type PropertyItem = {
  id: string;
  title: string;
  image: string;
  area: string;
  price?: string;
  floorPlan?: string;
  floorArea?: string;
  highlight?: string;
  type?: string;
};

const filterTiles = [
  { key: "land", label: "土地のみ", icon: "/images/tonkachi.png" },
  { key: "sell", label: "建物つき", icon: "/images/house.png" },
  { key: "rent", label: "賃貸物件", icon: "/images/rent.png" },
];

export default function PropertiesSection({
  properties,
}: {
  properties: PropertyItem[];
}) {
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const { ref: bottomRef, visible: bottomVisible } = useScrollTrigger();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProperties =
    activeFilter === "all"
      ? properties
      : properties.filter((p) => p.type === activeFilter);

  return (
    <section className={styles.property}>
      <div className={styles.inner}>
        <div
          ref={titleRef}
          className={`${styles.titleWrap} ${titleVisible ? styles.visible : ""}`}
        >
          <div className={styles.titleIcon}>
            <Image
              src="/images/common/icon_property.svg"
              alt=""
              width={100}
              height={100}
            />
          </div>
          <h2 className={styles.title}>白樺村の<br />物件</h2>
          <p className={styles.subtitle}>
            湖のほとり、森の中、山の景色、
            <br />
            自然ゆたかで穏やかな環境の物件を
            <br />
            ご案内します。
          </p>
        </div>

        {/* フィルタータイルカード */}
        <div className={styles.filterTiles}>
          {filterTiles.map((tile) => (
            <button
              key={tile.key}
              className={`${styles.filterTile} ${activeFilter === tile.key ? styles.filterTileActive : ""}`}
              onClick={() =>
                setActiveFilter(activeFilter === tile.key ? "all" : tile.key)
              }
            >
              <Image
                src={tile.icon}
                alt=""
                width={40}
                height={40}
                className={styles.filterTileIcon}
              />
              <span className={styles.filterTileLabel}>{tile.label}</span>
            </button>
          ))}
        </div>

        {/* 説明テキスト */}
        <div className={styles.noteText}>
          <p>
            白樺湖周辺地域における茅野市側の土地は柏原財産区が保有、借地権が設定されており
            <br />
            基本的に転貸禁止ですが、白樺村保有の物件に限り賃貸も可能となりました。
          </p>
        </div>

        {/* 区切り線 */}
        <div className={styles.divider} />

        {/* 横型物件カード */}
        <div className={styles.list}>
          {filteredProperties.map((prop) => (
            <Link
              key={prop.id}
              href={`/property/${encodeURIComponent(prop.id)}/`}
              className={styles.card}
            >
              <div className={styles.cardImage}>
                {prop.image ? (
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    width={260}
                    height={180}
                    className={styles.cardImg}
                  />
                ) : (
                  <div className={styles.cardImgPlaceholder} />
                )}
              </div>
              <div className={styles.cardBody}>
                {(prop.floorPlan || prop.floorArea) && (
                  <p className={styles.cardSpecs}>
                    {[prop.floorPlan, prop.floorArea].filter(Boolean).join(" / ")}
                  </p>
                )}
                {prop.highlight && (
                  <p className={styles.cardHighlight}>{prop.highlight}</p>
                )}
                {prop.price && (
                  <p className={styles.cardPrice}>{prop.price}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.more}>
          <Link href="/property/" className="c-moreBtn">
            すべて見る
          </Link>
        </div>

        <div
          ref={bottomRef}
          className={`${styles.bottomText} ${bottomVisible ? styles.visible : ""}`}
        >
          <p>
            物件ごとに状況が異なる場合や、未掲載物件がある場合もございます。
            <br />
            ご興味をお持ちの方は、ぜひ一度公式LINEまたはお問い合わせフォームよりご連絡ください。
          </p>
        </div>
      </div>
    </section>
  );
}
