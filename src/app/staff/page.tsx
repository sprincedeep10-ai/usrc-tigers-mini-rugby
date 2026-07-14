"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  StaffAuthProvider,
  useStaffAuth,
} from "@/components/staff/staff-auth-provider";
import { IGPostEditor } from "@/components/staff/ig-post-editor";
import { ContentEditor } from "@/components/staff/content-editor";
import { LogOut, Image, FileText, Shield, ExternalLink } from "lucide-react";

function StaffDashboardInner() {
  const { isAuthenticated, isLoading, logout, authFetch } = useStaffAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ig" | "content">("ig");

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

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-card-border bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-tiger/10">
              <Shield className="h-4 w-4 text-tiger" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground">Staff Panel</h1>
              <p className="text-xs text-muted">USRC Tigers Mini Rugby</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-3 w-3" />
              View Site
            </a>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-xs text-muted transition-colors hover:text-red-400 hover:border-red-400/30"
            >
              <LogOut className="h-3 w-3" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8">
        <div className="mb-8 flex gap-2">
          <button
            onClick={() => setActiveTab("ig")}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all ${
              activeTab === "ig"
                ? "bg-tiger text-black shadow-lg shadow-tiger/20"
                : "border border-card-border text-muted hover:text-foreground hover:border-tiger/30"
            }`}
          >
            <Image className="h-4 w-4" />
            Instagram Posts
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all ${
              activeTab === "content"
                ? "bg-tiger text-black shadow-lg shadow-tiger/20"
                : "border border-card-border text-muted hover:text-foreground hover:border-tiger/30"
            }`}
          >
            <FileText className="h-4 w-4" />
            Site Content
          </button>
        </div>

        {activeTab === "ig" && <IGPostEditor authFetch={authFetch} />}
        {activeTab === "content" && <ContentEditor authFetch={authFetch} />}
      </main>
    </div>
  );
}

export default function StaffPage() {
  return (
    <StaffAuthProvider>
      <StaffDashboardInner />
    </StaffAuthProvider>
  );
}
