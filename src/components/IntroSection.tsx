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
    <img src="/images/top/cards/blob_c1_c.svg" className={`${styles.blobImg} ${styles.blobC1c}`} alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/images/top/cards/blob_c1_b.svg" className={`${styles.blobImg} ${styles.blobC1b}`} alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/images/top/cards/blob_c1_a.svg" className={`${styles.blobImg} ${styles.blobC1a}`} alt="" />
  </div>
);

/** Card 2: ハート形 blob */
const Card2Blobs = () => (
  <div className={styles.cardBlobs} aria-hidden="true">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/images/top/cards/blob_c2_a.svg" className={`${styles.blobImg} ${styles.blobC2a}`} alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/images/top/cards/blob_c2_b.svg" className={`${styles.blobImg} ${styles.blobC2b}`} alt="" />
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
              <span className={`${styles.cardCategory} font-tsuku`}>観光案内サイト</span>
            </div>
            <div className={styles.cardContent}>
              <p className={`${styles.cardTitle} font-tsuku`}>
                白樺湖のこと<ExtIcon />
              </p>
              <p className={styles.cardDesc}>
                白樺湖のさまざまな場所を、<br />
                一人ひとりの言葉でご覧いただけます。<br />
                自然スポットのご紹介も
              </p>
            </div>
          </a>

          {/* Card 2: 進行中プロジェクト / すずらんの湯 */}
          {/* <a
            href="/#contact"
            className={styles.infoCard}
          >
            <Card2Blobs />
            <div className={styles.cardLabel}>
              <span className={styles.cardIconWrap}>
                <svg width="47" height="47" viewBox="0 0 47 47" fill="none" aria-hidden="true">
                  <circle cx="23.5" cy="23.5" r="23.5" fill="#CCEFE7"/>
                  <circle cx="23.5" cy="14" r="4" fill="#2ca4a8"/>
                  <path d="M16 22C16 27 18.5 30 23.5 30C28.5 30 31 27 31 22" stroke="#2ca4a8" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M12 34Q17 30 23.5 34Q30 38 35 34" stroke="#2ca4a8" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M19 18Q23.5 15 28 18" stroke="#2ca4a8" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M20 13Q21.5 10 23 13" stroke="#2ca4a8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <path d="M23.5 13Q25 10 26.5 13" stroke="#2ca4a8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
              </span>
              <span className={`${styles.cardCategory} font-tsuku`}>進行中プロジェクト</span>
            </div>
            <div className={styles.cardContent}>
              <p className={`${styles.cardTitle} font-tsuku`}>
                すずらんの湯<ExtIcon />
              </p>
              <p className={styles.cardDesc}>
                白樺湖の中心、みんなの憩いのお風呂<br />
                「白樺湖温泉　すずらんの湯」<br />
                復活プロジェクト
              </p>
            </div>
          </a> */}

          {/* Card 3: 最新情報はこちら / SNS */}
          <div className={styles.infoCard}>
            <div className={styles.cardLabel}>
              <span className={styles.cardIconWrap}>
                {/* RSS / feed icon */}
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <rect width="22" height="22" rx="6" fill="#5B8BF5"/>
                  <circle cx="6" cy="16" r="2" fill="white"/>
                  <path d="M5.5 11.5C8.5 11.5 10.5 13.5 10.5 16.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                  <path d="M5.5 6.5C12 6.5 15.5 10 15.5 16.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                </svg>
              </span>
              <span className={`${styles.cardCategory} font-tsuku`}>最新情報はこちら</span>
            </div>
            <div className={styles.cardSocials}>
              <a
                href="https://note.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} font-tsuku`}
              >
                note<ExtIcon />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} font-tsuku`}
              >
                Instagram<ExtIcon />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} font-tsuku`}
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
