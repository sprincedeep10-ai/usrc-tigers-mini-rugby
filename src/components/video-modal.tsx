"use client";

import { INSTAGRAM_URL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/language-provider";
import { AnimatePresence, motion } from "framer-motion";
import { InstagramIcon } from "@/components/icons/instagram";
import { X } from "lucide-react";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

export function VideoModal({ open, onClose }: VideoModalProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[90] sm:w-full sm:max-w-2xl rounded-3xl border border-card-border bg-card p-6 sm:p-8 shadow-2xl"
            role="dialog"
            aria-modal
            aria-labelledby="video-modal-title"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3
                  id="video-modal-title"
                  className="font-display text-2xl tracking-wide text-foreground uppercase"
                >
                  {t.videoModal.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{t.videoModal.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-card-border text-foreground hover:bg-foreground/5 cursor-pointer"
                aria-label={t.videoModal.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-video rounded-2xl bg-background border border-card-border flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tiger-muted">
                <InstagramIcon className="h-8 w-8 text-tiger" />
              </div>
              <p className="text-muted max-w-sm">
                {t.videoModal.placeholder}{" "}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tiger hover:underline"
                >
                  @usrctigers_minis
                </a>
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-tiger px-6 py-3 text-sm font-semibold text-black hover:bg-tiger-hover transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
                {t.videoModal.viewOnInstagram}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
