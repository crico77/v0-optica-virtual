"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { api } from "./api-client"

interface User {
  id: string
  email: string
  full_name: string
  role: "user" | "admin"
  phone: string | null
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, full_name: string, phone?: string) => Promise<void>
  logout: () => void
  loadProfile: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.login(email, password)
          
          if (response.error) {
            set({ error: response.error, isLoading: false })
            throw new Error(response.error)
          }

          if (response.data) {
            const { token, user } = response.data
            if (typeof window !== 'undefined') {
              localStorage.setItem('auth-token', token)
            }
            set({
              user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                phone: user.phone,
              },
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Error al iniciar sesión',
            isLoading: false 
          })
          throw error
        }
      },

      register: async (email: string, password: string, full_name: string, phone?: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.register(email, password, full_name, phone)
          
          if (response.error) {
            set({ error: response.error, isLoading: false })
            throw new Error(response.error)
          }

          if (response.data) {
            const { token, user } = response.data
            if (typeof window !== 'undefined') {
              localStorage.setItem('auth-token', token)
            }
            set({
              user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                phone: user.phone,
              },
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Error al registrarse',
            isLoading: false 
          })
          throw error
        }
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-token')
        }
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          error: null,
        })
      },

      loadProfile: async () => {
        const token = get().token || (typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null)
        if (!token) return

        set({ isLoading: true, error: null })
        try {
          const response = await api.getProfile()
          
          if (response.error) {
            set({ error: response.error, isLoading: false, isAuthenticated: false })
            if (typeof window !== 'undefined') {
              localStorage.removeItem('auth-token')
            }
            return
          }

          if (response.data) {
            const user = response.data as any
            set({
              user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                phone: user.phone,
              },
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Error al cargar perfil',
            isLoading: false,
            isAuthenticated: false,
          })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
