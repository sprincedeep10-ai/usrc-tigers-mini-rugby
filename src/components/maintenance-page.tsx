import { INSTAGRAM_URL } from "@/lib/constants";
import Image from "next/image";

export function MaintenancePage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, var(--stripe-color) 0, var(--stripe-color) 1px, transparent 0, transparent 50%)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--hero-glow)] blur-3xl" />

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <Image
          src="/images/usrc-tigers-logo.png"
          alt="U.S.R.C Tigers RFC"
          width={160}
          height={160}
          className="h-auto w-28 sm:w-36"
          priority
        />

        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--tiger-yellow)]">
          USRC Tigers Mini Rugby
        </p>

        <h1 className="font-display mt-4 text-4xl uppercase leading-none tracking-wide sm:text-5xl">
          Site in Maintenance
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          We&apos;re putting the finishing touches on our new website. Will be
          ready soon!
        </p>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-fg)] transition hover:bg-[var(--btn-primary-hover)]"
        >
          Follow @usrctigers_minis
        </a>
      </div>
    </div>
  );
}
