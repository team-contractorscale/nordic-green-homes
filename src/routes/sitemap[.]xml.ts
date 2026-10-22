import { createFileRoute } from "@tanstack/react-router";

// Static route manifest for the Nordic Green Homes internal pilot.
// Only public-facing leaf routes are listed. The site is noindex'd (see
// __root.tsx) and remains an unpublished private preview, but a valid
// /sitemap.xml must still resolve so the route does not return the app
// shell / 404 during launch review.
const BASE = "https://nordic-green-homes.vibepreview.app";

const ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/services", priority: "0.9" },
  { path: "/services/luxury-custom-homes", priority: "0.8" },
  { path: "/services/garden-suites", priority: "0.8" },
  { path: "/services/passive-home-builder-bc", priority: "0.8" },
  { path: "/services/high-performance-homes", priority: "0.8" },
  { path: "/services/design-and-interiors", priority: "0.8" },
  { path: "/floorplans", priority: "0.8" },
  { path: "/floorplans/nordic-haus", priority: "0.7" },
  { path: "/floorplans/modern-belgian-farmhouse", priority: "0.7" },
  { path: "/service-areas", priority: "0.7" },
  { path: "/service-areas/vancouver-north-shore", priority: "0.7" },
  { path: "/service-areas/richmond-and-tsawwassen", priority: "0.7" },
  { path: "/service-areas/vancouver-island", priority: "0.7" },
  { path: "/about-us", priority: "0.7" },
  { path: "/about-us/why-choose-us", priority: "0.6" },
  { path: "/about-us/our-guarantee", priority: "0.6" },
  { path: "/process", priority: "0.7" },
  { path: "/projects", priority: "0.7" },
  { path: "/resources", priority: "0.6" },
  { path: "/resources/guide", priority: "0.6" },
  { path: "/resources/bc-energy-step-code", priority: "0.6" },
  { path: "/faqs", priority: "0.6" },
  { path: "/contact", priority: "0.8" },
  { path: "/privacy", priority: "0.3" },
  { path: "/terms", priority: "0.3" },
] as const;

const NOW = new Date().toISOString().slice(0, 10);

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) =>
    `  <url>\n    <loc>${BASE}${r.path}</loc>\n    <lastmod>${NOW}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
).join("\n")}
</urlset>
`;
        return new Response(body, {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
