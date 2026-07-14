"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { GAMEDAY_URL, INSTAGRAM_URL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/language-provider";
import { InstagramIcon } from "@/components/icons/instagram";
import { ArrowRight } from "lucide-react";

export function FinalCTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 tiger-stripe opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-tiger/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8 text-center">
        <Reveal>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-tiger">
            {t.finalCta.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] tracking-wide text-foreground uppercase leading-tight">
            {t.finalCta.title}{" "}
            <span className="text-tiger">{t.finalCta.titleHighlight}</span>
          </h2>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            {t.finalCta.description}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href={GAMEDAY_URL} size="lg" className="group min-w-[240px]">
            {t.common.registerFreeTrial}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            href={INSTAGRAM_URL}
            variant="secondary"
            size="lg"
            className="min-w-[240px] gap-2"
          >
            <InstagramIcon className="h-4 w-4" />
            {t.finalCta.followInstagram}
          </Button>
        </Reveal>

        <Reveal delay={0.3} className="mt-8">
          <p className="text-xs text-muted">{t.finalCta.footer}</p>
        </Reveal>
      </div>
    </section>
  );
}
