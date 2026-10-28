import { createFileRoute } from "@tanstack/react-router";
import {
  AUDIT_COOKIE,
  AUDIT_LOGIN_PATH,
  authToken,
  checkCredentials,
  safeNext,
} from "@/lib/audit-auth";

// Plain form POST target for /audit-login: sets the auth cookie and sends the user on.
export const Route = createFileRoute("/api/audit-login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const form = await request.formData();
        const next = safeNext(String(form.get("next") ?? ""));
        const url = new URL(request.url);

        if (
          !checkCredentials(String(form.get("username") ?? ""), String(form.get("password") ?? ""))
        ) {
          const back = new URL(AUDIT_LOGIN_PATH, url);
          back.searchParams.set("error", "1");
          back.searchParams.set("next", next);
          return new Response(null, { status: 303, headers: { location: back.toString() } });
        }

        const secure = url.protocol === "https:" ? "; Secure" : "";
        return new Response(null, {
          status: 303,
          headers: {
            location: new URL(next, url).toString(),
            "set-cookie": `${AUDIT_COOKIE}=${await authToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${secure}`,
          },
        });
      },
    },
  },
});
