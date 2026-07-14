"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, toggleLocale, t } = useLanguage();
  const isChinese = locale === "zh";

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={isChinese ? t.common.switchToEnglish : t.common.switchToChinese}
      className={cn(
        "inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-lg px-2",
        "text-sm font-semibold text-[var(--nav-text-muted)] hover:text-[var(--nav-text-hover)]",
        "hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer",
        className
      )}
    >
      {isChinese ? "EN" : "繁"}
    </button>
  );
}
