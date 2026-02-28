"use client";

import Image from "next/image";
import styles from "./HeroCarousel.module.css";

const SLIDES = [
  { src: "/images/location-rental/hero-01.png", alt: "中之島 全景" },
  { src: "/images/location-rental/hero-02.png", alt: "中之島 湖面" },
  { src: "/images/location-rental/hero-03.png", alt: "中之島 自然" },
];

// 無限ループ用に2セット並べる
const LOOP_SLIDES = [...SLIDES, ...SLIDES];

export default function HeroCarousel() {
  return (
    <div className={styles.stripWrap}>
      <div className={styles.strip}>
        <div className={styles.track}>
          {LOOP_SLIDES.map((slide, i) => (
            <div key={i} className={styles.slide}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i < SLIDES.length}
                className={styles.img}
                sizes="(max-width: 767px) 85vw, 60vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
