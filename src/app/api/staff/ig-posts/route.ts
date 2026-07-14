import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/staff-auth";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const IG_POSTS_PATH = join(
  process.cwd(),
  "src/data/ig-posts.ts"
);

function authCheck(request: NextRequest) {
  const token =
    request.cookies.get("staff-token")?.value ??
    request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token || !verifySessionToken(token)) {
    return false;
  }
  return true;
}

export async function GET(request: NextRequest) {
  if (!authCheck(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await readFile(IG_POSTS_PATH, "utf-8");

    const postsMatch = content.match(
      /export const IG_POSTS: InstagramPost\[\] = (\[[\s\S]*?\n\];)/
    );
    if (!postsMatch) {
      return NextResponse.json(
        { error: "Could not parse IG posts from source" },
        { status: 500 }
      );
    }

    const postsJson = postsMatch[1]
      .replace(/,\n\]/g, "\n]")
      .replace(/(\w+):/g, '"$1":')
      .replace(/"(post-\d+)"/g, '"$1"')
      .replace(/\n\s*/g, " ")
      .replace(/,(\s*[\]}])/g, "$1");

    try {
      const posts = eval(postsMatch[1]);
      return NextResponse.json({ posts });
    } catch {
      const posts = JSON.parse(postsJson);
      return NextResponse.json({ posts });
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to read IG posts: ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!authCheck(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { posts } = await request.json();

    if (!Array.isArray(posts)) {
      return NextResponse.json(
        { error: "Posts must be an array" },
        { status: 400 }
      );
    }

    const content = await readFile(IG_POSTS_PATH, "utf-8");

    const postsArray = posts
      .map(
        (p: {
          id: string;
          image: string;
          caption: string;
          date: string;
          likes: number;
          comments: number;
          postUrl?: string;
        }) =>
          `  {\n    id: "${p.id}",\n    image: "${p.image}",\n    caption:\n      "${p.caption.replace(/"/g, '\\"')}",\n    date: "${p.date}",\n    likes: ${p.likes},\n    comments: ${p.comments},\n    postUrl: "${p.postUrl ?? ""}",\n  }`
      )
      .join(",\n");

    const newContent = content.replace(
      /export const IG_POSTS: InstagramPost\[\] = \[[\s\S]*?\n\];/,
      `export const IG_POSTS: InstagramPost[] = [\n${postsArray},\n];`
    );

    await writeFile(IG_POSTS_PATH, newContent, "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update IG posts: ${error}` },
      { status: 500 }
    );
  }
}
