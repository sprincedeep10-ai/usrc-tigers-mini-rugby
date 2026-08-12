"use client";

import { useEffect, useState } from "react";
import {
  SECTION_IMAGE_PATHS,
  sectionImageRawUrl,
  type SectionImageKey,
} from "@/data/section-images";
import { SECTION_IMAGE_VERSIONS } from "@/data/section-image-versions";

const CACHE_KEY = "usrc-tigers-section-images-v";

type VersionMap = Partial<Record<SectionImageKey, number>>;

function loadCachedVersions(): VersionMap {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) return JSON.parse(raw) as VersionMap;
  } catch {}
  return {};
}

export function useSectionImage(key: SectionImageKey): string {
  const [src, setSrc] = useState(SECTION_IMAGE_PATHS[key]);

  useEffect(() => {
    const cached = loadCachedVersions();
    const staticVersion = SECTION_IMAGE_VERSIONS[key];
    const version = cached[key] ?? staticVersion;

    if (version) {
      setSrc(sectionImageRawUrl(key, version));
    }

    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        const v = data.sectionImageVersions?.[key];
        if (v) {
          setSrc(sectionImageRawUrl(key, v));
          try {
            const next = loadCachedVersions();
            next[key] = v;
            localStorage.setItem(CACHE_KEY, JSON.stringify(next));
          } catch {}
        }
      })
      .catch(() => {});
  }, [key]);

  return src;
}

export function cacheSectionImageVersion(key: SectionImageKey, version: number) {
  try {
    const cached = loadCachedVersions();
    cached[key] = version;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  } catch {}
}

export function getSectionImageDisplayUrl(
  key: SectionImageKey,
  version?: number
): string {
  if (version) return sectionImageRawUrl(key, version);
  return SECTION_IMAGE_PATHS[key];
}
