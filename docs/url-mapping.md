# URL構成マッピング & プランニング資料

白樺村 (shirakabamura.com) のURL設計整理。
公開済みサイト・開発中サイトのURL対比と、理想URL案。

最終更新: 2026-03-01

---

## 全URL一覧

### ページ種別凡例

| 記号 | 意味 |
|------|------|
| ✅ | 公開済み（mainブランチ・Vercel本番） |
| 🆕 | 開発中・未公開（feature/mobile-and-page-fixes） |
| ⚠️ | 課題あり（下記「課題」欄に詳細） |

---

### 静的ページ（固定URL）

| 現在のURL | ステータス | 備考 |
|----------|-----------|------|
| `/` | ✅ | TOPページ |
| `/property/` | ✅ | 物件一覧 |
| `/location-rental/` | ✅ | ロケーションレンタル（中之島） |
| `/useful/` | ✅ | お役立ち帳 |
| `/business/` | ✅ | 物件事例一覧（microCMS管理） |
| `/news/` | 🆕 | お知らせ一覧（microCMS管理） |

---

### 物件詳細ページ `/property/[slug]/`

microCMS IDがそのままURLスラグになる。現在確認できるID：

| 現在のURL（microCMS ID） | ステータス | 表示名（参考） |
|------------------------|-----------|-------------|
| `/property/kashiwabara-19-16/` | ✅ | 静的フォールバック用 |
| `/property/柏原財産区-区画24-2/` | ✅ ⚠️ | 日本語スラグ（エンコード問題あり） |
| `/property/柏原財産区-区画12-23/` | ✅ ⚠️ | 日本語スラグ（エンコード問題あり） |
| `/property/{microCMS-id}/` | ✅ | 本番環境のmicroCMS記事（IDは英数字） |

> **⚠️ 課題**: 静的フォールバックデータに日本語スラグが含まれており、URLエンコードが必要になる。microCMS本番はランダム英数字ID（例: `gu0jqlpsvn1`）になるため、実用上は問題なし。

---

### 物件事例詳細ページ `/business/[slug]/`

| 現在のURL | ステータス | 表示名 |
|----------|-----------|------|
| `/business/gu0jqlpsvn1/` | ✅ | ペンション湖風（microCMS ID） |
| `/business/ov3dgjdf9t/` | ✅ | 珈琲＆BEANS カリオモン（microCMS ID） |
| `/business/oix37pqxnmbg/` | ✅ | HYGGE（microCMS ID） |
| `/business/orrlaea8wc/` | ✅ ⚠️ | おやまのおうち（下書き設定済み・要確認） |

> **⚠️ 課題**: `おやまのおうち`（`/business/orrlaea8wc/`）はmicroCMS上で「下書き」設定済みだが、TOPページのビルドキャッシュにより引き続き表示されていた。`revalidate = 0` を追加し修正済み（→後述）。

---

### お知らせ詳細ページ `/news/[slug]/`（開発中）

| 現在のURL | ステータス | 内容 |
|----------|-----------|------|
| `/news/news-001/` | 🆕 | 静的フォールバック：公式サイトリニューアル |
| `/news/news-002/` | 🆕 | 静的フォールバック：すずらんの湯復活 |
| `/news/news-003/` | 🆕 | 静的フォールバック：中之島レンタル受付開始 |
| `/news/{microCMS-id}/` | 🆕 | microCMS本番記事（公開後） |

---

## 理想URLプランニング

### 現状の問題点

| # | 問題 | 影響 | 優先度 |
|---|------|------|--------|
| 1 | `/business/` が「物件事例」のルートだが、URLが`business`（事業者の意味）になっている | ユーザーに分かりにくい | 中 |
| 2 | 物件・事例の詳細ページURLがmicroCMS生成ランダムID（例: `gu0jqlpsvn1`）になっている | SEO上・人間可読性が低い | 中 |
| 3 | `/useful/` が英語表記（useful = お役立ち） | 統一感 | 低 |
| 4 | `/news/` はまだ未公開 | — | — |

---

### URL改善案（参考）

現状のURL → 理想URL案

| 現状 | 理想案 | 変更理由 | リダイレクト要否 |
|------|--------|---------|----------------|
| `/business/` | `/case/` または `/stories/` | 「物件事例」のほうが内容に合う | 必要（301） |
| `/business/{microCMS-id}/` | `/case/{microCMS-id}/` | 上記に合わせて | 必要（301） |
| `/useful/` | `/guide/` または `/info/` | 任意（現状でも問題なし） | 任意 |

> **推奨**: 公開直後のURL変更は避ける。SEOの積み上げを守るため、変更する場合は必ず301リダイレクトを設定する。

---

### リダイレクト設定方法（URL変更時）

`next.config.ts` に追記する形式：

```typescript
async redirects() {
  return [
    // 例: /business/ → /case/ に変更した場合
    {
      source: "/business/:slug*",
      destination: "/case/:slug*",
      permanent: true, // 301
    },
  ];
},
```

---

## 今後追加予定のページ（候補）

| URL案 | 内容 | 優先度 |
|-------|------|--------|
| `/news/` ✓ | お知らせ一覧（開発中） | 高 |
| `/about/` | 白樺村について（会社情報） | 中 |
| `/contact/` | お問い合わせ専用ページ | 低（現在はTOPのアンカー） |

---

## sitemap.ts の状態（現在）

現在 `src/app/sitemap.ts` に含まれていないルート：

- `/business/` 一覧ページ
- `/news/` 一覧・詳細ページ（未追加）
- `/business/{id}/` 詳細ページ（microCMS連携なし）

> **アクション**: `/news/` 公開時に `sitemap.ts` へ追加が必要。
