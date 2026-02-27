"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import styles from "./HeroCarousel.module.css";

const SLIDES = [
  { src: "/images/location-rental/hero-01.png", alt: "中之島 全景" },
  { src: "/images/location-rental/hero-02.png", alt: "中之島 湖面" },
  { src: "/images/location-rental/hero-03.png", alt: "中之島 自然" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setIsMobile(mq.matches);
      setCurrent(0);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Desktop: 2 photos visible → max index = SLIDES.length - 2
  // Mobile: 1 photo visible → max index = SLIDES.length - 1
  const max = isMobile ? SLIDES.length - 1 : SLIDES.length - 2;

  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);
  const next = useCallback(
    () => setCurrent((c) => Math.min(c + 1, max)),
    [max]
  );

  return (
    <div className={styles.stripWrap}>
      <div className={styles.strip}>
        {/* CSS カスタムプロパティを使ってブレークポイントごとにステップ幅を変える */}
        <div
          className={styles.track}
          style={{
            transform: `translateX(calc(-${current} * (var(--slide-w) + var(--slide-gap))))`,
          }}
        >
          {SLIDES.map((slide, i) => (
            <div key={i} className={styles.slide}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className={styles.img}
                sizes="(max-width: 767px) 85vw, 60vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 矢印ボタン - 右下 */}
      <div className={styles.arrows}>
        <button
          className={styles.arrowBtn}
          onClick={prev}
          disabled={current === 0}
          aria-label="前へ"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className={styles.arrowBtn}
          onClick={next}
          disabled={current === max}
          aria-label="次へ"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 12l4-4-4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
