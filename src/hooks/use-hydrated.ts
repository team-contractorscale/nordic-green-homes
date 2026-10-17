import { useEffect, useState } from "react";

// Returns true only after the component has hydrated on the client.
// Use to gate browser-only side effects (e.g. lazy-loading a runtime
// chat core) so they never run during SSR.
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
