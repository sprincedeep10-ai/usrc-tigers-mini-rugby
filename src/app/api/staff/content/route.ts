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

function hasRequiredArrays(data: Record<string, unknown>): boolean {
  for (const lang of ["en", "zh"]) {
    const langData = data[lang] as Record<string, unknown> | undefined;
    if (!langData || typeof langData !== "object") return false;

    const about = langData.about as Record<string, unknown> | undefined;
    if (!about || !Array.isArray(about.bullets) || about.bullets.length < 2) return false;
    if (!Array.isArray(about.benefits) || about.benefits.length < 2) return false;
    if (!Array.isArray(about.ageGroups) || about.ageGroups.length < 2) return false;

    const faq = langData.faq as Record<string, unknown> | undefined;
    if (!faq || !Array.isArray(faq.items) || faq.items.length < 2) return false;

    const mission = langData.mission as Record<string, unknown> | undefined;
    if (!mission || !Array.isArray(mission.pillars) || mission.pillars.length < 2) return false;

    const joining = langData.joining as Record<string, unknown> | undefined;
    if (!joining || !Array.isArray(joining.steps) || joining.steps.length < 2) return false;

    const hero = langData.hero as Record<string, unknown> | undefined;
    if (!hero || !Array.isArray(hero.trustSignals) || hero.trustSignals.length < 2) return false;
  }
  return true;
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

    if (!hasRequiredArrays(translations)) {
      return NextResponse.json(
        { error: "Rejected: incoming data is missing required array fields. Your browser may have stale JavaScript — please hard-refresh (Cmd+Shift+R) the staff panel." },
        { status: 400 }
      );
    }

    const { sha } = await getFileContents(TRANSLATIONS_PATH);

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

    const incomingJson = JSON.stringify(translations);
    const parsedJson = JSON.stringify(parsed);

    if (incomingJson !== parsedJson) {
      return NextResponse.json(
        {
          error: "Data loss detected in serialization — save rejected",
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
