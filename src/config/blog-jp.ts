// 此文件由脚本自动生成，请勿手动修改
// 运行 npm run generate-blog-config 来重新生成

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
    "title": "[Test] 統計学習の基礎：データサイエンスと機械学習への包括的導入",
    "description": "統計学習の概念を深く探求し、基本的な原理からデータサイエンスと機械学習への高度な応用までを網羅します。",
    "author": "Yui Amai",
    "pubDate": "2025-01-15",
    "updatedDate": "2025-01-15",
    "heroImage": "/images/statistical-learning.jpg",
    "category": "統計学",
    "tags": [
      "statistics",
      "machine-learning",
      "data-science",
      "tutorial",
      "r"
    ],
    "slug": "statistical-learning-basics",
    "url": "/jp/blog/statistical-learning-basics/"
  },
  {
    "title": "[Test] Rプログラミングによるデータ分析：初心者向けガイド",
    "description": "統計計算とデータ分析のためのRプログラミング言語の基礎を学び、実践的な例とベストプラクティスを身につけましょう。",
    "author": "Yui Amai",
    "pubDate": "2025-01-10",
    "updatedDate": "2025-01-10",
    "heroImage": "/images/r-programming.jpg",
    "category": "プログラミング",
    "tags": [
      "r",
      "programming",
      "data-analysis",
      "statistics",
      "tutorial",
      "data-science"
    ],
    "slug": "r-programming-tutorial",
    "url": "/jp/blog/r-programming-tutorial/"
  }
];

export const categories = [
  {
    "name": "統計学",
    "description": "統計手法、データ分析、研究方法論",
    "icon": "chart-spline",
    "count": 1
  },
  {
    "name": "プログラミング",
    "description": "プログラミング言語、ソフトウェア開発、コーディングチュートリアル",
    "icon": "file-terminal",
    "count": 1
  }
];

export const tags = [
  {
    "name": "statistics",
    "count": 2
  },
  {
    "name": "machine-learning",
    "count": 1
  },
  {
    "name": "data-science",
    "count": 2
  },
  {
    "name": "tutorial",
    "count": 2
  },
  {
    "name": "r",
    "count": 2
  },
  {
    "name": "programming",
    "count": 1
  },
  {
    "name": "data-analysis",
    "count": 1
  }
];

export const archives = [
  {
    "year": "2025",
    "months": [
      {
        "month": "1月",
        "count": 2
      }
    ]
  }
];
