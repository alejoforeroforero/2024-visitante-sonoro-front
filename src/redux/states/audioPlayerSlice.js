import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Cancion default",
  audioSrc: "",
  recordDetails: {},
  isPlaying: true,
  mode: "",
  error: null,
  status: "idle",
};

const audioPlayerSlice = createSlice({
  name: "audioPlayerSlice",
  initialState,
  reducers: {
    changeAudio: (state, action) => {
      state.recordDetails = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { changeAudio, changeMode, setIsPlaying } =
  audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
