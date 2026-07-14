"use client";

import { Button } from "@/components/ui/button";
import { LocationMap } from "@/components/location-map";
import { Reveal, SectionHeader } from "@/components/motion/reveal";
import { GAMEDAY_URL, VENUE_COORDINATES, VENUE_MAPS_URL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Calendar, Clock, MapPin, Trophy } from "lucide-react";

export function ScheduleSection() {
  const { t } = useLanguage();

  return (
    <section id="schedule" className="relative py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.schedule.eyebrow}
          title={t.schedule.title}
          description={t.schedule.description}
          className="mb-16 lg:mb-20"
        />

        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-card-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-card-border bg-background">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-tiger">
                      {t.schedule.table.group}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-tiger">
                      {t.schedule.table.day}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-tiger">
                      {t.schedule.table.time}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-tiger">
                      {t.schedule.table.location}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {t.schedule.rows.map((row, i) => (
                    <tr
                      key={row.group}
                      className={
                        i < t.schedule.rows.length - 1 ? "border-b border-card-border" : ""
                      }
                    >
                      <td className="px-6 py-5 font-medium text-foreground">{row.group}</td>
                      <td className="px-6 py-5 text-muted">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-tiger shrink-0" />
                          {row.day}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-muted">
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-tiger shrink-0" />
                          {row.time}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-muted">
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-tiger shrink-0" />
                          {row.location}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {t.schedule.rows.map((row) => (
              <div
                key={`note-${row.group}`}
                className="border-t border-card-border px-6 py-3 bg-tiger-muted/50"
              >
                <p className="text-xs text-muted">
                  <span className="text-tiger font-medium">{row.group}:</span> {row.note}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-card-border bg-card p-7">
              <LocationMap
                location={t.schedule.locationTitle}
                coordinates={VENUE_COORDINATES}
                mapsUrl={VENUE_MAPS_URL}
                liveLabel={t.schedule.mapLive}
                expandHint={t.schedule.mapExpandHint}
                directionsLabel={t.schedule.mapDirections}
                className="mb-5"
              />
              <p className="text-sm text-muted leading-relaxed">{t.schedule.locationBody}</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-card-border bg-card p-7">
              <Trophy className="h-8 w-8 text-tiger mb-4" />
              <h3 className="text-lg font-semibold text-foreground">
                {t.schedule.competitionTitle}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {t.schedule.competitionBody}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12 text-center">
          <Button href={GAMEDAY_URL} size="lg">
            {t.schedule.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
