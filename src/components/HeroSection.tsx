import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <h1 className="sr-only">
        白樺村 — 白樺湖周辺での移住・開業・くらしをサポート。「50年先も続くレイクリゾート」をめざして。
      </h1>
      <div className={styles.bgWrap}>
        <Image
          src="/images/top/mv.jpg"
          alt="長野県茅野市・白樺湖畔の風景。湖と森と白樺が広がるレイクリゾート"
          fill
          priority
          className={`${styles.bgImage} pc`}
          sizes="100vw"
        />
        <Image
          src="/images/top/mv_sp.jpg"
          alt="長野県茅野市・白樺湖畔の風景。湖と森と白樺が広がるレイクリゾート"
          fill
          priority
          className={`${styles.bgImage} sp`}
          sizes="100vw"
        />
      </div>
    </section>
  );
}
