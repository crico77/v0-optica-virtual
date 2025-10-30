"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  name: string
  email: string
  role: "user" | "admin"
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, role?: "user" | "admin") => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, password, role = "user") => {
        // Simulación de login
        const user: User = {
          name: email.split("@")[0],
          email,
          role,
        }
        set({ user, isAuthenticated: true })
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    },
  ),
)
