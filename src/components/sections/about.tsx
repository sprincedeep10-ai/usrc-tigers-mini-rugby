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
import { cn } from "@/lib/utils";
import { Heart, Route, Shield, Sparkles, Trophy, Users } from "lucide-react";
import Image from "next/image";

const iconList = [Sparkles, Shield, Trophy, Route];

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          description={t.about.description}
          className="mb-16 lg:mb-20"
        />

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center mb-20">
          <Reveal direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-card-border">
              <Image
                src="/images/sections/about-usrc-players.jpg"
                alt={t.about.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.15}>
            <div className="space-y-6">
              <p className="text-lg text-muted leading-relaxed">{t.about.body}</p>
              <ul className="space-y-4">
                {t.about.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <Heart className="h-5 w-5 shrink-0 text-tiger mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button href={GAMEDAY_URL} variant="outline">
                {t.about.tryFree}
              </Button>
            </div>
          </Reveal>
        </div>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {t.about.benefits.map((benefit, i) => {
            const Icon = iconList[i];
            return (
              <StaggerItem key={benefit.title}>
                <div className="group h-full rounded-2xl border border-card-border bg-card p-6 transition-all duration-300 hover:border-tiger/30 hover:shadow-lg hover:shadow-tiger/5 hover:-translate-y-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tiger-muted text-tiger transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{benefit.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <Reveal>
          <div className="rounded-3xl border border-card-border bg-card p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
              <div>
                <h3 className="font-display text-3xl tracking-wide text-foreground uppercase">
                  {t.about.ageGroupsTitle}
                </h3>
                <p className="mt-2 text-muted">{t.about.ageGroupsNote}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-tiger">
                <Users className="h-4 w-4" />
                {t.about.agesRange}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.about.ageGroups.map((group, i) => (
                <div
                  key={group.name}
                  className={cn(
                    "group rounded-2xl border border-card-border bg-background p-5 transition-all duration-300 hover:border-tiger/40 hover:-translate-y-1",
                    i === t.about.ageGroups.length - 1 && "sm:col-span-2 lg:col-span-1"
                  )}
                >
                  <span className="inline-block rounded-full bg-tiger-muted px-3 py-1 text-xs font-semibold text-tiger mb-3">
                    {group.tag}
                  </span>
                  <h4 className="font-display text-2xl text-foreground tracking-wide">
                    {group.name}
                  </h4>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{group.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
