import { create } from "zustand";

export const useRoomPasswordModalStore = create<{
  roomId: string | null;
  setRoomId: (id: string | null) => void;
}>(
  (set) => ({
    roomId: null,
    setRoomId: (roomId) => set({ roomId }),
  }),
);
