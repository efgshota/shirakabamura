"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useScrollTrigger } from "./useScrollTrigger";
import styles from "./IntroSection.module.css";

export default function IntroSection() {
  const [active, setActive] = useState(false);
  const { ref: figureRef, visible: figureVisible } = useScrollTrigger(0.3);
  const { ref: textRef, visible: textVisible } = useScrollTrigger();

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
            「白樺村」では、移住・開業など、白樺湖周辺地域でのくらしを幅広くサポートしていきます！
          </p>
          <p>
            湖と森と季節の自然、そしてこの環境がすきで集まる住民たち。この地域での暮らしに少しでも興味がある方、疑問なこと不安なこと、気になることがあればいつでもどうぞ。運営メンバーも慣れない中で始まったばかりなので、ご不便おかけすることもあるかもしれませんが、その分気兼ねなくお問い合わせください😁
          </p>
        </div>

        <div className={styles.externalLinks}>
          <p className={styles.externalText}>
            白樺湖のことを知りたい人はこちら
          </p>
          <div className={styles.socialIcons}>
            <a
              href="https://www.shirakabako.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="白樺湖のこと"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11" stroke="#253c30" strokeWidth="1.5"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#253c30"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <svg width="36" height="36" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.9 224.1 370.9 339 319.6 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1S3.8 127.8 2 163.7c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" fill="#253c30"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.decoBottom} />
    </section>
  );
}
