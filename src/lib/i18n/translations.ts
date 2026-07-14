export type Locale = "en" | "zh";

export const translations = {
  en: {
    nav: {
      instagram: "Instagram",
      about: "About Rugby",
      parents: "Parents & Coaches",
      schedule: "Schedule",
      joining: "Joining Process",
      mission: "Our Mission",
      registerFreeTrial: "Register Free Trial",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      faq: "FAQ",
    },
  },
  zh: {
    nav: {
      instagram: "Instagram",
      about: "About Rugby",
      parents: "Parents & Coaches",
      schedule: "Schedule",
      joining: "Joining Process",
      mission: "Our Mission",
      registerFreeTrial: "Register Free Trial",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      faq: "FAQ",
    },
  },
} as const;

export type TranslationKeys = (typeof translations)[Locale];
