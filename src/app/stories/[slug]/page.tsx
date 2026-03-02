import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getBusiness, getBusinesses, getFirstImageUrl } from "@/lib/microcms";
import { businesses as staticBusinesses } from "@/data/businesses";
import styles from "./page.module.css";

export const revalidate = 3600;

const FIG8_PATH =
  "M 0.816,0.498 C 0.928,0.447 1,0.369 1,0.281 C 1,0.126 0.776,0 0.5,0 C 0.224,0 0,0.126 0,0.281 C 0,0.369 0.072,0.447 0.184,0.498 C 0.072,0.550 0,0.628 0,0.716 C 0,0.871 0.224,0.997 0.5,0.997 C 0.776,0.997 1,0.871 1,0.716 C 1,0.628 0.928,0.550 0.816,0.498 Z";

type BizData = {
  id: string;
  name: string;
  image: string;
  photoUrl: string;
  operator?: string;
  businessType?: string;
  previousJob?: string;
  phone?: string;
  website?: string;
  qa: { question: string; answer: string }[];
};

function normalizeStaticBiz(b: (typeof staticBusinesses)[number]): BizData {
  return {
    id: b.slug,
    name: b.name,
    image: b.image,
    photoUrl: b.photo ?? b.image,
    operator: b.operator,
    businessType: b.businessType,
    previousJob: b.previousJob,
    phone: b.phone,
    website: b.website,
    qa: b.qa,
  };
}

