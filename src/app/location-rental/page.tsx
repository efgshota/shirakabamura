import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "./HeroCarousel";
import StickyNav from "./StickyNav";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ロケーションレンタル（中之島）｜白樺村",
  description:
    "白樺湖に浮かぶ中之島をレンタルでご利用いただけます。イベント・ロケ地・スチール・ムービー撮影・ウェディングフォトなど、湖に浮かんでいるような幻想的な景色と空間をご提供します。",
};

export default function LocationRentalPage() {
  return (
    <div className={styles.page}>
      <Header />
      <StickyNav />

      <main className={styles.main}>
        {/* ══ Hero ══ */}
        <section className={styles.hero}>
          <HeroCarousel />
          <div className={styles.heroContent}>
            <p className={styles.heroEn}>Location Rental</p>
            <h1 className={`${styles.heroTitle} font-tsuku`}>中之島</h1>
            <p className={styles.heroSub}>白樺湖 ロケーションレンタル</p>
          </div>
        </section>

        {/* ══ Section: 中之島とは ══ */}
        <section id="nakanojima" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionEn}>About Nakanojima</span>
              <h2 className={`${styles.sectionTitle} font-tsuku`}>中之島とは</h2>
            </div>

            <p className={styles.catchCopy}>
              イベント / ロケ地 / スチール・ムービー撮影 / ウェディングフォトなど
            </p>
            <p className={styles.catchSub}>
              湖を渡ることでしか辿り着けないロケーションで、<br />
              湖に浮かんでいるような幻想的な景色や空間がお待ちしています。
            </p>

            <p className={styles.bodyText}>
              白樺湖の「中之島」は、湖の中心に浮かぶ美しい小島で、自然豊かな環境に囲まれた絶好の撮影スポットです。この小島は、白樺の木々が生い茂る静かな場所で、四季折々の風景が訪れる人を魅了します。春は新緑、夏は青々とした木々、秋には紅葉が色鮮やかに映え、冬は湖の静寂と相まって幻想的な雰囲気が広がります。
            </p>

            {/* Info table */}
            <div className={styles.infoTable}>
              <div className={styles.infoRow}>
                <dt className={styles.infoLabel}>所在地</dt>
                <dd className={styles.infoValue}>長野県茅野市</dd>
              </div>
              <div className={styles.infoRow}>
                <dt className={styles.infoLabel}>面積</dt>
                <dd className={styles.infoValue}>約2,000平方メートル（0.2ヘクタール）</dd>
              </div>
              <div className={styles.infoRow}>
                <dt className={styles.infoLabel}>利用可能時間</dt>
                <dd className={styles.infoValue}>日の出〜日の入り（季節により変動）</dd>
              </div>
              <div className={styles.infoRow}>
                <dt className={styles.infoLabel}>貸切利用可能人数</dt>
                <dd className={styles.infoValue}>〜20人（要相談）</dd>
              </div>
            </div>
          </div>
        </section>

        {/* ══ Section: アクセス ══ */}
        <section id="access" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionEn}>Access</span>
              <h2 className={`${styles.sectionTitle} font-tsuku`}>アクセス</h2>
            </div>

            {/* Map placeholder */}
            <div className={styles.mapWrap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.9!2d138.2!3d36.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601ce3b7c2e6d9a5%3A0x5d23d1f1b5e37b87!2z55aK5qmL5rmWIOe2gumZouWIsA!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp"
                className={styles.mapIframe}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="白樺湖 中之島マップ"
              />
            </div>

            <div className={styles.accessGrid}>
              <div className={styles.accessBlock}>
                <h3 className={styles.accessHead}>公共交通機関でお越しの場合</h3>
                <p className={styles.accessText}>
                  JR中央本線「茅野駅」より：路線バス（アルピコ交通）で約60分、タクシーで約45分<br />
                  特急バス：新宿駅より直通バスで約3時間30分<br />
                  名古屋駅より直通バスで約4時間
                </p>
              </div>
              <div className={styles.accessBlock}>
                <h3 className={styles.accessHead}>お車でお越しの場合</h3>
                <p className={styles.accessText}>
                  中央自動車道「諏訪ICまたは岡谷IC」より：約40分（一般道利用）<br />
                  上信越自動車道「佐久IC」より：約1時間（一般道利用）
                </p>
              </div>
              <div className={styles.accessBlock}>
                <h3 className={styles.accessHead}>最寄り駅・IC</h3>
                <p className={styles.accessText}>
                  最寄り駅：JR中央本線「茅野駅」<br />
                  最寄りIC：中央自動車道「諏訪IC」「岡谷IC」
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ Full-width banner ══ */}
        <div className={styles.banner}>
          <Image
            src="/images/location-rental/banner.png"
            alt="白樺湖 中之島"
            fill
            className={styles.bannerImg}
            sizes="100vw"
          />
        </div>

        {/* ══ Section: 利用シーンについて ══ */}
        <section id="scenes" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionEn}>Scenes</span>
              <h2 className={`${styles.sectionTitle} font-tsuku`}>利用シーンについて</h2>
            </div>
            <p className={styles.bodyText}>
              中之島は、その特異な立地から唯一無二の撮影環境を提供します。湖面に反射する光、白樺の木立、四季の表情——
              あらゆる表現のための舞台として、多彩なシーンにお応えします。
            </p>

            <div className={styles.sceneGrid}>
              {[
                { src: "/images/location-rental/scene-01.png", label: "ウェディングフォト" },
                { src: "/images/location-rental/scene-02.png", label: "映像・CM撮影" },
                { src: "/images/location-rental/scene-03.png", label: "スチール撮影" },
                { src: "/images/location-rental/scene-04.png", label: "ブランドイベント" },
                { src: "/images/location-rental/scene-05.png", label: "ロケ地利用" },
                { src: "/images/location-rental/scene-06.png", label: "アウトドアイベント" },
                { src: "/images/location-rental/scene-07.png", label: "自然体験" },
                { src: "/images/location-rental/scene-08.png", label: "その他" },
              ].map((scene, i) => (
                <div key={i} className={styles.sceneItem}>
                  <div className={styles.sceneImgWrap}>
                    <Image
                      src={scene.src}
                      alt={scene.label}
                      fill
                      className={styles.sceneImg}
                      sizes="(max-width: 767px) 50vw, 25vw"
                    />
                  </div>
                  <p className={styles.sceneLabel}>{scene.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ Section: サービス ══ */}
        <section id="service" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionEn}>Service</span>
              <h2 className={`${styles.sectionTitle} font-tsuku`}>サービス</h2>
            </div>

            <div className={styles.serviceGrid}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M8 32 Q10 28 16 28 L32 28 Q38 28 40 32 L42 36 H6 L8 32Z" fill="#94b3ba" opacity="0.6"/>
                    <ellipse cx="24" cy="28" rx="10" ry="4" fill="#7bbec8" opacity="0.4"/>
                    <path d="M20 28 L24 18 L28 28" stroke="#253c30" strokeWidth="1.5"/>
                    <circle cx="24" cy="16" r="3" fill="#253c30"/>
                  </svg>
                </div>
                <h3 className={`${styles.serviceTitle} font-tsuku`}>移動ボート（送迎付き）</h3>
                <p className={styles.serviceText}>
                  中之島へのアクセスにはボートになります。エンジン付きの4人定員のボートで、利用中は送迎スタッフがつきいつでも行き来が可能です。
                </p>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="8" y="20" width="32" height="20" rx="2" stroke="#253c30" strokeWidth="1.5"/>
                    <path d="M16 20 L20 12 L28 12 L32 20" stroke="#253c30" strokeWidth="1.5"/>
                    <line x1="24" y1="20" x2="24" y2="40" stroke="#94b3ba" strokeWidth="1.5"/>
                    <line x1="8" y1="30" x2="40" y2="30" stroke="#94b3ba" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3 className={`${styles.serviceTitle} font-tsuku`}>レンタル備品</h3>
                <p className={styles.serviceText}>
                  電源（ジェネレータ） / ライト / キャンプファイヤグッズ / 焚き火グッズ / 椅子 / テント
                  など、詳しくはお問合せください。
                </p>
                <p className={styles.serviceNote}>
                  ※備品一覧表はお問い合わせ時にご案内いたします
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ Section: 無人島でのルール ══ */}
        <section id="rules" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionEn}>Rules</span>
              <h2 className={`${styles.sectionTitle} font-tsuku`}>無人島での過ごし方 / ルール</h2>
            </div>

            <div className={styles.rulesGrid}>
              <div className={styles.ruleItem}>
                <h3 className={styles.ruleTitle}>持ち物</h3>
                <p className={styles.ruleText}>
                  当島では、安全で快適な滞在のため、以下の持ち物を必ずご持参ください。飲料水（1人1日あたり最低2L）、非常用食料、救急用品、防寒着、雨具、軽装の履物、日焼け止め、虫除け、ゴミ袋。貴重品の管理は各自の責任となります。携帯電話は圏外となる場合が多いため、必要に応じて衛星電話のレンタルをご検討ください。撮影機材などの大型機材をお持ち込みの際は、事前申請が必要です。
                </p>
              </div>

              <div className={styles.ruleItem}>
                <h3 className={styles.ruleTitle}>天候の注意</h3>
                <p className={styles.ruleText}>
                  当島は天候の変化が急激な場合があります。台風接近時や強風・大雨警報発令時は、安全確保のため利用を中止させていただきます。撮影や野外イベントの際は、予備日の設定をお勧めいたします。天候の急変により、予定の時間より早めの退島をお願いする場合がございます。事前に気象情報をご確認いただき、天候の悪化が予想される場合は日程の変更をご検討ください。
                </p>
              </div>

              <div className={styles.ruleItem}>
                <h3 className={styles.ruleTitle}>ごみ処理について</h3>
                <p className={styles.ruleText}>
                  当島は完全な持ち帰り制を実施しています。イベントや撮影で使用した道具、装飾品、機材等を含め、お持ち込みになった物は必ずすべてお持ち帰りください。島内にゴミ箱・ゴミ処理施設はございません。ゴミの分別にご協力いただき、それぞれ適切な袋に入れてお持ち帰りください。自然環境保護のため、ご協力をお願いいたします。
                </p>
              </div>

              <div className={styles.ruleItem}>
                <h3 className={styles.ruleTitle}>トイレのご案内</h3>
                <p className={styles.ruleText}>
                  島内には常設のトイレ施設はございません。簡易トイレをご持参いただくか、事前にレンタルのお申し込みをお願いいたします。長時間の撮影やイベント実施の際は、仮設トイレの設置を推奨いたします。使用済みの簡易トイレは必ずお持ち帰りください。自然環境保護のため、野外での用足しはご遠慮ください。
                </p>
              </div>

              <div className={styles.ruleItem}>
                <h3 className={styles.ruleTitle}>湖への飛び込み禁止</h3>
                <p className={styles.ruleText}>
                  安全管理の観点から、湖への飛び込みは固く禁止しております。湖底の状況は目視できず、危険物が存在する可能性があります。また、水深が場所により異なり、事故の危険性が高いため、遊泳の際は必ず指定された場所をご利用ください。撮影時も同様の規制が適用されます。
                </p>
              </div>

              <div className={styles.ruleItem}>
                <h3 className={styles.ruleTitle}>火の利用について</h3>
                <p className={styles.ruleText}>
                  火気の使用は指定された場所でのみ可能です。たき火、バーベキューは決められたエリアでご利用いただけます。使用の際は必ず事前申請が必要です。撮影やイベントで特殊な火気演出を行う場合は、別途許可申請と消防署への届出が必要となります。火気使用後は完全に消火されていることを確認してください。喫煙は指定された場所でのみ可能です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ Section: 利用料金 ══ */}
        <section id="price" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionEn}>Price</span>
              <h2 className={`${styles.sectionTitle} font-tsuku`}>利用料金</h2>
            </div>

            {/* 通常利用料 */}
            <div className={styles.priceBlock}>
              <h3 className={`${styles.priceBlockTitle} font-tsuku`}>通常利用料</h3>
              <div className={styles.priceTableWrap}>
                <table className={styles.priceTable}>
                  <thead>
                    <tr>
                      <th>時間帯</th>
                      <th>単位</th>
                      <th>平日</th>
                      <th>土日祝</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>日の出〜9:00 / 17:00〜日の入り<br /><span className={styles.priceNote}>早朝・夜間</span></td>
                      <td>30分ごと</td>
                      <td>要相談</td>
                      <td>要相談</td>
                    </tr>
                    <tr>
                      <td>9:00〜17:00<br /><span className={styles.priceNote}>通常時間帯</span></td>
                      <td>30分ごと</td>
                      <td>要相談</td>
                      <td>要相談</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 貸切利用料 */}
            <div className={styles.priceBlock}>
              <h3 className={`${styles.priceBlockTitle} font-tsuku`}>貸切利用料</h3>
              <div className={styles.priceTableWrap}>
                <table className={styles.priceTable}>
                  <thead>
                    <tr>
                      <th>プラン</th>
                      <th>平日</th>
                      <th>土日祝</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>午前 / 午後</td>
                      <td>150,000円</td>
                      <td>200,000円</td>
                    </tr>
                    <tr>
                      <td>早朝 / 夜間</td>
                      <td>70,000円</td>
                      <td>80,000円</td>
                    </tr>
                    <tr>
                      <td>全日</td>
                      <td colSpan={2}>90,000円</td>
                    </tr>
                    <tr>
                      <td>時間貸し（1H）</td>
                      <td>20,000円 / h</td>
                      <td>30,000円 / h</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className={styles.priceRemark}>※ 国立天文台特典：10％割引</p>
            </div>
          </div>
        </section>

        {/* ══ Section: 支払い方法 ══ */}
        <section id="payment" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionEn}>Payment</span>
              <h2 className={`${styles.sectionTitle} font-tsuku`}>支払い方法</h2>
            </div>

            <div className={styles.paymentBlock}>
              <p className={styles.paymentNote}>
                【事前支払い】ご利用日の14日前までに以下のいずれかの方法でお支払いをお願いいたします。
              </p>
              <div className={styles.paymentGrid}>
                <div className={styles.paymentMethod}>
                  <h4 className={styles.paymentMethodTitle}>銀行振込</h4>
                  <ul className={styles.paymentList}>
                    <li>請求書発行後、指定の口座へお振込みください</li>
                    <li>振込手数料はお客様負担となります</li>
                    <li>事前にお振込みの確認をさせていただきます</li>
                  </ul>
                </div>
                <div className={styles.paymentMethod}>
                  <h4 className={styles.paymentMethodTitle}>クレジットカード</h4>
                  <ul className={styles.paymentList}>
                    <li>VISA / MasterCard / JCB / AMEX がご利用可能です</li>
                    <li>オンライン決済システムにて事前決済となります</li>
                  </ul>
                </div>
              </div>
              <p className={styles.paymentNote} style={{ marginTop: 24 }}>
                【追加料金の精算】延長料金、追加レンタル品等の当日精算が必要な場合は当日もしくは請求書にて後日ご精算いただきます。
              </p>
            </div>
          </div>
        </section>

        {/* ══ Section: キャンセルポリシー ══ */}
        <section id="cancel" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionEn}>Cancellation Policy</span>
              <h2 className={`${styles.sectionTitle} font-tsuku`}>キャンセルポリシー</h2>
            </div>

            <p className={styles.bodyText}>
              ご予約のキャンセルにつきましては、以下の規定に基づきキャンセル料を申し受けます。
            </p>

            <div className={styles.cancelTableWrap}>
              <table className={styles.cancelTable}>
                <tbody>
                  <tr>
                    <td>利用日の30日前まで</td>
                    <td className={styles.cancelRate}>無料</td>
                  </tr>
                  <tr>
                    <td>利用日の29日前〜15日前まで</td>
                    <td className={styles.cancelRate}>利用料金の 30%</td>
                  </tr>
                  <tr>
                    <td>利用日の14日前〜7日前まで</td>
                    <td className={styles.cancelRate}>利用料金の 50%</td>
                  </tr>
                  <tr>
                    <td>利用日の6日前〜3日前まで</td>
                    <td className={styles.cancelRate}>利用料金の 70%</td>
                  </tr>
                  <tr>
                    <td>利用日の2日前〜前日まで</td>
                    <td className={styles.cancelRate}>利用料金の 80%</td>
                  </tr>
                  <tr>
                    <td>利用当日</td>
                    <td className={styles.cancelRate}>利用料金の 100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.cancelNotes}>
              <p>※ 荒天（強風、大雨、台風等）による中止の場合：</p>
              <p>　・当社都合による中止：キャンセル料は発生いたしません</p>
              <p>　・お客様判断による中止：上記キャンセルポリシーが適用されます</p>
              <br />
              <p>※ 予約時間の変更について：</p>
              <p>　・利用日の7日前までは無料で変更可能です</p>
              <p>　・6日前以降の変更は、キャンセルポリシーに準じた料金が発生いたします</p>
              <br />
              <p>※ キャンセル料の計算には、基本利用料金とお申し込みいただいたオプション料金が含まれます</p>
              <p>ご予約内容の変更・キャンセルは、必ず電話またはメールにてご連絡ください。</p>
              <p>災害等の不可抗力による場合は、個別にご相談させていただきます。</p>
            </div>
          </div>
        </section>

        {/* ══ Section: お申し込み / お問い合わせ ══ */}
        <section id="apply" className={styles.applySection}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={`${styles.sectionEn} ${styles.sectionEnLight}`}>Apply / Contact</span>
              <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight} font-tsuku`}>
                お申し込み / お問い合わせ
              </h2>
            </div>
            <p className={styles.applyText}>
              ご利用をご検討の方は、まずはお気軽にお問い合わせください。<br />
              日程・利用内容・人数等をお知らせいただければ、詳細なご案内をいたします。
            </p>
            <div className={styles.applyBtns}>
              <Link href="/#contact" className={`c-moreBtn ${styles.applyBtnPrimary}`}>
                お問い合わせフォーム
              </Link>
              <a
                href="https://lin.ee/shirakabamura"
                target="_blank"
                rel="noopener noreferrer"
                className={`c-moreBtn ${styles.applyBtnLine}`}
              >
                LINEで相談する
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
