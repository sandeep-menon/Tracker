import { create } from "zustand";

type StatusState = {
    status: string;
    setStatus: (message: string) => void;
}

export const useStatusStore = create<StatusState>((set) => ({
    status: "Ready",
    setStatus: (message) => set({ status: message })
}));