import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* 上段: ブランド + ナビ + 関連サイト */}
        <div className={styles.top}>
          {/* ブランドエリア */}
          <div className={styles.brand}>
            <div className={styles.brandLogo}>
              <Image
                src="/images/common/logo_blk.svg"
                alt="白樺村"
                width={20}
                height={72}
              />
              <span className={`${styles.brandName} font-tsuku`}>白樺村</span>
            </div>
            <p className={styles.brandDesc}>
              「50年先も続くレイクリゾート」をめざして。
              <br />
              白樺湖周辺での移住・開業・くらしをサポートします。
            </p>
            {/* TODO: 電話番号を設定 */}
            <p className={styles.tel}>TEL: 0266-XX-XXXX</p>
          </div>

          {/* ナビゲーション */}
          <nav className={styles.nav}>
            <p className={styles.navLabel}>サイトマップ</p>
            <ul className={`${styles.navList} font-tsuku`}>
              <li><Link href="/#intro">はじめに</Link></li>
              <li><Link href="/property/">白樺村の物件</Link></li>
              <li><Link href="/useful/">お役立ち帳</Link></li>
              <li><Link href="/location-rental/">ロケーションレンタル</Link></li>
              <li><Link href="/#business">物件事例</Link></li>
              <li><Link href="/#contact">お問い合わせ</Link></li>
            </ul>
          </nav>

          {/* 関連サイト */}
          <div className={styles.external}>
            <p className={styles.navLabel}>関連サイト</p>
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

        {/* 下段: コピーライト */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} 株式会社白樺村
          </p>
        </div>
      </div>
    </footer>
  );
}
