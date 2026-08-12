export type SectionImageKey = "hero" | "about" | "parents" | "mission";

export interface SectionImageMeta {
  key: SectionImageKey;
  path: string;
  label: string;
  description: string;
  aspect: number;
}

export const SECTION_IMAGES: SectionImageMeta[] = [
  {
    key: "hero",
    path: "/images/sections/hero-usrc-tigers.jpg",
    label: "Hero",
    description: "Top banner — appears above the 150+ stats",
    aspect: 4 / 5,
  },
  {
    key: "about",
    path: "/images/sections/about-usrc-players.jpg",
    label: "About Rugby",
    description: "Image next to the “More Than a Game” text",
    aspect: 4 / 3,
  },
  {
    key: "parents",
    path: "/images/sections/parents-usrc-coaching.jpg",
    label: "Parents & Coaches",
    description: "Image in the “No Experience? No Problem” box",
    aspect: 16 / 9,
  },
  {
    key: "mission",
    path: "/images/sections/mission-usrc-tigers.jpg",
    label: "Our Mission",
    description: "Image with “Building Tigers for Life” caption",
    aspect: 4 / 5,
  },
];

export const SECTION_IMAGE_PATHS = Object.fromEntries(
  SECTION_IMAGES.map((s) => [s.key, s.path])
) as Record<SectionImageKey, string>;

export const SECTION_IMAGE_FILES: Record<SectionImageKey, string> = {
  hero: "public/images/sections/hero-usrc-tigers.jpg",
  about: "public/images/sections/about-usrc-players.jpg",
  parents: "public/images/sections/parents-usrc-coaching.jpg",
  mission: "public/images/sections/mission-usrc-tigers.jpg",
};

const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/sprincedeep10-ai/usrc-tigers-mini-rugby/main";

/** GitHub raw URL for a section image (repo path includes public/) */
export function sectionImageRawUrl(
  key: SectionImageKey,
  version?: number
): string {
  const path = SECTION_IMAGE_FILES[key];
  const query = version ? `?v=${version}` : "";
  return `${GITHUB_RAW_BASE}/${path}${query}`;
}
