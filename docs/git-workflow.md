# Git 共同作業ガイド

白樺村プロジェクト（shirakabamura.com）の共同編集ルール。
非エンジニアでも迷わず作業できるよう、**場面ごとにコマンドをまとめています**。

---

## 基本の考え方

```
GitHub (origin/main)  ←  みんなの「共有フォルダ」（最新版がここにある）
        ↕ push / pull
あなたのPC (main)     ←  自分の「手元コピー」（放っておくと古くなる）
        ↓ branch
作業ブランチ          ←  自分の「作業スペース」（ここで編集する）
```

**重要ポイント**: 手元の `main` は自動では更新されない。`git pull` して初めて最新になる。

---

## 場面別コマンド集

### 1. 新しい作業を始めるとき

**毎回この3行をセットで実行する**（これが最も大事なルール）

```bash
git checkout main        # main ブランチに移動
git pull                 # GitHub から最新を取得 ← これを忘れない！
git checkout -b feature/作業名   # 新しい作業ブランチを作成
```

例：
```bash
git checkout main
git pull
git checkout -b feature/hero-redesign
```

> ヒント: `checkout` = 引き出しを開ける、`pull` = 中身を最新にする

---

### 2. 作業中にファイルを保存するとき（コミット）

```bash
git add ファイル名              # 変更を記録対象にする
git commit -m "何をしたか"      # 変更を記録する
```

例：
```bash
git add src/components/HeroSection.tsx
git commit -m "fix: ヒーローセクションの高さを調整"
```

**まとめて追加する場合：**
```bash
git add src/components/HeroSection.tsx src/app/globals.css
git commit -m "fix: ヒーロー高さ調整 + グローバルCSS修正"
```

> 注意: `git add .`（全ファイル追加）は `.env` などの秘密ファイルが混入する危険があるので避ける

---

### 3. 作業をGitHubにアップするとき（プッシュ）

```bash
git push -u origin ブランチ名
```

例：
```bash
git push -u origin feature/hero-redesign
```

> `-u` は初回だけ必要。2回目以降は `git push` だけでOK

---

### 4. Pull Request（PR）を作るとき

プッシュしたら GitHub で PR を作る。Claude Code を使う場合：

```bash
gh pr create --title "タイトル" --body "変更内容の説明"
```

または GitHub のWebサイトで「Compare & pull request」ボタンを押す。

---

### 5. 相手のPRがマージされたとき（自分も作業中の場合）

**これが今回の問題の原因だったパターン。**

相手の変更を自分の作業ブランチに取り込む：

```bash
git fetch                    # GitHub の情報を取得（ファイルは変わらない）
git rebase origin/main       # 自分の作業を最新の main の上に載せ直す
```

もし rebase でエラー（コンフリクト）が出たら：
```bash
# コンフリクトしたファイルを開いて手動修正
# <<<<<<< と >>>>>>> の間を整理する
git add 修正したファイル
git rebase --continue
```

> 「rebase が怖い」場合は merge でも可：
> ```bash
> git fetch
> git merge origin/main
> ```

---

### 6. PRがマージされた後（次の作業へ移るとき）

```bash
git checkout main
git pull                     # マージされた内容を取得
git branch -d 前のブランチ名   # 使い終わったブランチを削除（任意）
git checkout -b feature/次の作業名
```

---

### 7. 今の状態を確認するとき

```bash
# 自分がどのブランチにいるか確認
git branch

# 変更されたファイルの一覧
git status

# 自分の作業が GitHub の main から何コミット離れているか
git log --oneline origin/main..HEAD    # 自分が先行しているコミット
git log --oneline HEAD..origin/main    # GitHub が先行しているコミット（0でないと古い）
```

---

## よくあるトラブルと対処

### 「main から古いままブランチを作ってしまった」

```bash
# 作業ブランチにいる状態で
git fetch
git rebase origin/main
# これで最新の main の上に自分の作業が載る
```

### 「間違えて main で直接編集してしまった」

```bash
# まだコミットしていない場合
git stash                          # 変更を一時退避
git checkout -b feature/作業名      # 新しいブランチを作成
git stash pop                      # 退避した変更を復元
```

### 「コンフリクト（衝突）が起きた」

同じファイルの同じ場所を2人が別々に編集した場合に起きる。

1. コンフリクトしたファイルを開く
2. `<<<<<<< HEAD` と `>>>>>>> main` の間を見て、どちらの内容を残すか決める
3. マーカー（`<<<<<<<`, `=======`, `>>>>>>>`）を削除して正しい内容にする
4. `git add ファイル名` → `git rebase --continue` または `git commit`

**迷ったら相手に相談する。** 勝手に相手の変更を消さない。

### 「git push が拒否された」

```bash
# まず最新を取り込んでから再プッシュ
git fetch
git rebase origin/main
git push
```

> `git push --force` は**使わない**（相手の変更を消す危険がある）

---

## ブランチ命名ルール

| プレフィックス | 用途 | 例 |
|-------------|------|-----|
| `feature/` | 新機能・デザイン変更 | `feature/hero-redesign` |
| `fix/` | バグ修正 | `fix/header-border` |
| `hotfix/` | 緊急修正 | `hotfix/broken-image` |

命名のコツ：
- 英語で短く（日本語は使わない）
- 何をするかが分かる名前にする
- スペースの代わりにハイフン `-` を使う

---

## 作業の流れ（まとめ図）

```
① main を最新にする
   git checkout main && git pull

② 作業ブランチを作る
   git checkout -b feature/xxx

③ コードを編集する
   （Claude Code やエディタで作業）

④ 変更を保存（コミット）
   git add ファイル名
   git commit -m "説明"

⑤ GitHub にプッシュ
   git push -u origin feature/xxx

⑥ PR を作成
   GitHub で「Compare & pull request」

⑦ レビュー → マージ

⑧ 次の作業へ（①に戻る）
```

途中で相手のPRがマージされたら：
```
   git fetch && git rebase origin/main
```

---

## チェックリスト（作業開始前に確認）

- [ ] `git checkout main` した
- [ ] `git pull` した（最新取得）
- [ ] `git checkout -b feature/xxx` でブランチを作った
- [ ] `main` ブランチで直接編集していない

---

## 参考リンク

- [GitHub公式ドキュメント（日本語）](https://docs.github.com/ja)
- [サル先生のGit入門](https://backlog.com/ja/git-tutorial/)
