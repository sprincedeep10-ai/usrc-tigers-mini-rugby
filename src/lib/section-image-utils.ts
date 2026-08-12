import {
  SECTION_IMAGE_PATHS,
  type SectionImageKey,
} from "@/data/section-images";

export interface SectionImageEntry {
  url: string;
  updatedAt: number;
}

export type SectionImageManifest = Partial<Record<SectionImageKey, SectionImageEntry>>;

export function buildDefaultManifest(): SectionImageManifest {
  return Object.fromEntries(
    (Object.keys(SECTION_IMAGE_PATHS) as SectionImageKey[]).map((key) => [
      key,
      { url: SECTION_IMAGE_PATHS[key], updatedAt: 0 },
    ])
  ) as SectionImageManifest;
}

export function resolveSectionImageUrl(
  manifest: SectionImageManifest,
  key: SectionImageKey
): string {
  const entry = manifest[key] ?? buildDefaultManifest()[key]!;
  if (entry.updatedAt === 0 && entry.url.startsWith("/")) {
    return entry.url;
  }
  const separator = entry.url.includes("?") ? "&" : "?";
  return `${entry.url}${separator}v=${entry.updatedAt}`;
}

/** Keep the newest entry per section when merging manifests */
export function mergeManifests(
  ...manifests: SectionImageManifest[]
): SectionImageManifest {
  const keys = Object.keys(SECTION_IMAGE_PATHS) as SectionImageKey[];
  const result = buildDefaultManifest();

  for (const key of keys) {
    let best = result[key]!;
    for (const manifest of manifests) {
      const entry = manifest[key];
      if (entry && entry.updatedAt >= best.updatedAt) {
        best = entry;
      }
    }
    result[key] = best;
  }

  return result;
}
