// zustandStore/useAdvertImageStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AddImageIcon from '@/Images/Icons/AddImageIcon.svg';

export const useAdvertImageStore = create(
  persist(
    (set) => ({
      advertImage: AddImageIcon,
      mediaType: null,
      error: null,
      setAdvertImage: (image) => set({ advertImage: image }),
      setMediaType: (type) => set({ mediaType: type }),
      setError: (errorMsg) => set({ error: errorMsg }),
      clearMediaState: () =>
        set({
          advertImage: null,
          mediaType: null,
          error: null,
        }),
    }),
    {
      name: 'advert-image-store',
    },
  ),
);
