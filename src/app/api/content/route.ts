import { NextResponse } from "next/server";
import { getFileContents } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [igContent, translationsContent] = await Promise.all([
      getFileContents("src/data/ig-posts.ts"),
      getFileContents("src/lib/i18n/translations.ts"),
    ]);

    const igFn = new Function(
      `${(() => {
        const match = igContent.content.match(
          /export const IG_POSTS: InstagramPost\[\] = (\[[\s\S]*?\n\]);/
        );
        return match ? `return ${match[1]}` : "return []";
      })()}`
    );
    const posts = igFn();

    const cleaned = translationsContent.content
      .replace(/export type .+/g, "")
      .replace(/\} as const;/g, "};")
      .replace(/export const translations/, "const translations");
    const translations = new Function(`${cleaned}\nreturn translations;`)();

    return NextResponse.json({ posts, translations });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch content: ${error}` },
      { status: 500 }
    );
  }
}
