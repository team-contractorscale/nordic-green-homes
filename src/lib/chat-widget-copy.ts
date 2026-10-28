// Chat widget presentation copy. The site owns the heading, teaser,
// quick replies, thank-you and labels; the widget record owns the
// in-thread welcome/feedback lines (rendered verbatim from core state).

export type ChatQuickReply = {
  label: string;
  message: string;
};

export const CHAT_COPY = {
  // Launcher teaser bubble (beside the closed launcher) + panel heading
  heading: "Have a question?",
  teaser: "Let's talk about your forever home.",

  // Quick replies shown before the first outbound/inbound message.
  quickReplies: [
    {
      label: "New Builds & Custom Homes",
      message: "I'd like to learn about new builds and custom homes.",
    },
    { label: "Garden Suites", message: "I'm interested in a garden suite." },
    { label: "Book a discovery call", message: "I'd like to book a discovery call." },
  ] as ChatQuickReply[],

  // Composer
  composerPlaceholder: "Type your message…",
  sendLabel: "Send",
  attachLabel: "Attach a file",
  retryLabel: "Retry",
  retrySendLabel: "Tap to retry",

  // Status / error
  loadingLabel: "Loading the conversation…",
  rateLimitedLabel: "You're sending messages a little too quickly. Please wait a moment.",
  reconnectingLabel: "Reconnecting…",
  offlineLabel: "You're offline. Messages will send when you're back online.",

  // Contact form card (live chat)
  contactFormTitle: "Your details",
  contactFormSubmitLabel: "Send",
  contactFormSubmittingLabel: "Sending…",
  contactFormRequiredMissingLabel: "Please complete the required fields:",
  consentMissingLabel: "Please accept the consent notice to continue.",

  // Email chat thank-you
  emailThankYouTitle: "Thanks — we'll be in touch",
  emailThankYouBody:
    "Your message has been received. A member of the Nordic Green Homes team will reply by email shortly.",

  // Ended / restart
  restartLabel: "Start a new conversation",
  endedDefaultLabel: "This conversation has ended. You can start a new one any time.",
  agentUnavailableLabel:
    "No one is available right now. Leave your details and we'll follow up as soon as we're back.",
  outsideOfficeHoursLabel:
    "We're currently outside our hours. Leave your details and we'll reach out during our next business day.",
  requestDetailsLabel: "Leave your details",

  // Feedback
  feedbackQuestionLabel: "How did we do?",
  feedbackPositiveLabel: "Good",
  feedbackNegativeLabel: "Could be better",
  feedbackSubmittedThanksLabel: "Thanks for the feedback.",
  feedbackRestartLabel: "Start a new conversation",

  // History
  loadOlderLabel: "Load earlier messages",
  historyLoadingLabel: "Loading…",

  // Misc
  ariaLauncher: "Open chat with Nordic Green Homes",
  ariaClose: "Close chat",
  ariaOpenPanel: "Chat panel",
};

// BC, Canada context for the phone field default.
export const CHAT_LOCALE_REGION = "CA" as const;
