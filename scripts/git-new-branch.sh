#!/bin/bash
# git-new-branch.sh — 安全にブランチを作成するスクリプト
#
# 使い方:
#   ./scripts/git-new-branch.sh feature/hero-redesign
#   ./scripts/git-new-branch.sh fix/header-border
#
# やっていること:
#   1. main に切り替え
#   2. GitHub から最新を取得（git pull）
#   3. 新しいブランチを作成

set -e

# ブランチ名の引数チェック
if [ -z "$1" ]; then
  echo ""
  echo "使い方: ./scripts/git-new-branch.sh ブランチ名"
  echo ""
  echo "例:"
  echo "  ./scripts/git-new-branch.sh feature/hero-redesign"
  echo "  ./scripts/git-new-branch.sh fix/header-border"
  echo ""
  exit 1
fi

BRANCH_NAME=$1

# 未コミットの変更があるか確認
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "!! 未コミットの変更があります。先にコミットするか stash してください。"
  echo ""
  git status --short
  exit 1
fi

echo "→ main に切り替え..."
git checkout main

echo "→ GitHub から最新を取得..."
git pull

echo "→ ブランチ '$BRANCH_NAME' を作成..."
git checkout -b "$BRANCH_NAME"

echo ""
echo "準備完了！ '$BRANCH_NAME' で作業を始められます。"
