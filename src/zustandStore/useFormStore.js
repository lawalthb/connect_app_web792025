import { create } from 'zustand';

const useFormStore = create((set) => ({
  formData: {},
  setFormData: (data) => set({ formData: data }),
  resetFormData: () => set({ formData: {} }),
}));

export default useFormStore;
