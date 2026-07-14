"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  translations as staticTranslations,
  type Locale,
  type TranslationKeys,
} from "./translations";

const STORAGE_KEY = "usrc-tigers-locale";
const CONTENT_CACHE_KEY = "usrc-tigers-content-cache";
const CONTENT_CACHE_TS_KEY = "usrc-tigers-content-ts";

interface LanguageContextValue {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function cacheContent(data: { translations: Record<string, unknown> }) {
  try {
    localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(data.translations));
    localStorage.setItem(CONTENT_CACHE_TS_KEY, String(Date.now()));
  } catch {}
}

function getCachedContent(): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(CONTENT_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [liveTranslations, setLiveTranslations] = useState<
    Record<string, unknown> | null
  >(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "en" || stored === "zh") {
      setLocaleState(stored);
    }

    const cached = getCachedContent();
    if (cached) {
      setLiveTranslations(cached);
    }

    if (!fetchedRef.current) {
      fetchedRef.current = true;
      fetch("/api/content")
        .then((r) => r.json())
        .then((data) => {
          if (data.translations) {
            setLiveTranslations(data.translations);
            cacheContent(data);
          }
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-HK" : "en";
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === "en" ? "zh" : "en"));
  }, []);

  const t = (liveTranslations?.[locale] ??
    staticTranslations[locale]) as TranslationKeys;

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
