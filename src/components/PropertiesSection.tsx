"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollTrigger } from "./useScrollTrigger";
import { properties } from "@/data/properties";
import styles from "./PropertiesSection.module.css";

export default function PropertiesSection() {
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const { ref: listRef, visible: listVisible } = useScrollTrigger();
  const { ref: bottomRef, visible: bottomVisible } = useScrollTrigger();

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
            美しい白樺湖周辺の物件をご紹介します
          </p>
        </div>

        <div
          ref={listRef}
          className={`${styles.list} ${listVisible ? styles.visible : ""}`}
        >
          {properties.map((prop) => (
            <Link
              key={prop.slug}
              href={`/property/${encodeURIComponent(prop.slug)}/`}
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
                <h3 className={styles.cardTitle}>{prop.title}</h3>
                <p className={styles.cardArea}>{prop.area}</p>
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
            土地購入や既存物件購入の良さと、注意点。転貸は基本的には禁止で、白樺村はサポートできます。
          </p>
          <p style={{ marginTop: 16 }}>
            借りて暮らしてみたい人は、お気軽にお問い合わせください。
          </p>
          <div className={styles.bottomBtn}>
            <Link href="/#contact" className="c-moreBtn blue">
              借りて暮らしてみたい人のお問合せ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
