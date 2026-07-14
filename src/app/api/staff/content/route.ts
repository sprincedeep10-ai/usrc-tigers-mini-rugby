import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/staff-auth";
import { getFileContents, commitFile } from "@/lib/github";

const TRANSLATIONS_PATH = "src/lib/i18n/translations.ts";

function authCheck(request: NextRequest) {
  const token =
    request.cookies.get("staff-token")?.value ??
    request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token || !verifySessionToken(token)) {
    return false;
  }
  return true;
}

function parseTranslations(source: string): Record<string, unknown> {
  const cleaned = source
    .replace(/export type .+/g, "")
    .replace(/\} as const;/g, "};")
    .replace(/export const translations/, "const translations");

  const fn = new Function(`${cleaned}\nreturn translations;`);
  return fn();
}

function serializeValue(value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    const items = value.map((item) => {
      if (typeof item === "object" && item !== null) {
        const objEntries = Object.entries(item)
          .map(
            ([k, v]) =>
              `${pad}  ${k}: ${serializeValue(v, indent + 2)}`
          )
          .join(",\n");
        return `${pad}  {\n${objEntries},\n${pad}  }`;
      }
      return `${pad}  ${serializeValue(item, indent + 1)}`;
    });
    return `[\n${items.join(",\n")},\n${pad}]`;
  }

  if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value)
      .map(([k, v]) => `${pad}${k}: ${serializeValue(v, indent + 1)}`)
      .join(",\n");
    return `{\n${entries},\n${"  ".repeat(indent - 1)}}`;
  }

  return String(value);
}

function serializeTranslations(data: Record<string, unknown>): string {
  const lines: string[] = [
    'export type Locale = "en" | "zh";',
    "",
    "export const translations = {",
  ];

  for (const [lang, sections] of Object.entries(data)) {
    lines.push(`  ${lang}: {`);
    for (const [section, value] of Object.entries(
      sections as Record<string, unknown>
    )) {
      lines.push(`    ${section}: ${serializeValue(value, 3)},`);
    }
    lines.push("  },");
  }

  lines.push("} as const;", "");
  lines.push(
    "export type TranslationKeys = (typeof translations)[Locale];"
  );
  lines.push("");

  return lines.join("\n");
}

export async function GET(request: NextRequest) {
  if (!authCheck(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await getFileContents(TRANSLATIONS_PATH);
    const translations = parseTranslations(content);
    return NextResponse.json({ translations });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to parse translations: ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!authCheck(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { translations } = await request.json();

    if (!translations || typeof translations !== "object") {
      return NextResponse.json(
        { error: "Invalid translations data" },
        { status: 400 }
      );
    }

    const { sha } = await getFileContents(TRANSLATIONS_PATH);
    const fileContent = serializeTranslations(translations);
    await commitFile(
      TRANSLATIONS_PATH,
      fileContent,
      "chore: update site content via staff panel",
      sha
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to save translations: ${error}` },
      { status: 500 }
    );
  }
}
