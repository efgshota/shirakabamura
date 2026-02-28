"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useScrollTrigger } from "./useScrollTrigger";
import styles from "./IntroSection.module.css";

/** 外部リンクアイコン */
const ExtIcon = () => (
  <span className={styles.extIcon} aria-hidden="true">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M8.5 2.5H12.5V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 2.5L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6.5 5H2.5V12.5H10V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
);

/** Card 1: 有機形状 blob */
const Card1Blobs = () => (
  <div className={styles.cardBlobs} aria-hidden="true">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/images/top/cards/blob_card1_bg.svg" className={styles.blobCard1Bg} alt="" />
  </div>
);


export default function IntroSection() {
  const [active, setActive] = useState(false);
  const { ref: figureRef, visible: figureVisible } = useScrollTrigger(0.05);
  const { ref: textRef, visible: textVisible } = useScrollTrigger();
  const { ref: cardsRef, visible: cardsVisible } = useScrollTrigger();

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="intro"
      className={`${styles.intro} ${active ? styles.active : ""}`}
    >
      <div className={styles.decoTop} />
      <div className={styles.inner}>

        {/* 湖マップ + アイコン */}
        <div
          ref={figureRef}
          className={`${styles.figure} ${figureVisible ? styles.visible : ""}`}
        >
          <Image
            src="/images/common/figure.svg"
            alt="白樺湖周辺マップ"
            width={660}
            height={500}
            className={styles.figureMap}
          />
          <div className={styles.articles}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Image
                key={n}
                src={`/images/top/article_0${n}.svg`}
                alt=""
                width={80}
                height={80}
                className={`${styles.article} ${styles[`article${n}`]}`}
                style={{ animationDelay: `${(n - 1) * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* テキスト */}
        <div
          ref={textRef}
          className={`${styles.text} ${textVisible ? styles.visible : ""}`}
        >
          <p>
            こんにちは、株式会社白樺村です。「50年先も続くレイクリゾート」をめざして、地域課題を解決していくことを目的に設立しました。
          </p>
          <p>
            明るく涼やかな風が通り抜ける白樺湖のほとりで、湖と、森と、季節を身近に感じるくらしをはじめませんか？
          </p>
          <p>
            物件に関するご相談、移住・開業に伴うご相談はもちろん、決して大きくはなく、雪も深い地域ですので、ちいさな疑問や不安、気になることがあれば、いつでも気兼ねなくお問い合わせください。
          </p>
        </div>

        {/* ─── 3カードエリア ─── */}
        <div
          ref={cardsRef}
          className={`${styles.infoCards} ${cardsVisible ? styles.visible : ""}`}
        >

          {/* Card 1: 観光案内サイト / 白樺湖のこと */}
          <a
            href="https://www.shirakabako.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoCard}
          >
            <Card1Blobs />
            <div className={styles.cardLabel}>
              <span className={styles.cardIconWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/top/cards/icon_card1.svg" width="47" height="47" alt="" />
              </span>
              <span className={styles.cardCategory}>観光案内サイト</span>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardTitle}>
                白樺湖のこと<ExtIcon />
              </p>
              <p className={styles.cardDesc}>
                白樺湖のさまざまな場所を、<br />
                一人ひとりの言葉でご覧いただけます。<br />
                自然スポットのご紹介も
              </p>
            </div>
          </a>

          {/* Card 2: 最新情報はこちら / SNS */}
          <div className={styles.infoCard}>
            <div className={styles.cardLabel}>
              <span className={styles.cardIconWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/top/cards/icon_card_sns.png" width="47" height="47" alt="" />
              </span>
              <span className={styles.cardCategory}>最新情報はこちら</span>
            </div>
            <div className={styles.cardSocials}>
              <a
                href="https://note.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                note<ExtIcon />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                Instagram<ExtIcon />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                X (Twitter)<ExtIcon />
              </a>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.decoBottom} />
    </section>
  );
}
