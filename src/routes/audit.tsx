import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import {
  AuditTabs,
  type AuditTabDef,
  type AuditTabSection,
} from "@/components/estimate/audit-tabs";
import { Pill, StatusBadge } from "@/components/estimate/audit-ui";
import { CollapsibleSection } from "@/components/estimate/collapsible-section";
import { BRAND } from "@/lib/content-data";
import { CHAT_WIDGET_CONFIG } from "@/lib/chat-widget-config";
import { PILOT_CRM_ENABLED, TRACKING_IDS } from "@/lib/form-tracking";
import {
  computedFieldKeys,
  computedFieldLabels,
  computedFieldNotes,
  fieldLabels,
  optionValues,
  perServiceFieldKeys,
  sharedFieldKeys,
  standardFields,
  surveyOrder,
} from "@/lib/estimate/field-mapping";
import { ghlFieldMap, ghlFieldOptions, ghlMergeTagMap } from "@/lib/estimate/ghl-field-map";
import { pricing } from "@/lib/estimate/pricing";
import { getSurvey } from "@/lib/estimate/surveys";
import { SERVICES } from "@/lib/home-content";

// Internal estimate setup audit, ported from CS-Web-Template's /audit. Gated by the login cookie
// in start.ts; noindex and blocked in robots.txt.

const allLabels: Record<string, string> = { ...fieldLabels, ...computedFieldLabels };

function makeField(key: string, note?: string) {
  const options = ghlFieldOptions[key];
  // projectType is sent by both the estimate surveys (survey.label) and the contact form
  // (SERVICES titles), so check every value the app actually writes against the GHL dropdown.
  const sent =
    key === "projectType"
      ? Array.from(
          new Set([...surveyOrder.map((t) => getSurvey(t).label), ...SERVICES.map((s) => s.title)]),
        )
      : optionValues(key);
  const rejected = options ? sent.filter((v) => !options.includes(v)) : [];
  return {
    key,
    label: allLabels[key] ?? key,
    ghlId: ghlFieldMap[key] ?? "",
    mapped: Boolean(ghlFieldMap[key]?.trim()),
    mergeTag: ghlMergeTagMap[key],
    note,
    ...(rejected.length && {
      warning: `Dropdown in HighLevel. Not accepted: ${rejected.join(" · ")}. Accepts: ${options!.join(" · ")}.`,
    }),
  };
}

function formatMoney(value: number): string {
  return `$${Math.round(value).toLocaleString("en-CA")}`;
}

