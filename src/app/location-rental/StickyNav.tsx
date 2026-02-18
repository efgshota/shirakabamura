"use client";

import { useState, useEffect } from "react";
import styles from "./StickyNav.module.css";

const NAV_ITEMS = [
  { label: "中之島とは", href: "#nakanojima" },
  { label: "アクセス", href: "#access" },
  { label: "利用シーン", href: "#scenes" },
  { label: "サービス", href: "#service" },
  { label: "ルール", href: "#rules" },
  { label: "利用料金", href: "#price" },
  { label: "お申し込み", href: "#apply" },
];

export default function StickyNav() {
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
      const sections = NAV_ITEMS.map((item) =>
        document.querySelector(item.href)
      );
      let current = "";
      sections.forEach((section, i) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120) {
            current = NAV_ITEMS[i].href;
          }
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top =
        target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className={`${styles.nav} ${visible ? styles.visible : ""}`}>
      <div className={styles.inner}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`${styles.link} ${active === item.href ? styles.active : ""}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
