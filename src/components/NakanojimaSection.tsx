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
      <div className={styles.decoBlobs} aria-hidden="true">
        <Image
          src="/images/top/cards/blob_card1_bg.svg"
          alt=""
          width={715}
          height={359}
          className={styles.decoBlobsImg}
        />
      </div>
      <div className={styles.inner}>
        <div
          ref={titleRef}
          className={`${styles.titleWrap} ${titleVisible ? styles.visible : ""}`}
        >
          <div className={styles.titleIcon}>
            <Image
              src="/images/nakanoshima.svg"
              alt=""
              width={155}
              height={146}
            />
          </div>
          <h2 className={`${styles.title} font-tsuku`}>ロケーション<br />レンタル</h2>
          <p className={styles.description}>
            白樺湖に浮かぶ中之島をはじめ、湖畔や森のロケーションをレンタルでご利用いただけます。撮影、ロケ地、イベントなどのご利用に対応しています。
          </p>
        </div>

        <div
          ref={photoRef}
          className={`${styles.photo} ${photoVisible ? styles.visible : ""}`}
        >
          <Image
            src="/images/top/23Y06812.png"
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
