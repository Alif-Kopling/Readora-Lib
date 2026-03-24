import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Auth Store - Menyimpan state autentikasi user
 * Menggunakan Zustand untuk state management
 */
const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            token: null,
            role: null, // 'admin' atau 'siswa'
            isAuthenticated: false,

            // Actions
            login: (userData, token) => {
                set({
                    user: userData,
                    token: token,
                    role: userData.role,
                    isAuthenticated: true,
                });
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    role: null,
                    isAuthenticated: false,
                });
            },

            updateUser: (userData) => {
                set({ user: userData });
            },

            // Getters
            getUser: () => get().user,
            getToken: () => get().token,
            getRole: () => get().role,
            isAdmin: () => get().role === 'admin',
            isSiswa: () => get().role === 'siswa',
        }),
        {
            name: 'auth-storage', // nama key di localStorage
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;
