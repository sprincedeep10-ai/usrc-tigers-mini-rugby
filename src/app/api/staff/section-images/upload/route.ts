import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/staff-auth";
import {
  isBlobStorageConfigured,
  uploadSectionImage,
} from "@/lib/section-image-store";
import { resolveSectionImageUrl } from "@/lib/section-image-utils";
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

  if (!isBlobStorageConfigured()) {
    return NextResponse.json(
      {
        error:
          "Image storage is not set up yet. In Vercel: open this project → Storage → Create Blob Store → Redeploy. Then try again.",
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
    const imageUrl = resolveSectionImageUrl(manifest, section);

    return NextResponse.json({
      success: true,
      section,
      url: entry.url,
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
