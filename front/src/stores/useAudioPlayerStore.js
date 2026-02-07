import { create } from 'zustand';

export const useAudioPlayerStore = create((set) => ({
  title: 'Cancion default',
  audioSrc: '',
  recordDetails: {},
  isPlaying: false,
  mode: '',
  error: null,
  status: 'idle',

  changeAudio: (recordDetails) => set({ recordDetails }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  changeMode: (mode) => set({ mode }),
}));
