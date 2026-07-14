"use client";

import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/crop-image";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ImagePlus,
  Pencil,
  Trash2,
  Save,
  X,
  Upload,
  Heart,
  MessageCircle,
  Loader2,
  Crop,
  Check,
  Calendar,
  GripVertical,
} from "lucide-react";

interface IGPost {
  id: string;
  image: string;
  caption: string;
  date: string;
  likes: number;
  comments: number;
  postUrl?: string;
}

interface CropModalProps {
  imageSrc: string;
  onCropComplete: (croppedBlob: Blob, croppedUrl: string) => void;
  onCancel: () => void;
}

function CropModal({ imageSrc, onCropComplete, onCancel }: CropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropCompleteInternal = useCallback(
    (_croppedArea: unknown, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    setProcessing(true);
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const croppedUrl = URL.createObjectURL(croppedBlob);
      onCropComplete(croppedBlob, croppedUrl);
    } catch {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-card border border-card-border shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-card-border">
          <div className="flex items-center gap-2">
            <Crop className="h-4 w-4 text-tiger" />
            <h3 className="text-sm font-bold text-foreground">Crop Image</h3>
          </div>
          <button onClick={onCancel} className="text-muted hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative h-80 bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 5}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteInternal}
            cropShape="rect"
          />
        </div>

        <div className="px-5 py-4 space-y-4 border-t border-card-border">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Zoom</span>
              <span>{zoom.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none bg-card-border accent-tiger cursor-pointer"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCrop}
              disabled={processing}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--btn-primary-fg)] transition-all hover:brightness-110 disabled:opacity-50"
            >
              {processing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {processing ? "Processing..." : "Apply Crop"}
            </button>
            <button
              onClick={onCancel}
              className="rounded-xl border border-card-border px-5 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDateForInput(dateStr: string): string {
  if (!dateStr) return "";
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 2) {
    const month = months[parts[0]];
    const day = parseInt(parts[1], 10);
    if (!isNaN(month) && !isNaN(day)) {
      const d = new Date(2025, month, day);
      return d.toISOString().split("T")[0];
    }
  }
  return "";
}

function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "T00:00:00");
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${months[d.getMonth()]} ${d.getDate()}`;
  } catch {
    return dateStr;
  }
}

function SortablePostCard({
  post,
  editingId,
  onStartEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
  saving,
  editCaption,
  setEditCaption,
  editDate,
  setEditDate,
  editLikes,
  setEditLikes,
  editComments,
  setEditComments,
  editPostUrl,
  setEditPostUrl,
}: {
  post: IGPost;
  editingId: string | null;
  onStartEdit: (post: IGPost) => void;
  onDelete: (id: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  saving: boolean;
  editCaption: string;
  setEditCaption: (v: string) => void;
  editDate: string;
  setEditDate: (v: string) => void;
  editLikes: string;
  setEditLikes: (v: string) => void;
  editComments: string;
  setEditComments: (v: string) => void;
  editPostUrl: string;
  setEditPostUrl: (v: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : undefined,
  };

  const isEditing = editingId === post.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group overflow-hidden rounded-2xl border bg-card transition-colors hover:border-tiger/20 ${
        isDragging ? "border-tiger shadow-xl shadow-tiger/20" : "border-card-border"
      }`}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={post.image}
          alt={post.caption}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />

        <button
          {...attributes}
          {...listeners}
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm cursor-grab active:cursor-grabbing transition-colors hover:bg-tiger opacity-0 group-hover:opacity-100"
          title="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {!isEditing && (
          <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onStartEdit(post)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-tiger"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-red-500"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editCaption}
              onChange={(e) => setEditCaption(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-card-border bg-card-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-tiger/50"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted">
                  <Calendar className="inline h-2.5 w-2.5 mr-0.5" />
                  Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(editDate)}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full rounded-lg border border-card-border bg-card-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-tiger/50 [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted">
                  Instagram URL
                </label>
                <input
                  value={editPostUrl}
                  onChange={(e) => setEditPostUrl(e.target.value)}
                  className="w-full rounded-lg border border-card-border bg-card-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-tiger/50"
                  placeholder="Post URL"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted">
                  Likes
                </label>
                        <input
                          type="number"
                          value={editLikes}
                          onChange={(e) => setEditLikes(e.target.value)}
                          className="w-full rounded-lg border border-card-border bg-card-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-tiger/50"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted">
                          Comments
                        </label>
                        <input
                          type="number"
                          value={editComments}
                          onChange={(e) => setEditComments(e.target.value)}
                  className="w-full rounded-lg border border-card-border bg-card-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-tiger/50"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onSaveEdit}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-lg bg-tiger px-3 py-1.5 text-xs font-semibold text-black transition-all hover:brightness-110"
              >
                {saving ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Save className="h-3 w-3" />
                )}
                Save
              </button>
              <button
                onClick={onCancelEdit}
                className="rounded-lg border border-card-border px-3 py-1.5 text-xs text-muted hover:text-foreground"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="line-clamp-2 text-sm text-foreground">
              {post.caption}
            </p>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted">
              <span>{post.date}</span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" /> {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" /> {post.comments}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function IGPostEditor({
  authFetch,
}: {
  authFetch: (url: string, init?: RequestInit) => Promise<Response>;
}) {
  const [posts, setPosts] = useState<IGPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const [editCaption, setEditCaption] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editLikes, setEditLikes] = useState("0");
  const [editComments, setEditComments] = useState("0");
  const [editPostUrl, setEditPostUrl] = useState("");

  const [newCaption, setNewCaption] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLikes, setNewLikes] = useState("0");
  const [newComments, setNewComments] = useState("0");
  const [newPostUrl, setNewPostUrl] = useState("");
  const [newImagePath, setNewImagePath] = useState("");
  const [uploading, setUploading] = useState(false);

  const [cropModal, setCropModal] = useState<{
    src: string;
    mode: "new" | "edit";
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authFetch("/api/staff/ig-posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
      }
    } catch {
      showToast("error", "Failed to load posts");
    }
    setLoading(false);
  }, [authFetch]);

  useState(() => {
    fetchPosts();
  });

  async function savePosts(updatedPosts: IGPost[]) {
    setSaving(true);
    try {
      const res = await authFetch("/api/staff/ig-posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts: updatedPosts }),
      });
      if (res.ok) {
        setPosts(updatedPosts);
        try {
          localStorage.setItem("usrc-tigers-ig-cache", JSON.stringify(updatedPosts));
        } catch {}
        showToast("success", "Posts saved & applied instantly");
      } else {
        showToast("error", "Failed to save");
      }
    } catch {
      showToast("error", "Failed to save");
    }
    setSaving(false);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = posts.findIndex((p) => p.id === active.id);
    const newIndex = posts.findIndex((p) => p.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...posts];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    savePosts(reordered);
  }

  function startEdit(post: IGPost) {
    setEditingId(post.id);
    setEditCaption(post.caption);
    setEditDate(post.date);
    setEditLikes(String(post.likes));
    setEditComments(String(post.comments));
    setEditPostUrl(post.postUrl ?? "");
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function saveEdit() {
    if (!editingId) return;
    const updated = posts.map((p) =>
      p.id === editingId
        ? {
            ...p,
            caption: editCaption,
            date: formatDateDisplay(editDate) || editDate,
            likes: parseInt(editLikes, 10) || 0,
            comments: parseInt(editComments, 10) || 0,
            postUrl: editPostUrl || undefined,
          }
        : p
    );
    savePosts(updated);
    setEditingId(null);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCropModal({ src: url, mode: "new" });
  }

  function handleCropComplete(croppedBlob: Blob, croppedUrl: string) {
    if (!cropModal) return;

    setNewImagePath(croppedUrl);
    const dataTransfer = new DataTransfer();
    const file = new File([croppedBlob], "cropped.jpg", { type: "image/jpeg" });
    dataTransfer.items.add(file);
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }

    if (cropModal.src) URL.revokeObjectURL(cropModal.src);
    setCropModal(null);
  }

  async function handleUploadNew() {
    if (!newImagePath) {
      showToast("error", "Please select and crop an image first");
      return;
    }

    setUploading(true);
    try {
      const fileInput = fileInputRef.current;
      if (!fileInput?.files?.[0]) {
        showToast("error", "No file selected");
        setUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      const uploadRes = await authFetch("/api/staff/ig-posts/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        showToast("error", "Image upload failed");
        setUploading(false);
        return;
      }

      const { path } = await uploadRes.json();

      const nextId = `post-${Date.now()}`;
      const newPost: IGPost = {
        id: nextId,
        image: path,
        caption: newCaption,
        date: formatDateDisplay(newDate) || "Jan 1",
        likes: parseInt(newLikes, 10) || 0,
        comments: parseInt(newComments, 10) || 0,
        postUrl: newPostUrl || undefined,
      };

      await savePosts([...posts, newPost]);

      setNewCaption("");
      setNewDate("");
      setNewLikes("0");
      setNewComments("0");
      setNewPostUrl("");
      setNewImagePath("");
      setShowAddForm(false);
    } catch {
      showToast("error", "Upload failed");
    }
    setUploading(false);
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post?")) return;
    const updated = posts.filter((p) => p.id !== id);
    await savePosts(updated);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-tiger" />
      </div>
    );
  }

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

      {cropModal && (
        <CropModal
          imageSrc={cropModal.src}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            if (cropModal.src) URL.revokeObjectURL(cropModal.src);
            setCropModal(null);
          }}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Instagram Posts</h2>
          <p className="text-sm text-muted">
            {posts.length} posts — drag to reorder, edit captions &amp; images
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--btn-primary-fg)] transition-all hover:brightness-110"
        >
          <ImagePlus className="h-4 w-4" />
          Add Post
        </button>
      </div>

      {showAddForm && (
        <div className="rounded-2xl border border-tiger/20 bg-card-elevated p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            New Instagram Post
          </h3>

          <div className="mb-4">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
              Post Image
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />

            {newImagePath ? (
              <div className="relative inline-block">
                <img
                  src={newImagePath}
                  alt="Preview"
                  className="h-52 w-52 rounded-xl object-cover border border-card-border"
                />
                <div className="absolute -right-2 -top-2 flex gap-1">
                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-tiger text-black"
                    title="Re-crop"
                  >
                    <Crop className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => {
                      setNewImagePath("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex h-52 w-52 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-card-border text-muted transition-colors hover:border-tiger/50 hover:text-tiger"
              >
                <Upload className="h-8 w-8" />
                <span className="text-xs">Choose &amp; Crop</span>
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                Caption
              </label>
              <textarea
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none focus:border-tiger/50 focus:ring-1 focus:ring-tiger/20"
                placeholder="Write a caption..."
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                <Calendar className="inline h-3 w-3 mr-1" />
                Date
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:border-tiger/50 focus:ring-1 focus:ring-tiger/20 [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                Instagram URL
              </label>
              <input
                value={newPostUrl}
                onChange={(e) => setNewPostUrl(e.target.value)}
                className="w-full rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:border-tiger/50 focus:ring-1 focus:ring-tiger/20"
                placeholder="https://www.instagram.com/p/..."
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                Likes
              </label>
              <input
                type="number"
                value={newLikes}
                onChange={(e) => setNewLikes(e.target.value)}
                className="w-full rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:border-tiger/50 focus:ring-1 focus:ring-tiger/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                Comments
              </label>
              <input
                type="number"
                value={newComments}
                onChange={(e) => setNewComments(e.target.value)}
                className="w-full rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:border-tiger/50 focus:ring-1 focus:ring-tiger/20"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleUploadNew}
              disabled={uploading || !newImagePath}
              className="flex items-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--btn-primary-fg)] transition-all hover:brightness-110 disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              Upload &amp; Add
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewCaption("");
                setNewDate("");
                setNewLikes("0");
                setNewComments("0");
                setNewPostUrl("");
                setNewImagePath("");
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="rounded-xl border border-card-border px-5 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={posts.map((p) => p.id)} strategy={rectSortingStrategy}>
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <SortablePostCard
                key={post.id}
                post={post}
                editingId={editingId}
                onStartEdit={startEdit}
                onDelete={deletePost}
                onSaveEdit={saveEdit}
                onCancelEdit={cancelEdit}
                saving={saving}
                editCaption={editCaption}
                setEditCaption={setEditCaption}
                editDate={editDate}
                setEditDate={setEditDate}
                editLikes={editLikes}
                setEditLikes={setEditLikes}
                editComments={editComments}
                setEditComments={setEditComments}
                editPostUrl={editPostUrl}
                setEditPostUrl={setEditPostUrl}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
