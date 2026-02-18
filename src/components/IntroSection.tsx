"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useScrollTrigger } from "./useScrollTrigger";
import styles from "./IntroSection.module.css";

export default function IntroSection() {
  const [active, setActive] = useState(false);
  const { ref: figureRef, visible: figureVisible } = useScrollTrigger(0.3);
  const { ref: textRef, visible: textVisible } = useScrollTrigger();
  const { ref: linksRef, visible: linksVisible } = useScrollTrigger();
  const { ref: subRef, visible: subVisible } = useScrollTrigger();

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

        <div
          ref={linksRef}
          className={`${styles.linksArea} ${linksVisible ? styles.visible : ""}`}
        >
          <div className={styles.linkBlocks}>
            <a
              href="https://www.shirakabako.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBlock}
            >
              <span className={styles.linkIcon}>
                <Image
                  src="/images/common/icon_web.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </span>
              <span className={styles.linkLabel}>観光案内サイト</span>
            </a>
            <a
              href="/#nakanojima"
              className={styles.linkBlock}
            >
              <span className={styles.linkIcon}>
                <Image
                  src="/images/common/icon_web.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </span>
              <span className={styles.linkLabel}>進行中プロジェクト</span>
            </a>
            <a
              href="/#news"
              className={styles.linkBlock}
            >
              <span className={styles.linkIcon}>
                <Image
                  src="/images/common/icon_web.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </span>
              <span className={styles.linkLabel}>最新情報はこちら</span>
            </a>
          </div>

          <div className={styles.socialIcons}>
            <a
              href="https://note.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="note"
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="17" stroke="#253c30" strokeWidth="1.5"/>
                <text x="18" y="22" textAnchor="middle" fill="#253c30" fontSize="11" fontWeight="bold">n</text>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#253c30" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="5" stroke="#253c30" strokeWidth="1.5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="#253c30"/>
              </svg>
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="X"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11" stroke="#253c30" strokeWidth="1.5"/>
                <path d="M7 7L11.5 12.5L7 17H8.5L12.25 13.5L15.5 17H17L12.5 11.5L17 7H15.5L11.75 10.5L8.5 7H7Z" fill="#253c30"/>
              </svg>
            </a>
          </div>
        </div>

        <div
          ref={subRef}
          className={`${styles.subSections} ${subVisible ? styles.visible : ""}`}
        >
          <div className={styles.subSection}>
            <h3 className={`${styles.subTitle} font-tsuku`}>白樺湖のこと</h3>
            <p className={styles.subText}>
              白樺湖のさまざまな場所を、一人ひとりの言葉でご覧いただけます。自然スポットのご紹介も
            </p>
            <a
              href="https://www.shirakabako.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="c-moreBtn"
            >
              詳しく見る
            </a>
          </div>
          <div className={styles.subSection}>
            <h3 className={`${styles.subTitle} font-tsuku`}>すずらんの湯</h3>
            <p className={styles.subText}>
              白樺湖の中心、みんなの憩いのお風呂「白樺湖温泉　すずらんの湯」復活プロジェクト
            </p>
            <a
              href="/#contact"
              className="c-moreBtn"
            >
              詳しく見る
            </a>
          </div>
        </div>
      </div>
      <div className={styles.decoBottom} />
    </section>
  );
}
