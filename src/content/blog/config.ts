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
    title: "Statistical Learning Fundamentals: A Comprehensive Introduction",
    description: "An in-depth exploration of statistical learning concepts, from basic principles to advanced applications in data science and machine learning.",
    author: "Yui Amai",
    pubDate: "2025-01-15",
    updatedDate: "2025-01-15",
    heroImage: "/images/statistical-learning.jpg",
    category: "Statistics",
    tags: ["statistics", "machine-learning", "data-science", "tutorial", "r"],
    slug: "statistical-learning-basics",
    url: "/en/blog/statistical-learning-basics/"
  },
  {
    title: "R Programming for Data Analysis: A Beginner's Guide",
    description: "Learn the fundamentals of R programming language for statistical computing and data analysis, with practical examples and best practices.",
    author: "Yui Amai",
    pubDate: "2025-01-10",
    updatedDate: "2025-01-10",
    heroImage: "/images/r-programming.jpg",
    category: "Programming",
    tags: ["r", "programming", "data-analysis", "statistics", "tutorial", "data-science"],
    slug: "r-programming-tutorial",
    url: "/en/blog/r-programming-tutorial/"
  },
  {
    title: "Epidemiology Research Methods: From Study Design to Data Analysis",
    description: "A comprehensive guide to epidemiological research methods, covering study designs, data collection, analysis techniques, and interpretation of results.",
    author: "Yui Amai",
    pubDate: "2025-01-05",
    updatedDate: "2025-01-05",
    heroImage: "/images/epidemiology.jpg",
    category: "Research",
    tags: ["epidemiology", "research", "statistics", "public-health", "study-design", "data-analysis"],
    slug: "epidemiology-research-methods",
    url: "/en/blog/epidemiology-research-methods/"
  },
  {
    title: "Quality of Life Research: Methods, Measures, and Applications in Health Sciences",
    description: "An exploration of quality of life research methodologies, measurement instruments, and their applications in healthcare and public health research.",
    author: "Yui Amai",
    pubDate: "2024-12-20",
    updatedDate: "2024-12-20",
    heroImage: "/images/quality-of-life.jpg",
    category: "Research",
    tags: ["qol", "quality-of-life", "research", "health-outcomes", "patient-reported-outcomes", "statistics"],
    slug: "quality-of-life-research",
    url: "/en/blog/quality-of-life-research/"
  },
  {
    title: "Machine Learning with Python: A Comprehensive Guide for Beginners",
    description: "Learn machine learning fundamentals using Python, covering algorithms, implementation, and best practices for data science projects.",
    author: "Yui Amai",
    pubDate: "2024-12-15",
    updatedDate: "2024-12-15",
    heroImage: "/images/machine-learning.jpg",
    category: "Programming",
    tags: ["python", "machine-learning", "data-science", "artificial-intelligence", "tutorial", "algorithms"],
    slug: "machine-learning-python-guide",
    url: "/en/blog/machine-learning-python-guide/"
  },
  {
    title: "Modern Web Development: A Comprehensive Guide to Building Scalable Applications",
    description: "Explore modern web development practices, frameworks, and tools for building robust, scalable web applications in 2025.",
    author: "Yui Amai",
    pubDate: "2024-12-10",
    updatedDate: "2024-12-10",
    heroImage: "/images/web-development.jpg",
    category: "Programming",
    tags: ["webdev", "javascript", "react", "css", "tutorial", "frontend", "backend"],
    slug: "modern-web-development-guide",
    url: "/en/blog/modern-web-development-guide/"
  }
];

export const categories = [
  {
    name: "Statistics",
    description: "Statistical methods, data analysis, and research methodology",
    icon: "📊",
    count: blogPosts.filter(post => post.category === "Statistics").length
  },
  {
    name: "Programming",
    description: "Programming languages, software development, and coding tutorials",
    icon: "</>",
    count: blogPosts.filter(post => post.category === "Programming").length
  },
  {
    name: "Research",
    description: "Research methods, study design, and academic writing",
    icon: "🔬",
    count: blogPosts.filter(post => post.category === "Research").length
  }
];

export const tags = [
  { name: "statistics", count: blogPosts.filter(post => post.tags.includes("statistics")).length },
  { name: "r", count: blogPosts.filter(post => post.tags.includes("r")).length },
  { name: "python", count: blogPosts.filter(post => post.tags.includes("python")).length },
  { name: "machine-learning", count: blogPosts.filter(post => post.tags.includes("machine-learning")).length },
  { name: "data-science", count: blogPosts.filter(post => post.tags.includes("data-science")).length },
  { name: "research", count: blogPosts.filter(post => post.tags.includes("research")).length },
  { name: "epidemiology", count: blogPosts.filter(post => post.tags.includes("epidemiology")).length },
  { name: "qol", count: blogPosts.filter(post => post.tags.includes("qol")).length },
  { name: "webdev", count: blogPosts.filter(post => post.tags.includes("webdev")).length },
  { name: "javascript", count: blogPosts.filter(post => post.tags.includes("javascript")).length },
  { name: "react", count: blogPosts.filter(post => post.tags.includes("react")).length },
  { name: "tutorial", count: blogPosts.filter(post => post.tags.includes("tutorial")).length }
];

export const archives = [
  {
    year: "2025",
    months: [
      {
        month: "January",
        count: blogPosts.filter(post => post.pubDate.startsWith("2025-01")).length
      }
    ]
  },
  {
    year: "2024",
    months: [
      {
        month: "December",
        count: blogPosts.filter(post => post.pubDate.startsWith("2024-12")).length
      }
    ]
  }
];
