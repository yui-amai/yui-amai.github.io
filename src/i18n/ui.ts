export type LanguageKeys = keyof typeof LANGUAGES

type LanguageObject<T> = {
  [Lang in LanguageKeys]: T
}

export const LANGUAGES = {
  en: 'English',
  jp: 'Japanese',
} as const

export type LandingPageObj = {
  description: string
  getStartedBtnText: string
  githubBtnText: string
}

export const LANDING_PAGE: LanguageObject<LandingPageObj> = {
  en: {
    description: 'Personal blog and documentation site built with Astro.',
    getStartedBtnText: 'Get started',
    githubBtnText: 'Source code',
  },
  jp: {
    description: 'Astroで構築された個人ブログとドキュメントサイト。',
    getStartedBtnText: '始めましょう',
    githubBtnText: 'ソースコード',
  },
} as const

export const NAV: LanguageObject<{
  documentation: string
}> = {
  en: {
    documentation: 'Docs',
  },
  jp: {
    documentation: 'ドキュメント',
  },
} as const

export const ON_THIS_PAGE: LanguageObject<{
  onThisPage: string
  scrollToTop: string
}> = {
  en: {
    onThisPage: 'On this page',
    scrollToTop: 'Scroll to top',
  },
  jp: {
    onThisPage: 'このページで',
    scrollToTop: 'トップにスクロール',
  },
}

export const MISC: LanguageObject<{
  editThisPage: string
  previous: string
  next: string
}> = {
  en: {
    editThisPage: 'Edit this page',
    next: 'Next',
    previous: 'Previous',
  },
  jp: {
    editThisPage: 'このページを編集',
    next: '次へ',
    previous: '前へ',
  },
}

export const SEARCH: LanguageObject<{
  search: string
  keepTyping: string
  noResults: string
  results: string
}> = {
  en: {
    search: 'Search',
    keepTyping: 'Keep typing...',
    noResults: 'No results',
    results: 'Results',
  },
  jp: {
    search: '検索',
    keepTyping: '入力し続けて...',
    noResults: '結果がありません',
    results: '結果',
  },
}
