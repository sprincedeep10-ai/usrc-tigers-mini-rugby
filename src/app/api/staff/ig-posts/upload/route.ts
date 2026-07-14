import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/staff-auth";
import { writeFile, readdir } from "fs/promises";
import { join } from "path";

const UPLOAD_DIR = join(
  process.cwd(),
  "public/images/ig-posts"
);

export async function POST(request: NextRequest) {
  const token =
    request.cookies.get("staff-token")?.value ??
    request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token || !verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const existing = await readdir(UPLOAD_DIR);
    const existingNumbers = existing
      .filter((f) => f.startsWith("post-") && f.endsWith(".jpg"))
      .map((f) => parseInt(f.replace("post-", "").replace(".jpg", ""), 10))
      .filter((n) => !isNaN(n));

    const nextNum =
      existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    const filename = `post-${nextNum}.jpg`;
    const filepath = join(UPLOAD_DIR, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    return NextResponse.json({
      success: true,
      path: `/images/ig-posts/${filename}`,
      filename,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Upload failed: ${error}` },
      { status: 500 }
    );
  }
}
