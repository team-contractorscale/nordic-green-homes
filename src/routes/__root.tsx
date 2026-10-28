import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  redirect,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportVibeError } from "../lib/vibe-error-reporting";
import {
  PreviewBanner,
  SiteHeader,
  SiteFooter,
  StickyMobileCTA,
} from "../components/layout/SiteLayout";
import { useHydrated } from "../hooks/use-hydrated";
import { PILOT_CRM_ENABLED } from "../lib/form-tracking";
import { REDIRECTS } from "../lib/redirects";

function NotFoundComponent() {
  // Green band so the floating white-text header stays readable.
  return (
    <section className="bg-primary text-white">
      <div className="wrap flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-40 text-center">
        <p className="font-serif text-7xl text-gold">404</p>
        <h1 className="mt-4 font-serif text-[clamp(2rem,2vw+1rem,3rem)]">Page not found</h1>
        <p className="mt-3 max-w-md text-base text-white/85">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-6 text-base font-bold text-primary transition-transform hover:scale-[1.04]"
        >
          Go home
        </Link>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportVibeError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: ({ location }) => {
    const to = REDIRECTS[location.pathname.replace(/\/+$/, "") || "/"];
    if (to) throw redirect({ href: to, statusCode: 301 });
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "noindex, nofollow" }, // Staging noindex protection
      { name: "author", content: "Nordic Green Homes" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Alice&family=Almarai:wght@300;400;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const hydrated = useHydrated();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col pb-[4.25rem] font-sans antialiased text-foreground bg-primary lg:pb-0">
        <PreviewBanner />
        <SiteHeader />
        <main className="flex-1 bg-background">
          <Outlet />
        </main>
        <SiteFooter />
        <StickyMobileCTA />
        {hydrated && PILOT_CRM_ENABLED ? (
          <Suspense fallback={null}>
            <LazyChatWidget />
          </Suspense>
        ) : null}
      </div>
    </QueryClientProvider>
  );
}

const LazyChatWidget = lazy(() =>
  import("../components/chat/ChatWidget").then((m) => ({ default: m.ChatWidget })),
);
