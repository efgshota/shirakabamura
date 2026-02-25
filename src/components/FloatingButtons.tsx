"use client";

import Image from "next/image";
import styles from "./FloatingButtons.module.css";

export default function FloatingButtons() {
  return (
    <div className={styles.wrap}>
      <a
        href="https://lin.ee/shirakabamura"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.lineBtn}
        aria-label="LINEでお問い合わせ"
      >
        <Image
          src="/images/common/line_btn.png"
          alt="LINEで簡単お問い合わせ"
          width={120}
          height={120}
        />
      </a>
    </div>
  );
}
