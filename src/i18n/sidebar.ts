import { type LanguageKeys } from '@/i18n/ui'

type SidebarSchema = {
  [Lang in LanguageKeys]: {
    introduction: string
    'getting-started': string
    'sidebar-config': string
    'writing-docs': string
    'styling-config': string
    deploying: string
  }
}

export const SIDEBAR: SidebarSchema = {
  en: {
    introduction: 'Introduction',
    'getting-started': 'Getting started',
    'sidebar-config': 'Sidebar config',
    'writing-docs': 'Writing docs',
    'styling-config': 'Styling config',
    deploying: 'Deploying',
  },
  jp: {
    introduction: 'はじめに',
    'getting-started': 'はじめる',
    'sidebar-config': 'サイドバーの設定',
    'writing-docs': 'ドキュメントの書き方',
    'styling-config': 'スタイリングの設定',
    deploying: 'デプロイ',
  },
}
