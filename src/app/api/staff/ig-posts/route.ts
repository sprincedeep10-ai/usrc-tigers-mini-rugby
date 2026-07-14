import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/staff-auth";
import { getFileContents, commitFile } from "@/lib/github";

const IG_POSTS_PATH = "src/data/ig-posts.ts";

function authCheck(request: NextRequest) {
  const token =
    request.cookies.get("staff-token")?.value ??
    request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token || !verifySessionToken(token)) {
    return false;
  }
  return true;
}

function parseIGPosts(source: string): unknown[] {
  const match = source.match(
    /export const IG_POSTS: InstagramPost\[\] = (\[[\s\S]*?\n\]);/
  );
  if (!match) throw new Error("Could not parse IG_POSTS from source");

  const evalFn = new Function(`return ${match[1]}`);
  return evalFn();
}

function serializeIGPosts(posts: unknown[]): string {
  const items = posts
    .map((p: unknown) => {
      const post = p as Record<string, unknown>;
      const cap = String(post.caption ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"');
      return `  {
    id: "${post.id}",
    image: "${post.image}",
    caption:
      "${cap}",
    date: "${post.date}",
    likes: ${post.likes},
    comments: ${post.comments},
    postUrl: "${post.postUrl ?? ""}",
  }`;
    })
    .join(",\n");

  return `/**
 * Instagram post data for @usrctigers_minis
 * Images downloaded from https://www.instagram.com/usrctigers_minis/
 * Update captions/likes when syncing from Instagram.
 */

export const IG_HANDLE = "usrctigers_minis";
export const IG_PROFILE_URL = "https://www.instagram.com/usrctigers_minis/";

export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  date: string;
  likes: number;
  comments: number;
  postUrl?: string;
}

export const IG_POSTS: InstagramPost[] = [
${items},
];

export function formatEngagement(n: number): string {
  if (n >= 1000) return \`\${(n / 1000).toFixed(1).replace(/\\.0\$/, "")}k\`;
  return String(n);
}
`;
}

export async function GET(request: NextRequest) {
  if (!authCheck(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await getFileContents(IG_POSTS_PATH);
    const posts = parseIGPosts(content);
    return NextResponse.json({ posts });
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

    const { sha } = await getFileContents(IG_POSTS_PATH);
    const newContent = serializeIGPosts(posts);
    await commitFile(IG_POSTS_PATH, newContent, "chore: update Instagram posts via staff panel", sha);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update IG posts: ${error}` },
      { status: 500 }
    );
  }
}
