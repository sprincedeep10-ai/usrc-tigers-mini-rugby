import { NextResponse } from "next/server";
import {
  fetchSectionImageManifest,
  isSupabaseConfigured,
  isSupabasePublicConfigured,
} from "@/lib/section-image-storage";
import { manifestToVersions } from "@/lib/section-image-utils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const images = await fetchSectionImageManifest();
    const sectionImageVersions = manifestToVersions(images);

    return NextResponse.json(
      {
        images,
        sectionImageVersions,
        storage: "supabase",
        configured: isSupabaseConfigured(),
        publicConfigured: isSupabasePublicConfigured(),
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
