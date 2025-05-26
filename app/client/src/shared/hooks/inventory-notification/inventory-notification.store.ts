import { create } from "zustand";

export const useInventoryNotificationStore = create<{
  count: number;
  increment: (amount?: number) => void;
  reset: () => void;
}>((set) => ({
  count: 0,
  increment: (amount = 1) =>
    set((state) => ({ count: state.count + amount })),
  reset: () => set({ count: 0 }),
}));
