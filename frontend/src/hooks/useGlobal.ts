import { create } from "zustand";

interface GlobalState {
  name: string;
  setName: (name: string) => void;
}

export const useGlobal = create<GlobalState>((set) => ({
  name: "",
  setName: (name) => set({ name }),
}));
