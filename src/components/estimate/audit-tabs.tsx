import { Fragment, useState } from "react";
import { Pill } from "./audit-ui";

export interface AuditTabField {
  key: string;
  label: string;
  ghlId: string;
  mapped: boolean;
  mergeTag?: string | undefined;
  note?: string | undefined;
  /** Mapped, but HighLevel won't store some values (dropdown option mismatch). */
  warning?: string | undefined;
}

export interface AuditTabSection {
  sectionLabel?: string;
  fields: AuditTabField[];
}

export interface AuditTabDef {
  id: string;
  label: string;
  sections: AuditTabSection[];
}

function allFields(tab: AuditTabDef) {
  return tab.sections.flatMap((s) => s.fields);
}

export function AuditTabs({
  tabs,
  totalMapped,
  totalFields,
}: {
  tabs: AuditTabDef[];
  totalMapped: number;
  totalFields: number;
}) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const allMapped = totalMapped === totalFields;

  return (
    <div>
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-border pb-px">
        {tabs.map((tab) => {
          const fields = allFields(tab);
          const mapped = fields.filter((f) => f.mapped).length;
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`relative -mb-px flex shrink-0 items-center gap-2 rounded-t-lg border border-b-0 px-3.5 py-2.5 font-sans text-[12px] font-semibold transition-all duration-150 ${
                isActive
                  ? "z-10 border-border bg-background text-foreground shadow-sm"
                  : "border-transparent bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none font-black ${
                  mapped === fields.length
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {mapped}/{fields.length}
              </span>
            </button>
          );
        })}
      </div>

      {current &&
        (() => {
          const fields = allFields(current);
          const mapped = fields.filter((f) => f.mapped).length;
          const allTabMapped = mapped === fields.length;

          return (
            <div className="overflow-hidden rounded-b-xl border border-t-0 border-border bg-background">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted px-5 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="font-sans text-sm font-bold text-foreground">
                    {current.label}
                  </span>
                  <span className="hidden font-sans text-xs text-muted-foreground sm:inline">
                    — {mapped} of {fields.length} mapped
                  </span>
                </div>
                <Pill
                  ok={allTabMapped}
                  label={allTabMapped ? "All mapped" : `${fields.length - mapped} need ID`}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-border bg-muted/60">
                    <tr>
                      <th className="w-[200px] px-4 py-2.5 font-sans text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                        Field Name
                      </th>
                      <th className="hidden w-[150px] px-4 py-2.5 font-sans text-[10px] font-bold tracking-wider text-muted-foreground uppercase sm:table-cell">
                        Internal Key
                      </th>
                      <th className="hidden w-[200px] px-4 py-2.5 font-sans text-[10px] font-bold tracking-wider text-muted-foreground uppercase lg:table-cell">
                        GHL Field ID
                      </th>
                      <th className="hidden px-4 py-2.5 font-sans text-[10px] font-bold tracking-wider text-muted-foreground uppercase xl:table-cell">
                        GHL Merge Tag
                      </th>
                      <th className="w-[110px] px-4 py-2.5 font-sans text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.sections.map((section, si) => (
                      <Fragment key={si}>
                        {section.sectionLabel && (
                          <tr className="bg-muted/60">
                            <td colSpan={5} className="px-4 py-2">
                              <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-black tracking-[0.18em] text-muted-foreground uppercase">
                                {section.sectionLabel}
                              </span>
                            </td>
                          </tr>
                        )}
                        {section.fields.map((f) => (
                          <tr
                            key={f.key}
                            className={`border-t border-border transition-colors hover:bg-muted/50 ${!f.mapped || f.warning ? "bg-amber-50/50" : ""}`}
                          >
                            <td className="px-4 py-3">
                              <p className="font-medium text-foreground">{f.label}</p>
                              {f.note && (
                                <p className="mt-0.5 font-sans text-[10px] text-muted-foreground italic">
                                  {f.note}
                                </p>
                              )}
                              {f.warning && (
                                <p className="mt-1 font-sans text-[11px] text-amber-700">
                                  {f.warning}
                                </p>
                              )}
                            </td>
                            <td className="hidden px-4 py-3 align-top font-mono text-xs text-muted-foreground sm:table-cell">
                              {f.key}
                            </td>
                            <td className="hidden px-4 py-3 align-top font-mono text-xs lg:table-cell">
                              {f.mapped ? (
                                <span className="text-emerald-700">{f.ghlId}</span>
                              ) : (
                                <span className="text-amber-600 italic">
                                  — add ID to ghl-field-map.ts
                                </span>
                              )}
                            </td>
                            <td className="hidden px-4 py-3 align-top xl:table-cell">
                              {f.mergeTag ? (
                                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground select-all">
                                  {f.mergeTag}
                                </code>
                              ) : (
                                <span className="text-xs text-muted-foreground/60 italic">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3 align-top">
                              {f.warning ? (
                                <Pill ok={false} label="Check options" />
                              ) : (
                                <Pill ok={f.mapped} label={f.mapped ? "Mapped" : "Needs ID"} />
                              )}
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {!allTabMapped && (
                <div className="flex items-center gap-2 border-t border-amber-100 bg-amber-50/70 px-5 py-2.5 font-sans text-xs text-amber-700">
                  <span className="font-bold">Tip:</span>
                  <span>
                    Once a client&apos;s GHL custom fields exist, add their IDs to{" "}
                    <code className="rounded bg-amber-100 px-1 py-0.5">
                      lib/estimate/ghl-field-map.ts
                    </code>
                    .
                  </span>
                </div>
              )}
            </div>
          );
        })()}

      <div
        className={`mt-4 flex items-center gap-3 rounded-xl border px-4 py-3 font-sans text-sm ${
          allMapped
            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
            : "border-amber-200 bg-amber-50 text-amber-800"
        }`}
      >
        <span
          className={`shrink-0 font-black ${allMapped ? "text-emerald-500" : "text-amber-500"}`}
        >
          {allMapped ? "✓" : "!"}
        </span>
        <span>
          <strong>{totalMapped}</strong> of <strong>{totalFields}</strong> fields mapped to a GHL
          custom field.
          {!allMapped && (
            <>
              {" "}
              <strong>{totalFields - totalMapped}</strong> still need an ID.
            </>
          )}
        </span>
      </div>
    </div>
  );
}
