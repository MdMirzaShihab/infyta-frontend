import { useSyncExternalStore } from "react";

// false on the server and during hydration, true once the browser has taken over.
const noSubscription = () => () => {};
export const useHydrated = () => useSyncExternalStore(noSubscription, () => true, () => false);
