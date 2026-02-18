"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import styles from "./HeroCarousel.module.css";

const SLIDES = [
  { src: "/images/location-rental/hero-01.png", alt: "中之島 全景" },
  { src: "/images/location-rental/hero-02.png", alt: "中之島 湖面" },
  { src: "/images/location-rental/hero-03.png", alt: "中之島 自然" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <div className={styles.carousel}>
      <div className={styles.track} style={{ transform: `translateX(-${current * 100}%)` }}>
        {SLIDES.map((slide, i) => (
          <div key={i} className={styles.slide}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className={styles.img}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* ドット */}
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`スライド ${i + 1}`}
          />
        ))}
      </div>

      {/* 矢印 */}
      <button className={`${styles.arrow} ${styles.arrowPrev}`} onClick={prev} aria-label="前へ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className={`${styles.arrow} ${styles.arrowNext}`} onClick={next} aria-label="次へ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
