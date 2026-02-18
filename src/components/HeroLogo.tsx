"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HeroLogo.module.css";

export default function HeroLogo() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.logoArea} ${active ? styles.active : ""}`}>
      <Image
        src="/images/common/logo.svg"
        alt="白樺村"
        width={60}
        height={200}
        className={styles.logoImage}
        priority
      />
    </div>
  );
}
