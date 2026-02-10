import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.navSide}>
          <ul className={`${styles.navList} font-tsuku`}>
            <li>
              <Link href="/#intro">はじめに</Link>
            </li>
            <li>
              <Link href="/property/">白樺村の物件</Link>
            </li>
            <li>
              <Link href="/useful/">お役立ち帳</Link>
            </li>
            <li>
              <Link href="/#business">事業者の方々へ</Link>
            </li>
            <li>
              <Link href="/#contact">お問い合わせ</Link>
            </li>
          </ul>

          <div className={styles.related}>
            <p className={styles.relatedLabel}>（関連サイト）</p>
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
        </div>

        <div className={`${styles.logoSide} font-tsuku`}>
          <span className={styles.logoText}>白樺村</span>
        </div>
      </div>
    </footer>
  );
}
