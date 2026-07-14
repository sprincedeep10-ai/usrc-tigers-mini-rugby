"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-provider";
import Image from "next/image";

export const LOGO_SRC_DARK = "/images/usrc-tigers-logo.png";
export const LOGO_SRC_LIGHT = "/images/usrc-tigers-logo-black.png";

interface LogoProps {
  className?: string;
  compact?: boolean;
  showMiniLabel?: boolean;
  linked?: boolean;
}

export function Logo({
  className,
  compact = false,
  showMiniLabel = true,
  linked = true,
}: LogoProps) {
  const { t, locale } = useLanguage();

  const imgClass = cn(
    "h-auto w-auto object-contain",
    compact ? "max-h-10" : "max-h-12 sm:max-h-14"
  );

  const content = (
    <>
      <Image
        src={LOGO_SRC_DARK}
        alt="U.S.R.C Tigers RFC"
        width={180}
        height={180}
        className={cn(imgClass, "logo-dark")}
        priority
      />
      <Image
        src={LOGO_SRC_LIGHT}
        alt="U.S.R.C Tigers RFC"
        width={180}
        height={180}
        className={cn(imgClass, "logo-light")}
        priority
      />
      {!compact && showMiniLabel && (
        <span
          className={cn(
            "hidden sm:inline text-[10px] font-semibold uppercase tracking-[0.18em] leading-none border-l pl-2.5",
            "text-[var(--nav-text)] border-[var(--nav-border)]",
            locale === "zh" && "normal-case tracking-normal text-[11px]"
          )}
        >
          {locale === "en" ? (
            <>
              Mini
              <br />
              Rugby
            </>
          ) : (
            t.common.miniRugby
          )}
        </span>
      )}
    </>
  );

  if (!linked) {
    return (
      <div className={cn("flex items-center gap-2.5", className)}>{content}</div>
    );
  }

  return (
    <a href="#" className={cn("group flex items-center gap-2.5", className)}>
      {content}
    </a>
  );
}
