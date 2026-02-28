"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

// PC右側縦並びナビ（Figma グループ126準拠）
const pcNavItems = [
  { href: "/#intro",            label: "はじめに" },
  { href: "/property/",         label: "白樺村の物件" },
  { href: "/useful/",           label: "お役立ち帳" },
  { href: "/location-rental/",  label: "ロケーションレンタル" },
  { href: "/#business",         label: "物件事例" },
  { href: "/#news",             label: "お知らせ" },
  { href: "/#contact",          label: "お問い合わせ" },
];

// ハンバーガーメニュー（アイコン付き）
const menuItems = [
  { href: "/#intro",           label: "はじめに",           icon: "/images/common/icon_nav_intro.svg",    size: 44 },
  { href: "/property/",        label: "白樺村の物件",       icon: "/images/common/icon_nav_property.svg", size: 44 },
  { href: "/useful/",          label: "お役立ち帳",         icon: "/images/common/icon_nav_useful.svg",   size: 44 },
  { href: "/location-rental/", label: "ロケーションレンタル", icon: "/images/common/icon_nav_location.svg", size: 64 },
  { href: "/#business",        label: "事業者の方々へ",     icon: "/images/common/icon_nav_business.svg", size: 44 },
  { href: "/#contact",         label: "お問い合わせ",       icon: "/images/common/icon_nav_contact.svg",  size: 44 },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const introEl = document.getElementById("intro");
    if (!introEl) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      setScrolled(introEl.getBoundingClientRect().top <= 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // StickyNav が表示されたらヘッダーを非表示にする
  useEffect(() => {
    const handleStickyNav = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setHidden(detail.visible);
    };
    window.addEventListener("stickynav", handleStickyNav);
    return () => window.removeEventListener("stickynav", handleStickyNav);
  }, []);

  // メニューオープン時はbodyスクロールを止める
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header
      className={`${styles.header} ${isOpen ? styles.menuOpen : ""} ${scrolled ? styles.scrolled : ""} ${hidden && !isOpen ? styles.hidden : ""}`}
    >
      <Link href="/" className={styles.logo}>
        <Image
          src={isOpen || scrolled ? "/images/common/logo_blk.svg" : "/images/common/logo.svg"}
          alt="白樺村"
          width={22}
          height={80}
          priority
        />
      </Link>

      {/* PC縦並び右側ナビ */}
      <nav className={`${styles.pcNav} ${scrolled ? styles.pcNavScrolled : ""}`}>
        {pcNavItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.pcNavLink}>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* ハンバーガー / クローズボタン */}
      <button
        className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <span className={styles.closeIcon} aria-hidden="true" />
        ) : (
          <Image
            src="/images/menu.svg"
            alt=""
            width={14}
            height={14}
            className={styles.menuIcon}
          />
        )}
      </button>

      {/* フルスクリーンナビ */}
      <nav
        className={`${styles.gnav} ${isOpen ? styles.gnavOpen : ""}`}
        aria-hidden={!isOpen}
      >
        {/* 白樺湖シルエット（装飾） */}
        <div className={styles.lakeBg} aria-hidden="true">
          <Image
            src="/images/common/figure.svg"
            alt=""
            width={600}
            height={450}
            className={styles.lakeBgImg}
          />
        </div>

        <div className={styles.gnavInner}>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={styles.navLink}
                >
                  <span className={`${styles.navIcon} ${item.size > 44 ? styles.navIconLarge : ""}`}>
                    <Image src={item.icon} alt="" width={item.size} height={item.size} />
                  </span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.navRelated}>
            <p className={styles.navRelatedTitle}>（関連サイト）</p>
            <a
              href="https://www.shirakabako.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navRelatedLink}
            >
              白樺湖のこと
            </a>
            <a
              href="https://www.shirakabaresort.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navRelatedLink}
            >
              レイクリゾート
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
