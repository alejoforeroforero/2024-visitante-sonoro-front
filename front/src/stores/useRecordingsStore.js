import { create } from 'zustand';
import { visitanteApi } from '@/api/visitante.api';

export const useRecordingsStore = create((set) => ({
  recordings: [],
  recordDetails: {},
  category: null,
  error: null,
  status: 'idle',

  fetchRecordings: async (options = {}) => {
    set({ status: 'loading' });
    try {
      const res = await visitanteApi.get('/v1/recordings/', { params: options });
      set({ status: 'succeeded', recordings: res.data.results });
    } catch (error) {
      set({ status: 'failed', error: error.response?.data });
    }
  },

  fetchRecordingsByCategory: async (options = {}) => {
    set({ status: 'loading' });
    try {
      const res = await visitanteApi.get(`/v1/category/?category=${options.category}`, {
        params: options,
      });
      set({ status: 'succeeded', recordings: res.data.results });
    } catch (error) {
      set({ status: 'failed', error: error.response?.data });
    }
  },

  fetchRecordDetails: async (id) => {
    set({ status: 'loading' });
    try {
      const res = await visitanteApi.get(`/v1/recordings/${id}/`);
      set({ status: 'succeeded', recordDetails: res.data });
    } catch (error) {
      set({ status: 'failed', error: error.response?.data });
    }
  },

  fetchCategory: async (id) => {
    set({ status: 'loading' });
    try {
      const res = await visitanteApi.get(`/v1/categories/${id}/`);
      set({ status: 'succeeded', category: res.data });
    } catch (error) {
      set({ status: 'failed', error: error.response?.data });
    }
  },

  clearRecordDetails: () => set({ recordDetails: {} }),
}));
