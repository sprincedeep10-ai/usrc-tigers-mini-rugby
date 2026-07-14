import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/staff-auth";
import { getFileContents } from "@/lib/github";

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

    const dirUrl = `https://api.github.com/repos/sprincedeep10-ai/usrc-tigers-mini-rugby/contents/public/images/ig-posts`;
    const dirRes = await fetch(dirUrl, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const existingNums: number[] = [];
    if (dirRes.ok) {
      const files = await dirRes.json();
      if (Array.isArray(files)) {
        for (const f of files) {
          const m = f.name?.match(/^post-(\d+)\.\w+$/);
          if (m) existingNums.push(parseInt(m[1], 10));
        }
      }
    }

    const nextNum = existingNums.length > 0 ? Math.max(...existingNums) + 1 : 1;
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `post-${nextNum}.${ext}`;
    const filePath = `public/images/ig-posts/${filename}`;

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const url = `https://api.github.com/repos/sprincedeep10-ai/usrc-tigers-mini-rugby/contents/${filePath}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        message: `chore: upload ${filename} via staff panel`,
        content: base64,
        branch: "main",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { error: `GitHub upload failed: ${err}` },
        { status: 500 }
      );
    }

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
