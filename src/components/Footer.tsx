import Link from "next/link";
import styles from "./Footer.module.css";

const navItems = [
  { href: "/#intro", label: "はじめに" },
  { href: "/property/", label: "白樺村の物件" },
  { href: "/useful/", label: "お役立ち帳" },
  { href: "/location-rental/", label: "中之島の利用" },
  { href: "/#business", label: "事業者の方々へ" },
  { href: "/#contact", label: "お問い合わせ" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>

          {/* ── ナビゲーション ── */}
          <nav className={styles.nav}>
            <ul className={`${styles.navList} font-tsuku`}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <a href="tel:05017931400" className={`${styles.tel} font-tsuku`}>
              050-1793-1400
            </a>
          </nav>

          {/* ── SNS（最新情報）── */}
          <div className={styles.sns}>
            <p className={`${styles.sectionLabel} font-tsuku`}>（最新情報）</p>
            <ul className={`${styles.navList} font-tsuku`}>
              <li>
                <a
                  href="https://lin.ee/shirakabamura"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LINE
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* ── 関連サイト ── */}
          <div className={styles.related}>
            <p className={`${styles.sectionLabel} font-tsuku`}>（関連サイト）</p>
            <ul className={`${styles.navList} font-tsuku`}>
              <li>
                <a
                  href="https://www.shirakabako.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  白樺湖のこと
                </a>
              </li>
              <li>
                <a
                  href="https://www.shirakabaresort.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  レイクリゾート
                </a>
              </li>
            </ul>
          </div>

          {/* ── ロゴ（縦書き） ── */}
          <div className={styles.logoWrap} aria-label="白樺村">
            <span className={`${styles.logo} font-tsuku`}>
              白<br />樺<br />村
            </span>
          </div>
        </div>

        {/* ── 下部 ── */}
        <div className={styles.bottom}>
          <div className={styles.divider} />
          <p className={styles.copyright}>© Shirakabamura</p>
        </div>
      </div>
    </footer>
  );
}
