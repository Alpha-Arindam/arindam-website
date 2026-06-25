import React, { createContext, useContext, useState } from 'react';
import { en } from './en';
import { bn } from './bn';
import { hi } from './hi';

export type Language = 'en' | 'bn' | 'hi';

const translations = { en, bn, hi };

interface I18nContextProps {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      if (saved === 'en' || saved === 'bn' || saved === 'hi') {
        return saved as Language;
      }
      
      // Auto-detect browser/system language on first load
      const browserLang = navigator.language || (navigator as any).userLanguage || '';
      const baseLang = browserLang.split('-')[0];
      if (baseLang === 'bn') return 'bn';
      if (baseLang === 'hi') return 'hi';
    }
    return 'en'; // default fallback
  });

  const changeLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const keys = key.split('.');
    
    // Resolve language path
    let translation: any = translations[language] || translations['en'];
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        // Fallback to English translation dynamically
        let englishFallback: any = translations['en'];
        for (const fallbackKey of keys) {
          if (englishFallback && typeof englishFallback === 'object' && fallbackKey in englishFallback) {
            englishFallback = englishFallback[fallbackKey];
          } else {
            return key; // Return translation key as fallback if it doesn't exist in English
          }
        }
        translation = englishFallback;
        break;
      }
    }

    if (typeof translation !== 'string') {
      return key;
    }

    let result = translation;
    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        result = result.replace(new RegExp(`{${k}}`, 'g'), String(v));
      });
    }

    return result;
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
