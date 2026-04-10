# 白樺村 公開前タスクリスト

> 最終更新: 2026-04-11
> ステータス: プレビュー確認中 → DNS切り替えで公開

---

## 🔴 必須（公開ブロッカー）

### コード修正

- [ ] **Favicon 追加** — 現在サイトにfaviconが一切ない
  - `/src/app/favicon.ico` または `/public/favicon.ico`
  - `/src/app/apple-icon.png`（180x180）
  - デザインは Figma から取得 or 藤井さんに確認

- [ ] **OGP 整備**
  - [ ] トップページ `/` に `metadata` export を追加（現在なし、layout.tsxのデフォルトのみ）
  - [ ] 各ページに `twitter` カード設定を追加（全ページで欠落）
  - [ ] リストページ（/property, /news, /stories, /info）に個別OGP画像設定
  - [ ] OGPデバッガーで確認（Facebook, Twitter, LINE）

- [ ] **お問い合わせフォームの動作チェック**
  - [ ] Resend 経由のメール送信が正常に動作するか
  - [ ] reCAPTCHA が機能しているか
  - [ ] 送信後の画面遷移・メッセージ
  - [ ] 受信先メールアドレスの確認

### microCMS（柴田さん）

- [ ] **各物件のデータ入力**
  - [ ] `price`（価格）
  - [ ] `address`（住所）
  - [ ] `access`（アクセス）
  - [ ] `kindscat`（建物 / 土地）— フィールド追加済み
  - [ ] `purposecat`（居住用 / 事業用 / 別荘）— フィールド追加済み

### ドメイン・DNS（柴田さん）

- [ ] **Resend ドメイン認証の DNS レコード設定**
  - [ ] DKIM（TXT: `resend._domainkey` → Resend管理画面からValue取得）
  - [ ] SPF（TXT: `send` → `v=spf1 include:amazonses.com ~all`）
  - [ ] MX（`send` → `feedback-smtp.us-east-1.amazonses.com` 優先度10）
  - [ ] DMARC（TXT: `_dmarc` → `v=DMARC1; p=none;`）

- [ ] **Vercel カスタムドメイン設定**（藤井さん）
  - Vercel ダッシュボード → Settings → Domains → `shirakabamura.com` 追加

- [ ] **DNS 切り替え**（WordPress → Vercel）
  - A / CNAME レコードを Vercel 指定の値に変更

---

## 🟡 推奨（公開後でも可）

- [ ] `MICROCMS_WEBHOOK_SECRET` を設定して即時反映を有効化
  - Vercel 環境変数に追加
  - microCMS Webhook に `/api/revalidate` を追加設定
- [ ] `manifest.json` / `site.webmanifest` 追加（PWA対応）
- [ ] 物件一覧：`purposecat` フィルターをUIに追加（microCMSデータ入力後）
- [ ] 物件一覧：`kindscat` フィルターの動作確認（microCMSデータ入力後）

---

## ✅ 完了済み（2026-04-11）

- [x] トップページ物件フィルター修正（売物件/賃貸の2択に）
- [x] 物件一覧カードにタイトル常時表示＋コメント統一表示
- [x] 区画ドロップダウン削除（MAP絞り込みと重複解消）
- [x] microCMS revalidate API 追加（`/api/revalidate`）
- [x] microCMS スキーマに `kindscat`・`purposecat` フィールド追加
- [x] Vercel 環境変数設定（MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY）
- [x] ローカル `.env.local` 再設定
- [x] Vercel プロジェクトリンク（shirakabamura.com）
- [x] Git ブランチ整理（main のみに）
- [x] PR #34 マージ

---

## ベストプラクティス：公開前チェックリスト（全プロジェクト共通）

今後のプロジェクトでも使う標準チェックリスト：

### メタデータ・SEO
- [ ] favicon.ico + apple-touch-icon が設置されている
- [ ] 全ページに適切な title / description がある
- [ ] OGP（og:title, og:description, og:image）が全ページに設定されている
- [ ] Twitter Card（twitter:card, twitter:image）が設定されている
- [ ] OGPデバッガーで確認済み（Facebook / Twitter / LINE）
- [ ] canonical URL が正しい
- [ ] robots.txt / sitemap.xml が正しい

### フォーム・メール
- [ ] フォーム送信が正常に動作する
- [ ] メール送信先が正しい
- [ ] SPF / DKIM / DMARC が設定されている
- [ ] reCAPTCHA 等のスパム対策が有効

### パフォーマンス・表示
- [ ] PC / SP 両方で表示崩れがない
- [ ] 画像が正しく表示される（外部URL含む）
- [ ] Core Web Vitals が許容範囲内

### インフラ
- [ ] 環境変数が全環境（production / preview）に設定されている
- [ ] CMS の Webhook / 再デプロイが設定されている
- [ ] SSL 証明書が有効（Vercel は自動）
- [ ] 301 リダイレクト（旧URL → 新URL）が設定されている
