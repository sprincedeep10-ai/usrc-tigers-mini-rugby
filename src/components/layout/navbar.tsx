"use client";

import { LanguageToggle } from "@/components/language-toggle";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { GAMEDAY_URL, NAV_HREFS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLabels: Record<(typeof NAV_HREFS)[number]["key"], string> = {
    instagram: t.nav.instagram,
    about: t.nav.about,
    parents: t.nav.parents,
    schedule: t.nav.schedule,
    joining: t.nav.joining,
    mission: t.nav.mission,
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass-nav py-3" : "glass-nav-top py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {NAV_HREFS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--nav-text-muted)] transition-colors hover:text-[var(--nav-text-hover)]"
              >
                {navLabels[link.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageToggle />
            <ThemeToggle />

            <Button
              href={GAMEDAY_URL}
              size="sm"
              className="hidden sm:inline-flex animate-pulse-glow"
            >
              {t.nav.registerFreeTrial}
            </Button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--nav-border)] bg-black/5 dark:bg-white/5 text-[var(--nav-text)] lg:hidden cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label={t.nav.openMenu}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-[var(--overlay)] backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm border-l border-card-border bg-[var(--mobile-menu-bg)] p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <Logo compact />
                <div className="flex items-center gap-1">
                  <LanguageToggle />
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-card-border text-foreground cursor-pointer"
                    aria-label={t.nav.closeMenu}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {NAV_HREFS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-lg font-medium text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    {navLabels[link.key]}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-8">
                <Button href={GAMEDAY_URL} size="lg" className="w-full">
                  {t.nav.registerFreeTrial}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
