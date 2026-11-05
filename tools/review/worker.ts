// Task-scoped private review adapter. Never bind this Worker to a production domain.
// Built application and all assets stay behind expiring capability access.
import site from "../../dist/server/server.js";

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  REVIEW_TOKEN_HASH?: string;
  REVIEW_EXPIRES: string;
  BUILD_REVISION?: string;
};
const cookieName = "__Host-nordic_review";
const held = /^\/(?:privacy|terms|audit(?:-login)?|api|resources\/article-template)(?:\/|$)/;
const internalAsset = /\/(?:audit(?:-login)?|privacy|terms|resources\.article-template)[-.]/;
const headers = {
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://images.squarespace-cdn.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-src 'none'; form-action 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
};
async function authorised(token: string, env: Env) {
  if (!env.REVIEW_TOKEN_HASH || Date.now() >= Date.parse(env.REVIEW_EXPIRES)) return false;
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  const hex = Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
  return hex === env.REVIEW_TOKEN_HASH;
}
function response(body: string, status: number) {
  return new Response(body, { status, headers });
}
export default {
  async fetch(request: Request, env: Env, ctx: unknown) {
    const url = new URL(request.url());
    if (url.pathname === "/__review") {
      const token = url.searchParams.get("token") ?? "";
      if (!(await authorised(token, env)))
        return response("Review access required or expired.", 401);
      return new Response(null, {
        status: 303,
        headers: {
          ...headers,
          Location: "/",
          "Set-Cookie": `${cookieName}=${token}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=604800`,
        },
      });
    }
    const token =
      request.headers.get("Cookie")?.match(/(?:^|;\s*)__Host-nordic_review=([^;]*)/)?.[1] ?? "";
    if (!(await authorised(token, env)))
      return response("Private internal review. Access link required.", 401);
    if (!["GET", "HEAD"].includes(request.method()))
      return response("Submissions are disabled in this review.", 405);
    if (
      held.test(url.pathname) ||
      internalAsset.test(url.pathname) ||
      url.pathname.startsWith("/__vibe") ||
      url.pathname === "/sitemap.xml"
    )
      return response("Not available in this review.", 404);
    if (url.pathname === "/robots.txt") return response("User-agent: *\nDisallow: /\n", 200);
    let result: Response;
    if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) result = await env.ASSETS.fetch(request);
    else result = await site.fetch(request, env, ctx);
    const h = new Headers(result.headers);
    for (const [k, v] of Object.entries(headers)) h.set(k, v);
    h.set("X-Review-Revision", env.BUILD_REVISION ?? "local");
    return new Response(result.body, {
      status: result.status,
      statusText: result.statusText,
      headers: h,
    });
  },
};
