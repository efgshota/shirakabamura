# Lessons Learned

## 2026-04-18

### 🚨 Vercel環境変数は「すべての環境」に入れる（最重要）
- **問題:** 本番公開後、柴田さんから「フォーム送信できない・Resend Logsにも残らない」と報告。調査すると **本番環境の `RESEND_API_KEY` / `RECAPTCHA_SECRET_KEY` / `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` が未設定**で、`/api/contact` が500エラーで落ちていた。Development/Previewにしか入っていなかった
- **原因:**
  1. todo.md に「Vercel 環境変数設定（MICROCMS_*）」と書いて済ませ、Resend/reCAPTCHA系が抜けた
  2. `vercel env add <KEY>` はデフォルトで聞かれた対象環境にしか入らない → うっかり Development/Preview だけ選んだまま放置
  3. 本番デプロイ後にフォームを手動で踏まずに公開報告しようとした
- **ルール:**
  1. 環境変数追加時は **`vercel env ls` で Production列を必ず目視確認**する
  2. 本番公開前チェックリストに「**自ブラウザで本番URLからフォームを一往復**」を必ず含める（dev/previewのテストでは本番env欠損を検出できない）
  3. `NEXT_PUBLIC_*` はビルド時埋め込みなので、**追加後は再デプロイ必須**
  4. 原則 `.env.local` にある値は全部 Production にも入れる（Development/Previewと対称にする）

### 配送ステータスは「Delivered」でも受信箱に届くとは限らない
- **問題:** Resend Dashboard で `Sent → Delivered` と表示されていたテストメールが、`shirakabamura@cfquod.jp` の受信箱には届いていなかった
- **原因:** Delivered = 相手MXサーバーが受け取った時点。その後の迷惑メール判定/フィルタ/転送で受信箱に届かないことがある。特に新規ドメインからの初送信はスパム判定されやすい
- **ルール:**
  1. 受信確認は「Resend Delivered」と「実際の受信箱」の**2点で確認**する
  2. 迷惑メール判定リスクに備えて、管理者通知メールは **BCCで第2の受信先にも送る**（本番安定後に削除）
  3. フォーム完了画面で「迷惑メールフォルダをご確認ください」と予防的に伝えるのは既に実装済み（継続推奨）

### DNS管理の所在は `NS` レコードで確認する
- **問題:** todo.md に「DNS設定は柴田さん側」と書かれていたが、実際は Vercel で管理されており藤井さん単独で完結できた
- **原因:** ドメインの Registrar（お名前.com等）と Nameservers（Vercel）を混同していた。`Registrar: Third Party + Nameservers: Vercel` はよくある構成
- **ルール:** DNS作業の前に必ず `dig +short NS <domain>` で管理元を確認する。`ns*.vercel-dns.com` なら Vercel Dashboard で完結

### Resend のリージョンによってMX値が変わる
- **問題:** todo.md に `feedback-smtp.us-east-1.amazonses.com` と書いてあったが、実際のドメインは Tokyo (ap-northeast-1) で登録されており不一致
- **原因:** Resend ドキュメントの例文をそのまま転記していた
- **ルール:** Resend のDNSレコードは **Resend管理画面のDNS Records欄の値を正として使う**（テンプレート化しない）。リージョンも記録に残す

### Resend API Key の権限範囲に注意
- **問題:** `restricted_api_key: This API key is restricted to only send emails` で domain API が叩けず、手動Verifyをコード化できなかった
- **原因:** 本番用に送信専用で作ったAPIキーを開発作業でも使っていた
- **ルール:** 運用用（送信専用・最小権限）と、管理用（Full access）のキーを分ける。管理作業はダッシュボード or 別キーで

### DNS伝播後も Resend の自動 Verify は即時ではない
- **問題:** DNS伝播は数秒〜数分で完了するが、Resend の `Checking DNS` → `Verified` は5分以上かかる場合がある
- **原因:** Resend の再チェック間隔 + AWS SES 側の検証遅延
- **ルール:** DNS追加後、dig で即座に伝播確認 → Resend画面のリロード or 手動Verifyボタンで強制検出が最速

### 疎通確認スクリプトは一時的に残して検証完了後に削除
- **問題:** `scripts/test-resend.mjs` を作って検証したが、本番コードではないのでcommit前に削除判断が必要
- **ルール:** 検証スクリプトは `scripts/` に置き、リファクタ段階で**本番と無関係なものは削除**。必要なら `docs/` に手順化して残す

### Next.js App Router のメタデータは「ファイル規約」を優先する
- **問題:** `layout.tsx` の `openGraph.images` と `src/app/opengraph-image.jpg` が両方存在すると重複する
- **原因:** ファイル規約（`icon.*` / `opengraph-image.*` / `twitter-image.*`）が自動で meta タグを付与する仕様を知らずに metadata に手書きしていた
- **ルール:** Next.js 15+ では `src/app/` にファイルを置けば自動で `<link rel="icon">` や `<meta property="og:image">` が生成される。metadata 側の `images` は削除して重複排除

---

## 2026-04-11

### Favicon・OGP は初期構築時に入れる
- **問題:** 公開直前に Favicon が一切ない、OGP が不完全と判明
- **原因:** デザイン・機能実装を優先し、メタデータ系を後回しにした
- **ルール:** プロジェクト初期にfavicon・OGP・apple-touch-iconを設置する。`tasks/todo.md` の「公開前チェックリスト」を標準化して全プロジェクトで使う

### microCMS フィールドとフロント表示の整合性チェック
- **問題:** microCMS の type フィールド（sell/rent）とフロントのフィルター表示（土地のみ/建物つき/賃貸）がズレていた
- **原因:** WordPress からの移行時にカテゴリー体系を整理しきれなかった
- **ルール:** CMS スキーマ変更時は、フロントのフィルター・表示ロジックとの整合性を必ず確認する

### Vercel プロジェクト名とリンク先の確認
- **問題:** `vercel link` で `shirakabamura`（誤）にリンクし、環境変数が取得できなかった。正しくは `shirakabamura.com`
- **原因:** Vercel にプロジェクトが複数あり、名前が似ていた
- **ルール:** `vercel link` 後は `vercel env ls` で環境変数が見えることを確認する

### .env.local は各PCで再設定が必要
- **問題:** 別PCで開発していた .env.local がなく、ローカルでmicroCMS接続できなかった
- **原因:** .env.local は gitignore 対象（正しい運用）
- **ルール:** 新しいPCでの初期セットアップ手順に `vercel env pull .env.local` を含める
