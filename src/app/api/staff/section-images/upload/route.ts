import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/staff-auth";
import { commitFile, getFileContents } from "@/lib/github";
import {
  SECTION_IMAGE_FILES,
  sectionImageUrl,
  type SectionImageKey,
} from "@/data/section-images";

const GITHUB_OWNER = "sprincedeep10-ai";
const GITHUB_REPO = "usrc-tigers-mini-rugby";
const BRANCH = "main";

function isSectionKey(value: string): value is SectionImageKey {
  return value in SECTION_IMAGE_FILES;
}

async function getBinaryFileSha(path: string): Promise<string | undefined> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) return undefined;
  const data = await res.json();
  return data.sha as string | undefined;
}

async function commitBinaryFile(
  path: string,
  base64: string,
  message: string,
  sha?: string
): Promise<void> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  const body: Record<string, unknown> = {
    message,
    content: base64,
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`GitHub commit failed ${res.status}: ${await res.text()}`);
  }
}

async function bumpVersion(section: SectionImageKey): Promise<number> {
  for (let attempt = 0; attempt < 4; attempt++) {
    const version = Date.now() + attempt;
    const { content, sha } = await getFileContents("src/data/section-image-versions.ts");

    const keyPattern = new RegExp(`(${section}:\\s*)\\d+`);
    const updated = keyPattern.test(content)
      ? content.replace(keyPattern, `$1${version}`)
      : content.replace(
          /(\{[\s\S]*?)(\n\};)/,
          `$1,\n  ${section}: ${version}$2`
        );

    try {
      await commitFile(
        "src/data/section-image-versions.ts",
        updated,
        `chore: update ${section} image version via admin panel`,
        sha
      );
      return version;
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }

  throw new Error("Failed to bump section image version");
}

async function waitForProxyImage(url: string): Promise<void> {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 400 * attempt));
  }
}

export async function POST(request: NextRequest) {
  const token =
    request.cookies.get("staff-token")?.value ??
    request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token || !verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const section = formData.get("section") as string | null;

    if (!file || !section || !isSectionKey(section)) {
      return NextResponse.json(
        { error: "Missing file or invalid section" },
        { status: 400 }
      );
    }

    const filePath = SECTION_IMAGE_FILES[section];
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const existingSha = await getBinaryFileSha(filePath);

    await commitBinaryFile(
      filePath,
      base64,
      `chore: update ${section} section image via admin panel`,
      existingSha
    );

    await new Promise((r) => setTimeout(r, 600));
    const version = await bumpVersion(section);
    const imageUrl = sectionImageUrl(section, version);

    await waitForProxyImage(
      `${request.nextUrl.origin}${imageUrl}`
    );

    return NextResponse.json({ success: true, version, imageUrl });
  } catch (error) {
    return NextResponse.json(
      { error: `Upload failed: ${error}` },
      { status: 500 }
    );
  }
}
