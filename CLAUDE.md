# 白樺村 (shirakabamura.com) - プロジェクト設定

グローバル設定は `/Users/efgshota/AI/CLAUDE.md` を参照。このファイルはプロジェクト固有のルール。

---

## プロジェクト概要

| 項目 | 内容 |
|-----|------|
| プロジェクト名 | 白樺村 (shirakabamura.com) |
| 所属 | COHAN STUDIO |
| フレームワーク | Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 |
| CMS | MicroCMS |
| デプロイ | Vercel |
| ローカル開発 | `npm run dev` → http://localhost:3000（空きポートを自動使用） |

---

## Figmaデザインファイル

- **URL**: https://www.figma.com/design/kx1j1c74EfvSgU3v63gkLu/Shirakabamura
- **fileKey**: `kx1j1c74EfvSgU3v63gkLu`
- **主要フレーム**: `24-174`（Top / トップページ全体）
- デザイン指摘が来たら Figma REST API (`X-Figma-Token`) で参照する
- コードは React + Tailwind CSS に適応させる（そのまま使わない）

---

## ディレクトリ構成

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # トップページ (/)
│   ├── property/           # 物件一覧 & 詳細 ([slug])
│   ├── business/[slug]/    # 事業者詳細
│   ├── location-rental/    # ロケーションレンタル
│   └── useful/             # お役立ち帳
├── components/             # Reactコンポーネント
│   ├── Header.tsx / Footer.tsx / Layout.tsx
│   ├── HeroSection.tsx / HeroCarousel.tsx
│   ├── IntroSection.tsx / AboutSection.tsx
│   ├── NewsSection.tsx / BusinessSection.tsx
│   ├── PropertiesSection.tsx / UsefulInfoSection.tsx
│   ├── NakanojimaSection.tsx / ContactSection.tsx
│   ├── LocationRentalPage.tsx
│   ├── StickyNav.tsx / FloatingButtons.tsx
│   ├── PropertyGallery.tsx / PropertyImagePlaceholder.tsx
│   ├── BirdDecoration.tsx / HeroLogo.tsx
│   └── useScrollTrigger.ts
├── lib/
│   └── microcms.ts         # MicroCMS SDK wrapper
└── data/                   # 静的データ（MicroCMS移行前）
    ├── properties.ts
    ├── businesses.ts
    ├── news.ts
    └── useful-infos.ts
```

---

## MicroCMS スキーマ

### 現在の API エンドポイント

| エンドポイント | 型名 | 主要フィールド |
|-------------|-----|-------------|
| `property` | Property | title, location, type[], image, images, price, floorPlan, floorArea, specs, details, comment, description, address, access |
| `useful-infos` | UsefulInfo | title, category, description, address, phone, url, image |
| `businesses` | Business | name, description, image, url, category |
| `news` | News | title, date, content, category |

### ヘルパー関数（`src/lib/microcms.ts`）

- `getProperties()` / `getProperty(id)`
- `getUsefulInfos()`
- `getBusinesses()`
- `getNews()`
- `getFirstImageUrl()` / `getAllImageUrls()`

---

## コーディング規則

- **スタイリング**: Tailwind CSS 4 優先。CSS Modules（`.module.css`）は既存コンポーネントに合わせて使用
- **コンポーネント**: 既存パターンを踏襲。新規作成は `src/components/` に配置
- **画像**: MicroCMS 画像は `images.microcms-assets.io` からのみ（`next.config.ts` に設定済み）
- **データ取得**: Server Components でのフェッチ優先（App Router の慣習に従う）
- **型**: TypeScript strict mode。`any` は使わない

---

## 環境変数（`.env.local`）

```
MICROCMS_SERVICE_DOMAIN=...
MICROCMS_API_KEY=...
```

絶対にコミットしない。

---

## 検証チェックリスト（グローバルルール引用）

> **完了前に必ず検証する** — 変更前後の差分確認・ブラウザ表示確認を証拠として示してから完了とする

- [ ] `npm run build` がエラーなく通るか
- [ ] ローカルプレビューで表示崩れがないか（PC/SP両方）
- [ ] MicroCMS APIエラーが発生しないか（null チェック含む）
- [ ] `git diff` で意図しない変更がないか

---

## 作業ブランチ運用

| ブランチ | 用途 |
|---------|------|
| `main` | 本番リリース済み |
| `feature/*` | 新機能・デザイン反映 |
| `fix/*` | バグ修正 |
| `hotfix/*` | 緊急修正 |

PR は `main` へ。レビュー後マージ。

### Git 安全ルール（必須）

**ブランチを作る前は必ず最新を取得する：**

```bash
git checkout main
git pull                 # ← 必須。これがないとリモートの変更を見落とす
git checkout -b feature/xxx
```

**作業中に他のPRがマージされたら取り込む：**

```bash
git fetch
git rebase origin/main   # 自分の作業を最新 main の上に載せ直す
```

**禁止事項：**
- `git push --force` は使わない（相手の変更を消す危険）
- `main` ブランチで直接編集・コミットしない
- `git add .` は使わない（`.env` 混入防止。ファイル名を指定する）

> 詳細は `docs/git-workflow.md` を参照
