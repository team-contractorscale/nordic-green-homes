import { useCallback, useEffect, useRef, useState } from "react";
import { X, MessageSquare, AlertTriangle, RotateCcw, Send, Wifi, WifiOff } from "lucide-react";
import { CHAT_WIDGET_CONFIG } from "@/lib/chat-widget-config";
import { CHAT_COPY, CHAT_LOCALE_REGION } from "@/lib/chat-widget-copy";
import { loadChatCore } from "@/lib/chat-core";
import type { ChatState } from "@/lib/chat-widget-utils";
import { ChatTranscript } from "./ChatTranscript";
import { ContactFormCard } from "./ContactFormCard";
import { ChatComposer } from "./ChatComposer";
import { FeedbackCard, FeedbackSubmittedCard, EndedCard, EmailThankYou } from "./ChatCards";

let client: any = null;
let clientReady = false;

export function ChatWidget() {
  const [state, setState] = useState<ChatState>({});
  const [text, setText] = useState("");
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<string[] | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const openIntentRef = useRef(false);

  const open = useCallback(() => {
    if (!client) {
      openIntentRef.current = true;
      return;
    }
    try {
      client?.setPanelOpen?.(true);
      Promise.resolve(client?.open?.()).catch((e: unknown) => {
        console.error("[chat-core] open() failed", e);
        setClientError(String((e as Error)?.message ?? e));
      });
    } catch (e) {
      console.error("[chat-core] open() threw", e);
      setClientError(String((e as Error)?.message ?? e));
    }
  }, []);

  const close = useCallback(() => {
    try {
      client?.setPanelOpen?.(false);
      client?.close?.();
    } catch (e) {
      console.error("[chat-core] close() failed", e);
    }
  }, []);

  const subscribe = useCallback(async () => {
    if (client) return;
    try {
      const mod = await loadChatCore(CHAT_WIDGET_CONFIG.coreUrl);
      const createChatClient = mod?.createChatClient;
      if (typeof createChatClient !== "function") {
        throw new Error("Chat core did not export createChatClient");
      }
      client = createChatClient({
        locationId: CHAT_WIDGET_CONFIG.locationId,
        widgetId: CHAT_WIDGET_CONFIG.chatWidgetId,
        marketplaceUrl: CHAT_WIDGET_CONFIG.marketplaceUrl,
        source: CHAT_WIDGET_CONFIG.source,
      });
      clientReady = true;
      client.subscribe((s: ChatState) => {
        setState(s ?? {});
        if (s?.error?.message) console.error("[chat-core] state error", s.error);
      });
      if (openIntentRef.current) {
        openIntentRef.current = false;
        open();
      }
    } catch (e) {
      console.error("[chat-core] setup failed", e);
      setClientError(String((e as Error)?.message ?? e));
    }
  }, [open]);

  useEffect(() => {
    void subscribe();
    return () => {
      try {
        client?.unsubscribe?.();
        client?.close?.();
      } catch {
        /* ignore */
      }
      client = null;
      clientReady = false;
    };
  }, [subscribe]);

  useEffect(() => {
    if (anchorRef.current && clientReady) {
      try {
        client?.setCaptchaAnchor?.(anchorRef.current);
      } catch {
        /* ignore */
      }
    }
  }, [state.isOpen, clientReady]);

  const loadOlder = useCallback(() => {
    if (state.hasMoreHistory && !state.historyLoading) {
      const el = scrollRef.current;
      const prevHeight = el?.scrollHeight ?? 0;
      client?.loadOlderMessages?.();
      requestAnimationFrame(() => {
        if (el) el.scrollTop = el.scrollHeight - prevHeight;
      });
    }
  }, [state.hasMoreHistory, state.historyLoading]);

  const send = useCallback(
    async (content: string, attachments?: string[]) => {
      if (!client || !state.canSend) return;
      const trimmed = content.trim();
      const ready = attachments ?? [];
      if ((state.attachments ?? []).some((a) => a.status === "uploading")) return;
      if (!trimmed && ready.length === 0) return;
      setText("");
      setShowQuickReplies(false);
      try {
        await client.sendMessage?.({ text: trimmed, attachments: ready });
      } catch (e) {
        console.error("[chat-core] sendMessage failed", e);
      }
    },
    [state.canSend, state.attachments],
  );

  const handleQuickReply = useCallback(
    (qr: { message: string }) => {
      if (!client) {
        openIntentRef.current = true;
        void subscribe();
        return;
      }
      open();
      setTimeout(() => void send(qr.message), 60);
    },
    [open, send, subscribe],
  );

  const onFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    for (const f of files) client?.uploadAttachment?.(f);
  }, []);

  const removeAttachment = useCallback((id: string) => {
    client?.removeAttachment?.(id);
  }, []);

  const submitForm = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!client) return;
      const fields = state.config?.contactForm?.fields ?? [];
      const missing: string[] = [];
      for (const f of fields) {
        if (f.required && !formValues[f.value]?.trim()) missing.push(f.label ?? f.value);
      }
      const consentRequired = state.config?.compliance?.consentRequired;
      if (consentRequired && !consentGiven) {
        setFormErrors(null);
        setSubmitError(CHAT_COPY.consentMissingLabel);
        return;
      }
      if (missing.length) {
        setFormErrors(missing);
        setSubmitError(null);
        return;
      }
      setFormErrors(null);
      setSubmitError(null);
      setSubmitting(true);
      try {
        const payload = Object.fromEntries(
          fields.map((f: any) => [f.value, formValues[f.value] ?? ""]),
        );
        await client.submitContactForm?.({ ...payload, consentGiven });
      } catch (err) {
        console.error("[chat-core] submitContactForm failed", err);
        setSubmitError(String((err as Error)?.message ?? err));
      } finally {
        setSubmitting(false);
      }
    },
    [client, state.config, formValues, consentGiven],
  );

  const restart = useCallback(() => {
    try {
      client?.restartConversation?.();
    } catch (e) {
      console.error("[chat-core] restart failed", e);
    }
  }, []);

  const sendFeedback = useCallback((kind: "positive" | "negative") => {
    try {
      client?.sendFeedback?.(kind);
    } catch (e) {
      console.error("[chat-core] sendFeedback failed", e);
    }
  }, []);

  const setActiveType = useCallback((t: "liveChat" | "emailChat" | null) => {
    try {
      client?.setActiveChatType?.(t);
    } catch (e) {
      console.error("[chat-core] setActiveChatType failed", e);
    }
  }, []);

  const isOpen = !!state.isOpen;
  const isLive = state.activeChatType === "liveChat";
  const isEmail = state.activeChatType === "emailChat";
  const fields = state.config?.contactForm?.fields ?? [];
  const compliance = state.config?.compliance ?? {};
  const invalidPhoneField =
    state.error?.field === "invalid_phone" ? state.error?.message : undefined;

  const hasFirstMessage = (state.messages ?? []).some(
    (m) => m.direction === "inbound" || m.direction === "outbound",
  );
  const showQuickRepliesNow =
    isLive &&
    !hasFirstMessage &&
    showQuickReplies &&
    CHAT_COPY.quickReplies.length > 0 &&
    !state.ended;

  const showCard =
    state.showContactForm || state.feedbackRequested || state.feedbackSubmitted || state.ended;

  const connectionLine =
    state.connection === "reconnecting"
      ? CHAT_COPY.reconnectingLabel
      : state.connection === "offline"
        ? CHAT_COPY.offlineLabel
        : null;

  const stateErrorLine = state.error?.message
    ? state.error.message
    : state.rateLimited
      ? CHAT_COPY.rateLimitedLabel
      : null;

  const captchaLine = state.captchaRequired
    ? (state.captchaStatusMessage ?? "Please complete the verification to continue.")
    : null;

  const onScroll = useCallback(() => {
    /* scroll preserve handled inside ChatTranscript */
  }, []);

  return (
    <div className="font-sans">
      {/* Launcher */}
      <button
        type="button"
        onClick={() => {
          setShowQuickReplies(true);
          if (!client) {
            openIntentRef.current = true;
            void subscribe();
            return;
          }
          if (isOpen) close();
          else open();
        }}
        aria-label={CHAT_COPY.ariaLauncher}
        aria-expanded={isOpen}
        className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-black/5 transition-all hover:scale-105 hover:bg-primary/90 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 lg:bottom-6 lg:right-6"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {state.unreadCount ? (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[11px] font-semibold text-destructive-foreground">
            {state.unreadCount}
          </span>
        ) : null}
      </button>

      {/* Teaser bubble */}
      {!isOpen && !clientError ? (
        <div className="fixed bottom-24 right-5 z-40 hidden max-w-[15rem] rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-lg lg:block lg:right-6">
          <p className="text-xs leading-snug">{CHAT_COPY.teaser}</p>
        </div>
      ) : null}

      {/* Panel */}
      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={CHAT_COPY.ariaOpenPanel}
          className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl lg:right-6"
          style={{ height: "min(640px, 100dvh - 7rem)" }}
        >
          <div ref={anchorRef} className="contents" aria-hidden="true" />

          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/15">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="font-serif text-base font-semibold leading-tight">
                  {CHAT_COPY.heading}
                </p>
                <p className="text-[11px] text-primary-foreground/80">Nordic Green Homes</p>
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={CHAT_COPY.ariaClose}
              className="rounded-md p-1.5 hover:bg-primary-foreground/15 focus:outline-hidden focus:ring-2 focus:ring-primary-foreground/40"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex min-h-0 flex-1 flex-col">
            {!state.config && !clientError ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">{CHAT_COPY.loadingLabel}</p>
              </div>
            ) : clientError ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <p className="text-sm text-muted-foreground">{clientError}</p>
                <button
                  type="button"
                  onClick={() => {
                    setClientError(null);
                    open();
                  }}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <RotateCcw className="h-4 w-4" />
                  Retry
                </button>
              </div>
            ) : state.awaitingChatTypeSelection ? (
              <div className="flex flex-1 flex-col gap-4 p-6">
                <p className="text-sm text-muted-foreground">
                  How would you like to connect with us?
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveType("liveChat")}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background p-3.5 text-left hover:border-primary hover:bg-muted transition-colors"
                  >
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Live chat</p>
                      <p className="text-xs text-muted-foreground">Chat with us right now</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveType("emailChat")}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background p-3.5 text-left hover:border-primary hover:bg-muted transition-colors"
                  >
                    <Send className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Email / SMS</p>
                      <p className="text-xs text-muted-foreground">
                        Send a message and we'll reply
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            ) : isEmail ? (
              state.contactFormSubmitted ? (
                <EmailThankYou />
              ) : (
                <ContactFormCard
                  fields={fields}
                  compliance={compliance}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  consentGiven={consentGiven}
                  setConsentGiven={setConsentGiven}
                  submitting={submitting}
                  submitError={submitError}
                  formErrors={formErrors}
                  stateError={state.error?.message}
                  invalidPhoneField={invalidPhoneField}
                  detectedCountry={(state.detectedCountry as never) ?? null}
                  onSubmit={submitForm}
                  variant="inline"
                />
              )
            ) : isLive ? (
              <>
                <ChatTranscript
                  state={state}
                  scrollRef={scrollRef}
                  onScroll={onScroll}
                  loadOlder={loadOlder}
                />

                {connectionLine ? (
                  <div className="border-t border-border px-4 py-1.5 text-center text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      {state.connection === "offline" ? (
                        <WifiOff className="h-3.5 w-3.5" />
                      ) : (
                        <Wifi className="h-3.5 w-3.5" />
                      )}
                      {connectionLine}
                    </span>
                  </div>
                ) : null}
                {stateErrorLine ? (
                  <div className="border-t border-border bg-destructive/5 px-4 py-1.5 text-center text-[11px] text-destructive">
                    {stateErrorLine}
                  </div>
                ) : null}
                {captchaLine ? (
                  <div className="border-t border-border bg-primary/5 px-4 py-1.5 text-center text-[11px] text-primary">
                    {captchaLine}
                  </div>
                ) : null}

                {showQuickRepliesNow ? (
                  <div className="flex flex-wrap gap-2 px-4 pt-3">
                    {CHAT_COPY.quickReplies.map((qr) => (
                      <button
                        key={qr.label}
                        type="button"
                        onClick={() => handleQuickReply(qr)}
                        className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/15"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                ) : null}

                {showCard ? (
                  <div className="border-t border-border bg-muted/30 p-4">
                    {state.showContactForm ? (
                      <ContactFormCard
                        fields={fields}
                        compliance={compliance}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        consentGiven={consentGiven}
                        setConsentGiven={setConsentGiven}
                        submitting={submitting}
                        submitError={submitError}
                        formErrors={formErrors}
                        stateError={state.error?.message}
                        invalidPhoneField={invalidPhoneField}
                        detectedCountry={(state.detectedCountry as never) ?? null}
                        onSubmit={submitForm}
                        variant="card"
                      />
                    ) : state.feedbackRequested ? (
                      <FeedbackCard onFeedback={sendFeedback} />
                    ) : state.feedbackSubmitted ? (
                      <FeedbackSubmittedCard onRestart={restart} />
                    ) : state.ended ? (
                      <EndedCard endedReason={state.endedReason} onRestart={restart} />
                    ) : null}
                  </div>
                ) : null}

                {!showCard ? (
                  <ChatComposer
                    state={state}
                    text={text}
                    setText={setText}
                    onSend={() => {
                      const ready = (state.attachments ?? [])
                        .filter((a) => a.status === "uploaded")
                        .map((a) => a.url)
                        .filter(Boolean) as string[];
                      void send(text, ready);
                    }}
                    onFile={onFile}
                    fileRef={fileRef}
                    inputRef={inputRef}
                    removeAttachment={removeAttachment}
                  />
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ChatWidget;
