import { NextResponse } from "next/server";
import {
  fetchSectionImageManifest,
  isBlobStorageConfigured,
} from "@/lib/section-image-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const images = await fetchSectionImageManifest();
    return NextResponse.json(
      {
        images,
        storage: isBlobStorageConfigured() ? "blob" : "static",
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to load images: ${error}` },
      { status: 500 }
    );
  }
}
