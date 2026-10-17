import { useEffect, useMemo, useState } from "react";
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { ChevronDown, Check, Search } from "lucide-react";

type PhoneFieldProps = {
  field: {
    value: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
  };
  value: string;
  onChange: (fieldKey: string, e164: string) => void;
  detectedCountry?: CountryCode | null | undefined;
  localeRegion: CountryCode;
  invalidMessage?: string | undefined;
};

function regionName(c: CountryCode): string {
  try {
    const r = new Intl.DisplayNames([`en`], { type: `region` });
    return r.of(c) ?? c;
  } catch {
    return c;
  }
}

function dial(c: CountryCode): string {
  try {
    return `+${getCountryCallingCode(c)}`;
  } catch {
    return `+`;
  }
}

export function PhoneField({
  field,
  value,
  onChange,
  detectedCountry,
  localeRegion,
  invalidMessage,
}: PhoneFieldProps) {
  const [raw, setRaw] = useState("");
  const [country, setCountry] = useState<CountryCode>(
    (detectedCountry as CountryCode) ?? localeRegion ?? "US",
  );
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!raw && detectedCountry) setCountry(detectedCountry);
  }, [detectedCountry, raw]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-phone-listbox]") || t.closest("[data-phone-trigger]")) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const countries = useMemo(
    () =>
      getCountries()
        .map((c) => ({ c, name: regionName(c), dial: dial(c) }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const filtered = countries.filter((x) => x.name.toLowerCase().includes(q.trim().toLowerCase()));

  const update = (text: string, c: CountryCode = country) => {
    setRaw(text);
    const p = parsePhoneNumberFromString(text, c);
    onChange(field.value, p?.isValid() ? p.number : "");
  };

  return (
    <div className="space-y-1.5">
      <div className="relative flex gap-2">
        <button
          type="button"
          data-phone-trigger
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-1.5 rounded-md border border-input bg-popover px-2.5 py-2 text-sm text-foreground hover:bg-muted transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-1"
          aria-label={`Select country code. Current ${regionName(country)} ${dial(country)}`}
        >
          <span className="font-mono text-xs">{dial(country)}</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-70" />
        </button>
        <input
          type="tel"
          name={field.value}
          required={field.required}
          placeholder={field.placeholder}
          value={raw}
          onChange={(e) => update(e.target.value)}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-1"
          aria-label={field.label ?? "Phone number"}
        />
        {open ? (
          <div
            role="listbox"
            data-phone-listbox
            className="absolute z-50 mt-10 w-64 max-h-56 overflow-y-auto rounded-md border border-border bg-popover shadow-lg"
          >
            <div className="sticky top-0 border-b border-border bg-popover p-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  autoFocus
                  placeholder="Search countries"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full rounded-md border border-input bg-background py-1.5 pl-8 pr-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <ul className="py-1">
              {filtered.map((x) => (
                <li key={x.c}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={x.c === country}
                    onClick={() => {
                      setCountry(x.c);
                      setOpen(false);
                      update(raw, x.c);
                    }}
                    className="flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <span>{x.name}</span>
                    <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      {x.dial}
                      {x.c === country ? <Check className="w-3.5 h-3.5 text-primary" /> : null}
                    </span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 ? (
                <li className="px-3 py-2 text-xs text-muted-foreground">No countries found</li>
              ) : null}
            </ul>
          </div>
        ) : null}
      </div>
      {invalidMessage ? (
        <p className="text-xs text-destructive" role="alert">
          {invalidMessage}
        </p>
      ) : null}
      {value ? (
        <span className="sr-only" aria-live="polite">
          Entered number {value}
        </span>
      ) : null}
    </div>
  );
}

export default PhoneField;
