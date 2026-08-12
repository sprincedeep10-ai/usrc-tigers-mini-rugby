import {
  SECTION_IMAGE_PATHS,
  type SectionImageKey,
} from "@/data/section-images";
import { SECTION_IMAGE_VERSIONS } from "@/data/section-image-versions";

export interface SectionImageEntry {
  updatedAt: number;
}

export type SectionImageManifest = Partial<Record<SectionImageKey, SectionImageEntry>>;

export function parseSectionImageVersions(
  content: string
): Record<SectionImageKey, number> {
  try {
    const match = content.match(
      /export const SECTION_IMAGE_VERSIONS[^=]*=\s*(\{[\s\S]*?\});/
    );
    if (match) {
      return new Function(`return ${match[1]}`)() as Record<SectionImageKey, number>;
    }
  } catch {}
  return { ...SECTION_IMAGE_VERSIONS } as Record<SectionImageKey, number>;
}

export function buildDefaultManifest(): SectionImageManifest {
  return Object.fromEntries(
    (Object.keys(SECTION_IMAGE_PATHS) as SectionImageKey[]).map((key) => [
      key,
      { updatedAt: SECTION_IMAGE_VERSIONS[key] ?? 0 },
    ])
  ) as SectionImageManifest;
}

export function versionsToManifest(
  versions: Partial<Record<SectionImageKey, number>>
): SectionImageManifest {
  const defaults = buildDefaultManifest();
  for (const key of Object.keys(defaults) as SectionImageKey[]) {
    if (versions[key] != null) {
      defaults[key] = { updatedAt: versions[key]! };
    }
  }
  return defaults;
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

/** Same-origin image URL — always fresh via /api/section-images */
export function resolveSectionImageUrl(
  key: SectionImageKey,
  updatedAt?: number
): string {
  const version = updatedAt ?? 0;
  if (version === 0) {
    return SECTION_IMAGE_PATHS[key];
  }
  return `/api/section-images/${key}?v=${version}`;
}

export function mergeManifests(
  ...manifests: SectionImageManifest[]
): SectionImageManifest {
  const keys = Object.keys(SECTION_IMAGE_PATHS) as SectionImageKey[];
  const result = buildDefaultManifest();

  for (const key of keys) {
    let best = result[key]!.updatedAt;
    for (const manifest of manifests) {
      const entry = manifest[key];
      if (entry && entry.updatedAt >= best) {
        best = entry.updatedAt;
      }
    }
    result[key] = { updatedAt: best };
  }

  return result;
}

export function getSectionImageDisplayUrl(
  key: SectionImageKey,
  entry?: SectionImageEntry
): string {
  return resolveSectionImageUrl(key, entry?.updatedAt ?? 0);
}
