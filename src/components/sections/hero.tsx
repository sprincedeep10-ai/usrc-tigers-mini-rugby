"use client";

import { Button } from "@/components/ui/button";
import { Counter } from "@/components/motion/counter";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { GAMEDAY_URL, STATS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/language-provider";
import { motion } from "framer-motion";
import { ArrowRight, Play, Shield } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onWatchClick: () => void;
}

export function Hero({ onWatchClick }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[88svh] flex items-center hero-gradient overflow-hidden">
      <div className="absolute inset-0 tiger-stripe opacity-40 pointer-events-none" />

      <div className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-tiger/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 h-80 w-80 rounded-full bg-tiger/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-20 lg:px-8 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal eager delay={0.1}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tiger/30 bg-tiger-muted px-4 py-1.5">
                <Shield className="h-4 w-4 text-tiger" />
                <span className="text-xs font-semibold uppercase tracking-wider text-tiger">
                  {t.hero.badge}
                </span>
              </div>
            </Reveal>

            <Reveal eager delay={0.2}>
              <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] tracking-wide text-foreground uppercase">
                {t.hero.title}{" "}
                <span className="text-tiger">{t.hero.titleHighlight}</span>
              </h1>
            </Reveal>

            <Reveal eager delay={0.35}>
              <p className="mt-6 max-w-xl text-lg sm:text-xl text-muted leading-relaxed">
                {t.hero.subtitle}
              </p>
            </Reveal>

            <Reveal eager delay={0.45}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button href={GAMEDAY_URL} size="lg" className="group">
                  {t.common.registerForFreeTrial}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={onWatchClick}
                  className="gap-3"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tiger/20">
                    <Play className="h-4 w-4 fill-tiger text-tiger ml-0.5" />
                  </span>
                  {t.hero.watchVideo}
                </Button>
                <Button href="#instagram" variant="ghost" size="lg" className="hidden md:inline-flex">
                  {t.nav.instagram} ↓
                </Button>
              </div>
            </Reveal>

            <Reveal eager delay={0.55}>
              <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2">
                {t.hero.trustSignals.map((signal) => (
                  <span
                    key={signal}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-tiger" />
                    {signal}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal eager direction="left" delay={0.3} className="relative">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-lg mx-auto lg:max-w-none">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-tiger/20 to-transparent blur-2xl" />
              <motion.div
                className="relative h-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/images/sections/hero-usrc-tigers.jpg"
                  alt={t.hero.imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <StaggerContainer eager className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                    {STATS.map((stat) => (
                      <StaggerItem key={stat.key}>
                        <div className="rounded-xl bg-black/50 backdrop-blur-md border border-white/10 px-3 py-3 text-center">
                          <p className="font-display text-2xl sm:text-3xl text-tiger">
                            <Counter value={stat.value} suffix={stat.suffix} />
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted uppercase tracking-wider mt-0.5">
                            {t.hero.stats[stat.key]}
                          </p>
                        </div>
                      </StaggerItem>
                    ))}
                  </div>
                </StaggerContainer>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
