import { NextResponse } from "next/server";
import { getFileContents } from "@/lib/github";

export const dynamic = "force-dynamic";

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    ),
  ]);
}

export async function GET() {
  try {
    const [igContent, translationsContent] = await Promise.all([
      withTimeout(getFileContents("src/data/ig-posts.ts"), 8000),
      withTimeout(getFileContents("src/lib/i18n/translations.ts"), 8000),
    ]);

    let posts: unknown[] = [];
    try {
      const match = igContent.content.match(
        /export const IG_POSTS: InstagramPost\[\] = (\[[\s\S]*?\n\]);/
      );
      if (match) {
        posts = new Function(`return ${match[1]}`)();
      }
    } catch {}

    let translations: Record<string, unknown> = {};
    try {
      const cleaned = translationsContent.content
        .replace(/export type .+/g, "")
        .replace(/\} as const;/g, "};")
        .replace(/export const translations/, "const translations");
      translations = new Function(`${cleaned}\nreturn translations;`)();
    } catch {}

    return NextResponse.json(
      { posts, translations },
      {
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch content: ${error}` },
      {
        status: 500,
        headers: {
          "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10",
        },
      }
    );
  }
}
