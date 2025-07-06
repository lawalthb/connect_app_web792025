import { API_URL } from '@/components/Utils/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      setUser: (data) => set({ user: data }),
      clearUser: () => set({ user: null }),
      setLoading: (isLoading) => set({ loading: isLoading }),

      refreshUser: async () => {
        set({ loading: true });
        try {
          const res = await fetch(`${API_URL}/user`);
          if (!res.ok) throw new Error('Failed to fetch user');

          const data = await res.json();
          set({ user: data.user, loading: false });
        } catch (err) {
          console.error('Refresh user failed:', err);
          set({ user: null, loading: false });
        }
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

export default useUserStore;
