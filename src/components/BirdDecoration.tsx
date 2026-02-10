"use client";

import { useScrollTrigger } from "./useScrollTrigger";
import styles from "./BirdDecoration.module.css";

export default function BirdDecoration() {
  const { ref, visible } = useScrollTrigger(0.3);

  return (
    <div ref={ref} className={`${styles.wrap} ${visible ? styles.visible : ""}`}>
      <svg
        className={styles.bird}
        width="120"
        height="80"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 40C40 20 15 15 2 25C15 20 35 22 50 35L45 30C30 18 10 18 2 25"
          stroke="#7BBEC8"
          strokeWidth="2"
          fill="#7BBEC8"
          opacity="0.9"
        />
        <path
          d="M60 40C80 20 105 15 118 25C105 20 85 22 70 35L75 30C90 18 110 18 118 25"
          stroke="#7BBEC8"
          strokeWidth="2"
          fill="#7BBEC8"
          opacity="0.9"
        />
        <ellipse cx="60" cy="42" rx="8" ry="5" fill="#7BBEC8" />
        <path d="M52 42L30 55L35 48" stroke="#7BBEC8" strokeWidth="2" fill="#7BBEC8" opacity="0.7" />
      </svg>
    </div>
  );
}
