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

const filterTabs = [
  { key: "all", label: "すべて" },
  { key: "sell", label: "建物つき" },
  { key: "rent", label: "賃貸物件" },
  { key: "land", label: "土地のみ" },
];

export default function PropertiesSection({
  properties,
}: {
  properties: PropertyItem[];
}) {
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const { ref: listRef, visible: listVisible } = useScrollTrigger();
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
          <h2 className={`${styles.title} font-tsuku`}>白樺村の物件</h2>
          <p className={styles.subtitle}>
            湖のほとり、森の中、山の景色、自然ゆたかで穏やかな環境の物件をご案内します。
          </p>
        </div>

        <div className={styles.filterTabs}>
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.filterTab} ${activeFilter === tab.key ? styles.filterTabActive : ""}`}
              onClick={() => setActiveFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          ref={listRef}
          className={`${styles.list} ${listVisible ? styles.visible : ""}`}
        >
          {filteredProperties.map((prop) => (
            <Link
              key={prop.id}
              href={`/property/${encodeURIComponent(prop.id)}/`}
              className={styles.card}
            >
              <div className={styles.cardImage}>
                <Image
                  src={prop.image}
                  alt={prop.title}
                  width={300}
                  height={200}
                  className={styles.cardImg}
                />
              </div>
              <div className={styles.cardBody}>
                {prop.price && (
                  <p className={styles.cardPrice}>{prop.price}</p>
                )}
                {(prop.floorPlan || prop.floorArea) && (
                  <p className={styles.cardSpecs}>
                    {[prop.floorPlan, prop.floorArea].filter(Boolean).join(" / ")}
                  </p>
                )}
                <h3 className={styles.cardTitle}>{prop.title}</h3>
                {prop.highlight && (
                  <p className={styles.cardHighlight}>{prop.highlight}</p>
                )}
                <p className={styles.cardArea}>{prop.area}</p>
              </div>
              <span className={`${styles.cardBtn} c-moreBtn`}>詳しく見る</span>
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
            白樺湖周辺地域における茅野市側の土地は柏原財産区が保有、借地権が設定されており基本的に転貸禁止ですが、白樺村保有の物件に限り賃貸も可能となりました。
          </p>
          <p style={{ marginTop: 16 }}>
            物件ごとに状況が異なる場合や、未掲載物件がある場合もございます。ご興味をお持ちの方は、ぜひ一度公式LINEまたはお問い合わせフォームよりご連絡ください。
          </p>
          <div className={styles.bottomBtn}>
            <Link href="/#contact" className="c-moreBtn blue">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
