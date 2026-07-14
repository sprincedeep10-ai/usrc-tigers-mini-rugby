"use client";

import { Button } from "@/components/ui/button";
import {
  Reveal,
  SectionHeader,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/reveal";
import { GAMEDAY_URL, TESTIMONIAL_INITIALS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/language-provider";
import { MessageCircle, Star, Users } from "lucide-react";
import Image from "next/image";

const highlightIcons = [Users, MessageCircle, Star];

export function ParentsSection() {
  const { t } = useLanguage();

  return (
    <section id="parents" className="relative py-24 lg:py-32 bg-section-alt tiger-stripe">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.parents.eyebrow}
          title={t.parents.title}
          description={t.parents.description}
          className="mb-16 lg:mb-20"
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-3 mb-20">
          {t.parents.highlights.map((item, i) => {
            const Icon = highlightIcons[i];
            return (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-2xl border border-card-border bg-card/80 backdrop-blur-sm p-7 transition-all hover:border-tiger/30 hover:-translate-y-1">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-tiger-muted text-tiger">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <Reveal className="mb-10">
          <p className="text-center text-lg text-muted max-w-2xl mx-auto">
            {t.parents.testimonialsNote}
          </p>
        </Reveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.parents.testimonials.map((item, i) => (
            <StaggerItem key={item.name}>
              <div className="group h-full flex flex-col rounded-2xl border border-card-border bg-background p-6 transition-all hover:border-tiger/25 hover:shadow-xl hover:shadow-black/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tiger-muted font-semibold text-tiger text-sm">
                    {TESTIMONIAL_INITIALS[i]}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted">{item.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-tiger text-tiger" />
                  ))}
                </div>
                <p className="text-sm text-muted leading-relaxed flex-1">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal className="mt-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 rounded-3xl border border-tiger/20 bg-tiger-muted p-8 lg:p-12">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/sections/parents-usrc-coaching.jpg"
                alt={t.parents.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="font-display text-3xl tracking-wide text-foreground uppercase">
                {t.parents.ctaTitle}
              </h3>
              <p className="mt-4 text-muted leading-relaxed">{t.parents.ctaBody}</p>
              <Button href={GAMEDAY_URL} className="mt-6">
                {t.parents.ctaButton}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
