"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Save,
  Loader2,
  FileText,
} from "lucide-react";

interface ContentEditorProps {
  authFetch: (url: string, init?: RequestInit) => Promise<Response>;
}

const SECTION_LABELS: Record<string, string> = {
  nav: "Navigation",
  common: "Common / Shared",
  hero: "Hero Section",
  about: "About Rugby",
  parents: "Parents & Coaches",
  schedule: "Schedule",
  joining: "Joining Process",
  mission: "Our Mission",
  instagram: "Instagram",
  faq: "FAQ",
  finalCTA: "Final CTA",
  footer: "Footer",
  videoModal: "Video Modal",
};

function flattenObj(
  obj: Record<string, unknown>,
  prefix = ""
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      result[fullKey] = value;
    } else if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        if (typeof item === "string") {
          result[`${fullKey}.${idx}`] = item;
        } else if (typeof item === "object" && item !== null) {
          Object.assign(
            result,
            flattenObj(item as Record<string, unknown>, `${fullKey}.${idx}`)
          );
        }
      });
    } else if (typeof value === "object" && value !== null) {
      Object.assign(
        result,
        flattenObj(value as Record<string, unknown>, fullKey)
      );
    }
  }
  return result;
}

function buildNestedFromFlat(
  flat: Record<string, string>
): Record<string, unknown> {
  const root: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split(".");
    let current: unknown = root;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      const next = parts[i + 1];
      const nextIsNum = /^\d+$/.test(next);

      if (typeof current !== "object" || current === null) {
        break;
      }

      const obj = current as Record<string, unknown>;

      if (obj[part] === undefined || obj[part] === null) {
        obj[part] = nextIsNum ? [] : {};
      }

      current = obj[part];
    }

    const lastPart = parts[parts.length - 1];
    if (typeof current === "object" && current !== null) {
      if (Array.isArray(current) && /^\d+$/.test(lastPart)) {
        current[parseInt(lastPart)] = value;
      } else if (!Array.isArray(current)) {
        (current as Record<string, unknown>)[lastPart] = value;
      }
    }
  }

  function objectsToArrays(obj: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const inner = value as Record<string, unknown>;
        const numericKeys = Object.keys(inner).every((k) => /^\d+$/.test(k));
        if (numericKeys && Object.keys(inner).length > 0) {
          const maxIdx = Math.max(...Object.keys(inner).map(Number));
          const arr: unknown[] = [];
          for (let i = 0; i <= maxIdx; i++) {
            const item = inner[String(i)];
            if (typeof item === "object" && item !== null && !Array.isArray(item)) {
              arr.push(objectsToArrays(item as Record<string, unknown>));
            } else {
              arr.push(item);
            }
          }
          result[key] = arr;
        } else {
          result[key] = objectsToArrays(inner);
        }
      } else if (Array.isArray(value)) {
        result[key] = value.map((item) => {
          if (typeof item === "object" && item !== null && !Array.isArray(item)) {
            return objectsToArrays(item as Record<string, unknown>);
          }
          return item;
        });
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  return objectsToArrays(root);
}

function niceLabel(key: string): string {
  const parts = key.split(".");
  const last = parts[parts.length - 1];
  const parent = parts.length > 1 ? parts[parts.length - 2] : "";

  if (/^\d+$/.test(last)) {
    return `${parent} #${parseInt(last) + 1}`;
  }

  const nice = last
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

  return nice;
}

