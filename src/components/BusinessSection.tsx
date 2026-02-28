"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollTrigger } from "./useScrollTrigger";
import type { BusinessItem } from "@/lib/microcms";
import styles from "./BusinessSection.module.css";

const FIG8_PATH = "M 0.816,0.498 C 0.928,0.447 1,0.369 1,0.281 C 1,0.126 0.776,0 0.5,0 C 0.224,0 0,0.126 0,0.281 C 0,0.369 0.072,0.447 0.184,0.498 C 0.072,0.550 0,0.628 0,0.716 C 0,0.871 0.224,0.997 0.5,0.997 C 0.776,0.997 1,0.871 1,0.716 C 1,0.628 0.928,0.550 0.816,0.498 Z";

export default function BusinessSection({ businesses }: { businesses: BusinessItem[] }) {
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const { ref: listRef, visible: listVisible } = useScrollTrigger();

  return (
    <section id="business" className={styles.business}>
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
                      viewBox="0 0 300 261"
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
                        x="0" y="0" width="300" height="261"
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
            <Link href="/#contact" className="c-moreBtn">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
