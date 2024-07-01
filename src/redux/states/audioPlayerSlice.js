import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Cancion default",
  audioSrc: "http://127.0.0.1:8000/media/audio/Dominguito_toma_2.mp3",
  recordDetails: {},
  error: null,
  status: "idle",
};

const audioPlayerSlice = createSlice({
  name: "audioPlayerSlice",
  initialState,
  reducers: {
    changeAudio: (state, action) => {
      state.audioSrc = action.payload;
    },
  },
});

export const { changeAudio } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
