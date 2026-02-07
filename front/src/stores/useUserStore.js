import { create } from 'zustand';
import { visitanteApi } from '@/api/visitante.api';

export const useUserStore = create((set, get) => ({
  data: null,
  isAuthorized: null,
  firstClick: false,
  googleUser: false,
  loading: false,
  error: null,
  status: 'idle',

  setFirstClick: (value) => set({ firstClick: value }),
  setAuthorized: (value) => set({ isAuthorized: value }),

  signup: async (userData, callback) => {
    set({ loading: true, error: null });
    try {
      const info = {
        username: userData.email,
        email: userData.email,
        password: userData.password,
      };
      const response = await visitanteApi.post('auth/register/', info);
      set({ loading: false, status: 'succeeded' });
      callback(false, response.data);
    } catch (error) {
      set({ loading: false, status: 'failed', error: error.response?.data });
      callback(true, error.response?.data);
    }
  },

  login: async (userData, callback) => {
    set({ loading: true, error: null });
    try {
      const response = await visitanteApi.post('auth/token/', userData);
      set({ loading: false, status: 'succeeded' });
      callback(false, response.data);
    } catch (error) {
      const data = error.response?.data?.message
        ? error.response.data
        : { message: 'La contraseña es incorrecta' };
      set({ loading: false, status: 'failed', error: data });
      callback(true, data);
    }
  },

  googleSignIn: async (token, callback) => {
    set({ loading: true, error: null });
    try {
      const response = await visitanteApi.post('auth/google-signin/', { token });
      set({ loading: false, status: 'succeeded', googleUser: true });
      callback(false, response.data);
    } catch (error) {
      const res = {
        message: error.response?.data?.error || 'Se produjo un inconveniente al iniciar sesión',
      };
      set({ loading: false, status: 'failed', error: res });
      callback(true, res);
    }
  },

  signout: async (callback) => {
    set({ loading: true });
    try {
      const res = await visitanteApi.post('auth/logout/');
      set({ loading: false, data: null, isAuthorized: false });
      callback(false, res.data);
    } catch (error) {
      set({ loading: false, data: null, isAuthorized: false, error: error.response?.data });
      callback(true, error.response?.data);
    }
  },

  getUserInfo: async () => {
    set({ loading: true, error: null });
    try {
      const response = await visitanteApi.get('auth/user/');
      set({ loading: false, status: 'succeeded', data: response.data?.data });
    } catch (error) {
      set({ loading: false, status: 'failed', error: error.response?.data });
      console.error('Error fetching user data:', error);
    }
  },

  updateUser: async (userData, callback) => {
    set({ loading: true });
    try {
      const response = await visitanteApi.put('auth/user/', userData);
      set({ loading: false, data: response.data?.data });
      callback(false, response.data);
    } catch (error) {
      set({ loading: false, error: error.response?.data });
      callback(true, error);
    }
  },

  saveFavorite: async (recordId, callback) => {
    set({ loading: true });
    try {
      const response = await visitanteApi.post('auth/favorites/', { record_id: recordId });
      set({ loading: false, status: 'succeeded' });
      callback(false, response);
    } catch (error) {
      set({ loading: false, status: 'failed' });
      callback(true, { message: 'Error al guardar favorito' });
    }
  },

  deleteFavorite: async (recordId, callback) => {
    set({ loading: true });
    try {
      const response = await visitanteApi.delete('auth/favorites/', {
        data: { record_id: recordId },
      });
      set({ loading: false, status: 'succeeded' });
      callback(false, response);
    } catch (error) {
      set({ loading: false, status: 'failed' });
      callback(true, { message: 'Error al eliminar favorito' });
    }
  },

  uploadProfileImage: async (file, callback) => {
    set({ loading: true });
    try {
      const formData = new FormData();
      formData.append('profile_picture', file);
      const response = await visitanteApi.post('auth/update-profile-picture/', formData);
      set({ loading: false, data: { ...get().data, profile_picture: response.data?.data?.profile_picture } });
      callback(false, response.data);
    } catch (error) {
      set({ loading: false });
      callback(true, { message: 'Error al subir imagen' });
    }
  },
}));
