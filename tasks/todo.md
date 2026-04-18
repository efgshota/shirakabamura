# 白樺村 公開後タスクリスト

> 最終更新: 2026-04-18
> ステータス: **🎉 本番公開済み** — 残タスクは公開後の改善・運用フェーズ

---

## ✅ 公開完了（2026-04-18）

- [x] PR #37 マージ — トップ物件カード刷新・SPアイコン修正
- [x] PR #38 マージ — favicon / apple-icon / OGP画像 追加
- [x] `src/app/icon.png`・`apple-icon.png`（180×180, ブランド色背景+ロゴ）
- [x] `src/app/opengraph-image.jpg`・`twitter-image.jpg`（1200×630）
- [x] `layout.tsx` 内の旧OGP画像指定を削除（Next.js ファイル規約で自動付与）
- [x] Resend ドメイン認証DNS（DKIM / SPF TXT / SPF MX / DMARC）を Vercel DNS に追加 → Verified
- [x] Resend 実送信テスト成功（`noreply@shirakabamura.com` → `shirakabamura@cfquod.jp`）
- [x] フォームバリデーション・reCAPTCHA v3 検証の動作確認
- [x] 本番デプロイ（efgshota-3561 / shirakabamura.com / Production Ready）
- [x] microCMS 物件データ入力完了（price / address / access / kindscat / purposecat）
- [x] `MICROCMS_WEBHOOK_SECRET` 即時反映設定
- [x] Vercel 環境変数（MICROCMS / RESEND / RECAPTCHA）Production設定
  - ⚠️ **公開直後に本番欠損が判明 → 同日追加＆再デプロイで修正**（RESEND_API_KEY / RECAPTCHA_SECRET_KEY / NEXT_PUBLIC_RECAPTCHA_SITE_KEY）
- [x] Vercel カスタムドメイン `shirakabamura.com` 適用（Aレコード・Nameservers）

---

## 🟡 公開直後に確認（今日〜数日以内）

### 実ユーザー動作確認
- [ ] **【暫定】管理者通知メールのBCC（`efgshota@gmail.com`）が動作確認後に届く**
  - 初期安定運用中のセーフティネット。**安定確認後にAPIコードから削除**する（`src/app/api/contact/route.ts`）
- [ ] ブラウザで実フォーム送信テスト（自分宛て）
  - [ ] 管理者通知が `shirakabamura@cfquod.jp` に届く
  - [ ] 自動返信が送信者に届く
  - [ ] **迷惑メール判定されていないか**（受信側で確認）
  - [ ] reCAPTCHA スコアが通常操作で 0.5 以上で通過するか
- [ ] iOS Safari でホーム画面追加 → apple-icon 表示確認
- [ ] PC / SP両方で全ページ表示崩れなし
- [ ] 各ページの内部リンク・CTAボタンが正しく機能するか

