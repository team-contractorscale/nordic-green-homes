import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/estimate/types";
import { getOptionIcon } from "./option-icon";

const isExclusive = (label: string) => /^none/i.test(label.trim());

export function MultiChoice({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const opts = question.options ?? [];

  const toggle = (optValue: string) => {
    if (isExclusive(optValue)) {
      onChange(value.includes(optValue) ? [] : [optValue]);
      return;
    }
    const withoutExclusive = value.filter((v) => !isExclusive(v));
    onChange(
      withoutExclusive.includes(optValue)
        ? withoutExclusive.filter((v) => v !== optValue)
        : [...withoutExclusive, optValue],
    );
  };

  // Pill chips rather than checkbox rows: tap to toggle, the "+" turns into
  // a check, and a running count confirms what's picked.
  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {opts.map((opt) => {
          const selected = value.includes(opt.value);
          const Icon = getOptionIcon(opt.label);
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(opt.value)}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full border py-2 pr-4 pl-2 font-sans text-[15px] font-semibold transition-all duration-300",
                selected
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-background text-foreground hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md",
              )}
            >
              <span
                className={cn(
                  "grid size-7 place-items-center rounded-full transition-all duration-300",
                  selected ? "bg-gold text-black" : "bg-accent text-primary group-hover:bg-gold",
                )}
              >
                {selected ? (
                  <Check className="size-3.5" strokeWidth={3} />
                ) : Icon ? (
                  <Icon className="size-3.5" />
                ) : (
                  <Plus className="size-3.5" strokeWidth={3} />
                )}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-4 font-sans text-xs font-semibold text-muted-foreground">
        {value.length === 0 ? "Nothing selected yet" : `${value.length} selected`}
      </p>
    </div>
  );
}
