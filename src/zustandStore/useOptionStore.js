import { create } from 'zustand';

export const useOptionStore = create((set) => ({
  selectedOptions: [],
  toggleOption: (option) =>
    set((state) => {
      const exists = state.selectedOptions.some(
        (item) => item.id === option.id,
      );
      const updated = exists
        ? state.selectedOptions.filter((item) => item.id !== option.id)
        : [...state.selectedOptions, { id: option.id, name: option.name }];
      return { selectedOptions: updated };
    }),
  resetOptions: () => set({ selectedOptions: [] }),
}));
