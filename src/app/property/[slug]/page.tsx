import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyImagePlaceholder from "@/components/PropertyImagePlaceholder";
import JsonLd from "@/components/JsonLd";
import { getProperty, getProperties, getAllImageUrls, getFirstImageUrl } from "@/lib/microcms";
import { properties as staticProperties } from "@/data/properties";
import styles from "./page.module.css";

export const revalidate = 3600;

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
    const description =
      prop.description?.replace(/<[^>]*>/g, "").slice(0, 120) ||
      `${prop.location}の${prop.type?.[0] === "rent" ? "賃貸" : "売"}物件。${prop.specs ?? ""} ${prop.price ?? ""}`.trim();
    const imageUrl = getFirstImageUrl(prop.image);
    return {
      title: prop.title,
      description,
      openGraph: {
        title: `${prop.title}｜白樺村`,
        description,
        ...(imageUrl && { images: [{ url: imageUrl, alt: prop.title }] }),
      },
    };
  } catch {
    const staticProp = staticProperties.find((p) => p.slug === decodedSlug);
    return {
      title: staticProp?.title ?? "物件",
      description: staticProp?.description?.slice(0, 120) ?? "白樺湖周辺の自然ゆたかな物件情報。",
    };
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
    landArea?: string | null;
    specs?: string;
    detailsHtml?: string;
    details?: { label: string; value: string }[];
    comment?: string;
    description?: string;
  };

  // MicroCMS データを正規化
  function normalizeCms(p: Awaited<ReturnType<typeof getProperty>>): NormalizedProperty {
    const imageUrls = getAllImageUrls(p.image);
    const galleryUrls = getAllImageUrls(p.images);
    const allImages = [...imageUrls, ...galleryUrls];
    return {
      id: p.id,
      title: p.title,
      location: p.location,
      type: (p.type?.[0] ?? "sell") as "sell" | "rent",
      image: getFirstImageUrl(p.image),
      images: allImages,
      price: p.price,
      floorPlan: p.floorPlan,
      floorArea: p.floorArea,
      landArea: p.landArea,
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
      landArea: p.landArea,
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

  const realEstateSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: prop.title,
    description: prop.description?.replace(/<[^>]*>/g, "") ?? prop.comment ?? "",
    url: `https://shirakabamura.com/property/${encodeURIComponent(prop.id)}/`,
    ...(prop.image && { image: prop.image }),
    offers: {
      "@type": "Offer",
      price: prop.price,
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: prop.location,
      addressRegion: "長野県",
      addressCountry: "JP",
    },
    floorSize: prop.floorArea
      ? { "@type": "QuantitativeValue", value: prop.floorArea }
      : undefined,
    numberOfRooms: prop.floorPlan ?? undefined,
  };

  return (
    <div className={styles.page}>
      <JsonLd data={realEstateSchema} />
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
            <h1 className={styles.title}>{prop.title}</h1>
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
                  <p className={styles.specValue}>{prop.floorPlan}</p>
                </div>
                <div className={styles.specItem}>
                  <p className={styles.specLabel}>延床面積</p>
                  <p className={styles.specValue}>{prop.floorArea}</p>
                </div>
                {prop.landArea && (
                  <div className={styles.specItem}>
                    <p className={styles.specLabel}>土地面積</p>
                    <p className={styles.specValue}>{prop.landArea}</p>
                  </div>
                )}
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
          <div className={styles.commentHeader}>
            <span className={styles.commentVertical}>
              担当者
            </span>
            <Image
              src="/images/property/comment.svg"
              alt=""
              width={92}
              height={99}
              className={styles.commentBird}
            />
            <span className={styles.commentLabel}>
              コメント
            </span>
          </div>
          <div className={styles.commentBody}>
            {(prop.comment && prop.comment.trim() !== "") ? (
              prop.comment.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))
            ) : (
              <p>白樺湖の西岸、標高約1,400mに位置する自然豊かなロケーションの物件です。リビングの大きな窓からは四季折々の美しい山並みを望むことができ、特に秋の紅葉シーズンは圧巻の景色が広がります。建物は2018年にフルリノベーション済みで、断熱性能も大幅に向上しています。別荘としてはもちろん、近年はリモートワークの拠点として移住される方も増えています。周辺にはスキー場や温泉施設、地元の農産物直売所もあり、年間を通じて充実した暮らしが楽しめます。車で10分圏内にスーパーや病院もあるので、定住にも安心です。ぜひ一度現地をご覧ください。</p>
            )}
          </div>
          <div className={styles.contactBtn}>
            <Link href="/#contact" className="c-moreBtn">
              お問い合わせ
            </Link>
          </div>
        </section>

        {/* Recommended */}
        <section className={styles.recommended}>
          <div className={styles.inner}>
            <h2 className={styles.recommendedTitle}>
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
                    {r.image ? (
                      <Image
                        src={r.image}
                        alt={r.title}
                        width={200}
                        height={150}
                        className={styles.recCardImg}
                      />
                    ) : (
                      <PropertyImagePlaceholder className={styles.recCardImg} />
                    )}
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
