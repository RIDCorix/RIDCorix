'use client'

import { LanguageContext, useLanguageState } from '@/hooks/useLanguage'

interface LanguageProviderProps {
  children: React.ReactNode
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const languageState = useLanguageState()

  return (
    <LanguageContext.Provider value={languageState}>
      {children}
    </LanguageContext.Provider>
  )
}