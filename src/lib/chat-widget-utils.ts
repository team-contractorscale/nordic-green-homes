// Chat widget shared helpers and local types.

export type ChatType = "liveChat" | "emailChat";
export type Direction = "inbound" | "outbound" | "system";
export type Status = "pending" | "sent" | "failed";
export type Connection = "idle" | "connecting" | "connected" | "reconnecting" | "offline";

export type Field = {
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  dataType?: "TEXT" | "PHONE" | "EMAIL" | string;
};

export type Message = {
  id?: string;
  body?: string;
  direction?: Direction;
  status?: Status;
  dateAdded?: string;
  attachments?: string[];
};

export type Attachment = {
  id: string;
  name?: string;
  url?: string;
  status?: "uploading" | "uploaded" | "failed";
  progress?: number;
  error?: string;
};

export type ChatState = {
  config?: any;
  isOpen?: boolean;
  awaitingChatTypeSelection?: boolean;
  activeChatType?: ChatType | null;
  messages?: Message[];
  hasMoreHistory?: boolean;
  historyLoading?: boolean;
  agentTyping?: boolean;
  unreadCount?: number;
  canSend?: boolean;
  sendBlockedUntil?: string | null;
  captchaRequired?: boolean;
  captchaStatusMessage?: string;
  rateLimited?: boolean;
  connection?: Connection;
  showContactForm?: boolean;
  feedbackRequested?: boolean;
  feedbackSubmitted?: boolean;
  ended?: boolean;
  endedReason?: string | null;
  contactFormSubmitted?: boolean;
  requestState?: string;
  error?: { message?: string; field?: string; code?: string } | null;
  attachments?: Attachment[];
  detectedCountry?: string | null;
  detectedCountryResolved?: boolean;
};

export function mediaKind(u: string): "image" | "video" | "audio" | "file" {
  if (/\.(mp4|mov|webm)(\?|$)/i.test(u)) return "video";
  if (/\.(mp3|m4a|wav|ogg)(\?|$)/i.test(u)) return "audio";
  if (/\.(png|jpe?g|gif|webp|heic)(\?|$)/i.test(u)) return "image";
  return "file";
}

export function formatTime(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
