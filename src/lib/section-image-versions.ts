import { getFileContents } from "@/lib/github";
import { SECTION_IMAGE_VERSIONS } from "@/data/section-image-versions";
import type { SectionImageKey } from "@/data/section-images";

export type SectionImageVersionMap = Partial<Record<SectionImageKey, number>>;

export function parseSectionImageVersions(content: string): SectionImageVersionMap {
  try {
    const match = content.match(
      /export const SECTION_IMAGE_VERSIONS[^=]*=\s*(\{[\s\S]*?\});/
    );
    if (match) {
      return new Function(`return ${match[1]}`)() as SectionImageVersionMap;
    }
  } catch {}
  return { ...SECTION_IMAGE_VERSIONS };
}

export async function fetchSectionImageVersions(): Promise<SectionImageVersionMap> {
  try {
    const { content } = await getFileContents("src/data/section-image-versions.ts");
    return parseSectionImageVersions(content);
  } catch {
    return { ...SECTION_IMAGE_VERSIONS };
  }
}
