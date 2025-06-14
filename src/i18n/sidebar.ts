import { type LanguageKeys } from '@/i18n/ui'

type SidebarSchema = {
  [Lang in LanguageKeys]: {
    'introduction': string
    'about': string
    'foundations-probability': string
    'applied-survival': string
    'tools-r': string
  }
}

export const SIDEBAR: SidebarSchema = {
  en: {
    'introduction': 'Introduction',
    'about': 'About Me',
    'foundations-probability': 'Probability Basics',
    'applied-survival': 'Survival Analysis',
    'tools-r': 'R Markdown Guide',
  },
  jp: {
    'introduction': 'はじめに',
    'about': '私について',
    'foundations-probability': '確率の基礎',
    'applied-survival': '生存分析',
    'tools-r': 'R Markdownガイド',
  }
}

