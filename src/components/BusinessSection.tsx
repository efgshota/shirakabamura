"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollTrigger } from "./useScrollTrigger";
import type { BusinessItem } from "@/lib/microcms";
import styles from "./BusinessSection.module.css";

/* 横倒し8の字（figure-8）クリップパス — objectBoundingBox 正規化済み */
const FIG8_PATH =
  "M 0.816,0.498 C 0.928,0.447 1,0.369 1,0.281 C 1,0.126 0.776,0 0.5,0 C 0.224,0 0,0.126 0,0.281 C 0,0.369 0.072,0.447 0.184,0.498 C 0.072,0.550 0,0.628 0,0.716 C 0,0.871 0.224,0.997 0.5,0.997 C 0.776,0.997 1,0.871 1,0.716 C 1,0.628 0.928,0.550 0.816,0.498 Z";

export default function BusinessSection({ businesses }: { businesses: BusinessItem[] }) {
  const { ref: titleRef, visible: titleVisible } = useScrollTrigger();
  const { ref: listRef, visible: listVisible } = useScrollTrigger();

  return (
    <section id="business" className={styles.business}>
      {/* FIG8 クリップパス定義（非表示SVG） */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute", overflow: "hidden" }}>
        <defs>
          <clipPath id="bizFig8Clip" clipPathUnits="objectBoundingBox">
            <path d={FIG8_PATH} />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.content}>
        <div className={styles.inner}>
          <div
            ref={titleRef}
            className={`${styles.titleWrap} ${titleVisible ? styles.visible : ""}`}
          >
            <div className={`${styles.titleIcon} c-iconTitle`}>
              <h2 className="c-iconTitle__text">物件事例</h2>
              <Image
                className="c-iconTitle__icon"
                src="/images/common/icon_business.svg"
                alt=""
                width={100}
                height={100}
              />
            </div>
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
                    <Image
                      src={biz.image}
                      alt={biz.name}
                      fill
                      className={styles.cardImg}
                      sizes="(max-width: 767px) 100vw, 50vw"
                    />
                  )}
                </div>
                <div className={styles.cardMeta}>
                  <h3 className={`${styles.cardName} font-kinto`}>
                    {biz.name}{biz.businessType ? `（${biz.businessType}）` : ""}
                  </h3>
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
