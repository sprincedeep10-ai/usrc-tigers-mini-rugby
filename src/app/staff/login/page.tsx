"use client";

import { StaffAuthProvider } from "@/components/staff/staff-auth-provider";
import { StaffLoginForm } from "@/components/staff/staff-login-form";

export default function StaffLoginPage() {
  return (
    <StaffAuthProvider>
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm rounded-2xl border border-card-border bg-card p-8 shadow-2xl">
          <StaffLoginForm />
        </div>
      </div>
    </StaffAuthProvider>
  );
}
