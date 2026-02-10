import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { businesses } from "@/data/businesses";
import styles from "./page.module.css";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const biz = businesses.find(
      (b) => b.slug === decodeURIComponent(slug)
    );
    return { title: biz ? `${biz.name}｜白樺村` : "事業者｜白樺村" };
  });
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const biz = businesses.find((b) => b.slug === decodedSlug);

  if (!biz) notFound();

  const related = businesses.filter((b) => b.slug !== decodedSlug);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.mv}>
          <div className={styles.mvContent}>
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
              <div className={styles.profileItem}>
                <dt>事業者名</dt>
                <dd>{biz.operator}</dd>
              </div>
              <div className={styles.profileItem}>
                <dt>事業属性</dt>
                <dd>{biz.businessType}</dd>
              </div>
              <div className={styles.profileItem}>
                <dt>前職</dt>
                <dd>{biz.previousJob}</dd>
              </div>
            </dl>
          </div>
        </section>

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

        <section className={styles.contact}>
          <div className={styles.inner}>
            {biz.phone && biz.phone !== "00000000000" && (
              <p className={styles.contactItem}>
                <span className={styles.contactLabel}>電話</span>
                <a href={`tel:${biz.phone}`}>{biz.phone}</a>
              </p>
            )}
            {biz.website &&
              biz.website !== "https://shirakabamura.com/" && (
                <p className={styles.contactItem}>
                  <span className={styles.contactLabel}>ウェブ</span>
                  <a
                    href={biz.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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

        <section className={styles.related}>
          <div className={styles.inner}>
            <h2 className={`${styles.relatedTitle} font-tsuku`}>他の事例</h2>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/business/${encodeURIComponent(r.slug)}/`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImage}>
                    <Image
                      src={r.image}
                      alt={r.name}
                      width={450}
                      height={390}
                      className={styles.relatedImg}
                    />
                  </div>
                  <h3 className={`${styles.relatedName} font-kinto`}>
                    {r.name}
                  </h3>
                  <span className="c-moreBtn">事例を見る</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
