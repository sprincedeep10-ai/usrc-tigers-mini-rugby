"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isSupabasePublicConfigured } from "@/config/supabase-public";
import { type SectionImageKey } from "@/data/section-images";
import { fetchPublicSectionImageManifest } from "@/lib/section-image-manifest";
import {
  buildDefaultManifest,
  getSectionImageDisplayUrl,
  mergeManifests,
  type SectionImageEntry,
  type SectionImageManifest,
} from "@/lib/section-image-utils";

const CHANNEL_NAME = "usrc-section-images";
const REFRESH_MS = 15_000;

interface SectionImageContextValue {
  images: SectionImageManifest;
  getImageUrl: (key: SectionImageKey) => string;
  refreshImages: () => Promise<SectionImageManifest>;
  applyManifest: (manifest: SectionImageManifest) => void;
  setImage: (key: SectionImageKey, entry: SectionImageEntry) => void;
}

const SectionImageContext = createContext<SectionImageContextValue | null>(null);

export function notifySectionImagesUpdated(manifest: SectionImageManifest) {
  try {
    new BroadcastChannel(CHANNEL_NAME).postMessage({ type: "update", manifest });
  } catch {}
}

async function loadManifestFromSupabase(): Promise<SectionImageManifest | null> {
  if (!isSupabasePublicConfigured()) return null;
  return fetchPublicSectionImageManifest();
}

export function SectionImageProvider({
  initialImages,
  children,
}: {
  initialImages?: SectionImageManifest;
  children: ReactNode;
}) {
  const [images, setImages] = useState<SectionImageManifest>(() =>
    mergeManifests(buildDefaultManifest(), initialImages ?? {})
  );

  const applyManifest = useCallback((manifest: SectionImageManifest) => {
    setImages((prev) => mergeManifests(prev, manifest));
  }, []);

  const refreshImages = useCallback(async () => {
    const next = await loadManifestFromSupabase();
    if (!next) {
      throw new Error("Failed to refresh section images");
    }
    setImages((prev) => mergeManifests(prev, next));
    return next;
  }, []);

  const setImage = useCallback((key: SectionImageKey, entry: SectionImageEntry) => {
    setImages((prev) => mergeManifests(prev, { [key]: entry }));
  }, []);

  const getImageUrl = useCallback(
    (key: SectionImageKey) => getSectionImageDisplayUrl(key, images[key]),
    [images]
  );

  useEffect(() => {
    loadManifestFromSupabase()
      .then((next) => {
        if (next) setImages((prev) => mergeManifests(prev, next));
      })
      .catch(() => {});

    const onFocus = () => {
      loadManifestFromSupabase()
        .then((next) => {
          if (next) setImages((prev) => mergeManifests(prev, next));
        })
        .catch(() => {});
    };
    window.addEventListener("focus", onFocus);

    const interval = window.setInterval(onFocus, REFRESH_MS);

    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.onmessage = (event) => {
        if (event.data?.type === "update" && event.data.manifest) {
          setImages((prev) => mergeManifests(prev, event.data.manifest));
        }
      };
    } catch {}

    return () => {
      window.removeEventListener("focus", onFocus);
      window.clearInterval(interval);
      channel?.close();
    };
  }, []);

  const value = useMemo(
    () => ({ images, getImageUrl, refreshImages, applyManifest, setImage }),
    [images, getImageUrl, refreshImages, applyManifest, setImage]
  );

  return (
    <SectionImageContext.Provider value={value}>
      {children}
    </SectionImageContext.Provider>
  );
}

export function useSectionImages() {
  const ctx = useContext(SectionImageContext);
  if (!ctx) {
    throw new Error("useSectionImages must be used within SectionImageProvider");
  }
  return ctx;
}

export function useSectionImage(key: SectionImageKey): string {
  const { getImageUrl } = useSectionImages();
  return getImageUrl(key);
}

export { getSectionImageDisplayUrl };
