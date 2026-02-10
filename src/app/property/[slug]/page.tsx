import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import { properties } from "@/data/properties";
import styles from "./page.module.css";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const prop = properties.find(
      (p) => p.slug === decodeURIComponent(slug)
    );
    return { title: prop ? `${prop.title}｜白樺村` : "物件｜白樺村" };
  });
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const prop = properties.find((p) => p.slug === decodedSlug);

  if (!prop) notFound();

  const related = properties.filter((p) => p.slug !== decodedSlug);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbInner}>
            <Link href="/property/" className={styles.backLink}>
              物件一覧
            </Link>
            <span className={styles.typeBadge}>
              {prop.type === "sell" ? "売物件" : "賃貸"}
            </span>
          </div>
        </div>

        {/* Title */}
        <section className={styles.titleSection}>
          <div className={styles.inner}>
            <h1 className={`${styles.title} font-tsuku`}>{prop.title}</h1>
            <p className={styles.location}>{prop.location}</p>
          </div>
        </section>

        {/* Gallery */}
        <section className={styles.galleryWrap}>
          <div className={styles.inner}>
            <PropertyGallery images={prop.images} title={prop.title} />
          </div>
        </section>

        {/* Specs */}
        <section className={styles.specsSection}>
          <div className={styles.inner}>
            <div className={styles.specsGrid}>
              <div className={styles.specsMain}>
                <div className={styles.specItem}>
                  <p className={styles.specLabel}>価格</p>
                  <p className={styles.specPrice}>{prop.price}</p>
                </div>
                <div className={styles.specItem}>
                  <p className={styles.specLabel}>間取り</p>
                  <p className={styles.specValue}>
                    <span className={styles.specFloorPlan}>
                      {prop.floorPlan}
                      <svg
                        className={styles.floorPlanIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </span>
                  </p>
                </div>
                <div className={styles.specItem}>
                  <p className={styles.specLabel}>延床面積</p>
                  <p className={styles.specValue}>{prop.floorArea}</p>
                </div>
                <div className={styles.specItem}>
                  <p className={styles.specLabel}>土地面積</p>
                  <p className={styles.specValue}>{prop.landArea}</p>
                </div>
              </div>

              <div className={styles.specsDetail}>
                <table className={styles.detailTable}>
                  <tbody>
                    {prop.details.map((d, i) => (
                      <tr key={i}>
                        <th>{d.label}</th>
                        <td>{d.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Comment */}
        <section className={styles.commentSection}>
          <div className={styles.inner}>
            <div className={styles.commentHeader}>
              <span className={`${styles.commentVertical} font-tsuku`}>
                担当者
              </span>
              <span className={`${styles.commentLabel} font-tsuku`}>
                コメント
              </span>
              <svg
                className={styles.commentBird}
                width="40"
                height="28"
                viewBox="0 0 120 80"
                fill="none"
              >
                <path
                  d="M60 40C40 20 15 15 2 25C15 20 35 22 50 35L45 30C30 18 10 18 2 25"
                  fill="#C8A84E"
                  opacity="0.9"
                />
                <path
                  d="M60 40C80 20 105 15 118 25C105 20 85 22 70 35L75 30C90 18 110 18 118 25"
                  fill="#C8A84E"
                  opacity="0.9"
                />
                <ellipse cx="60" cy="42" rx="8" ry="5" fill="#C8A84E" />
                <path
                  d="M52 42L30 55L35 48"
                  fill="#C8A84E"
                  opacity="0.7"
                />
              </svg>
            </div>
            <div className={styles.commentBody}>
              {prop.comment.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < prop.comment.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
            <div className={styles.contactLink}>
              <Link href="/#contact" className={styles.contactLinkText}>
                お問い合わせ →
              </Link>
            </div>
          </div>
        </section>

        {/* Recommended */}
        <section className={styles.recommended}>
          <div className={styles.inner}>
            <h2 className={`${styles.recommendedTitle} font-tsuku`}>
              おすすめの物件
            </h2>
            <div className={styles.recommendedGrid}>
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/property/${encodeURIComponent(r.slug)}/`}
                  className={styles.recCard}
                >
                  <div className={styles.recCardImage}>
                    <Image
                      src={r.image}
                      alt={r.title}
                      width={200}
                      height={150}
                      className={styles.recCardImg}
                    />
                  </div>
                  <div className={styles.recCardBody}>
                    {r.specs && (
                      <p className={styles.recCardSpecs}>{r.specs}</p>
                    )}
                    {r.description && (
                      <p className={styles.recCardDesc}>
                        {r.description.split("\n").map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < r.description!.split("\n").length - 1 && (
                              <br />
                            )}
                          </span>
                        ))}
                      </p>
                    )}
                    {r.price && (
                      <p className={styles.recCardPrice}>{r.price}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className={styles.allBtn}>
              <Link href="/property/" className="c-moreBtn">
                すべて見る
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
