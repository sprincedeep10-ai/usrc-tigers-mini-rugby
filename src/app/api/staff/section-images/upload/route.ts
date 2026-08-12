import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/staff-auth";
import {
  isGitHubStorageConfigured,
  uploadSectionImage,
} from "@/lib/section-image-github";
import { getSectionImageDisplayUrl } from "@/lib/section-image-utils";
import { SECTION_IMAGE_PATHS, type SectionImageKey } from "@/data/section-images";

function isSectionKey(value: string): value is SectionImageKey {
  return value in SECTION_IMAGE_PATHS;
}

export async function POST(request: NextRequest) {
  const token =
    request.cookies.get("staff-token")?.value ??
    request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token || !verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isGitHubStorageConfigured()) {
    return NextResponse.json(
      {
        error:
          "GITHUB_TOKEN is not configured on the server. Add it in Vercel project Settings → Environment Variables, then redeploy once.",
      },
      { status: 503 }
    );
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

    const { entry, manifest } = await uploadSectionImage(section, file);
    const imageUrl = getSectionImageDisplayUrl(section, entry);

    return NextResponse.json({
      success: true,
      section,
      updatedAt: entry.updatedAt,
      imageUrl,
      images: manifest,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Upload failed: ${error}` },
      { status: 500 }
    );
  }
}
