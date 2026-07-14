"use client";

import { useState, type FormEvent } from "react";
import { useStaffAuth } from "./staff-auth-provider";
import { Lock, User, AlertCircle, Loader2 } from "lucide-react";

export function StaffLoginForm() {
  const { login } = useStaffAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(username, password);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-tiger/10">
          <Lock className="h-7 w-7 text-tiger" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Staff Access</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to manage site content
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="username"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted"
          >
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-xl border border-card-border bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-tiger/50 focus:ring-1 focus:ring-tiger/20"
              placeholder="Enter username"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-card-border bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-tiger/50 focus:ring-1 focus:ring-tiger/20"
              placeholder="Enter password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] py-3 text-sm font-semibold text-[var(--btn-primary-fg)] transition-all hover:brightness-110 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}
