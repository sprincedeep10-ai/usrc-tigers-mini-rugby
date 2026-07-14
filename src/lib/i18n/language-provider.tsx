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
const CONTENT_CACHE_VERSION = "usrc-tigers-content-ver";
const CACHE_VERSION = 2;

function isValidTranslations(data: Record<string, unknown>): boolean {
  if (!data || typeof data !== "object") return false;
  for (const lang of ["en", "zh"]) {
    const langData = data[lang];
    if (!langData || typeof langData !== "object") return false;
    const sections = langData as Record<string, unknown>;
    if (typeof sections.about !== "object" || sections.about === null) return false;
    const about = sections.about as Record<string, unknown>;
    if (!Array.isArray(about.bullets) || !Array.isArray(about.benefits) || !Array.isArray(about.ageGroups)) return false;
    if (typeof sections.faq !== "object" || sections.faq === null) return false;
    const faq = sections.faq as Record<string, unknown>;
    if (!Array.isArray(faq.items)) return false;
  }
  return true;
}

interface LanguageContextValue {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function cacheContent(data: { translations: Record<string, unknown> }) {
  try {
    if (!isValidTranslations(data.translations)) return;
    localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(data.translations));
    localStorage.setItem(CONTENT_CACHE_TS_KEY, String(Date.now()));
    localStorage.setItem(CONTENT_CACHE_VERSION, String(CACHE_VERSION));
  } catch {}
}

function getCachedContent(): Record<string, unknown> | null {
  try {
    const ver = localStorage.getItem(CONTENT_CACHE_VERSION);
    if (ver !== String(CACHE_VERSION)) {
      localStorage.removeItem(CONTENT_CACHE_KEY);
      localStorage.removeItem(CONTENT_CACHE_TS_KEY);
      localStorage.removeItem(CONTENT_CACHE_VERSION);
      return null;
    }
    const raw = localStorage.getItem(CONTENT_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isValidTranslations(parsed)) {
      localStorage.removeItem(CONTENT_CACHE_KEY);
      return null;
    }
    return parsed;
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
