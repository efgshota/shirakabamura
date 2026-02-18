"use client";

import Link from "next/link";
import styles from "./FloatingButtons.module.css";

export default function FloatingButtons() {
  return (
    <div className={styles.wrap}>
      {/* LINEボタン */}
      <a
        href="https://lin.ee/shirakabamura"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.lineBtn}
        aria-label="LINEでお問い合わせ"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M14 2C7.373 2 2 6.925 2 13c0 4.552 2.77 8.502 6.844 10.484-.095.826-.607 4.198.073 4.516.817.383 5.278-2.25 5.083-2.25C13.999 26 14 26 14 26c6.627 0 12-4.925 12-11S20.627 2 14 2z"
            fill="white"
          />
          <path
            d="M8.5 15.5v-5h1.2v5H8.5zm2.3 0V10.5l3.2 5h1.2v-5h-1.2v3.4l-2.9-3.4H10v5h.8zm5.2 0v-5h3.8v1H17.2v1h2.4v1h-2.4v1h2.6v1H16zm-6-5h-1.3v2.5L7.5 10.5H6.2v5h1.2v-2.7l1.4 2.7h1.2v-5z"
            fill="#06C755"
          />
        </svg>
        <span className={styles.lineBtnLabel}>LINE</span>
      </a>

      {/* 簡単お問い合わせボタン */}
      <Link href="/#contact" className={styles.contactBtn}>
        <span className={styles.contactBtnText}>
          簡単
          <br />
          お問い合わせ
        </span>
      </Link>
    </div>
  );
}
