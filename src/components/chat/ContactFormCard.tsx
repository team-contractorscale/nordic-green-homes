import { Send, Loader2 } from "lucide-react";
import { CountryCode } from "libphonenumber-js";
import { PhoneField } from "./PhoneField";
import { CHAT_LOCALE_REGION, CHAT_COPY } from "@/lib/chat-widget-copy";
import type { Field } from "@/lib/chat-widget-utils";

export function ContactFormCard({
  fields,
  compliance,
  formValues,
  setFormValues,
  consentGiven,
  setConsentGiven,
  submitting,
  submitError,
  formErrors,
  stateError,
  invalidPhoneField,
  detectedCountry,
  onSubmit,
  variant = "inline",
}: {
  fields: Field[];
  compliance: any;
  formValues: Record<string, string>;
  setFormValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  consentGiven: boolean;
  setConsentGiven: React.Dispatch<React.SetStateAction<boolean>>;
  submitting: boolean;
  submitError: string | null;
  formErrors: string[] | null;
  stateError?: string | null | undefined;
  invalidPhoneField?: string | undefined;
  detectedCountry?: CountryCode | null | undefined;
  onSubmit: (e: React.FormEvent) => void;
  variant?: "inline" | "card";
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={
        variant === "card"
          ? "flex flex-col gap-3"
          : "flex min-h-0 flex-1 flex-col overflow-y-auto p-5"
      }
    >
      {variant === "inline" ? (
        <p className="mb-4 text-sm text-muted-foreground">
          Leave your details and we'll reply by email.
        </p>
      ) : (
        <p className="text-sm font-semibold text-foreground">{CHAT_COPY.contactFormTitle}</p>
      )}

      <div className={variant === "card" ? "flex flex-col gap-3" : "flex flex-col gap-3.5"}>
        {fields.map((f) => (
          <div key={f.value} className="space-y-1">
            <label
              htmlFor={`${variant}-field-${f.value}`}
              className="text-xs font-medium text-foreground"
            >
              {f.label ?? f.value}
              {f.required ? <span className="text-destructive"> *</span> : null}
            </label>
            {f.dataType === "PHONE" ? (
              <div className="relative">
                <PhoneField
                  field={f}
                  value={formValues[f.value] ?? ""}
                  onChange={(k, v) => setFormValues((prev) => ({ ...prev, [k]: v }))}
                  detectedCountry={detectedCountry}
                  localeRegion={CHAT_LOCALE_REGION}
                  invalidMessage={
                    invalidPhoneField && f.value === (stateError as any)
                      ? invalidPhoneField
                      : undefined
                  }
                />
              </div>
            ) : f.dataType === "TEXTAREA" ? (
              <textarea
                id={`${variant}-field-${f.value}`}
                name={f.value}
                placeholder={f.placeholder}
                required={f.required}
                value={formValues[f.value] ?? ""}
                onChange={(e) => setFormValues((prev) => ({ ...prev, [f.value]: e.target.value }))}
                rows={variant === "card" ? 2 : 3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-2 focus:ring-ring"
              />
            ) : (
              <input
                id={`${variant}-field-${f.value}`}
                type={f.dataType === "EMAIL" ? "email" : "text"}
                name={f.value}
                placeholder={f.placeholder}
                required={f.required}
                value={formValues[f.value] ?? ""}
                onChange={(e) => setFormValues((prev) => ({ ...prev, [f.value]: e.target.value }))}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-2 focus:ring-ring"
              />
            )}
          </div>
        ))}
      </div>

      {compliance?.showConsentCheckbox ? (
        <label className="mt-4 flex items-start gap-2.5 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-ring"
          />
          <span>{compliance?.consentText}</span>
        </label>
      ) : null}

      {formErrors ? (
        <div className="mt-3 rounded-md border border-destructive/40 bg-destructive/10 p-2.5">
          <p className="text-xs font-medium text-destructive">
            {CHAT_COPY.contactFormRequiredMissingLabel}
          </p>
          <ul className="mt-1 list-disc pl-4 text-xs text-destructive">
            {formErrors.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {submitError ? (
        <p className="mt-3 text-xs text-destructive" role="alert">
          {submitError}
        </p>
      ) : null}
      {stateError ? (
        <p className="mt-3 text-xs text-destructive" role="alert">
          {stateError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className={
          variant === "card"
            ? "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            : "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        }
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {CHAT_COPY.contactFormSubmittingLabel}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {CHAT_COPY.contactFormSubmitLabel}
          </>
        )}
      </button>
    </form>
  );
}
