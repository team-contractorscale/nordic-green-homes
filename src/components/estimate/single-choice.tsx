import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Option, Question } from "@/lib/estimate/types";
import { getOptionIcon } from "./option-icon";

type Props = {
  question: Question;
  value?: string | undefined;
  onSelect: (value: string) => void;
  priceHints?: Record<string, string> | undefined;
};

// One question type ("single"), several looks: the style is picked from the
// shape of the options themselves, so surveys never have to name a style
// and a new question falls back to icon tiles.
export function SingleChoice(props: Props) {
  const opts = props.question.options ?? [];
  if (props.question.role === "finishLevel") return <TierCards {...props} />;
  if (props.question.role === "budget") return <BudgetBars {...props} />;
  if (props.question.id === "timeline") return <TimelineTrack {...props} />;
  if (opts.every((o) => countOf(o.label))) return <CountTiles {...props} />;
  if (opts.length === 2 && opts.every((o) => o.label.length <= 14))
    return <BinaryTiles {...props} />;
  return <IconTiles {...props} />;
}

const CAR_COUNTS: Record<string, string> = { None: "0", Single: "1", Double: "2", "Triple+": "3+" };

/** "3 Bedrooms" → { n: "3", caption: "Bedrooms" }; car-space words map to digits. */
function countOf(label: string): { n: string; caption: string } | null {
  if (CAR_COUNTS[label]) return { n: CAR_COUNTS[label], caption: label };
  const m = label.match(/^(\d+\+?)\s+(.+)$/);
  return m ? { n: m[1]!, caption: m[2]! } : null;
}

const cardBase =
  "group relative rounded-[var(--radius-md)] border text-left transition-all duration-300";
const cardState = (selected: boolean) =>
  selected
    ? "border-primary bg-primary shadow-lg"
    : "border-border bg-background hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg";

function CheckBadge({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-2 right-2 grid size-6 place-items-center rounded-full bg-gold transition-all duration-300",
        selected ? "scale-100 opacity-100" : "scale-50 opacity-0",
      )}
    >
      <Check className="size-3.5 text-black" strokeWidth={3} />
    </span>
  );
}

function OptionButton({
  opt,
  value,
  onSelect,
  className,
  children,
}: {
  opt: Option;
  value?: string | undefined;
  onSelect: (v: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const selected = value === opt.value;
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(opt.value)}
      className={cn(cardBase, cardState(selected), className)}
    >
      {children}
      <CheckBadge selected={selected} />
    </button>
  );
}

/** Default: icon-on-top tiles in a grid. */
function IconTiles({ question, value, onSelect }: Props) {
  const opts = question.options ?? [];
  const long = opts.some((o) => o.label.length > 24);
  return (
    <div
      className={cn(
        "grid gap-3",
        long
          ? "grid-cols-1 sm:grid-cols-2"
          : opts.length === 4
            ? "grid-cols-2 sm:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-3",
      )}
    >
      {opts.map((opt, i) => {
        const selected = value === opt.value;
        const Icon = getOptionIcon(opt.label);
        return (
          <OptionButton
            key={opt.value}
            opt={opt}
            value={value}
            onSelect={onSelect}
            className={cn("flex gap-3 p-4", long ? "items-center" : "flex-col")}
          >
            <span
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-[var(--radius-sm)] font-sans text-sm font-bold transition-all duration-300",
                selected
                  ? "bg-gold text-black"
                  : "bg-accent text-primary group-hover:rotate-[-6deg] group-hover:bg-gold",
              )}
            >
              {Icon ? <Icon className="size-5" /> : String.fromCharCode(65 + i)}
            </span>
            <span
              className={cn(
                "pr-5 font-sans text-[15px] leading-snug font-semibold",
                selected ? "text-primary-foreground" : "text-foreground",
              )}
            >
              {opt.label}
            </span>
          </OptionButton>
        );
      })}
    </div>
  );
}

/** Two short answers (Yes/No, Same/New Layout): a big split choice. */
function BinaryTiles({ question, value, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {(question.options ?? []).map((opt) => {
        const selected = value === opt.value;
        const Icon = getOptionIcon(opt.label);
        return (
          <OptionButton
            key={opt.value}
            opt={opt}
            value={value}
            onSelect={onSelect}
            className="flex flex-col items-center justify-center gap-3 px-4 py-8 text-center"
          >
            {Icon && (
              <span
                className={cn(
                  "grid size-14 place-items-center rounded-full transition-all duration-300",
                  selected
                    ? "bg-gold text-black"
                    : "bg-muted text-primary group-hover:scale-110 group-hover:bg-accent",
                )}
              >
                <Icon className="size-6" strokeWidth={2.5} />
              </span>
            )}
            <span
              className={cn(
                "font-sans text-xl font-bold",
                selected ? "text-primary-foreground" : "text-foreground",
              )}
            >
              {opt.label}
            </span>
          </OptionButton>
        );
      })}
    </div>
  );
}

