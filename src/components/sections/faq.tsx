"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeader } from "@/components/motion/reveal";
import { GAMEDAY_URL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/language-provider";

export function FAQSection() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          description={t.faq.description}
          className="mb-12"
        />

        <Reveal>
          <Accordion items={t.faq.items} />
        </Reveal>

        <Reveal className="mt-12 text-center">
          <Button href={GAMEDAY_URL} variant="outline">
            {t.common.registerForFreeTrial}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
