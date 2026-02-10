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
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#253c30" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="5" stroke="#253c30" strokeWidth="1.5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="#253c30"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.decoBottom} />
    </section>
  );
}
