import { NextRequest, NextResponse } from "next/server";
import { getBinaryFileContents } from "@/lib/github";
import { SECTION_IMAGE_FILES, type SectionImageKey } from "@/data/section-images";

export const dynamic = "force-dynamic";

function isSectionKey(value: string): value is SectionImageKey {
  return value in SECTION_IMAGE_FILES;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ key: string }> }
) {
  const { key } = await context.params;

  if (!isSectionKey(key)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  try {
    const { bytes } = await getBinaryFileContents(SECTION_IMAGE_FILES[key]);

    return new NextResponse(bytes, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to load image: ${error}` },
      { status: 404 }
    );
  }
}
