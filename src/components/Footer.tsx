import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const navItems = [
  { href: "/#intro", label: "はじめに", icon: "/images/common/icon_nav_intro.svg" },
  { href: "/property/", label: "白樺村の物件", icon: "/images/common/icon_nav_property.svg" },
  { href: "/info/", label: "お役立ち帳", icon: "/images/common/icon_nav_useful.svg" },
  { href: "/location-rental/", label: "ロケーションレンタル", icon: "/images/common/icon_nav_location.svg", iconHeight: 22 },
  { href: "/#business", label: "事業者の方々へ", icon: "/images/common/icon_nav_business.svg", iconHeight: 14 },
  { href: "/#contact", label: "お問い合わせ", icon: "/images/common/icon_nav_contact.svg", iconHeight: 22 },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image
        src="/images/common/footer_bg.svg"
        alt=""
        fill
        className={styles.bg}
        aria-hidden="true"
      />
      <div className={styles.inner}>
        {/* ── 上段：ナビゲーション横一列 ── */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.navLink}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.icon}
                    alt=""
                    className={styles.navIcon}
                    style={item.iconHeight ? { height: item.iconHeight } : undefined}
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── 中段：サブセクション + ロゴ ── */}
        <div className={styles.middle}>
          <div className={styles.subSections}>
            {/* 関連サイト */}
            <div className={styles.subSection}>
              <p className={styles.sectionLabel}>（関連サイト）</p>
              <ul className={styles.subList}>
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
                <li>
                  <a
                    href="https://note.com/laketime"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    これまでの取り組み
                  </a>
                </li>
              </ul>
            </div>

            {/* 最新情報 */}
            <div className={styles.subSection}>
              <p className={styles.sectionLabel}>（最新情報）</p>
              <ul className={styles.subList}>
                <li>
                  <a
                    href="https://lin.ee/shirakabamura"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LINE
                  </a>
                </li>
              </ul>
            </div>

            {/* お問い合わせ */}
            <div className={styles.subSection}>
              <p className={styles.sectionLabel}>（お問い合わせ）</p>
              <ul className={styles.subList}>
                <li>
                  <Link href="/#contact">フォーム</Link>
                </li>
                <li>
                  <a href="tel:05017931400">電話する</a>
                </li>
              </ul>
            </div>
          </div>

          {/* ロゴ */}
          <div className={styles.logoWrap}>
            <Image
              src="/images/common/logo_blk.svg"
              alt="白樺村"
              width={60}
              height={180}
              className={styles.logo}
            />
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
