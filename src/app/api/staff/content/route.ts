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

function js(value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);

  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((item) => {
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        return jsObj(item, indent + 1);
      }
      return pad + "  " + js(item, indent + 1);
    });
    return "[\n" + items.join(",\n") + ",\n" + pad + "]";
  }

  if (typeof value === "object") {
    return jsObj(value, indent);
  }

  return String(value);
}

function jsObj(obj: unknown, indent: number): string {
  const pad = "  ".repeat(indent);
  const entries = Object.entries(obj as Record<string, unknown>);
  if (entries.length === 0) return "{}";
  const lines = entries.map(
    ([k, v]) => `${pad}${k}: ${js(v, indent + 1)}`
  );
  return "{\n" + lines.join(",\n") + ",\n" + "  ".repeat(indent - 1) + "}";
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
      lines.push(`    ${section}: ${js(value, 3)},`);
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

    const { sha, content: originalContent } =
      await getFileContents(TRANSLATIONS_PATH);

    const fileContent = serializeTranslations(translations);

    let parsed: Record<string, unknown>;
    try {
      parsed = parseTranslations(fileContent);
    } catch (e) {
      return NextResponse.json(
        { error: `Serialized output is invalid: ${e}` },
        { status: 500 }
      );
    }

    const origParsed = parseTranslations(originalContent);
    const origJson = JSON.stringify(origParsed);
    const newJson = JSON.stringify(parsed);

    if (origJson !== newJson) {
      return NextResponse.json(
        {
          error: "Data mismatch after serialize/parse round-trip",
          origKeys: Object.keys((origParsed.en as Record<string, unknown>) || {}),
          newKeys: Object.keys((parsed.en as Record<string, unknown>) || {}),
        },
        { status: 500 }
      );
    }

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
