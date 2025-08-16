import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 扫描博客文章目录并自动生成配置
function generateBlogConfig() {
  const enBlogDir = path.join(__dirname, '../src/pages/en/blog');
  const jpBlogDir = path.join(__dirname, '../src/pages/jp/blog');
  
  // 扫描英文博客
  const enPosts = scanBlogDirectory(enBlogDir, 'en');
  // 扫描日文博客
  const jpPosts = scanBlogDirectory(jpBlogDir, 'jp');
  
  // 生成英文配置
  generateConfigFile(enPosts, '../src/config/blog.ts', 'en');
  // 生成日文配置
  generateConfigFile(jpPosts, '../src/config/blog-jp.ts', 'jp');
  
  console.log('✅ 博客配置已自动生成！');
  console.log(`📝 英文文章: ${enPosts.length} 篇`);
  console.log(`📝 日文文章: ${jpPosts.length} 篇`);
}

function scanBlogDirectory(blogDir, lang) {
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const posts = [];
  const files = fs.readdirSync(blogDir);
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter } = matter(content);
      
      if (frontmatter.title && frontmatter.description) {
        const slug = file.replace('.md', '');
        const url = `/${lang}/blog/${slug}/`;
        
        posts.push({
          title: frontmatter.title,
          description: frontmatter.description,
          author: frontmatter.author || 'Yui Amai',
          pubDate: frontmatter.pubDate || new Date().toISOString().split('T')[0],
          updatedDate: frontmatter.updatedDate || frontmatter.pubDate || new Date().toISOString().split('T')[0],
          heroImage: frontmatter.heroImage || '/images/default-blog.jpg',
          category: frontmatter.category || 'General',
          tags: frontmatter.tags || ['general'],
          slug,
          url
        });
      }
    }
  }
  
  // 按发布日期排序（最新的在前）
  return posts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

function generateConfigFile(posts, outputPath, lang) {
  const outputFile = path.join(__dirname, outputPath);
  
  // 生成分类
  const categories = generateCategories(posts, lang);
  // 生成标签
  const tags = generateTags(posts, lang);
  // 生成归档
  const archives = generateArchives(posts, lang);
  
  const configContent = `// 此文件由脚本自动生成，请勿手动修改
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

export const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export const categories = ${JSON.stringify(categories, null, 2)};

export const tags = ${JSON.stringify(tags, null, 2)};

export const archives = ${JSON.stringify(archives, null, 2)};
`;
  
  // 确保目录存在
  const dir = path.dirname(outputFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(outputFile, configContent);
}

function generateCategories(posts, lang) {
  const categoryMap = new Map();
  
  posts.forEach(post => {
    if (!categoryMap.has(post.category)) {
      categoryMap.set(post.category, {
        name: post.category,
        description: getCategoryDescription(post.category, lang),
        icon: getCategoryIcon(post.category),
        count: 0
      });
    }
    categoryMap.get(post.category).count++;
  });
  
  return Array.from(categoryMap.values());
}

function generateTags(posts, lang) {
  const tagMap = new Map();
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, 0);
      }
      tagMap.set(tag, tagMap.get(tag) + 1);
    });
  });
  
  return Array.from(tagMap.entries()).map(([name, count]) => ({ name, count }));
}

function generateArchives(posts, lang) {
  const archiveMap = new Map();
  
  posts.forEach(post => {
    const date = new Date(post.pubDate);
    const year = date.getFullYear();
    const month = date.toLocaleDateString(lang === 'jp' ? 'ja-JP' : 'en-US', { month: 'long' });
    
    if (!archiveMap.has(year)) {
      archiveMap.set(year, { year: year.toString(), months: new Map() });
    }
    
    const yearData = archiveMap.get(year);
    if (!yearData.months.has(month)) {
      yearData.months.set(month, { month, count: 0 });
    }
    
    yearData.months.get(month).count++;
  });
  
  // 转换为数组格式
  return Array.from(archiveMap.values()).map(yearData => ({
    ...yearData,
    months: Array.from(yearData.months.values())
  }));
}

function getCategoryDescription(category, lang) {
  const descriptions = {
    'Statistics': 'Statistical methods, data analysis, and research methodology',
    'Programming': 'Programming languages, software development, and coding tutorials',
    'Research': 'Research methods, study design, and academic writing',
    '統計学': '統計手法、データ分析、研究方法論',
    'プログラミング': 'プログラミング言語、ソフトウェア開発、コーディングチュートリアル',
    '研究': '研究方法、研究デザイン、学術論文執筆'
  };
  
  return descriptions[category] || 'General articles and content';
}

function getCategoryIcon(category) {
  const icons = {
    'Statistics': '📊',
    'Programming': '</>',
    'Research': '🔬',
    '統計学': '📊',
    'プログラミング': '</>',
    '研究': '🔬'
  };
  
  return icons[category] || '📝';
}

// 运行脚本
generateBlogConfig();
