"use client";

import { InstagramIcon } from "@/components/icons/instagram";
import {
  formatEngagement,
  IG_HANDLE,
  type InstagramPost,
} from "@/data/ig-posts";
import { useLanguage } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BadgeCheck, Calendar, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface InstagramPostCardProps {
  post: InstagramPost;
  onOpen: (post: InstagramPost) => void;
}

const CAPTION_PREVIEW_LENGTH = 120;

export function InstagramPostCard({ post, onOpen }: InstagramPostCardProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const isLong = post.caption.length > CAPTION_PREVIEW_LENGTH;
  const preview = isLong
    ? `${post.caption.slice(0, CAPTION_PREVIEW_LENGTH).trim()}…`
    : post.caption;

  const postUrl = post.postUrl ?? `https://www.instagram.com/${IG_HANDLE}/`;

  return (
    <motion.article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl",
        "border border-card-border bg-card-elevated",
        "shadow-lg shadow-black/30",
        "transition-all duration-300",
        "hover:-translate-y-1.5 hover:border-tiger/35",
        "hover:shadow-xl hover:shadow-tiger/10"
      )}
      whileTap={{ scale: 0.995 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-tiger/30 to-tiger/10 ring-2 ring-tiger/25">
            <span className="text-xs font-bold text-tiger">🐯</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate text-sm font-semibold text-foreground">
                @{IG_HANDLE}
              </span>
              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-tiger" aria-hidden />
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-xs text-muted">
          <Calendar className="h-3 w-3" />
          {post.date}
        </div>
      </div>

      {/* Photo */}
      <button
        type="button"
        onClick={() => onOpen(post)}
        className="relative aspect-[4/5] w-full overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-tiger focus-visible:ring-inset"
        aria-label={`View Instagram post: ${preview}`}
      >
        <Image
          src={post.image}
          alt={post.caption.slice(0, 80)}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute inset-0 ring-0 group-hover:ring-1 ring-inset ring-tiger/20 transition-all duration-300 pointer-events-none" />
      </button>

      {/* Engagement + caption */}
      <div className="flex flex-col flex-1 px-4 py-3.5">
        <div className="flex items-center gap-5 mb-2.5">
          <span className="flex items-center gap-1.5 text-sm text-foreground">
            <Heart className="h-[18px] w-[18px] fill-tiger text-tiger" />
            <span className="font-semibold">{formatEngagement(post.likes)}</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted">
            <MessageCircle className="h-[18px] w-[18px]" />
            <span>{formatEngagement(post.comments)}</span>
          </span>
        </div>

        <p className="text-sm text-foreground/90 leading-relaxed">
          <span className="font-semibold text-foreground mr-1.5">@{IG_HANDLE}</span>
          {expanded || !isLong ? post.caption : preview}
          {isLong && !expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="ml-1 text-muted hover:text-tiger transition-colors cursor-pointer"
            >
              {t.common.readMore}
            </button>
          )}
        </p>

        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-card-border bg-foreground/[0.04] px-4 py-2.5 text-xs font-semibold text-foreground transition-all hover:border-tiger/40 hover:bg-tiger/10 hover:text-tiger"
        >
          <InstagramIcon className="h-3.5 w-3.5" />
          {t.common.viewOnInstagram}
        </a>
      </div>
    </motion.article>
  );
}
