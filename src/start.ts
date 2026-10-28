import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import {
  AUDIT_COOKIE,
  AUDIT_LOGIN_PATH,
  authToken,
  isProtectedPath,
  readCookie,
} from "./lib/audit-auth";
import { renderErrorPage } from "./lib/error-page";

// Gates the internal /audit tool behind a login cookie; unauthenticated visitors go to the
// /audit-login form (same as CS-Web-Template's middleware.ts).
const auditMiddleware = createMiddleware().server(async ({ request, pathname, next }) => {
  if (isProtectedPath(pathname) && readCookie(request, AUDIT_COOKIE) !== (await authToken())) {
    const url = new URL(request.url);
    const login = new URL(AUDIT_LOGIN_PATH, url);
    login.searchParams.set("next", pathname + url.search);
    return Response.redirect(login, 302);
  }
  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, auditMiddleware, csrfMiddleware],
}));
