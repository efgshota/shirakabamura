"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollTrigger } from "./useScrollTrigger";
import { usefulInfos } from "@/data/useful-infos";
import styles from "./UsefulInfoSection.module.css";

export default function UsefulInfoSection() {
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const { ref: listRef, visible: listVisible } = useScrollTrigger();

  const homeInfos = usefulInfos.slice(0, 6);

  return (
    <section className={styles.useful}>
      <div className={styles.decoTop} />
      <div className={styles.inner}>
        <div
          ref={titleRef}
          className={`${styles.titleWrap} ${titleVisible ? styles.visible : ""}`}
        >
          <div className={styles.titleIcon}>
            <Image
              src="/images/common/icon_useful.svg"
              alt=""
              width={100}
              height={100}
            />
          </div>
          <h2 className={`${styles.title} font-tsuku`}>お役立ち帳</h2>
          <p className={styles.subtitle}>
            暮らしに関わる便利な連絡先集めてます
          </p>
        </div>

        <div
          ref={listRef}
          className={`${styles.list} ${listVisible ? styles.visible : ""}`}
        >
          {homeInfos.map((info, i) => (
            <div key={info.slug} className={`${styles.card} ${i >= 5 ? styles.hideMobile : ""}`}>
              <div className={styles.cardText}>
                <span className={styles.cardCategory}>{info.category}</span>
                <h3 className={styles.cardName}>{info.name}</h3>
              </div>
              <div className={styles.cardIcons}>
                {info.website && (
                  <a
                    href={info.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                  >
                    <Image
                      src="/images/common/icon_web.svg"
                      alt="Web"
                      width={44}
                      height={44}
                    />
                  </a>
                )}
                {info.phone && (
                  <a href={`tel:${info.phone}`} className={styles.iconLink}>
                    <Image
                      src="/images/common/icon_tel.svg"
                      alt="電話"
                      width={44}
                      height={44}
                    />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.more}>
          <Link href="/useful/" className="c-moreBtn">
            すべて見る
          </Link>
        </div>
      </div>
    </section>
  );
}
