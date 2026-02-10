"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}>
        <Image
          src="/images/top/mv.jpg"
          alt="白樺村メインビジュアル"
          fill
          priority
          className={`${styles.bgImage} pc`}
          sizes="100vw"
        />
        <Image
          src="/images/top/mv_sp.jpg"
          alt="白樺村メインビジュアル"
          fill
          priority
          className={`${styles.bgImage} sp`}
          sizes="100vw"
        />
      </div>
      <div className={`${styles.logoArea} ${active ? styles.active : ""}`}>
        <Image
          src="/images/common/logo.svg"
          alt="白樺村"
          width={60}
          height={200}
          className={styles.logoImage}
        />
      </div>
    </section>
  );
}
