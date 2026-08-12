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
import { type SectionImageKey } from "@/data/section-images";
import {
  buildDefaultManifest,
  mergeManifests,
  resolveSectionImageUrl,
  type SectionImageEntry,
  type SectionImageManifest,
} from "@/lib/section-image-utils";

const CHANNEL_NAME = "usrc-section-images";

interface SectionImageContextValue {
  images: SectionImageManifest;
  storage: "blob" | "static";
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

export function SectionImageProvider({
  initialImages,
  initialStorage = "static",
  children,
}: {
  initialImages?: SectionImageManifest;
  initialStorage?: "blob" | "static";
  children: ReactNode;
}) {
  const [images, setImages] = useState<SectionImageManifest>(() =>
    mergeManifests(buildDefaultManifest(), initialImages ?? {})
  );
  const [storage, setStorage] = useState<"blob" | "static">(initialStorage);

  const applyManifest = useCallback((manifest: SectionImageManifest) => {
    setImages((prev) => mergeManifests(prev, manifest));
  }, []);

  const refreshImages = useCallback(async () => {
    const res = await fetch(`/api/section-images/versions?t=${Date.now()}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to refresh section images");
    }
    const data = (await res.json()) as {
      images?: SectionImageManifest;
      storage?: "blob" | "static";
    };
    const next = mergeManifests(buildDefaultManifest(), data.images ?? {});
    setImages((prev) => mergeManifests(prev, next));
    if (data.storage) setStorage(data.storage);
    return next;
  }, []);

  const setImage = useCallback((key: SectionImageKey, entry: SectionImageEntry) => {
    setImages((prev) => mergeManifests(prev, { [key]: entry }));
  }, []);

  const getImageUrl = useCallback(
    (key: SectionImageKey) => resolveSectionImageUrl(images, key),
    [images]
  );

  useEffect(() => {
    refreshImages().catch(() => {});

    const onFocus = () => {
      refreshImages().catch(() => {});
    };
    window.addEventListener("focus", onFocus);

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
      channel?.close();
    };
  }, [refreshImages]);

  const value = useMemo(
    () => ({ images, storage, getImageUrl, refreshImages, applyManifest, setImage }),
    [images, storage, getImageUrl, refreshImages, applyManifest, setImage]
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

export function getSectionImageDisplayUrl(
  key: SectionImageKey,
  entry?: SectionImageEntry
): string {
  const manifest = buildDefaultManifest();
  if (entry) manifest[key] = entry;
  return resolveSectionImageUrl(manifest, key);
}
