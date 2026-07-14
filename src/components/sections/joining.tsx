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
import { ArrowRight, ExternalLink } from "lucide-react";

export function JoiningSection() {
  const { t } = useLanguage();

  return (
    <section id="joining" className="relative py-24 lg:py-32 bg-section-alt overflow-hidden">
      <div className="absolute inset-0 tiger-stripe opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.joining.eyebrow}
          title={t.joining.title}
          description={t.joining.description}
          className="mb-16 lg:mb-20"
        />

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-tiger/50 via-tiger/20 to-transparent hidden md:block lg:left-1/2 lg:-translate-x-px" />

          <StaggerContainer className="space-y-8 md:space-y-12">
            {t.joining.steps.map((step, i) => (
              <StaggerItem key={step.title}>
                <div
                  className={`flex flex-col gap-6 md:flex-row md:items-center ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  >
                    <div
                      className={`md:max-w-md ${
                        i % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                      }`}
                    >
                      <span className="inline-block font-display text-5xl text-tiger/30">
                        0{i + 1}
                      </span>
                      <h3 className="mt-1 font-display text-2xl tracking-wide text-foreground uppercase">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-muted leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  <div className="relative flex shrink-0 justify-center md:w-16 lg:w-auto">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-tiger bg-background font-display text-2xl text-tiger shadow-lg shadow-tiger/20 z-10">
                      {i + 1}
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <Reveal className="mt-16">
          <div className="rounded-3xl border border-tiger/30 bg-gradient-to-br from-tiger-muted to-transparent p-8 lg:p-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-background border border-card-border px-4 py-1.5 text-xs text-muted mb-6">
              <ExternalLink className="h-3.5 w-3.5" />
              {t.joining.badge}
            </div>

            <h3 className="font-display text-3xl sm:text-4xl tracking-wide text-foreground uppercase">
              {t.joining.ctaTitle}
            </h3>
            <p className="mt-4 max-w-xl mx-auto text-muted">{t.joining.ctaBody}</p>

            <Button href={GAMEDAY_URL} size="lg" className="mt-8 group">
              {t.joining.ctaButton}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <p className="mt-4 text-xs text-muted">{t.joining.ctaNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
