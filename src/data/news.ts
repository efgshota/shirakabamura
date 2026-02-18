export type NewsData = {
  slug: string;
  title: string;
  date: string;
  content?: string;
  category?: string;
};

export const news: NewsData[] = [
  {
    slug: "news-001",
    title: "白樺村の公式サイトをリニューアルしました",
    date: "2026-02-01",
    category: "お知らせ",
  },
  {
    slug: "news-002",
    title: "すずらんの湯 復活プロジェクトが始動しました",
    date: "2026-01-15",
    category: "プロジェクト",
  },
  {
    slug: "news-003",
    title: "中之島レンタルの受付を開始しました",
    date: "2025-12-20",
    category: "お知らせ",
  },
];
