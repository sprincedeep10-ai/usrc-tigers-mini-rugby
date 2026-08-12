"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  StaffAuthProvider,
  useStaffAuth,
} from "@/components/staff/staff-auth-provider";
import { ContentEditor } from "@/components/staff/content-editor";
import { IGPostEditor } from "@/components/staff/ig-post-editor";
import { SectionImageEditor } from "@/components/staff/section-image-editor";
import {
  FileText,
  Image as ImageIcon,
  Images,
  LogOut,
  Shield,
  ExternalLink,
} from "lucide-react";

type AdminTab = "content" | "images" | "instagram";

function AdminDashboardInner() {
  const { isAuthenticated, isLoading, logout, authFetch } = useStaffAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("content");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/staff/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tiger/10">
            <Shield className="h-6 w-6 text-tiger animate-pulse" />
          </div>
          <p className="text-sm text-muted">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const tabs: { id: AdminTab; label: string; icon: typeof FileText }[] = [
    { id: "content", label: "Site Content", icon: FileText },
    { id: "images", label: "Homepage Images", icon: ImageIcon },
    { id: "instagram", label: "Instagram", icon: Images },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-card-border bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-tiger/10">
              <Shield className="h-4 w-4 text-tiger" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted">USRC Tigers Mini Rugby</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-3 w-3" />
              View Site
            </a>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-red-400/30 hover:text-red-400"
            >
              <LogOut className="h-3 w-3" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground">Manage Website</h2>
          <p className="mt-1 text-sm text-muted">
            Update homepage text, images, and Instagram posts — changes go live
            after you save.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === id
                  ? "bg-tiger text-black"
                  : "border border-card-border text-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {activeTab === "content" && <ContentEditor authFetch={authFetch} />}
        {activeTab === "images" && <SectionImageEditor authFetch={authFetch} />}
        {activeTab === "instagram" && <IGPostEditor authFetch={authFetch} />}
      </main>
    </div>
  );
}

export default function StaffPage() {
  return (
    <StaffAuthProvider>
      <AdminDashboardInner />
    </StaffAuthProvider>
  );
}
