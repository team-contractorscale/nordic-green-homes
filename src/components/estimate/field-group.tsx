import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/estimate/types";

const AUTOCOMPLETE: Record<string, string> = {
  firstName: "given-name",
  lastName: "family-name",
  email: "email",
  phone: "tel",
  address1: "address-line1",
  city: "address-level2",
  state: "address-level1",
  postalCode: "postal-code",
};

const PLACEHOLDER: Record<string, string> = {
  phone: "(604) 555-0000",
  address1: "Street address",
  postalCode: "e.g. V2P 1A1",
};

/** North American grouping as it's typed: "(604) 555-0000"; a leading 1 or + is left as typed. */
function formatPhone(raw: string): string {
  if (/^\s*[+1]/.test(raw)) return raw;
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function FieldGroup({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}) {
  const update = (id: string, v: string) =>
    onChange({ ...value, [id]: id === "phone" ? formatPhone(v) : v });

  return (
    <div className="grid grid-cols-2 gap-4">
      {question.fields?.map((f) => (
        <div key={f.id} className={cn(f.half ? "col-span-2 sm:col-span-1" : "col-span-2")}>
          <Label
            htmlFor={f.id}
            className="mb-1.5 font-sans text-[11px] font-bold tracking-widest text-muted-foreground uppercase"
          >
            {f.label}
            {f.required && <span className="text-primary">*</span>}
          </Label>
          <Input
            id={f.id}
            type={f.type ?? "text"}
            inputMode={f.type === "tel" ? "tel" : undefined}
            value={value[f.id] ?? ""}
            placeholder={f.placeholder ?? PLACEHOLDER[f.id] ?? f.label}
            onChange={(e) => update(f.id, e.target.value)}
            autoComplete={AUTOCOMPLETE[f.id]}
          />
        </div>
      ))}
    </div>
  );
}
