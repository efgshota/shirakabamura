"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollTrigger } from "./useScrollTrigger";
import { businesses } from "@/data/businesses";
import styles from "./BusinessSection.module.css";

export default function BusinessSection() {
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const { ref: listRef, visible: listVisible } = useScrollTrigger();

  return (
    <section id="business" className={styles.business}>
      <div className={styles.clipTop} />
      <div className={styles.content}>
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
            <h2 className={`${styles.title} font-tsuku`}>事業者の方々へ</h2>
          </div>

          <div
            ref={listRef}
            className={`${styles.list} ${listVisible ? styles.visible : ""}`}
          >
            {businesses.map((biz) => (
              <Link
                key={biz.slug}
                href={`/business/${encodeURIComponent(biz.slug)}/`}
                className={styles.card}
              >
                <div className={styles.cardImage}>
                  <Image
                    src={biz.image}
                    alt={biz.name}
                    width={450}
                    height={390}
                    className={styles.cardImg}
                  />
                </div>
                <h3 className={`${styles.cardName} font-kinto`}>{biz.name}</h3>
                <span className={`${styles.cardBtn} c-moreBtn`}>事例を見る</span>
              </Link>
            ))}
          </div>

          <div className={styles.bottomText}>
            <p className="font-kinto">
              白樺村は、その美しい自然環境と気候、地元の温かさが一体となり、絶えず新たな可能性を生み出しています。
            </p>
            <p className="font-kinto" style={{ marginTop: 24 }}>
              詳しいご説明など行いますので、お気軽にお問い合わせください。
            </p>
          </div>

          <div className={styles.more}>
            <Link href="/#contact" className="c-moreBtn blue">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.clipBottom} />
    </section>
  );
}