export async function generateStaticParams() {
  const slugs: string[] = [];
  try {
    const { contents } = await getBusinesses({ limit: 100 });
    slugs.push(...contents.map((b) => b.slug ?? b.id));
  } catch {
    // fallback
  }
  const staticSlugs = staticBusinesses.map((b) => b.slug);
  const allSlugs = Array.from(new Set([...slugs, ...staticSlugs]));
  return allSlugs.map((s) => ({ slug: encodeURIComponent(s) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);

  let name = "";
  let businessType = "";
  let operator = "";
  let image = "";

  try {
    const biz = await getBusiness(decoded);
    name = biz.title;
    businessType = biz.businessType ?? "";
    operator = biz.operator ?? "";
    image = getFirstImageUrl(biz.image);
  } catch {
    const staticBiz = staticBusinesses.find((b) => b.slug === decoded);
    if (staticBiz) {
      name = staticBiz.name;
      businessType = staticBiz.businessType;
      operator = staticBiz.operator;
      image = staticBiz.image;
    }
  }

  if (!name) return { title: "事業者" };

  return {
    title: name,
    description: `${name}（${businessType}）の開業ストーリー。${operator}が白樺湖で開業した経緯や、現地での暮らしについてご紹介します。`,
    openGraph: {
      title: `${name}｜白樺村`,
      description: `${name}（${businessType}）の開業ストーリー。${operator}が白樺湖で開業した経緯や、現地での暮らしについてご紹介します。`,
      images: image ? [{ url: image, alt: name }] : [],
    },
  };
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);

  let biz: BizData | null = null;
  let allBizIds: { id: string; name: string; image: string }[] = [];

  try {
    // slug フィールドで検索し、なければ id で取得
    const list = await getBusinesses({ limit: 100 });
    const matched = list.contents.find(
      (b) => (b.slug ?? b.id) === decoded
    );
    const detail = matched
      ? await getBusiness(matched.id)
      : await getBusiness(decoded);
    const mainImage = getFirstImageUrl(detail.image);
    biz = {
      id: detail.id,
      name: detail.title,
      image: mainImage,
      photoUrl: mainImage,
      operator: detail.operator,
      businessType: detail.businessType,
      previousJob: detail.previousJob,
      phone: detail.phone,
      website: detail.website,
      qa: (detail.qa ?? []).map((q) => ({
        question: q.question,
        answer: q.answer,
      })),
    };
    allBizIds = list.contents
      .filter((b) => (b.slug ?? b.id) !== decoded)
      .map((b) => ({
        id: b.slug ?? b.id,
        name: b.title,
        image: getFirstImageUrl(b.image),
      }));
  } catch {
    const staticBiz = staticBusinesses.find((b) => b.slug === decoded);
    if (staticBiz) {
      biz = normalizeStaticBiz(staticBiz);
      allBizIds = staticBusinesses
        .filter((b) => b.slug !== decoded)
        .map((b) => ({ id: b.slug, name: b.name, image: b.image }));
    }
  }

  if (!biz) notFound();

  const faqSchema =
    biz.qa.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: biz.qa.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  const hasPhone = biz.phone && biz.phone !== "00000000000";
  const hasWebsite =
    biz.website && biz.website !== "https://shirakabamura.com/";

  return (
    <div className={styles.page}>
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />

      {/* 全ページ共通クリップパス定義 */}
      <svg
        width="0"
        height="0"
        aria-hidden
        style={{ position: "absolute", overflow: "hidden" }}
      >
        <defs>
          <clipPath id="bizMvClip" clipPathUnits="objectBoundingBox">
            <path d={FIG8_PATH} />
          </clipPath>
          {allBizIds.map((r) => (
            <clipPath
              key={r.id}
              id={`relClip-${r.id}`}
              clipPathUnits="objectBoundingBox"
            >
              <path d={FIG8_PATH} />
            </clipPath>
          ))}
        </defs>
      </svg>

      <main className={styles.main}>
        {/* MV: FIG8クリップ画像 + タイトル */}
        <section className={styles.mv}>
          {biz.image && (
            <div className={styles.mvImage}>
              <Image
                src={biz.image}
                alt={biz.name}
                fill
                className={styles.mvImg}
                sizes="(max-width: 767px) 80vw, 660px"
                priority
              />
            </div>
          )}
          <h1 className={`${styles.mvTitle} font-kinto`}>{biz.name}</h1>
        </section>

        {/* プロフィール */}
        <section className={styles.profile}>
          <div className={styles.inner}>
            <dl className={styles.profileList}>
              <div className={styles.profileItem}>
                <dt>施設名</dt>
                <dd>{biz.name}</dd>
              </div>
              {biz.operator && (
                <div className={styles.profileItem}>
                  <dt>事業者名</dt>
                  <dd>{biz.operator}</dd>
                </div>
              )}
              {biz.businessType && (
                <div className={styles.profileItem}>
                  <dt>事業属性</dt>
                  <dd>{biz.businessType}</dd>
                </div>
              )}
              {biz.previousJob && (
                <div className={styles.profileItem}>
                  <dt>前職</dt>
                  <dd>{biz.previousJob}</dd>
                </div>
              )}
            </dl>
          </div>
        </section>

        {/* 全幅写真 */}
        {biz.photoUrl && (
          <div className={styles.fullPhoto}>
            <Image
              src={biz.photoUrl}
              alt={biz.name}
              fill
              className={styles.fullPhotoImg}
              sizes="100vw"
            />
          </div>
        )}

        {/* インタビューQ&A */}
        {biz.qa.length > 0 && (
          <section className={styles.interview}>
            <div className={styles.inner}>
              {biz.qa.map((item, i) => (
                <div key={i} className={styles.qaItem}>
                  <p className={styles.question}>Q. {item.question}</p>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* もっと [name] セクション */}
        <section className={styles.more}>
          <div className={styles.moreCardWrap}>
            <Image
              src="/images/common/icon_business.svg"
              alt=""
              width={80}
              height={63}
              className={styles.moreIcon}
            />
            <div className={styles.moreCard}>
              <p className={`${styles.moreLabel} font-kinto`}>もっと</p>
              <h2 className={`${styles.moreName} font-kinto`}>{biz.name}</h2>

              {(hasPhone || hasWebsite) && (
                <div className={styles.moreLinks}>
                  {hasWebsite && (
                    <a
                      href={biz.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.moreLink}
                    >
                      <Image
                        src="/images/common/icon_web.svg"
                        alt="ウェブサイト"
                        width={44}
                        height={44}
                      />
                      <span className={styles.moreLinkLabel}>ウェブ</span>
                    </a>
                  )}
                  {hasPhone && (
                    <a href={`tel:${biz.phone}`} className={styles.moreLink}>
                      <Image
                        src="/images/common/icon_tel.svg"
                        alt="電話"
                        width={44}
                        height={44}
                      />
                      <span className={styles.moreLinkLabel}>電話</span>
                    </a>
                  )}
                </div>
              )}

              <div className={styles.shirakabako}>
                <a
                  href="https://shirakabako.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shirakabakoBanner}
                >
                  <Image
                    src="/images/business/hygge/banner.png"
                    alt="白樺湖のこと"
                    width={400}
                    height={400}
                    className={styles.shirakabakoBannerImg}
                  />
                </a>
                <a
                  href="https://shirakabako.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shirakabakLink}
                >
                  観光案内サイト「白樺湖のこと」で見る
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 他の事例 */}
        {allBizIds.length > 0 && (
          <section className={styles.related}>
            <div className={styles.relatedInner}>
              <h2 className={styles.relatedTitle}>他の事例</h2>
              <div className={styles.relatedGrid}>
                {allBizIds.map((r) => (
                  <Link
                    key={r.id}
                    href={`/stories/${encodeURIComponent(r.id)}/`}
                    className={styles.relatedCard}
                  >
                    {r.image && (
                      <div
                        className={styles.relatedImage}
                        style={{ clipPath: `url(#relClip-${r.id})` }}
                      >
                        <Image
                          src={r.image}
                          alt={r.name}
                          fill
                          className={styles.relatedImg}
                          sizes="(max-width: 767px) 80vw, 300px"
                        />
                      </div>
                    )}
                    <h3 className={`${styles.relatedName} font-kinto`}>
                      {r.name}
                    </h3>
                    <span className="c-moreBtn">事例を見る</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
