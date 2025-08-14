import { type LanguageKeys } from '@/i18n/ui'

type SidebarSchema = {
  [Lang in LanguageKeys]: {
    'introduction': string
    'about': string
  }
}

export const SIDEBAR: SidebarSchema = {
  en: {
    'introduction': 'Introduction',
    'about': 'About Me',
  },
  jp: {
    'introduction': 'はじめに',
    'about': '自己紹介',
  }
}

