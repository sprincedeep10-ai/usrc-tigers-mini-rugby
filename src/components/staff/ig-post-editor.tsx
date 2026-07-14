"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

interface UseImageUploadProps {
  onUpload?: (url: string) => void;
}

function useImageUpload({ onUpload }: UseImageUploadProps = {}) {
  const previewRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileName(file.name);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        previewRef.current = url;
        onUpload?.(url);
      }
    },
    [onUpload]
  );

  const handleRemove = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setFileName(null);
    previewRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  return {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  };
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
  const [editLikes, setEditLikes] = useState(0);
  const [editComments, setEditComments] = useState(0);
  const [editPostUrl, setEditPostUrl] = useState("");

  const [newCaption, setNewCaption] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLikes, setNewLikes] = useState(0);
  const [newComments, setNewComments] = useState(0);
  const [newPostUrl, setNewPostUrl] = useState("");
  const [newImagePath, setNewImagePath] = useState("");
  const [uploading, setUploading] = useState(false);

  const newPostUpload = useImageUpload({
    onUpload: (url) => setNewImagePath(url),
  });

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
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
  }

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

  function startEdit(post: IGPost) {
    setEditingId(post.id);
    setEditCaption(post.caption);
    setEditDate(post.date);
    setEditLikes(post.likes);
    setEditComments(post.comments);
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
            date: editDate,
            likes: editLikes,
            comments: editComments,
            postUrl: editPostUrl || undefined,
          }
        : p
    );
    savePosts(updated);
    setEditingId(null);
  }

  async function handleUploadNew() {
    if (!newPostUpload.previewUrl || !newImagePath) {
      showToast("error", "Please select an image first");
      return;
    }

    setUploading(true);
    try {
      const fileInput = newPostUpload.fileInputRef.current;
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

      const nextId = `post-${posts.length + 1}`;
      const newPost: IGPost = {
        id: nextId,
        image: path,
        caption: newCaption,
        date: newDate || "Jan 1",
        likes: newLikes,
        comments: newComments,
        postUrl: newPostUrl || undefined,
      };

      await savePosts([...posts, newPost]);

      setNewCaption("");
      setNewDate("");
      setNewLikes(0);
      setNewComments(0);
      setNewPostUrl("");
      setNewImagePath("");
      newPostUpload.handleRemove();
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

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Instagram Posts</h2>
          <p className="text-sm text-muted">
            {posts.length} posts — edit captions, images, and engagement data
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
              ref={newPostUpload.fileInputRef}
              onChange={newPostUpload.handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {newPostUpload.previewUrl ? (
              <div className="relative inline-block">
                <img
                  src={newPostUpload.previewUrl}
                  alt="Preview"
                  className="h-40 w-40 rounded-xl object-cover"
                />
                <button
                  onClick={newPostUpload.handleRemove}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={newPostUpload.handleThumbnailClick}
                className="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-card-border text-muted transition-colors hover:border-tiger/50 hover:text-tiger"
              >
                <Upload className="h-8 w-8" />
                <span className="text-xs">Choose image</span>
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
                Date
              </label>
              <input
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:border-tiger/50 focus:ring-1 focus:ring-tiger/20"
                placeholder="Apr 16"
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
                onChange={(e) => setNewLikes(Number(e.target.value))}
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
                onChange={(e) => setNewComments(Number(e.target.value))}
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
              Upload & Add
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                newPostUpload.handleRemove();
                setNewCaption("");
                setNewDate("");
                setNewLikes(0);
                setNewComments(0);
                setNewPostUrl("");
              }}
              className="rounded-xl border border-card-border px-5 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group overflow-hidden rounded-2xl border border-card-border bg-card transition-colors hover:border-tiger/20"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={post.image}
                alt={post.caption}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              {editingId !== post.id && (
                <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => startEdit(post)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-tiger"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div className="p-4">
              {editingId === post.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-card-border bg-card-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-tiger/50"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="rounded-lg border border-card-border bg-card-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-tiger/50"
                      placeholder="Date"
                    />
                    <input
                      value={editPostUrl}
                      onChange={(e) => setEditPostUrl(e.target.value)}
                      className="rounded-lg border border-card-border bg-card-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-tiger/50"
                      placeholder="Post URL"
                    />
                    <input
                      type="number"
                      value={editLikes}
                      onChange={(e) => setEditLikes(Number(e.target.value))}
                      className="rounded-lg border border-card-border bg-card-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-tiger/50"
                      placeholder="Likes"
                    />
                    <input
                      type="number"
                      value={editComments}
                      onChange={(e) => setEditComments(Number(e.target.value))}
                      className="rounded-lg border border-card-border bg-card-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-tiger/50"
                      placeholder="Comments"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
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
                      onClick={cancelEdit}
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
        ))}
      </div>
    </div>
  );
}