export function ContentEditor({ authFetch }: ContentEditorProps) {
  const [translations, setTranslations] = useState<
    Record<string, Record<string, unknown>>
  >({});
  const [flatFields, setFlatFields] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [activeLang, setActiveLang] = useState<"en" | "zh">("en");

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (translations[activeLang]) {
      setFlatFields(
        flattenObj(translations[activeLang] as Record<string, unknown>)
      );
    }
  }, [translations, activeLang]);

  async function fetchContent() {
    setLoading(true);
    try {
      const res = await authFetch("/api/staff/content");
      if (res.ok) {
        const data = await res.json();
        setTranslations(data.translations);
      }
    } catch {
      showToast("error", "Failed to load content");
    }
    setLoading(false);
  }

  function updateField(key: string, value: string) {
    setFlatFields((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const nested = buildNestedFromFlat(flatFields);
      const updated = { ...translations, [activeLang]: nested };

      const res = await authFetch("/api/staff/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ translations: updated }),
      });

      if (res.ok) {
        setTranslations(updated);

        try {
          localStorage.setItem(
            "usrc-tigers-content-cache",
            JSON.stringify(updated)
          );
          localStorage.setItem(
            "usrc-tigers-content-ts",
            String(Date.now())
          );
        } catch {}

        showToast("success", "Content saved & applied instantly");
      } else {
        showToast("error", "Failed to save content");
      }
    } catch {
      showToast("error", "Failed to save content");
    }
    setSaving(false);
  }

  function toggleSection(key: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function groupedFields(): Record<
    string,
    Array<{ key: string; value: string }>
  > {
    const groups: Record<string, Array<{ key: string; value: string }>> = {};
    for (const [key, value] of Object.entries(flatFields)) {
      const section = key.split(".")[0];
      if (!groups[section]) groups[section] = [];
      groups[section].push({ key, value });
    }
    return groups;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-tiger" />
      </div>
    );
  }

  const groups = groupedFields();

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed right-6 top-6 z-50 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg ${
            toast.type === "success"
              ? "border-green-500/20 bg-green-500/10 text-green-400"
              : "border-red-500/20 bg-red-500/10 text-red-400"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Site Content</h2>
          <p className="text-sm text-muted">
            Edit text across all sections — changes apply instantly
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--btn-primary-fg)] transition-all hover:brightness-110 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save & Apply
        </button>
      </div>

      <div className="flex gap-2">
        {(["en", "zh"] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeLang === lang
                ? "bg-tiger text-black"
                : "border border-card-border text-muted hover:text-foreground"
            }`}
          >
            {lang === "en" ? "English" : "Traditional Chinese"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {Object.entries(groups).map(([section, fields]) => (
          <div
            key={section}
            className="overflow-hidden rounded-2xl border border-card-border bg-card"
          >
            <button
              onClick={() => toggleSection(section)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-card-elevated"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-tiger" />
                <span className="text-sm font-semibold text-foreground">
                  {SECTION_LABELS[section] ?? section}
                </span>
                <span className="rounded-md bg-tiger/10 px-2 py-0.5 text-xs text-tiger">
                  {fields.length}
                </span>
              </div>
              {openSections.has(section) ? (
                <ChevronUp className="h-4 w-4 text-muted" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted" />
              )}
            </button>

            {openSections.has(section) && (
              <div className="space-y-3 border-t border-card-border px-5 py-4">
                {fields.map(({ key, value }) => {
                  const label = niceLabel(key);
                  const isLong = value.length > 80 || value.includes("\n");
                  return (
                    <div key={key}>
                      <label className="mb-1 block text-xs text-muted">
                        <span className="font-medium text-foreground/70">
                          {label}
                        </span>
                        <span className="ml-2 text-muted/50 text-[10px]">
                          {key}
                        </span>
                      </label>
                      {isLong ? (
                        <textarea
                          value={value}
                          onChange={(e) => updateField(key, e.target.value)}
                          rows={3}
                          className="w-full rounded-xl border border-card-border bg-card-elevated px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-tiger/50 focus:ring-1 focus:ring-tiger/20"
                        />
                      ) : (
                        <input
                          value={value}
                          onChange={(e) => updateField(key, e.target.value)}
                          className="w-full rounded-xl border border-card-border bg-card-elevated px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-tiger/50 focus:ring-1 focus:ring-tiger/20"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
