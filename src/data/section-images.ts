export type SectionImageKey = "hero" | "about" | "parents" | "mission";

export interface SectionImageMeta {
  key: SectionImageKey;
  path: string;
  file: string;
  label: string;
  description: string;
  aspect: number;
}

export const SECTION_IMAGES: SectionImageMeta[] = [
  {
    key: "hero",
    path: "/images/sections/hero-usrc-tigers.jpg",
    file: "public/images/sections/hero-usrc-tigers.jpg",
    label: "Hero",
    description: "Top banner — appears above the 150+ stats",
    aspect: 4 / 5,
  },
  {
    key: "about",
    path: "/images/sections/about-usrc-players.jpg",
    file: "public/images/sections/about-usrc-players.jpg",
    label: "About Rugby",
    description: "Image next to the “More Than a Game” text",
    aspect: 4 / 3,
  },
  {
    key: "parents",
    path: "/images/sections/parents-usrc-coaching.jpg",
    file: "public/images/sections/parents-usrc-coaching.jpg",
    label: "Parents & Coaches",
    description: "Image in the “No Experience? No Problem” box",
    aspect: 16 / 9,
  },
  {
    key: "mission",
    path: "/images/sections/mission-usrc-tigers.jpg",
    file: "public/images/sections/mission-usrc-tigers.jpg",
    label: "Our Mission",
    description: "Image with “Building Tigers for Life” caption",
    aspect: 4 / 5,
  },
];

export const SECTION_IMAGE_PATHS = Object.fromEntries(
  SECTION_IMAGES.map((s) => [s.key, s.path])
) as Record<SectionImageKey, string>;

export const SECTION_IMAGE_FILES = Object.fromEntries(
  SECTION_IMAGES.map((s) => [s.key, s.file])
) as Record<SectionImageKey, string>;
