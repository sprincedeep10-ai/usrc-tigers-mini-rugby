"use client";

import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import Image from "next/image";
import { getCroppedImg } from "@/lib/crop-image";
import {
  SECTION_IMAGES,
  type SectionImageKey,
} from "@/data/section-images";
import {
  getSectionImageDisplayUrl,
  notifySectionImagesUpdated,
  useSectionImages,
} from "@/components/section-image-provider";
import { Loader2, Upload, Check, X, Crop } from "lucide-react";

interface SectionImageEditorProps {
  authFetch: (url: string, init?: RequestInit) => Promise<Response>;
}

interface CropState {
  section: SectionImageKey;
  src: string;
  aspect: number;
}

function CropModal({
  imageSrc,
  aspect,
  onComplete,
  onCancel,
}: {
  imageSrc: string;
  aspect: number;
  onComplete: (blob: Blob, url: string) => void;
  onCancel: () => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback(
    (
      _area: unknown,
      pixels: { x: number; y: number; width: number; height: number }
    ) => {
      setCroppedAreaPixels(pixels);
    },
    []
  );

  async function handleCrop() {
    if (!croppedAreaPixels) return;
    setProcessing(true);
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onComplete(blob, URL.createObjectURL(blob));
    } catch {
      setProcessing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-card-border bg-card">
        <div className="relative h-72 bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex items-center gap-3 border-t border-card-border p-4">
          <label className="flex-1 text-xs text-muted">
            Zoom
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="mt-1 w-full accent-tiger"
            />
          </label>
          <button
            onClick={onCancel}
            className="rounded-xl border border-card-border px-4 py-2 text-sm text-muted hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            disabled={processing}
            className="flex items-center gap-2 rounded-xl bg-tiger px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
          >
            {processing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
}

export function SectionImageEditor({ authFetch }: SectionImageEditorProps) {
  const { versions, setVersion, refreshVersions } = useSectionImages();
  const fileInputRefs = useRef<Partial<Record<SectionImageKey, HTMLInputElement>>>({});
  const [pendingFiles, setPendingFiles] = useState<Partial<Record<SectionImageKey, Blob>>>({});
  const [previews, setPreviews] = useState<Partial<Record<SectionImageKey, string>>>({});
  const [uploading, setUploading] = useState<SectionImageKey | null>(null);
  const [cropModal, setCropModal] = useState<CropState | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 5000);
  }

  function imageSrc(key: SectionImageKey): string {
    if (previews[key]) return previews[key]!;
    return getSectionImageDisplayUrl(key, versions[key]);
  }

  function handleFileSelect(key: SectionImageKey, file: File) {
    const section = SECTION_IMAGES.find((s) => s.key === key)!;
    const url = URL.createObjectURL(file);
    setCropModal({ section: key, src: url, aspect: section.aspect });
  }

  function handleCropComplete(key: SectionImageKey, blob: Blob, previewUrl: string) {
    setCropModal(null);
    setPendingFiles((prev) => ({ ...prev, [key]: blob }));
    setPreviews((prev) => {
      if (prev[key]?.startsWith("blob:")) URL.revokeObjectURL(prev[key]!);
      return { ...prev, [key]: previewUrl };
    });
  }

  async function handleUpload(key: SectionImageKey) {
    const blob = pendingFiles[key];
    if (!blob) return;

    setUploading(key);
    try {
      const formData = new FormData();
      formData.append("file", blob, `${key}.jpg`);
      formData.append("section", key);

      const res = await authFetch("/api/staff/section-images/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setVersion(key, data.version);
      const latest = await refreshVersions();
      notifySectionImagesUpdated({ ...latest, [key]: data.version });

      setPendingFiles((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setPreviews((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });

      showToast(
        "success",
        `${SECTION_IMAGES.find((s) => s.key === key)?.label} updated — refresh the homepage to see it live`
      );
    } catch {
      showToast("error", "Upload failed — please try again");
    }
    setUploading(null);
  }

  return (
    <div className="space-y-6 pb-8">
      {toast && (
        <div
          className={`fixed right-6 top-20 z-50 max-w-sm rounded-xl border px-4 py-3 text-sm font-medium shadow-lg ${
            toast.type === "success"
              ? "border-green-500/20 bg-green-500/10 text-green-400"
              : "border-red-500/20 bg-red-500/10 text-red-400"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {cropModal && (
        <CropModal
          imageSrc={cropModal.src}
          aspect={cropModal.aspect}
          onComplete={(blob, url) =>
            handleCropComplete(cropModal.section, blob, url)
          }
          onCancel={() => {
            URL.revokeObjectURL(cropModal.src);
            setCropModal(null);
          }}
        />
      )}

      <div className="rounded-2xl border border-tiger/20 bg-tiger/5 p-5">
        <h3 className="text-sm font-semibold text-foreground">Homepage Images</h3>
        <p className="mt-1 text-sm text-muted">
          Replace the 4 main photos on the website.
        </p>
        <ol className="mt-3 list-decimal space-y-1 pl-4 text-xs text-muted">
          <li>
            Tap <strong className="text-foreground">Choose &amp; Crop</strong> and
            select a photo
          </li>
          <li>
            Adjust the crop, then tap{" "}
            <strong className="text-foreground">Apply Crop</strong>
          </li>
          <li>
            Tap <strong className="text-foreground">Upload</strong> — wait for the
            green success message
          </li>
          <li>
            Open the homepage in a new tab — the photo updates right away with a
            smooth fade
          </li>
        </ol>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {SECTION_IMAGES.map((section) => {
          const hasPending = !!pendingFiles[section.key];
          const isUploading = uploading === section.key;

          return (
            <div
              key={section.key}
              className={`overflow-hidden rounded-2xl border bg-card transition-colors ${
                hasPending ? "border-tiger/40" : "border-card-border"
              }`}
            >
              <div
                className="relative bg-black/20"
                style={{ aspectRatio: section.aspect }}
              >
                <Image
                  src={imageSrc(section.key)}
                  alt={section.label}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="400px"
                />
                {hasPending && (
                  <div className="absolute left-2 top-2 rounded-full bg-tiger px-2 py-0.5 text-[10px] font-bold text-black">
                    READY TO UPLOAD
                  </div>
                )}
              </div>

              <div className="space-y-3 p-4">
                <div>
                  <h4 className="font-semibold text-foreground">{section.label}</h4>
                  <p className="text-xs text-muted">{section.description}</p>
                </div>

                <input
                  ref={(el) => {
                    if (el) fileInputRefs.current[section.key] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(section.key, file);
                    e.target.value = "";
                  }}
                />

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => fileInputRefs.current[section.key]?.click()}
                    className="flex items-center gap-1.5 rounded-xl border border-card-border px-3 py-2 text-xs font-medium text-foreground hover:border-tiger/40"
                  >
                    <Crop className="h-3.5 w-3.5" />
                    Choose &amp; Crop
                  </button>

                  {hasPending && (
                    <>
                      <button
                        onClick={() => handleUpload(section.key)}
                        disabled={isUploading}
                        className="flex items-center gap-1.5 rounded-xl bg-tiger px-3 py-2 text-xs font-semibold text-black disabled:opacity-50"
                      >
                        {isUploading ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Upload className="h-3.5 w-3.5" />
                        )}
                        Upload
                      </button>
                      <button
                        onClick={() => {
                          setPendingFiles((prev) => {
                            const next = { ...prev };
                            delete next[section.key];
                            return next;
                          });
                          setPreviews((prev) => {
                            if (prev[section.key]?.startsWith("blob:")) {
                              URL.revokeObjectURL(prev[section.key]!);
                            }
                            const next = { ...prev };
                            delete next[section.key];
                            return next;
                          });
                        }}
                        className="flex items-center gap-1.5 rounded-xl border border-red-500/20 px-3 py-2 text-xs text-red-400"
                      >
                        <X className="h-3.5 w-3.5" />
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
