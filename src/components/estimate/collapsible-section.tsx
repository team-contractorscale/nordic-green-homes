import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function CollapsibleSection({
  title,
  badge,
  defaultOpen = true,
  children,
}: {
  title: ReactNode;
  badge?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-background">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-6 py-5 text-left transition-colors hover:bg-muted/60 sm:px-8"
      >
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          {title}
          {badge}
        </div>
        <ChevronDown
          className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border">{children}</div>
        </div>
      </div>
    </section>
  );
}
