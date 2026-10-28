import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/estimate/types";

const COLS = 10;
const ROWS = 5;
const CELLS = COLS * ROWS;

// Size bands as "floor plan" cards: a grid of tiles fills in proportion to
// each band's sqm, so the options read as bigger/smaller at a glance
// instead of a list of radio rows. Option labels come from sizeQuestion()
// as "Label · range".
export function SizeChoice({
  question,
  value,
  onSelect,
}: {
  question: Question;
  value?: string | undefined;
  onSelect: (value: string) => void;
}) {
  const opts = question.options ?? [];
  const maxSqm = Math.max(...opts.map((o) => Number(o.value)));

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {opts.map((opt) => {
        const [name, range] = opt.label.split(" · ");
        const selected = value === opt.value;
        const filled = Math.max(2, Math.round((Number(opt.value) / maxSqm) * CELLS));

        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(opt.value)}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-[var(--radius-md)] border p-3 text-left transition-all duration-300",
              selected
                ? "border-primary bg-primary shadow-lg"
                : "border-border bg-background hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg",
            )}
          >
            <div
              aria-hidden
              className={cn(
                "grid gap-[3px] rounded-[var(--radius-sm)] p-2.5 transition-colors duration-300",
                selected ? "bg-primary-foreground/10" : "bg-muted",
              )}
              style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: CELLS }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "aspect-square rounded-[2px] transition-colors duration-300 motion-reduce:transition-none",
                    i < filled
                      ? selected
                        ? "bg-gold"
                        : "bg-primary/70 group-hover:bg-gold"
                      : selected
                        ? "bg-primary-foreground/10"
                        : "bg-border/70",
                  )}
                  style={{ transitionDelay: i < filled ? `${i * 6}ms` : undefined }}
                />
              ))}
            </div>

            <span
              className={cn(
                "mt-3 font-sans text-lg leading-tight font-bold tracking-tight tabular-nums sm:text-xl",
                selected ? "text-gold" : "text-foreground",
              )}
            >
              {range ?? name}
            </span>
            {range && (
              <span
                className={cn(
                  "mt-1 font-sans text-[13px] leading-snug font-medium",
                  selected ? "text-primary-foreground/80" : "text-muted-foreground",
                )}
              >
                {name}
              </span>
            )}

            <span
              className={cn(
                "absolute top-2 right-2 grid size-6 place-items-center rounded-full transition-all duration-300",
                selected ? "scale-100 bg-gold opacity-100" : "scale-50 opacity-0",
              )}
            >
              <Check className="size-3.5 text-black" strokeWidth={3} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
