"use client";

import { Button } from "@/components/ui/button";
import {
  Reveal,
  SectionHeader,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/reveal";
import { GAMEDAY_URL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Heart, Rocket, Target } from "lucide-react";
import Image from "next/image";

const pillarIcons = [Heart, Target, Rocket];

export function MissionSection() {
  const { t } = useLanguage();

  return (
    <section id="mission" className="relative py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right">
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-tiger/10 blur-3xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-card-border">
                <Image
                  src="/images/sections/mission-usrc-tigers.jpg"
                  alt={t.mission.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-display text-3xl tracking-wide text-foreground uppercase leading-tight">
                    {t.mission.imageCaption}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeader
              eyebrow={t.mission.eyebrow}
              title={t.mission.title}
              description={t.mission.description}
              align="left"
              className="mb-10"
            />

            <StaggerContainer className="space-y-6">
              {t.mission.pillars.map((pillar, i) => {
                const Icon = pillarIcons[i];
                return (
                  <StaggerItem key={pillar.title}>
                    <div className="flex gap-4 rounded-2xl border border-card-border bg-card p-5 transition-all hover:border-tiger/25">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tiger-muted text-tiger">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{pillar.title}</h3>
                        <p className="mt-1 text-sm text-muted leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <Reveal delay={0.3} className="mt-8">
              <blockquote className="border-l-2 border-tiger pl-5 text-lg text-muted italic leading-relaxed">
                &ldquo;{t.mission.quote}&rdquo;
              </blockquote>
              <p className="mt-3 text-sm text-tiger font-medium">{t.mission.quoteAuthor}</p>
            </Reveal>

            <Reveal delay={0.4} className="mt-8">
              <Button href={GAMEDAY_URL}>{t.mission.cta}</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
