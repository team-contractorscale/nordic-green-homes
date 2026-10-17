import { Send, Plus, X, Loader2, Paperclip, AlertTriangle } from "lucide-react";
import { CHAT_COPY } from "@/lib/chat-widget-copy";
import type { ChatState } from "@/lib/chat-widget-utils";

export function ChatComposer({
  state,
  text,
  setText,
  onSend,
  onFile,
  fileRef,
  inputRef,
  removeAttachment,
}: {
  state: ChatState;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  removeAttachment: (id: string) => void;
}) {
  const attachmentsConfig: {
    enabled?: boolean;
    maxFiles?: number;
    acceptedTypes?: string[];
  } = state.config?.liveChat?.attachments ?? {};

  const uploading = (state.attachments ?? []).some((a) => a.status === "uploading");
  const canSendNow =
    !!state.canSend &&
    !uploading &&
    !state.captchaRequired &&
    !state.rateLimited &&
    Boolean(text.trim() || (state.attachments ?? []).some((a) => a.status === "uploaded"));

  return (
    <div className="border-t border-border bg-card p-3">
      {(state.attachments ?? []).length > 0 ? (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {(state.attachments ?? []).map((a) => (
            <span
              key={a.id}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2 py-1 text-[11px]"
            >
              {a.status === "uploading" ? (
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
              ) : a.status === "failed" ? (
                <AlertTriangle className="h-3 w-3 text-destructive" />
              ) : (
                <Paperclip className="h-3 w-3 text-muted-foreground" />
              )}
              <span className="max-w-24 truncate">
                {a.name ?? a.url?.split("/").pop() ?? "file"}
              </span>
              {a.status === "uploading" && a.progress != null ? (
                <span className="text-muted-foreground">{Math.round(a.progress * 100)}%</span>
              ) : null}
              {a.error ? <span className="text-destructive">{a.error}</span> : null}
              <button
                type="button"
                onClick={() => removeAttachment(a.id)}
                aria-label="Remove attachment"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="flex items-end gap-2"
      >
        {attachmentsConfig.enabled ? (
          <>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept={attachmentsConfig.acceptedTypes?.join(",") ?? undefined}
              onChange={onFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={
                (state.attachments ?? []).length >= (attachmentsConfig.maxFiles ?? Infinity)
              }
              aria-label={CHAT_COPY.attachLabel}
              className="shrink-0 rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
            >
              <Plus className="h-5 w-5" />
            </button>
          </>
        ) : null}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={CHAT_COPY.composerPlaceholder}
          disabled={state.captchaRequired || state.rateLimited}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-2 focus:ring-ring disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!canSendNow}
          aria-label={CHAT_COPY.sendLabel}
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
