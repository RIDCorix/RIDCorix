import { zh } from './zh'
import { en } from './en'

export const translations = {
  zh,
  en
} as const

export type Language = keyof typeof translations
export type TranslationKeys = typeof translations['zh']
