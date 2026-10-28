import { createFileRoute } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BRAND } from "@/lib/content-data";

// Plain HTML form POST to /api/audit-login (no client-side fetch), so it works before hydration.
export const Route = createFileRoute("/audit-login")({
  validateSearch: (search: Record<string, unknown>) => ({
    next: typeof search["next"] === "string" ? search["next"] : "/audit",
    error: search["error"] === "1" || search["error"] === 1,
  }),
  head: () => ({
    meta: [
      { title: "Internal Tools Login | Nordic Green Homes" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuditLoginPage,
});

function AuditLoginPage() {
  const { next, error } = Route.useSearch();

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 px-4 py-16">
      <div className="w-full max-w-sm rounded-[var(--radius-lg)] border border-border bg-background p-8 shadow-xl shadow-primary/5">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary text-gold">
          <LockKeyhole className="size-5" />
        </span>
        <p className="mt-5 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
          {BRAND.name}
        </p>
        <h1 className="mt-1 font-serif text-2xl">Internal Tools</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to view the estimate setup audit.
        </p>
        <form action="/api/audit-login" method="post" className="mt-6 space-y-4">
          <input type="hidden" name="next" value={next} />
          <div className="space-y-2">
            <Label htmlFor="audit-username">Username</Label>
            <Input id="audit-username" name="username" autoComplete="username" required autoFocus />
          </div>
          <div className="space-y-2">
            <Label htmlFor="audit-password">Password</Label>
            <Input
              id="audit-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              Incorrect username or password.
            </p>
          )}
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