function CredRow({
  label,
  envKey,
  value,
  ok,
}: {
  label: string;
  envKey: string;
  value?: string;
  ok: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${ok ? "border-emerald-100 bg-emerald-50/40" : "border-amber-200 bg-amber-50"}`}
    >
      <StatusBadge ok={ok} />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
          {label}
        </p>
        {value !== undefined && (
          <p className="mt-0.5 font-mono text-sm font-semibold break-all text-foreground">
            {value}
          </p>
        )}
        <p className="mt-0.5 text-[11px] text-muted-foreground">{envKey}</p>
      </div>
      <Pill ok={ok} label={ok ? "Configured" : "Missing"} />
    </div>
  );
}

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Setup & Audit | Nordic Green Homes" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuditPage,
});

function AuditPage() {
  const locationId = TRACKING_IDS.locationId;
  const trackingSet = Boolean(TRACKING_IDS.trackingId && TRACKING_IDS.projectId);
  const bookingUrl = "";

  const tabs: AuditTabDef[] = [
    {
      id: "shared",
      label: "Shared & Computed",
      sections: [
        { fields: sharedFieldKeys.map((k) => makeField(k)) },
        {
          sectionLabel: "Computed / Meta — auto-set by the app",
          fields: computedFieldKeys.map((k) => makeField(k, computedFieldNotes[k])),
        },
      ],
    },
    ...surveyOrder.map((type): AuditTabDef => ({
      id: type,
      label: getSurvey(type).label,
      sections: [
        { fields: perServiceFieldKeys[type].map((k) => makeField(k)) } satisfies AuditTabSection,
      ],
    })),
  ];

  const allF = tabs.flatMap((t) => t.sections.flatMap((s) => s.fields));
  const totalFields = allF.length;
  const totalMapped = allF.filter((f) => f.mapped).length;
  const warnings = allF.filter((f) => f.warning).length;
  const allMapped = totalMapped === totalFields;
  const overallOk = Boolean(locationId) && trackingSet && allMapped && warnings === 0;

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b border-border bg-background px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <p className="font-serif text-lg text-primary">{BRAND.name}</p>
            <nav className="flex items-center gap-1">
              <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground">
                Estimate Setup
              </span>
            </nav>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back To Site
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-14 lg:py-12">
        {/* ── Page header ── */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">Setup &amp; Audit</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            GoHighLevel integration status. Add missing field IDs to{" "}
            <code className="rounded bg-background px-1.5 py-0.5">
              lib/estimate/ghl-field-map.ts
            </code>
            .
          </p>
        </div>

        {/* ── Overall banner ── */}
        <div
          className={`mb-8 flex items-center gap-4 rounded-2xl border-l-4 px-5 py-4 ${overallOk ? "border border-emerald-200 border-l-emerald-500 bg-emerald-50" : "border border-amber-200 border-l-amber-500 bg-amber-50"}`}
        >
          <div
            className={`grid size-10 shrink-0 place-items-center rounded-full text-lg text-white ${overallOk ? "bg-emerald-500" : "bg-amber-400"}`}
          >
            {overallOk ? "✓" : "!"}
          </div>
          <div>
            <p className={`font-bold ${overallOk ? "text-emerald-800" : "text-amber-800"}`}>
              {overallOk
                ? "All integrations configured and ready"
                : "Action required — some items need attention"}
            </p>
            <p className={`text-sm ${overallOk ? "text-emerald-700" : "text-amber-700"}`}>
              {[
                !locationId && "Location ID missing",
                !trackingSet && "Tracking not configured",
                !allMapped && `${totalFields - totalMapped} field(s) need GHL IDs`,
                warnings > 0 && `${warnings} mapped dropdown(s) reject some values`,
                PILOT_CRM_ENABLED && "CRM sending is LIVE",
              ]
                .filter(Boolean)
                .join(" · ") || "Tracking and field mapping are all set."}
            </p>
          </div>
        </div>

        {/* ── Status cards ── */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "CRM Sending",
              ok: !PILOT_CRM_ENABLED,
              value: PILOT_CRM_ENABLED ? "Live" : "Off",
              sub: "PILOT_CRM_ENABLED",
            },
            {
              label: "Location ID",
              ok: Boolean(locationId),
              value: locationId || "—",
              sub: "O'Brien Contracting Ltd",
            },
            {
              label: "Ext. Tracking",
              ok: trackingSet,
              value: trackingSet ? "Active" : "Missing",
              sub: "trackingId / projectId",
            },
            {
              label: "Fields Mapped",
              ok: allMapped,
              value: `${totalMapped} / ${totalFields}`,
              sub: "custom fields",
            },
          ].map((c) => (
            <div
              key={c.label}
              className={`rounded-2xl border p-4 ${c.ok ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <p
                  className={`text-xs font-bold tracking-wider uppercase ${c.ok ? "text-emerald-700" : "text-amber-700"}`}
                >
                  {c.label}
                </p>
                <span className={`text-lg ${c.ok ? "text-emerald-500" : "text-amber-500"}`}>
                  {c.ok ? "✓" : "!"}
                </span>
              </div>
              <p className="mt-2 font-mono text-base font-extrabold break-all text-foreground">
                {c.value}
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* ── GHL connection + External Tracking ── */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <CollapsibleSection
            title={<h2 className="text-base font-bold text-foreground">GHL Connection</h2>}
            badge={<Pill ok={Boolean(locationId)} label={locationId ? "Ready" : "Incomplete"} />}
          >
            <div className="space-y-3 p-6 sm:p-8">
              <CredRow
                label="Location ID"
                envKey="TRACKING_IDS.locationId (form-tracking.ts)"
                value={locationId}
                ok={Boolean(locationId)}
              />
              <CredRow
                label="Chat Widget"
                envKey="CHAT_WIDGET_CONFIG.chatWidgetId"
                value={CHAT_WIDGET_CONFIG.chatWidgetId}
                ok
              />
              <CredRow
                label="CRM Sending"
                envKey="PILOT_CRM_ENABLED (form-tracking.ts)"
                value={
                  PILOT_CRM_ENABLED
                    ? "Live: submissions reach HighLevel"
                    : "Off: submissions are logged only"
                }
                ok={!PILOT_CRM_ENABLED}
              />
              <CredRow
                label="Booking URL"
                envKey="“Book your call” currently links to /contact"
                value={bookingUrl || "Not set"}
                ok={Boolean(bookingUrl)}
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={<h2 className="text-base font-bold text-foreground">External Tracking</h2>}
            badge={<Pill ok={trackingSet} label={trackingSet ? "Active" : "Missing"} />}
          >
            <div className="space-y-3 p-6 sm:p-8">
              <CredRow
                label="Tracking ID"
                envKey="TRACKING_IDS.trackingId"
                value={TRACKING_IDS.trackingId}
                ok={Boolean(TRACKING_IDS.trackingId)}
              />
              <CredRow
                label="Project ID"
                envKey="TRACKING_IDS.projectId"
                value={TRACKING_IDS.projectId}
                ok={Boolean(TRACKING_IDS.projectId)}
              />
              <div className="rounded-xl border border-border bg-muted/60 p-4">
                <p className="mb-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  Setup checklist
                </p>
                <ol className="space-y-2">
                  {[
                    { done: Boolean(locationId), text: "Location ID set" },
                    { done: trackingSet, text: "External tracking configured" },
                    { done: totalMapped > 0, text: "At least one custom field mapped" },
                    { done: allMapped, text: "Every survey field mapped" },
                    { done: warnings === 0, text: "Dropdown options match survey answers" },
                    { done: Boolean(bookingUrl), text: "Booking URL configured" },
                  ].map((s) => (
                    <li key={s.text} className="flex items-center gap-2 text-sm">
                      <StatusBadge ok={s.done} />
                      <span
                        className={
                          s.done
                            ? "text-muted-foreground line-through"
                            : "font-medium text-foreground"
                        }
                      >
                        {s.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* ── Site / contact info reference ── */}
        <div className="mb-8">
          <CollapsibleSection
            title={<h2 className="text-base font-bold text-foreground">Site &amp; Contact Info</h2>}
            badge={
              <span className="text-[11px] text-muted-foreground">
                Read-only — edit in lib/content-data.ts
              </span>
            }
          >
            <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
              {[
                { label: "Company Name", value: BRAND.name },
                { label: "Director / Founder", value: BRAND.directors },
                { label: "Phone", value: BRAND.phoneFormatted },
                { label: "Email", value: BRAND.email },
                { label: "Location", value: BRAND.location },
                { label: "CRM Location", value: "O'Brien Contracting Ltd (shared)" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[11px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </div>

        {/* ── Pricing reference ── */}
        <div className="mb-8">
          <CollapsibleSection
            title={<h2 className="text-base font-bold text-foreground">Pricing Reference</h2>}
            badge={
              <span className="text-[11px] text-muted-foreground">
                Read-only — ±{Math.round(pricing.rangeSpread * 100)}% spread, rounded to{" "}
                {formatMoney(pricing.roundTo)} · pilot rates
              </span>
            }
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/60">
                  <tr>
                    {[
                      "Project",
                      "Base / sq ft",
                      ...Object.keys(pricing.projects.customHome.finish),
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {surveyOrder.map((type) => {
                    const proj = pricing.projects[type];
                    return (
                      <tr key={type} className="border-t border-border hover:bg-muted/40">
                        <td className="px-4 py-3 font-semibold text-foreground">
                          {getSurvey(type).label}
                        </td>
                        <td className="px-4 py-3 font-mono text-foreground">
                          {formatMoney(proj.basePerUnit)}
                        </td>
                        {Object.values(proj.finish).map((m) => (
                          <td key={m} className="px-4 py-3 font-mono text-muted-foreground">
                            {formatMoney(proj.basePerUnit * m)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CollapsibleSection>
        </div>

        {/* ── Standard fields ── */}
        <div className="mb-8">
          <CollapsibleSection
            title={<h2 className="text-base font-bold text-foreground">Standard Contact Fields</h2>}
            badge={
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                {standardFields.length} native fields — no custom ID needed
              </span>
            }
          >
            <p className="px-6 pt-3 pb-1 text-xs text-muted-foreground sm:px-8">
              These map to HighLevel&apos;s built-in contact fields and are collected on every
              survey. No custom field ID is required.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/60">
                  <tr>
                    {["Field", "Internal Key", "Status"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {standardFields.map((f) => (
                    <tr key={f.key} className="border-t border-border hover:bg-muted/40">
                      <td className="px-4 py-3 font-medium text-foreground">{f.label}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{f.key}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                          Native Field
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CollapsibleSection>
        </div>

        {/* ── Custom field mapping ── */}
        <CollapsibleSection
          title={<h2 className="text-base font-bold text-foreground">Custom Field Mapping</h2>}
          badge={<Pill ok={allMapped} label={`${totalMapped} / ${totalFields} mapped`} />}
        >
          <div className="p-6 sm:p-8">
            <p className="mb-5 text-sm text-muted-foreground">
              Fields asked by both surveys appear in the shared tab. Everything else is grouped per
              service.
            </p>
            <AuditTabs tabs={tabs} totalMapped={totalMapped} totalFields={totalFields} />
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
