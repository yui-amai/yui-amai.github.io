export interface BlogPost {
  title: string;
  description: string;
  author: string;
  pubDate: string;
  updatedDate: string;
  heroImage: string;
  category: string;
  tags: string[];
  slug: string;
  url: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "統計学習の基礎：データサイエンスと機械学習への包括的導入",
    description: "統計学習の概念を深く探求し、基本的な原理からデータサイエンスと機械学習への高度な応用までを網羅します。",
    author: "Yui Amai",
    pubDate: "2025-01-15",
    updatedDate: "2025-01-15",
    heroImage: "/images/statistical-learning.jpg",
    category: "統計学",
    tags: ["統計学", "機械学習", "データサイエンス", "チュートリアル", "r"],
    slug: "statistical-learning-basics",
    url: "/jp/blog/statistical-learning-basics/"
  },
  {
    title: "Rプログラミングによるデータ分析：初心者向けガイド",
    description: "統計計算とデータ分析のためのRプログラミング言語の基礎を学び、実践的な例とベストプラクティスを身につけましょう。",
    author: "Yui Amai",
    pubDate: "2025-01-10",
    updatedDate: "2025-01-10",
    heroImage: "/images/r-programming.jpg",
    category: "プログラミング",
    tags: ["r", "プログラミング", "データ分析", "統計学", "チュートリアル", "データサイエンス"],
    slug: "r-programming-tutorial",
    url: "/jp/blog/r-programming-tutorial/"
  },
  {
    title: "疫学研究手法：研究デザインからデータ分析まで",
    description: "疫学研究手法の包括的ガイド。研究デザイン、データ収集、分析手法、結果の解釈について詳しく解説します。",
    author: "Yui Amai",
    pubDate: "2025-01-05",
    updatedDate: "2025-01-05",
    heroImage: "/images/epidemiology.jpg",
    category: "研究",
    tags: ["疫学", "研究", "統計学", "公衆衛生", "研究デザイン", "データ分析"],
    slug: "epidemiology-research-methods",
    url: "/jp/blog/epidemiology-research-methods/"
  },
  {
    title: "QOL研究：健康科学における手法、測定、応用",
    description: "QOL研究手法論、測定機器、およびヘルスケアと公衆衛生研究への応用について探求します。",
    author: "Yui Amai",
    pubDate: "2024-12-20",
    updatedDate: "2024-12-20",
    heroImage: "/images/quality-of-life.jpg",
    category: "研究",
    tags: ["qol", "生活の質", "研究", "健康アウトカム", "患者報告アウトカム", "統計学"],
    slug: "quality-of-life-research",
    url: "/jp/blog/quality-of-life-research/"
  },
  {
    title: "Pythonによる機械学習：初心者向け包括的ガイド",
    description: "Pythonを使用した機械学習の基礎を学び、アルゴリズム、実装、データサイエンスプロジェクトのベストプラクティスを身につけましょう。",
    author: "Yui Amai",
    pubDate: "2024-12-15",
    updatedDate: "2024-12-15",
    heroImage: "/images/machine-learning.jpg",
    category: "プログラミング",
    tags: ["python", "機械学習", "データサイエンス", "人工知能", "チュートリアル", "アルゴリズム"],
    slug: "machine-learning-python-guide",
    url: "/jp/blog/machine-learning-python-guide/"
  },
  {
    title: "モダンWeb開発：スケーラブルなアプリケーション構築の包括的ガイド",
    description: "2025年の堅牢でスケーラブルなWebアプリケーション構築のためのモダンWeb開発手法、フレームワーク、ツールを探求します。",
    author: "Yui Amai",
    pubDate: "2024-12-10",
    updatedDate: "2024-12-10",
    heroImage: "/images/web-development.jpg",
    category: "プログラミング",
    tags: ["webdev", "javascript", "react", "css", "チュートリアル", "フロントエンド", "バックエンド"],
    slug: "modern-web-development-guide",
    url: "/jp/blog/modern-web-development-guide/"
  }
];

export const categories = [
  {
    name: "統計学",
    description: "統計手法、データ分析、研究方法論",
    icon: "📊",
    count: blogPosts.filter(post => post.category === "統計学").length
  },
  {
    name: "プログラミング",
    description: "プログラミング言語、ソフトウェア開発、コーディングチュートリアル",
    icon: "</>",
    count: blogPosts.filter(post => post.category === "プログラミング").length
  },
  {
    name: "研究",
    description: "研究方法、研究デザイン、学術論文執筆",
    icon: "🔬",
    count: blogPosts.filter(post => post.category === "研究").length
  }
];

export const tags = [
  { name: "統計学", count: blogPosts.filter(post => post.tags.includes("統計学")).length },
  { name: "r", count: blogPosts.filter(post => post.tags.includes("r")).length },
  { name: "python", count: blogPosts.filter(post => post.tags.includes("python")).length },
  { name: "機械学習", count: blogPosts.filter(post => post.tags.includes("機械学習")).length },
  { name: "データサイエンス", count: blogPosts.filter(post => post.tags.includes("データサイエンス")).length },
  { name: "研究", count: blogPosts.filter(post => post.tags.includes("研究")).length },
  { name: "疫学", count: blogPosts.filter(post => post.tags.includes("疫学")).length },
  { name: "qol", count: blogPosts.filter(post => post.tags.includes("qol")).length },
  { name: "webdev", count: blogPosts.filter(post => post.tags.includes("webdev")).length },
  { name: "javascript", count: blogPosts.filter(post => post.tags.includes("javascript")).length },
  { name: "react", count: blogPosts.filter(post => post.tags.includes("react")).length },
  { name: "チュートリアル", count: blogPosts.filter(post => post.tags.includes("チュートリアル")).length }
];

export const archives = [
  {
    year: "2025",
    months: [
      {
        month: "1月",
        count: blogPosts.filter(post => post.pubDate.startsWith("2025-01")).length
      }
    ]
  },
  {
    year: "2024",
    months: [
      {
        month: "12月",
        count: blogPosts.filter(post => post.pubDate.startsWith("2024-12")).length
      }
    ]
  }
];
