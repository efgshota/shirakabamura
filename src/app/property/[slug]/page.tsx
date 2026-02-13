import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import { getProperty, getProperties } from "@/lib/microcms";
import { properties as staticProperties } from "@/data/properties";
import styles from "./page.module.css";

export async function generateStaticParams() {
  try {
    const { contents } = await getProperties({ limit: 100 });
    if (contents.length > 0) {
      return contents.map((p) => ({ slug: p.id }));
    }
  } catch {
    // fallback to static
  }
  return staticProperties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  try {
    const prop = await getProperty(decodedSlug);
    return { title: `${prop.title}｜白樺村` };
  } catch {
    const staticProp = staticProperties.find((p) => p.slug === decodedSlug);
    return { title: staticProp ? `${staticProp.title}｜白樺村` : "物件｜白樺村" };
  }
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // 正規化された物件データ型
  type NormalizedProperty = {
    id: string;
    title: string;
    location: string;
    type: "sell" | "rent";
    image: string;
    images: string[];
    price: string;
    floorPlan?: string | null;
    floorArea?: string | null;
    specs?: string;
    detailsHtml?: string;
    details?: { label: string; value: string }[];
    comment?: string;
    description?: string;
  };

  // MicroCMS データを正規化
  function normalizeCms(p: Awaited<ReturnType<typeof getProperty>>): NormalizedProperty {
    const allImages = [...(p.image ?? []), ...(p.images ?? [])];
    return {
      id: p.id,
      title: p.title,
      location: p.location,
      type: (p.type?.[0] ?? "sell") as "sell" | "rent",
      image: allImages[0]?.url ?? "",
      images: allImages.map((img) => img.url),
      price: p.price,
      floorPlan: p.floorPlan,
      floorArea: p.floorArea,
      specs: p.specs,
      detailsHtml: p.details ?? undefined,
      comment: p.comment,
      description: p.description?.replace(/<[^>]*>/g, ""),
    };
  }

  // 静的データを正規化
  function normalizeStatic(p: (typeof staticProperties)[number]): NormalizedProperty {
    return {
      id: p.slug,
      title: p.title,
      location: p.location,
      type: p.type,
      image: p.image,
      images: p.images,
      price: p.price,
      floorPlan: p.floorPlan,
      floorArea: p.floorArea,
      specs: p.specs,
      details: p.details,
      comment: p.comment,
      description: p.description,
    };
  }

  // MicroCMS から取得を試み、失敗したら静的データにフォールバック
  let prop: NormalizedProperty | null = null;

  try {
    const cmsProp = await getProperty(decodedSlug);
    prop = normalizeCms(cmsProp);
  } catch {
    const staticProp = staticProperties.find((p) => p.slug === decodedSlug);
    if (staticProp) prop = normalizeStatic(staticProp);
  }

  if (!prop) notFound();

  // おすすめ物件を取得
  let related: NormalizedProperty[] = [];
  try {
    const { contents } = await getProperties({ limit: 4 });
    related = contents
      .filter((p) => p.id !== prop!.id)
      .slice(0, 4)
      .map(normalizeCms);
  } catch {
    related = staticProperties
      .filter((p) => p.slug !== prop!.id)
      .map(normalizeStatic);
  }

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
                {/* 土地面積は details HTML 内に含まれる */}
              </div>

              <div className={styles.specsDetail}>
                {prop.detailsHtml ? (
                  <div
                    className={styles.detailTable}
                    dangerouslySetInnerHTML={{ __html: prop.detailsHtml }}
                  />
                ) : prop.details ? (
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
                ) : null}
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
              {(prop.comment ?? "").split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
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
                  key={r.id}
                  href={`/property/${encodeURIComponent(r.id)}/`}
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
