import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/staff-auth";
import {
  isSupabaseConfigured,
  uploadSectionImage,
} from "@/lib/section-image-storage";
import { type SectionImageManifest } from "@/lib/section-image-utils";
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

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Photo storage is not set up yet. Open src/config/supabase.ts and add your Supabase URL and service role key, then push to GitHub once.",
      },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const section = formData.get("section") as string | null;
    const manifestRaw = formData.get("manifest") as string | null;

    if (!file || !section || !isSectionKey(section)) {
      return NextResponse.json(
        { error: "Missing file or invalid section" },
        { status: 400 }
      );
    }

    let currentManifest: SectionImageManifest | undefined;
    if (manifestRaw) {
      try {
        currentManifest = JSON.parse(manifestRaw) as SectionImageManifest;
      } catch {}
    }

    const { entry, manifest } = await uploadSectionImage(
      section,
      file,
      currentManifest
    );

    return NextResponse.json({
      success: true,
      section,
      updatedAt: entry.updatedAt,
      imageUrl: entry.url,
      images: manifest,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Upload failed: ${error}` },
      { status: 500 }
    );
  }
}
