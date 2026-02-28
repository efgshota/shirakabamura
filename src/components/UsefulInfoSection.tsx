"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollTrigger } from "./useScrollTrigger";
import type { UsefulInfoItem } from "@/lib/microcms";
import styles from "./UsefulInfoSection.module.css";

export default function UsefulInfoSection({ infos }: { infos: UsefulInfoItem[] }) {
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const { ref: listRef, visible: listVisible } = useScrollTrigger();

  const homeInfos = infos.slice(0, 6);

  return (
    <section id="useful" className={styles.useful}>
      <div className={styles.decoTop}>
        <Image
          src="/images/top/Union.svg"
          alt=""
          width={1280}
          height={2858}
          className={styles.decoTopImg}
        />
      </div>
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
            <div key={info.id} className={`${styles.card} ${i >= 5 ? styles.hideMobile : ""}`}>
              <div className={styles.cardText}>
                <span className={styles.cardCategory}>{info.category}</span>
                <h3 className={styles.cardName}>{info.title}</h3>
              </div>
              <div className={styles.cardIcons}>
                {info.url && (
                  <a
                    href={info.url}
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
                    <span className={styles.iconLabel}>Web</span>
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
                    <span className={styles.iconLabel}>電話</span>
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
