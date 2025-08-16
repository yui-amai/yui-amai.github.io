import { type LanguageKeys } from '@/i18n/ui'

type SidebarSchema = {
  [Lang in LanguageKeys]: {
    'introduction': string
  }
}

export const SIDEBAR: SidebarSchema = {
  en: {
    'introduction': 'Introduction',
  },
  jp: {
    'introduction': 'はじめに',
  }
}

