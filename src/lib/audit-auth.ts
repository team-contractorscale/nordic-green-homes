// Gates the internal /audit tool (ported from CS-Web-Template). Credentials come from AUDIT_USER /
// AUDIT_PASSWORD; the fallback is the shared Contractor Scale login so the tool is protected out of
// the box. Server-only: read by the request middleware in start.ts and /api/audit-login.

export const AUDIT_COOKIE = "audit_auth";
export const AUDIT_LOGIN_PATH = "/audit-login";
export const PROTECTED_PREFIXES = ["/audit"];

export function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** Only ever send people back to a protected tool — never an arbitrary URL. */
export function safeNext(next: string | null | undefined) {
  return next &&
    next.startsWith("/") &&
    !next.startsWith("//") &&
    isProtectedPath(next.split("?")[0]!)
    ? next
    : "/audit";
}

function credentials() {
  return {
    user: process.env["AUDIT_USER"] || "contractorscale",
    password: process.env["AUDIT_PASSWORD"] || "contractorscale",
  };
}

export function checkCredentials(user: string, password: string) {
  const c = credentials();
  return user === c.user && password === c.password;
}

/** Cookie value: SHA-256 of the credentials, so the password itself is never stored in the browser. */
export async function authToken() {
  const { user, password } = credentials();
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`audit:${user}:${password}`),
  );
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function readCookie(request: Request, name: string) {
  const match = request.headers.get("cookie")?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]!) : undefined;
}
