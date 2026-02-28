"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollTrigger } from "./useScrollTrigger";
import type { BusinessItem } from "@/lib/microcms";
import styles from "./BusinessSection.module.css";

const FIG8_PATH = "M 0.5,0.03 C 0.97,0.03 0.97,0.47 0.5,0.5 C 0.03,0.53 0.03,0.97 0.5,0.97 C 0.97,0.97 0.97,0.53 0.5,0.5 C 0.03,0.47 0.03,0.03 0.5,0.03 Z";

export default function BusinessSection({ businesses }: { businesses: BusinessItem[] }) {
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const { ref: listRef, visible: listVisible } = useScrollTrigger();

  return (
    <section id="business" className={styles.business}>
      <div className={styles.clipTop} />
      <div className={styles.content}>
        <div className={styles.inner}>
          <div
            ref={titleRef}
            className={`${styles.titleWrap} ${titleVisible ? styles.visible : ""}`}
          >
            <div className={styles.titleIcon}>
              <Image
                src="/images/common/icon_business.svg"
                alt=""
                width={100}
                height={100}
              />
            </div>
            <h2 className={`${styles.title} font-tsuku`}>物件事例</h2>
            <p className={styles.description}>
              白樺湖周辺で物件を取得して別荘や店舗として利用している方々にご協力いただき、生の声をインタビューさせていただきました。
            </p>
          </div>

          <div
            ref={listRef}
            className={`${styles.list} ${listVisible ? styles.visible : ""}`}
          >
            {businesses.map((biz) => (
              <Link
                key={biz.id}
                href={`/business/${encodeURIComponent(biz.id)}/`}
                className={styles.card}
              >
                <div className={styles.cardImage}>
                  {biz.image && (
                    <svg
                      viewBox="0 0 6 7"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.cardSvg}
                    >
                      <defs>
                        <clipPath id={`bizClip-${biz.id}`} clipPathUnits="objectBoundingBox">
                          <path d={FIG8_PATH} />
                        </clipPath>
                      </defs>
                      <image
                        href={biz.image}
                        x="0" y="0" width="6" height="7"
                        preserveAspectRatio="xMidYMid slice"
                        clipPath={`url(#bizClip-${biz.id})`}
                      />
                    </svg>
                  )}
                </div>
                <div className={styles.cardMeta}>
                  <h3 className={`${styles.cardName} font-kinto`}>{biz.name}</h3>
                  {biz.businessType && (
                    <span className={styles.cardType}>{biz.businessType}</span>
                  )}
                </div>
                <span className={`${styles.cardBtn} c-moreBtn`}>事例を見る</span>
              </Link>
            ))}
          </div>

          <div className={styles.bottomText}>
            <p className="font-kinto">
              白樺湖周辺で開業をお考えの方や、物件の活用についてお悩みの方は、ぜひお気軽にご相談ください。
            </p>
          </div>

          <div className={styles.more}>
            <Link href="/#contact" className="c-moreBtn blue">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.clipBottom} />
    </section>
  );
}
