"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollTrigger } from "./useScrollTrigger";
import type { BusinessItem } from "@/lib/microcms";
import styles from "./BusinessSection.module.css";

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
                      width={300}
                      height={255}
                      className={styles.cardImg}
                    />
                  )}
                </div>
                <div className={styles.cardMeta}>
                  <h3 className={`${styles.cardName} font-kinto`}>{biz.name}</h3>
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
