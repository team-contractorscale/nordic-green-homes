import { useEffect, useRef } from "react";
import { Loader2, ArrowLeft, AlertTriangle } from "lucide-react";
import { formatTime, mediaKind, type ChatState } from "@/lib/chat-widget-utils";

function AttachmentBubble({ url }: { url: string }) {
  const k = mediaKind(url);
  if (k === "image") {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <img
          src={url}
          alt="Attachment"
          loading="lazy"
          className="max-w-full max-h-48 rounded-lg object-cover border border-black/10"
        />
      </a>
    );
  }
  if (k === "video") return <video src={url} controls className="max-w-full max-h-48 rounded-lg" />;
  if (k === "audio") return <audio src={url} controls className="max-w-full rounded-lg" />;
  const name = url.split("/").pop()?.split("?")[0] ?? "Attachment";
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm underline break-all text-primary"
    >
      {name}
    </a>
  );
}

export function ChatTranscript({
  state,
  scrollRef,
  onScroll,
  loadOlder,
}: {
  state: ChatState;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  loadOlder: () => void;
}) {
  const touchedRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (!touchedRef.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [state.messages, state.agentTyping, state.activeChatType, scrollRef]);

  return (
    <div
      ref={scrollRef}
      onScroll={(e) => {
        const el = e.currentTarget;
        const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
        touchedRef.current = !nearBottom;
        onScroll();
      }}
      className="min-h-0 flex-1 overflow-y-auto bg-background/40 p-4"
    >
      {state.hasMoreHistory ? (
        <div className="mb-3 flex justify-center">
          <button
            type="button"
            onClick={loadOlder}
            disabled={state.historyLoading}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-60"
          >
            {state.historyLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ArrowLeft className="h-3.5 w-3.5" />
            )}
            Load earlier messages
          </button>
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        {(state.messages ?? []).map((m, i) => {
          const isOut = m.direction === "outbound";
          const isSystem = m.direction === "system";
          if (isSystem) {
            return (
              <div
                key={m.id ?? i}
                className="mx-auto max-w-[80%] rounded-full bg-muted px-3 py-1 text-center text-[11px] text-muted-foreground"
              >
                {m.body}
                {formatTime(m.dateAdded) ? (
                  <span className="ml-1.5 opacity-70">{formatTime(m.dateAdded)}</span>
                ) : null}
              </div>
            );
          }
          return (
            <div key={m.id ?? i} className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                  isOut
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm border border-border bg-card text-foreground"
                } ${m.status === "pending" ? "opacity-60" : ""} ${
                  m.status === "failed" ? "ring-1 ring-destructive" : ""
                }`}
              >
                {m.body ? <p className="whitespace-pre-wrap break-words">{m.body}</p> : null}
                {m.attachments?.length ? (
                  <div
                    className={`mt-2 flex flex-col gap-1.5 ${
                      m.body ? "border-t border-black/10 pt-2" : ""
                    }`}
                  >
                    {m.attachments.map((url, ai) => (
                      <AttachmentBubble key={ai} url={url} />
                    ))}
                  </div>
                ) : null}
                <div
                  className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                    isOut ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {m.status === "pending" ? (
                    <span className="inline-flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Sending…
                    </span>
                  ) : m.status === "failed" ? (
                    <span className="inline-flex items-center gap-1 text-destructive">
                      <AlertTriangle className="h-3 w-3" />
                      Failed — tap to retry
                    </span>
                  ) : (
                    formatTime(m.dateAdded)
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {state.agentTyping ? (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border bg-card px-3 py-2">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
