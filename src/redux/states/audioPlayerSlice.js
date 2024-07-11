import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Cancion default",
  audioSrc: "",
  recordDetails: {},
  error: null,
  status: "idle",
};

const audioPlayerSlice = createSlice({
  name: "audioPlayerSlice",
  initialState,
  reducers: {
    changeAudio: (state, action) => {
      //state.audioSrc = action.payload.audio;
      state.recordDetails = action.payload;
    },
  },
});

export const { changeAudio } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
