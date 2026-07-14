"use client";

import { InstagramPostCard } from "@/components/instagram/instagram-post-card";
import { InstagramPostModal } from "@/components/instagram/instagram-post-modal";
import { InstagramIcon } from "@/components/icons/instagram";
import { Button } from "@/components/ui/button";
import {
  Reveal,
  SectionHeader,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/reveal";
import {
  IG_POSTS as staticPosts,
  IG_PROFILE_URL,
  type InstagramPost,
} from "@/data/ig-posts";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-provider";

const POSTS_CACHE_KEY = "usrc-tigers-ig-cache";

export function InstagramSection() {
  const { t } = useLanguage();
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);
  const [posts, setPosts] = useState<InstagramPost[]>(staticPosts);
  const fetchedRef = useRef(false);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(POSTS_CACHE_KEY);
      if (cached) {
        setPosts(JSON.parse(cached));
      }
    } catch {}

    if (!fetchedRef.current) {
      fetchedRef.current = true;
      fetch("/api/content")
        .then((r) => r.json())
        .then((data) => {
          if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
            setPosts(data.posts);
            try {
              localStorage.setItem(POSTS_CACHE_KEY, JSON.stringify(data.posts));
            } catch {}
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <>
      <section
        id="instagram"
        className="relative scroll-mt-20 pt-12 pb-20 lg:pt-16 lg:pb-28 bg-section-alt overflow-hidden border-y border-tiger/20"
      >
        <div className="absolute inset-0 tiger-stripe opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full bg-gradient-to-r from-transparent via-tiger/50 to-transparent" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[80%] max-w-4xl rounded-full bg-tiger/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-12">
            <SectionHeader
              eyebrow={t.instagram.eyebrow}
              title={t.instagram.title}
              description={t.instagram.description}
              align="left"
              className="mb-0 lg:max-w-2xl"
            />
            <Reveal className="shrink-0">
              <Button href={IG_PROFILE_URL} size="lg" className="gap-3 w-full sm:w-auto">
                <InstagramIcon className="h-5 w-5" />
                {t.instagram.followButton}
              </Button>
            </Reveal>
          </div>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {posts.slice(0, 8).map((post) => (
              <StaggerItem key={post.id}>
                <InstagramPostCard post={post} onOpen={setActivePost} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal className="mt-10 text-center">
            <p className="text-sm text-muted">{t.instagram.followNote}</p>
          </Reveal>
        </div>
      </section>

      <InstagramPostModal post={activePost} onClose={() => setActivePost(null)} />
    </>
  );
}
