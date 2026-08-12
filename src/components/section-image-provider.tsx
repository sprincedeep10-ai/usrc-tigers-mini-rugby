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
import {
  sectionImageUrl,
  type SectionImageKey,
} from "@/data/section-images";
import { SECTION_IMAGE_VERSIONS } from "@/data/section-image-versions";
import type { SectionImageVersionMap } from "@/lib/section-image-versions";

const CHANNEL_NAME = "usrc-section-images";

interface SectionImageContextValue {
  versions: SectionImageVersionMap;
  getImageUrl: (key: SectionImageKey) => string;
  refreshVersions: () => Promise<SectionImageVersionMap>;
  setVersion: (key: SectionImageKey, version: number) => void;
}

const SectionImageContext = createContext<SectionImageContextValue | null>(null);

function mergeVersions(
  initial: SectionImageVersionMap,
  fallback: SectionImageVersionMap
): SectionImageVersionMap {
  return { ...fallback, ...initial };
}

export function notifySectionImagesUpdated(versions: SectionImageVersionMap) {
  try {
    new BroadcastChannel(CHANNEL_NAME).postMessage({ type: "update", versions });
  } catch {}
}

export function SectionImageProvider({
  initialVersions,
  children,
}: {
  initialVersions?: SectionImageVersionMap;
  children: ReactNode;
}) {
  const [versions, setVersions] = useState<SectionImageVersionMap>(() =>
    mergeVersions(initialVersions ?? {}, SECTION_IMAGE_VERSIONS)
  );

  const refreshVersions = useCallback(async () => {
    const res = await fetch("/api/section-images/versions", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to refresh section image versions");
    }
    const data = (await res.json()) as { sectionImageVersions?: SectionImageVersionMap };
    const next = mergeVersions(data.sectionImageVersions ?? {}, SECTION_IMAGE_VERSIONS);
    setVersions(next);
    return next;
  }, []);

  const setVersion = useCallback((key: SectionImageKey, version: number) => {
    setVersions((prev) => ({ ...prev, [key]: version }));
  }, []);

  const getImageUrl = useCallback(
    (key: SectionImageKey) => {
      const version = versions[key] ?? SECTION_IMAGE_VERSIONS[key];
      return sectionImageUrl(key, version);
    },
    [versions]
  );

  useEffect(() => {
    refreshVersions().catch(() => {});

    const onFocus = () => {
      refreshVersions().catch(() => {});
    };
    window.addEventListener("focus", onFocus);

    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.onmessage = (event) => {
        if (event.data?.type === "update" && event.data.versions) {
          setVersions((prev) => ({ ...prev, ...event.data.versions }));
        }
      };
    } catch {}

    return () => {
      window.removeEventListener("focus", onFocus);
      channel?.close();
    };
  }, [refreshVersions]);

  const value = useMemo(
    () => ({ versions, getImageUrl, refreshVersions, setVersion }),
    [versions, getImageUrl, refreshVersions, setVersion]
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
  version?: number
): string {
  return sectionImageUrl(key, version ?? SECTION_IMAGE_VERSIONS[key]);
}
