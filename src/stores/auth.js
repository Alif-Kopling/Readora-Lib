import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/endpoints/authService';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      role: null, // 'admin' or 'user'/'siswa'
      isAuthenticated: false,
      loading: false,
      error: null,

      // Actions
      /**
       * Login user with email and password
       * @param {string} email - User email
       * @param {string} password - User password
       * @returns {Promise<{success: boolean, error?: string}>}
       */
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await authService.login(email, password);
          const userData = response.data.user;

          set({
            user: userData,
            token: response.data.token,
            role: userData.role?.toLowerCase() === 'admin' ? 'admin' : 'siswa',
            isAuthenticated: true,
            loading: false,
          });

          return { success: true };
        } catch (error) {
          console.error('Login error:', error);
          const errorMessage = error?.message || error?.response?.data?.message || 'Login failed';
          set({
            error: errorMessage,
            loading: false,
          });
          return { success: false, error: errorMessage };
        }
      },

      /**
       * Register new user
       * @param {string} nama - Full name
       * @param {string} email - Email
       * @param {string} password - Password
       * @param {string} role - Role: 'USER' or 'ADMIN'
       * @returns {Promise<{success: boolean, error?: string}>}
       */
      register: async (nama, email, password, role = 'USER') => {
        set({ loading: true, error: null });
        try {
          await authService.register(nama, email, password, role);
          set({ loading: false });
          return { success: true };
        } catch (error) {
          set({
            error: error.message || 'Registration failed',
            loading: false,
          });
          return { success: false, error: error.message };
        }
      },

      /**
       * Logout user - clear all auth data
       */
      logout: () => {
        authService.logout();
        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false,
          error: null,
        });
      },

      /**
       * Load user profile from API
       * Called on app initialization to restore session
       */
      loadProfile: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        try {
          const response = await authService.getProfile();
          const userData = response.data;
          set({
            user: userData,
            role: userData.role?.toLowerCase() === 'admin' ? 'admin' : 'siswa',
            isAuthenticated: true,
          });
        } catch (error) {
          // Token invalid or expired, logout
          get().logout();
        }
      },

      /**
       * Update user data
       * @param {Object} userData - Updated user data
       */
      updateUser: (userData) => {
        set({ user: userData });
      },

      // Getters
      getUser: () => get().user,
      getToken: () => get().token,
      getRole: () => get().role,
      isAdmin: () => get().role === 'admin',
      isSiswa: () => get().role === 'siswa' || get().role === 'user',
    }),
    {
      name: 'auth-storage', // localStorage key
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
