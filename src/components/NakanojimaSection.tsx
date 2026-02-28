"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollTrigger } from "./useScrollTrigger";
import styles from "./NakanojimaSection.module.css";

export default function NakanojimaSection() {
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const { ref: photoRef, visible: photoVisible } = useScrollTrigger();

  return (
    <section id="location-rental" className={styles.nakanojima}>
      <div className={styles.inner}>
        <div
          ref={titleRef}
          className={`${styles.titleWrap} ${titleVisible ? styles.visible : ""}`}
        >
          <div className={styles.titleIcon}>
            <Image
              src="/images/common/icon_business.svg"
              alt=""
              width={100}
              height={100}
            />
          </div>
          <h2 className={`${styles.title} font-tsuku`}>ロケーションレンタル</h2>
          <p className={styles.description}>
            白樺湖に浮かぶ中之島をはじめ、湖畔や森のロケーションをレンタルでご利用いただけます。撮影、ロケ地、イベントなどのご利用に対応しています。
          </p>
        </div>

        <div
          ref={photoRef}
          className={`${styles.photo} ${photoVisible ? styles.visible : ""}`}
        >
          <Image
            src="/images/top/mv.jpg"
            alt="白樺湖のロケーション"
            width={1280}
            height={800}
            className={styles.photoImg}
          />
        </div>

        <div className={styles.more}>
          <Link href="/location-rental/" className="c-moreBtn">
            詳細を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
