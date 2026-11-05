# Welcome to your AI Studio project

This project was built with AI Studio.

## Development

Prefer working locally? You need Node.js and npm.

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Private correction review — DELIVERY-63295

The accepted copy/SEO/OG source is ClickUp Doc `6kw6w-183538` (26 pages).
`src/lib/accepted-metadata.ts` holds its four supplied fields verbatim. Public
route slugs, production canonicals, sitemap, social images and CRM configuration
are not changed by this correction pass. The old `vancouver-north-shore` slug
is preserved, with the accepted three-city visible label.

For private review only, build with `VITE_PRIVATE_REVIEW=true npm run build`,
then deploy `tools/review/wrangler.jsonc` to its task-specific Worker. Never
connect that Worker to the public Nordic domain or merge the task branch as a
publication step. The default build keeps the existing production behaviour.

The adapter requires a `REVIEW_TOKEN_HASH` secret (SHA-256 of a securely generated
review capability), checks `REVIEW_EXPIRES`, authenticates all assets and pages,
and marks every response noindex/noarchive and private/no-store. An access link
to `/__review?token=...` sets a Secure HttpOnly cookie and redirects to `/`; do
not store the token in Git or logs. Without the secret, access fails closed.

Legal drafts, article template, internal audit routes/assets and sitemap are
unavailable on the review deployment. Its CSP excludes feedback, CRM collectors
and embedded calendars; the review build disables CRM submissions and captures
form submission attempts before handlers run. No live form, upload or booking
tests are authorised by this copy task. Existing project imagery and truthful
O'Brien/concept/drafter attribution are preserved, not newly rights-cleared.

The Consult/result display guard checks that a saved range is valid before
showing estimate-ready wording. It does not change rates or calculations.
The unavailable recording is represented by accepted written call information,
not a play control or a claim that a video is complete.

Rollback: retain the public site/main branch unchanged; delete or disable only
the task Worker when review ends. The review expires on 12 November 2026 UTC.
Hannah's preview acceptance, Peter's legal/image-rights evidence, separate feature
acceptance and Cameron's review-before-client/publication hold remain open.
