# Supplied team and family photographs — preview candidate

Governing Work card: https://dash.contractorscale.com/work/407ac577-36d4-4934-abe2-e8e66e4095ae

Requested by Cyrus in native Work message `6860802e-1f85-43c6-9304-6e713e61a54f`.
Baseline: `ede5b649af516ee28389017a64b1b211c9323d52` (fresh origin/main).

## Placements

| Supplied file | Source attachment | Output | Placement |
| --- | --- | --- | --- |
| DSC_5040.jpg, 4919 × 7378 | 9456dafb-6cc0-405d-b21d-45e2fad56a28 | team/lane-and-kylie.webp, 1160 × 1740 | Home team section and About hero; Lane left, Kylie right |
| DSC_4913.jpg, 5013 × 5013 | 90fc45d4-4823-4937-b651-ebbcfdf20ad6 | team/lane-kylie-family.webp, 1440 × 1440 | About: Partners in life, building and design; whole square image retained |
| image.png, 427 × 640 | ad4792b1-5450-4e74-8b54-38d79a19d7a3 | team/lane-portrait.webp, 427 × 640 | About: Lane biography |
| image.png, 427 × 640 | f00c296d-9da1-4365-b6fa-e17def023796 | team/kylie-portrait.webp, 427 × 640 | About: Kylie biography |

Peter's source thread `8eadabcb-0777-4c18-a11c-dd34bcbb1feb` was read on 26 November. The 15 November original contains two JPGs. His 16 November follow-up `38fc4954-a8b2-4e33-abed-723275f6b4d8` contains **three**, not four, PNG attachments. All five files were fetched through native attachment access and matched their stored SHA-256. Visual inspection confirms five distinct photographs. The remaining 640 × 427 outdoor couple image (`dff9caf8-07c1-4b6f-8a81-637ba44796d7`) is an alternate; not added because the higher-resolution supplied couple portrait already fills the paired-team slots. No generated imagery or third-party replacement photos.

Optimised WebP copies retain the original composition; raw 14/19 MB JPGs are not shipped. Descriptive alt text and intrinsic dimensions are included. The small additional portraits are not enlarged beyond native resolution.

## Validation and boundaries

- Production build: pass (`npm run build`).
- TypeScript: pass (`npx tsc --noEmit`).
- Changed-file ESLint: pass.
- Full-repository lint: eight errors and fourteen warnings in the baseline's untouched files; not represented as a clean full lint run.
- Browser checks: Home and About at 1440 × 1000 and 390 × 844, with external collectors and writes blocked. All new images decode with the expected dimensions; one H1 per page; zero page exceptions. Photo-focused desktop/mobile captures were inspected. About and mobile Home have no horizontal overflow. A desktop Home overflow reading is tracked separately rather than hidden or attributed to this change without evidence.
- Bio copy, legal content, forms, CRM, tracking, DNS and production settings are unchanged. No enquiry or booking was submitted.

The native Work visual review contains browser-derived Home/About markup, the site's built CSS and embedded optimised review copies of the four photos. It is a responsive visual snapshot, not a live AI Studio deployment; animations and enquiry actions are intentionally disabled. It must not be described as an updated AI Studio preview or a production release.

This branch is for review only. Do not merge/publish as an implicit launch: the old branded preview hostname redirects to the live domain. Cyrus owns photo acceptance and the approved AI Studio preview import; production publication remains separately controlled.

## Legal handoff

The legal facts remain client-supplied, not independently verified records: Nordic Green Homes Inc.; #12, 6029 Promontory Road, Chilliwack; warranty still under O'Brien Contracting, with an application to switch planned after the Langley garage completes; BC Housing coverage under Lane individually. No wording asserting that Nordic currently holds either coverage is introduced. Hannah's review is separate from photo implementation and launch authority.

## Operating evidence

Used existing WWCD, repository-content-release (draft-preview handoff) and live-website-visual-link-qa procedures; no new workflow or integration was created. WWCD canon revision read: `f4765459212cf459154f25c695463c9c7ae72996`, including Current standards 27 October and the 23 November Work-only/client-website ownership rulings. No new Cameron company correction arose in this teammate request; automatic writeback therefore has no new ruling to publish.