/** Counts (bedrooms, bathrooms, car spaces): big numerals with that many icons. */
function CountTiles({ question, value, onSelect }: Props) {
  const opts = question.options ?? [];
  const tight = opts.length > 4;
  return (
    <div className="grid auto-cols-fr grid-flow-col gap-2 sm:gap-3">
      {opts.map((opt) => {
        const selected = value === opt.value;
        const { n, caption } = countOf(opt.label)!;
        const Icon = getOptionIcon(opt.label);
        const icons = Math.min(parseInt(n, 10), 5);
        return (
          <OptionButton
            key={opt.value}
            opt={opt}
            value={value}
            onSelect={onSelect}
            className="flex flex-col items-center px-1 pt-5 pb-4 text-center"
          >
            <span
              className={cn(
                "font-sans text-4xl leading-none font-bold tabular-nums sm:text-5xl",
                selected ? "text-gold" : "text-foreground",
              )}
            >
              {n}
            </span>
            <span aria-hidden className="mt-3 flex h-3.5 items-center gap-0.5">
              {Icon &&
                Array.from({ length: icons }, (_, i) => (
                  <Icon
                    key={i}
                    className={cn(
                      "size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5",
                      i >= 3 && "hidden sm:block",
                      selected ? "text-gold" : "text-muted-foreground",
                    )}
                    style={{ transitionDelay: `${i * 40}ms` }}
                  />
                ))}
            </span>
            <span
              className={cn(
                "mt-2 font-sans text-xs font-semibold",
                tight && "hidden sm:block",
                selected ? "text-primary-foreground/80" : "text-muted-foreground",
              )}
            >
              {caption}
            </span>
          </OptionButton>
        );
      })}
    </div>
  );
}

const TIER_BLURBS: Record<string, string> = {
  Standard: "Well-made, durable finishes and fixtures",
  Premium: "Upgraded materials, millwork and detailing",
  Luxury: "Bespoke finishes and architectural detail",
};

/** Finish level: ascending tier cards with a rising bar meter. */
function TierCards({ question, value, onSelect, priceHints }: Props) {
  const opts = question.options ?? [];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {opts.map((opt, tier) => {
        const selected = value === opt.value;
        const Icon = getOptionIcon(opt.label);
        return (
          <OptionButton
            key={opt.value}
            opt={opt}
            value={value}
            onSelect={onSelect}
            className="flex items-center gap-4 p-5 sm:flex-col sm:items-start"
          >
            <span aria-hidden className="flex h-12 items-end gap-1">
              {opts.map((_, bar) => (
                <span
                  key={bar}
                  className={cn(
                    "w-3 rounded-sm transition-all duration-500",
                    bar <= tier
                      ? selected
                        ? "bg-gold"
                        : "bg-primary/70 group-hover:bg-gold"
                      : selected
                        ? "bg-primary-foreground/15"
                        : "bg-border",
                  )}
                  style={{ height: `${((bar + 1) / opts.length) * 100}%` }}
                />
              ))}
            </span>
            <span className="flex-1">
              <span
                className={cn(
                  "flex items-center gap-2 font-sans text-xl font-bold",
                  selected ? "text-primary-foreground" : "text-foreground",
                )}
              >
                {Icon && <Icon className={cn("size-4", selected ? "text-gold" : "text-primary")} />}
                {opt.label}
              </span>
              {TIER_BLURBS[opt.label] && (
                <span
                  className={cn(
                    "mt-1 block font-sans text-[13px] leading-snug",
                    selected ? "text-primary-foreground/75" : "text-muted-foreground",
                  )}
                >
                  {TIER_BLURBS[opt.label]}
                </span>
              )}
              {priceHints?.[opt.value] && (
                <span
                  className={cn(
                    "mt-3 inline-block rounded-full px-2.5 py-1 font-sans text-xs font-bold tabular-nums",
                    selected ? "bg-gold text-black" : "bg-accent text-primary",
                  )}
                >
                  {priceHints[opt.value]}
                </span>
              )}
            </span>
          </OptionButton>
        );
      })}
    </div>
  );
}

/** Budget: each band is a bar whose length grows with the amount. */
function BudgetBars({ question, value, onSelect }: Props) {
  const opts = question.options ?? [];
  return (
    <div className="grid gap-2">
      {opts.map((opt, i) => {
        const selected = value === opt.value;
        return (
          <OptionButton
            key={opt.value}
            opt={opt}
            value={value}
            onSelect={onSelect}
            className="overflow-hidden px-4 py-4"
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-y-0 left-0 transition-all duration-500 ease-out",
                selected ? "bg-gold/20" : "bg-accent/70 group-hover:bg-gold/40",
              )}
              style={{ width: `${((i + 1) / opts.length) * 100}%` }}
            />
            <span
              className={cn(
                "relative font-sans text-lg font-bold tabular-nums",
                selected ? "text-primary-foreground" : "text-foreground",
              )}
            >
              {opt.label}
            </span>
          </OptionButton>
        );
      })}
    </div>
  );
}

/** Timeline: stops along a track, soonest first. */
function TimelineTrack({ question, value, onSelect }: Props) {
  const opts = question.options ?? [];
  return (
    <div className="relative grid gap-3 sm:grid-cols-4">
      <span
        aria-hidden
        className="absolute top-[34px] right-[12%] left-[12%] hidden h-0.5 bg-border sm:block"
      />
      {opts.map((opt) => {
        const selected = value === opt.value;
        const Icon = getOptionIcon(opt.label);
        return (
          <OptionButton
            key={opt.value}
            opt={opt}
            value={value}
            onSelect={onSelect}
            className="flex items-center gap-3 border-transparent p-3 hover:border-border sm:flex-col sm:text-center"
          >
            <span
              className={cn(
                "relative grid size-11 shrink-0 place-items-center rounded-full border-2 transition-all duration-300",
                selected
                  ? "border-gold bg-gold text-black"
                  : "border-border bg-background text-primary group-hover:scale-110 group-hover:border-gold",
              )}
            >
              {Icon && <Icon className="size-5" />}
            </span>
            <span
              className={cn(
                "font-sans text-sm leading-snug font-semibold",
                selected ? "text-primary-foreground" : "text-foreground",
              )}
            >
              {opt.label}
            </span>
          </OptionButton>
        );
      })}
    </div>
  );
}
