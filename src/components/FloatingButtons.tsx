"use client";

import styles from "./FloatingButtons.module.css";

export default function FloatingButtons() {
  return (
    <div className={styles.wrap}>
      <a
        href="https://lin.ee/TUOS7vg"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.lineBtn}
        aria-label="LINEでお問い合わせ"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/top/linecontact.svg"
          alt="LINEで簡単お問い合わせ"
          width={120}
          height={120}
        />
      </a>
    </div>
  );
}
