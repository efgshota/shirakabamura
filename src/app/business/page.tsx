import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBusinesses, getFirstImageUrl } from "@/lib/microcms";
import { businesses as staticBusinesses } from "@/data/businesses";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "物件事例",
  description:
    "白樺湖周辺で物件を取得して別荘や店舗として利用している方々にご協力いただき、生の声をインタビューさせていただきました。",
  openGraph: {
    title: "物件事例｜白樺村",
    description:
      "白樺湖周辺で物件を取得して別荘や店舗として利用している方々にご協力いただき、生の声をインタビューさせていただきました。",
  },
};

const FIG8_PATH =
  "M 0.816,0.498 C 0.928,0.447 1,0.369 1,0.281 C 1,0.126 0.776,0 0.5,0 C 0.224,0 0,0.126 0,0.281 C 0,0.369 0.072,0.447 0.184,0.498 C 0.072,0.550 0,0.628 0,0.716 C 0,0.871 0.224,0.997 0.5,0.997 C 0.776,0.997 1,0.871 1,0.716 C 1,0.628 0.928,0.550 0.816,0.498 Z";

type BizItem = {
  id: string;
  name: string;
  image: string;
  businessType?: string;
};

export default async function BusinessListPage() {
  let items: BizItem[] = [];

  try {
    const { contents } = await getBusinesses({ limit: 100 });
    if (contents.length > 0) {
      items = contents.map((b) => ({
        id: b.id,
        name: b.title,
        image: getFirstImageUrl(b.image),
        businessType: b.businessType,
      }));
    }
  } catch {
    // fallback
  }

  if (items.length === 0) {
    items = staticBusinesses.map((b) => ({
      id: b.slug,
      name: b.name,
      image: b.image,
      businessType: b.businessType,
    }));
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <div className={`${styles.titleIcon} c-iconTitle`}>
              <h1 className="c-iconTitle__text">物件事例</h1>
              <Image
                className="c-iconTitle__icon"
                src="/images/common/icon_business.svg"
                alt=""
                width={100}
                height={100}
              />
            </div>
            <p className={styles.subtitle}>
              白樺湖周辺で物件を取得して別荘や店舗として利用している方々に
              <br />
              ご協力いただき、生の声をインタビューさせていただきました。
            </p>
          </div>
        </section>

        <section className={styles.listSection}>
          <div className={styles.inner}>
            <div className={styles.grid}>
              {items.map((biz) => (
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
                          <clipPath
                            id={`bizClip-${biz.id}`}
                            clipPathUnits="objectBoundingBox"
                          >
                            <path d={FIG8_PATH} />
                          </clipPath>
                        </defs>
                        <image
                          href={biz.image}
                          x="0"
                          y="0"
                          width="300"
                          height="261"
                          preserveAspectRatio="xMidYMid slice"
                          clipPath={`url(#bizClip-${biz.id})`}
                        />
                      </svg>
                    )}
                  </div>
                  <h2 className={`${styles.cardName} font-kinto`}>{biz.name}</h2>
                  <span className="c-moreBtn">事例を見る</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.inner}>
            <p className={styles.ctaText}>
              白樺湖周辺で開業をお考えの方や、物件の活用についてお悩みの方は、
              <br />
              ぜひお気軽にご相談ください。
            </p>
            <Link href="/#contact" className="c-moreBtn">
              お問い合わせ
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
