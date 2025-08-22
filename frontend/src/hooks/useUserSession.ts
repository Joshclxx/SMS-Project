import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserRole = "masterAdmin" | "student" | null;

type UserAccount = {
  userId: string | null;
  userRole: UserRole;
  userEmail: string | null;
  loggedIn: boolean;
  sessionId: number | null;
  setUser: (
    id: string,
    role: UserRole,
    email: string,
    sessionId: number | null
  ) => void;
  logout: () => void;
};

const INITIAL_STATE: Omit<UserAccount, "setUser" | "logout"> = {
  userId: null,
  userRole: null,
  userEmail: null,
  loggedIn: false,
  sessionId: null,
};

export const useUserSession = create<UserAccount>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setUser: (id, role, email, sessionId) =>
        set({
          userId: id,
          userRole: role,
          userEmail: email,
          loggedIn: true,
          sessionId,
        }),
      logout: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: "user-session",
      // Safe on SSR: falls back to in-memory until browser is available
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
      version: 1,
      // (optional) migrate older shapes here if needed
    }
  )
);

// Handy selectors
export const useIsLoggedIn = () => useUserSession((s) => s.loggedIn);
export const useUserRole = () => useUserSession((s) => s.userRole);
export const useLogout = () => useUserSession((s) => s.logout);
