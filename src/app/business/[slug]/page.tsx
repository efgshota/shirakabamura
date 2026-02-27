import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getBusiness, getBusinesses, getFirstImageUrl } from "@/lib/microcms";
import { businesses as staticBusinesses } from "@/data/businesses";
import styles from "./page.module.css";

type BizData = {
  id: string;
  name: string;
  image: string;
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
    operator: b.operator,
    businessType: b.businessType,
    previousJob: b.previousJob,
    phone: b.phone,
    website: b.website,
    qa: b.qa,
  };
}

export async function generateStaticParams() {
  // MicroCMSとフォールバック両方のIDを返す
  const ids: string[] = [];
  try {
    const { contents } = await getBusinesses({ limit: 100 });
    ids.push(...contents.map((b) => b.id));
  } catch {
    // fallback
  }
  const staticIds = staticBusinesses.map((b) => b.slug);
  const allIds = Array.from(new Set([...ids, ...staticIds]));
  return allIds.map((id) => ({ slug: encodeURIComponent(id) }));
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

  // MicroCMSから取得を試みる
  try {
    const [detail, list] = await Promise.all([
      getBusiness(decoded),
      getBusinesses({ limit: 100 }),
    ]);
    biz = {
      id: detail.id,
      name: detail.title,
      image: getFirstImageUrl(detail.image),
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
      .filter((b) => b.id !== decoded)
      .map((b) => ({
        id: b.id,
        name: b.title,
        image: getFirstImageUrl(b.image),
      }));
  } catch {
    // 静的データフォールバック
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

  return (
    <div className={styles.page}>
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />
      <main className={styles.main}>
        <section className={styles.mv}>
          <div className={styles.mvContent}>
            {biz.image && (
              <div className={styles.mvImage}>
                <Image
                  src={biz.image}
                  alt={biz.name}
                  width={600}
                  height={520}
                  priority
                  className={styles.mvImg}
                />
              </div>
            )}
            <h1 className={`${styles.mvTitle} font-tsuku`}>{biz.name}</h1>
          </div>
        </section>

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

        {biz.qa.length > 0 && (
          <section className={styles.interview}>
            <div className={styles.inner}>
              <dl className={styles.qaList}>
                {biz.qa.map((item, i) => (
                  <div key={i} className={styles.qaItem}>
                    <dt className={`${styles.question} font-tsuku`}>
                      Q. {item.question}
                    </dt>
                    <dd className={styles.answer}>{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        <section className={styles.contact}>
          <div className={styles.inner}>
            {biz.phone && biz.phone !== "00000000000" && (
              <p className={styles.contactItem}>
                <span className={styles.contactLabel}>電話</span>
                <a href={`tel:${biz.phone}`}>{biz.phone}</a>
              </p>
            )}
            {biz.website && biz.website !== "https://shirakabamura.com/" && (
              <p className={styles.contactItem}>
                <span className={styles.contactLabel}>ウェブ</span>
                <a href={biz.website} target="_blank" rel="noopener noreferrer">
                  {biz.website}
                </a>
              </p>
            )}
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.inner}>
            <p className={styles.ctaText}>
              詳しいご説明など行いますので、お気軽にお問い合わせください。
            </p>
            <div className={styles.ctaBtn}>
              <Link href="/#contact" className="c-moreBtn blue">
                お問い合わせ
              </Link>
            </div>
          </div>
        </section>

        {allBizIds.length > 0 && (
          <section className={styles.related}>
            <div className={styles.inner}>
              <h2 className={`${styles.relatedTitle} font-tsuku`}>他の事例</h2>
              <div className={styles.relatedGrid}>
                {allBizIds.map((r) => (
                  <Link
                    key={r.id}
                    href={`/business/${encodeURIComponent(r.id)}/`}
                    className={styles.relatedCard}
                  >
                    {r.image && (
                      <div className={styles.relatedImage}>
                        <Image
                          src={r.image}
                          alt={r.name}
                          width={450}
                          height={390}
                          className={styles.relatedImg}
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
