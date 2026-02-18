import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}>
        <Image
          src="/images/top/mv.jpg"
          alt="白樺村メインビジュアル"
          fill
          priority
          className={`${styles.bgImage} pc`}
          sizes="100vw"
        />
        <Image
          src="/images/top/mv_sp.jpg"
          alt="白樺村メインビジュアル"
          fill
          priority
          className={`${styles.bgImage} sp`}
          sizes="100vw"
        />
      </div>
    </section>
  );
}
