import { create } from 'zustand';
import { visitanteApi } from '@/api/visitante.api';

export const useAuthorsStore = create((set) => ({
  authors: [],
  authorDetails: {},
  error: null,
  status: 'idle',

  fetchAuthors: async (options = {}) => {
    set({ status: 'loading' });
    try {
      const res = await visitanteApi.get('/v1/authors/', { params: options });
      set({ status: 'succeeded', authors: res.data.results });
    } catch (error) {
      set({ status: 'failed', error: error.response?.data });
    }
  },

  fetchAuthorDetails: async (id) => {
    set({ status: 'loading' });
    try {
      const res = await visitanteApi.get(`/v1/authors/${id}/`);
      set({ status: 'succeeded', authorDetails: res.data });
    } catch (error) {
      set({ status: 'failed', error: error.response?.data });
    }
  },

  clearAuthorDetails: () => set({ authorDetails: {} }),
}));
