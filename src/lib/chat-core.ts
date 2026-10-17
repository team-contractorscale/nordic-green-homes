// Loads the headless chat core as a runtime ES module (not an npm dep).
// Cached per page so we create exactly one client.

let corePromise: Promise<any> | null = null;

export const loadChatCore = (url: string): Promise<any> =>
  (corePromise ??= import(/* @vite-ignore */ url));
