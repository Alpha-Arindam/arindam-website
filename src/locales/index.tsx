'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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

// Helper to get language from the URL (query param or path prefix)
export const getLanguageFromUrl = (): Language | null => {
  if (typeof window !== 'undefined') {
    // 1. Check query parameter (e.g. ?lang=bn)
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam === 'en' || langParam === 'bn' || langParam === 'hi') {
      return langParam as Language;
    }

    // 2. Check path prefix (e.g. /bn, /hi, /en)
    const pathname = window.location.pathname;
    const match = pathname.match(/^\/(en|bn|hi)(?:\/|$)/);
    if (match) {
      return match[1] as Language;
    }
  }
  return null;
};

// Helper to update the URL language (path prefix or query param)
export const updateUrlLanguage = (lang: Language) => {
  if (typeof window !== 'undefined') {
    try {
      const pathname = window.location.pathname;
      const match = pathname.match(/^\/(en|bn|hi)(?:\/|$)/);
      
      if (match) {
        const prefix = match[1];
        if (prefix !== lang) {
          const newPathname = pathname.replace(/^\/(en|bn|hi)/, `/${lang}`);
          window.history.pushState({}, '', `${newPathname}${window.location.search}${window.location.hash}`);
        }
      } else {
        const params = new URLSearchParams(window.location.search);
        if (params.get('lang') !== lang) {
          params.set('lang', lang);
          const newSearch = params.toString();
          window.history.pushState({}, '', `${window.location.pathname}?${newSearch}${window.location.hash}`);
        }
      }
    } catch (e) {
      console.warn('Failed to update URL history:', e);
    }
  }
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 1. Check URL first for URL-based language strategy
    const urlLang = getLanguageFromUrl();
    if (urlLang) {
      setLanguageState(urlLang);
      localStorage.setItem('language', urlLang);
      return;
    }

    // 2. Check localStorage
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'bn' || saved === 'hi') {
      setLanguageState(saved as Language);
      return;
    }
    
    // 3. Auto-detect browser/system language on first load
    const browserLang = navigator.language || (navigator as any).userLanguage || '';
    const baseLang = browserLang.split('-')[0];
    if (baseLang === 'bn') {
      setLanguageState('bn');
      localStorage.setItem('language', 'bn');
    } else if (baseLang === 'hi') {
      setLanguageState('hi');
      localStorage.setItem('language', 'hi');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Ensure URL matches current language state on initial load if not set
    const urlLang = getLanguageFromUrl();
    if (!urlLang) {
      updateUrlLanguage(language);
    }

    // Listen for back/forward navigation popstate events
    const handlePopState = () => {
      const currentUrlLang = getLanguageFromUrl();
      if (currentUrlLang && currentUrlLang !== language) {
        setLanguageState(currentUrlLang);
        localStorage.setItem('language', currentUrlLang);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language, mounted]);

  const changeLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    updateUrlLanguage(lang);
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
