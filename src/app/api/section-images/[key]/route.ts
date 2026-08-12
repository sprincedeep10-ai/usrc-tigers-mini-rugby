import { NextRequest, NextResponse } from "next/server";
import {
  SECTION_IMAGE_FILES,
  sectionImageRawUrl,
  type SectionImageKey,
} from "@/data/section-images";

export const dynamic = "force-dynamic";

function isSectionKey(value: string): value is SectionImageKey {
  return value in SECTION_IMAGE_FILES;
}

async function fetchFromGitHub(
  key: SectionImageKey,
  version: number | undefined,
  attempt: number
): Promise<Response> {
  const url = sectionImageRawUrl(key, version);
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "image/*",
      // GitHub raw CDN can be briefly stale right after a push
      "Cache-Control": "no-cache",
    },
    signal: AbortSignal.timeout(12000),
  });

  if (!res.ok && attempt < 3) {
    await new Promise((r) => setTimeout(r, 400 * attempt));
    return fetchFromGitHub(key, version, attempt + 1);
  }

  return res;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ key: string }> }
) {
  const { key } = await context.params;

  if (!isSectionKey(key)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const versionParam = request.nextUrl.searchParams.get("v");
  const version = versionParam ? Number(versionParam) : undefined;

  try {
    const upstream = await fetchFromGitHub(key, version, 1);

    if (!upstream.ok) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const bytes = await upstream.arrayBuffer();
    const contentType = upstream.headers.get("Content-Type") || "image/jpeg";

    return new NextResponse(bytes, {
      headers: {
        "Content-Type": contentType,
        // Short CDN cache; version query string busts on each upload
        "Cache-Control": "public, max-age=120, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to load image: ${error}` },
      { status: 502 }
    );
  }
}
