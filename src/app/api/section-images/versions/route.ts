import { NextResponse } from "next/server";
import { fetchSectionImageVersions } from "@/lib/section-image-versions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sectionImageVersions = await fetchSectionImageVersions();
    return NextResponse.json(
      { sectionImageVersions },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch versions: ${error}` },
      { status: 500 }
    );
  }
}
