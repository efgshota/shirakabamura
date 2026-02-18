"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const navItems = [
  { href: "/#intro", label: "はじめに" },
  { href: "/property/", label: "白樺村の物件" },
  { href: "/useful/", label: "お役立ち帳" },
  { href: "/location-rental/", label: "ロケーションレンタル" },
  { href: "/#business", label: "物件事例" },
  { href: "/#contact", label: "お問い合わせ" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${isOpen ? styles.active : ""} ${scrolled ? styles.scrolled : ""}`}
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

      {/* PC横並びナビ */}
      <nav className={`${styles.pcNav} ${scrolled ? styles.pcNavScrolled : ""}`}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={`${styles.pcNavLink} font-tsuku`}>
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="メニュー"
      >
        <span />
        <span />
      </button>

      <nav className={`${styles.gnav} ${isOpen ? styles.active : ""}`}>
        <div className={styles.gnavInner}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-tsuku"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.navExternal}>
            <a
              href="https://www.shirakabako.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-tsuku"
            >
              白樺湖のこと
            </a>
            <p>白樺湖のさまざまな場所を、一人ひとりの言葉でご紹介。</p>
          </div>
          <div className={styles.navExternal}>
            <a
              href="https://www.shirakabaresort.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-tsuku"
            >
              レイクリゾート
            </a>
            <p>白樺湖周辺のリゾート情報。</p>
          </div>
        </div>
      </nav>
    </header>
  );
}
