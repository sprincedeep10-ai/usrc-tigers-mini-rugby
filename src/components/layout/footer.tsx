"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  CONTACT_EMAIL,
  GAMEDAY_URL,
  INSTAGRAM_URL,
  NAV_HREFS,
  VENUE_COORDINATES,
  VENUE_MAPS_URL,
} from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/language-provider";
import { InstagramIcon } from "@/components/icons/instagram";
import { LocationMap } from "@/components/location-map";
import { Mail, Shield } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  const navLabels: Record<(typeof NAV_HREFS)[number]["key"], string> = {
    instagram: t.nav.instagram,
    about: t.nav.about,
    parents: t.nav.parents,
    schedule: t.nav.schedule,
    joining: t.nav.joining,
    mission: t.nav.mission,
  };

  return (
    <footer className="border-t border-card-border bg-footer">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo linked={false} showMiniLabel={false} />
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-tiger">
              {t.common.miniRugby}
            </p>
            <p className="mt-4 text-sm text-muted leading-relaxed">{t.footer.tagline}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {NAV_HREFS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-tiger transition-colors"
                  >
                    {navLabels[link.key]}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#faq"
                  className="text-sm text-muted hover:text-tiger transition-colors"
                >
                  {t.nav.faq}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t.footer.registerConnect}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={GAMEDAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-tiger hover:underline"
                >
                  {t.footer.gamedayLink}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <InstagramIcon className="h-4 w-4" />
                  @usrctigers_minis
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <LocationMap
                  location={t.footer.location}
                  coordinates={VENUE_COORDINATES}
                  mapsUrl={VENUE_MAPS_URL}
                  liveLabel={t.schedule.mapLive}
                  expandHint={t.schedule.mapExpandHint}
                  directionsLabel={t.schedule.mapDirections}
                  variant="full"
                  className="mt-1 max-w-xs"
                />
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t.footer.readyTitle}
            </h3>
            <p className="mb-4 text-sm text-muted">{t.footer.readyBody}</p>
            <Button href={GAMEDAY_URL} size="sm" className="w-full">
              {t.common.registerFreeTrial}
            </Button>
          </div>
        </div>

        <div className="section-divider my-10" />

        <div className="flex flex-col gap-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4 sm:text-right">
            <p className="max-w-xl">{t.footer.legal}</p>
            <a
              href="/staff/login"
              className="group flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted/30 transition-colors hover:text-tiger/60"
              title="Staff Access"
            >
              <Shield className="h-3 w-3" />
              <span className="hidden sm:inline">Staff</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