### OGP / SNS プレビュー確認
- [ ] Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- [ ] Twitter Card Validator（X Post Inspector）
- [ ] LINE にURL貼り付けでプレビュー確認
- [ ] Slack にURL貼り付けでOGP画像表示確認
- [ ] [opengraph.xyz](https://www.opengraph.xyz/url/https%3A%2F%2Fshirakabamura.com) での一括確認

### SEO 初期設定
- [ ] **Google Search Console にサイト登録**
  - [ ] プロパティ追加（shirakabamura.com）
  - [ ] 所有権確認（DNS TXT レコード or HTML メタタグ）
  - [ ] `sitemap.xml` 送信（`https://shirakabamura.com/sitemap.xml`）
  - [ ] インデックス登録リクエスト
- [ ] **Bing Webmaster Tools にも登録**（Search Console からインポート可能）
- [ ] `robots.txt` 本番反映確認（`https://shirakabamura.com/robots.txt`）
- [ ] `sitemap.xml` の全URLが200で返ってくるか

---

## 🟢 推奨（1〜2週間以内）

### PWA / マニフェスト
- [ ] `src/app/manifest.ts` 作成（PWA対応・ホーム画面追加時の挙動改善）
  - name / short_name / theme_color / background_color / icons

### パフォーマンス・品質
- [ ] PageSpeed Insights で Core Web Vitals 測定
- [ ] Lighthouse スコア確認（Performance / Accessibility / SEO / Best Practices）
- [ ] 画像最適化チェック（`next/image` の使用状況）
- [ ] JavaScript バンドルサイズ確認（`@next/bundle-analyzer`）

### SEO 強化
- [ ] 各ページに固有の `metadata`（title / description / OGP）が入っているか検証
  - `/property`, `/news`, `/stories`, `/info`, `/location-rental`
  - 動的ページ（`[slug]`）に `generateMetadata` で個別設定
- [ ] 構造化データ（JSON-LD）拡充
  - 物件ページ: `RealEstateListing`
  - 記事ページ: `Article` / `NewsArticle`
  - パンくずリスト: `BreadcrumbList`
- [ ] Google Analytics イベント設計
  - お問い合わせ送信
  - 物件詳細閲覧
  - 電話/LINE CTAクリック

### 旧WordPressからの移行
- [ ] **301 リダイレクト設定**（旧URL → 新URL）
  - WordPress時代の人気ページURLがあれば `next.config.ts` の `redirects` に追加
  - 外部リンク切れ防止

### 運用まわり
- [ ] エラー監視（Sentry 等）導入検討
- [ ] Uptime 監視（UptimeRobot / Better Stack）
- [ ] お問い合わせの受信通知フロー確認（担当者への転送等）

---

## 🔵 長期改善（月次〜四半期）

- [ ] ストーリー / お役立ち帳の定期更新運用フロー確立
- [ ] 物件の成約・掲載終了時のmicroCMS運用ルール（論理削除 or 非公開フラグ）
- [ ] アクセス解析レポート定期化
- [ ] A/Bテスト検討（CTAボタン文言・配置）
- [ ] 多言語対応（英語版）検討

---

## ベストプラクティス：公開前チェックリスト（全プロジェクト共通）

今後のプロジェクトでも使う標準チェックリスト（今回のlessons反映後）：

### メタデータ・SEO
- [ ] `src/app/icon.png`（32×32）/ `apple-icon.png`（180×180）設置
- [ ] `src/app/opengraph-image.{jpg,png}`（1200×630）設置 → Next.js ファイル規約
- [ ] `src/app/twitter-image.{jpg,png}`（1200×630）設置 or OGP共用
- [ ] `layout.tsx` の metadata に title / description / canonical / openGraph / twitter
- [ ] `robots.ts` / `sitemap.ts` 実装
- [ ] 動的ページは `generateMetadata` で個別 OGP
- [ ] JSON-LD（WebSite / Organization / 各ページタイプ）
- [ ] OGPデバッガーで確認済み（Facebook / Twitter / LINE / Slack）

### フォーム・メール
- [ ] Resend: ドメイン認証DNS（DKIM / SPF TXT / SPF MX / DMARC）すべて Verified
  - ⚠️ **リージョン確認**: Tokyo(ap-northeast-1) / US-East-1 でMXの値が異なる
  - ⚠️ DNS管理元が Vercel の場合、**藤井さんのVercel Dashboardで完結**できる
- [ ] `scripts/test-resend.mjs` 的な疎通確認スクリプトでローカル検証
- [ ] reCAPTCHA v3 Site Key / Secret Key 設定
- [ ] フォーム全ステップ動作（入力→確認→完了→エラー）
- [ ] メール送信先アドレスの正当性・迷惑メール判定確認

### インフラ
- [ ] 環境変数が全環境（production / preview）に設定されている
- [ ] `vercel whoami` で正しいアカウント/チームを確認
- [ ] CMS Webhook → `/api/revalidate` で即時反映
- [ ] SSL 証明書が有効（Vercel 自動）
- [ ] 301 リダイレクト（旧URL → 新URL）

### パフォーマンス・表示
- [ ] PC / SP 両方で表示崩れがない
- [ ] 画像が正しく表示される（外部URL含む）
- [ ] Core Web Vitals 許容範囲内
- [ ] `npm run build` + `npx tsc --noEmit` パス
