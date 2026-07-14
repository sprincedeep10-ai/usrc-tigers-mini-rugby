"use client";

import { InstagramIcon } from "@/components/icons/instagram";
import {
  formatEngagement,
  IG_HANDLE,
  IG_PROFILE_URL,
  type InstagramPost,
} from "@/data/ig-posts";
import { useLanguage } from "@/lib/i18n/language-provider";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Heart, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";

interface InstagramPostModalProps {
  post: InstagramPost | null;
  onClose: () => void;
}

export function InstagramPostModal({ post, onClose }: InstagramPostModalProps) {
  const { t } = useLanguage();
  const postUrl = post?.postUrl ?? IG_PROFILE_URL;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!post) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [post, handleKeyDown]);

  return (
    <AnimatePresence>
      {post && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="ig-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[90] flex w-auto max-h-[calc(100vh-2rem)] sm:max-h-[90vh] sm:max-w-4xl sm:w-full flex-col overflow-hidden rounded-3xl border border-card-border bg-card-elevated shadow-2xl shadow-black/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tiger/15 ring-1 ring-tiger/30">
                  <span className="text-sm">🐯</span>
                </div>
                <div className="min-w-0">
                  <p
                    id="ig-modal-title"
                    className="truncate text-sm font-semibold text-foreground"
                  >
                    @{IG_HANDLE}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label={t.videoModal.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1">
              <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full bg-black">
                <Image
                  src={post.image}
                  alt={post.caption.slice(0, 100)}
                  fill
                  className="object-cover sm:object-contain"
                  sizes="(max-width: 640px) 100vw, 896px"
                  priority
                />
              </div>

              <div className="px-5 py-5">
                <div className="flex items-center gap-5 mb-4">
                  <span className="flex items-center gap-1.5 text-sm text-foreground">
                    <Heart className="h-5 w-5 fill-tiger text-tiger" />
                    <span className="font-semibold">
                      {formatEngagement(post.likes)} {t.common.likes}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted">
                    <MessageCircle className="h-5 w-5" />
                    {formatEngagement(post.comments)} {t.common.comments}
                  </span>
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                  <span className="font-semibold text-foreground">@{IG_HANDLE}</span>{" "}
                  {post.caption}
                </p>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="border-t border-card-border px-5 py-4 shrink-0 bg-card">
              <a
                href={postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-tiger px-6 py-3.5 text-sm font-semibold text-black transition-all hover:bg-tiger-hover hover:shadow-lg hover:shadow-tiger/25"
              >
                <InstagramIcon className="h-4 w-4" />
                {t.common.openInInstagram}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
