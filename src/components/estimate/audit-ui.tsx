// Small shared status-indicator primitives used across both internal
// tools (/audit and /site-audit) so "done"/"needs attention" reads
// identically on both — deliberately raw semantic colors (emerald/amber/
// red), not the brand's primary/gold tokens (§16).

export function Pill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 font-sans text-[11px] font-bold whitespace-nowrap ${ok ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
    >
      <span className={`size-1.5 rounded-full ${ok ? "bg-emerald-500" : "bg-amber-400"}`} />
      {label}
    </span>
  );
}

export function StatusBadge({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${ok ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}
    >
      {ok ? "✓" : "!"}
    </span>
  );
}
