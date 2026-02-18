"use client";

import Link from "next/link";
import { useScrollTrigger } from "./useScrollTrigger";
import styles from "./NakanojimaSection.module.css";

export default function NakanojimaSection() {
  const { ref, visible } = useScrollTrigger(0.2);

  return (
    <section id="location-rental" className={styles.nakanojima}>
      <div className={styles.bg} />
      <div
        ref={ref}
        className={`${styles.content} ${visible ? styles.visible : ""}`}
      >
        <h2 className={`${styles.title} font-tsuku`}>ロケーションレンタル</h2>
        <p className={styles.text}>
          白樺湖に浮かぶ中之島をはじめ、湖畔や森のロケーションをレンタルでご利用いただけます。撮影、ロケ地、イベントなどのご利用に対応しています。
        </p>
        <Link href="/location-rental/" className="c-moreBtn">
          詳しく見る
        </Link>
      </div>
    </section>
  );
}
