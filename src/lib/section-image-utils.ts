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

export function manifestToVersions(
  manifest: SectionImageManifest
): Record<SectionImageKey, number> {
  const result = {} as Record<SectionImageKey, number>;
  for (const key of Object.keys(SECTION_IMAGE_PATHS) as SectionImageKey[]) {
    result[key] = manifest[key]?.updatedAt ?? 0;
  }
  return result;
}

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

export function getSectionImageDisplayUrl(
  key: SectionImageKey,
  entry?: SectionImageEntry
): string {
  const resolved = entry ?? buildDefaultManifest()[key]!;
  if (resolved.updatedAt > 0 && resolved.url.startsWith("http")) {
    const sep = resolved.url.includes("?") ? "&" : "?";
    return `${resolved.url}${sep}t=${resolved.updatedAt}`;
  }
  return resolved.url;
}
