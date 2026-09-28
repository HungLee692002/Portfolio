import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../data/translations';

export type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Load initial language from localStorage or default to 'vi'
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'en' || saved === 'vi') ? saved : 'vi';
  });

  // Keep localStorage in sync with state
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio_lang', lang);
  };

  // Translation function helper
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Fallback to Vietnamese translation if key not found in English
        let viFallback: any = translations['vi'];
        for (const vf of keys) {
          if (viFallback && typeof viFallback === 'object' && vf in viFallback) {
            viFallback = viFallback[vf];
          } else {
            viFallback = null;
            break;
          }
        }
        return typeof viFallback === 'string' ? viFallback : key;
      }
    }

    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
