import { create } from 'zustand';

export const useCountryStore = create((set) => ({
  selectedCountry: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),
}));
