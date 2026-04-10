# Lessons Learned

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
