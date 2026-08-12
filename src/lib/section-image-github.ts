import {
  commitBinaryFile,
  commitFile,
  getBinaryFileContents,
  getFileContents,
} from "@/lib/github";
import {
  SECTION_IMAGE_FILES,
  type SectionImageKey,
} from "@/data/section-images";
import {
  buildDefaultManifest,
  mergeManifests,
  parseSectionImageVersions,
  type SectionImageEntry,
  type SectionImageManifest,
  versionsToManifest,
} from "@/lib/section-image-utils";

const VERSIONS_PATH = "src/data/section-image-versions.ts";

export async function fetchSectionImageManifest(): Promise<SectionImageManifest> {
  try {
    const { content } = await getFileContents(VERSIONS_PATH);
    const versions = parseSectionImageVersions(content);
    return mergeManifests(buildDefaultManifest(), versionsToManifest(versions));
  } catch {
    return buildDefaultManifest();
  }
}

async function bumpVersion(section: SectionImageKey): Promise<number> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const version = Date.now() + attempt;
    const { content, sha } = await getFileContents(VERSIONS_PATH);

    const keyPattern = new RegExp(`(${section}:\\s*)\\d+`);
    const updated = keyPattern.test(content)
      ? content.replace(keyPattern, `$1${version}`)
      : content.replace(
          /(\{[\s\S]*?)(\n\};)/,
          `$1,\n  ${section}: ${version}$2`
        );

    try {
      await commitFile(
        VERSIONS_PATH,
        updated,
        `chore: update ${section} image version via admin panel`,
        sha
      );
      return version;
    } catch (error) {
      if (attempt === 4) throw error;
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }

  throw new Error("Failed to update image version");
}

export async function uploadSectionImage(
  key: SectionImageKey,
  file: Blob
): Promise<{ entry: SectionImageEntry; manifest: SectionImageManifest }> {
  const filePath = SECTION_IMAGE_FILES[key];
  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");

  let existingSha: string | undefined;
  try {
    const existing = await getBinaryFileContents(filePath);
    existingSha = existing.sha;
  } catch {}

  await commitBinaryFile(
    filePath,
    base64,
    `chore: update ${key} section image via admin panel`,
    existingSha
  );

  const updatedAt = await bumpVersion(key);
  const entry: SectionImageEntry = { updatedAt };
  const manifest = mergeManifests(await fetchSectionImageManifest(), {
    [key]: entry,
  });

  return { entry, manifest };
}

export function isGitHubStorageConfigured(): boolean {
  return Boolean(process.env.GITHUB_TOKEN);
}
