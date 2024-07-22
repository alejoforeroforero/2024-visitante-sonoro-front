import { configureStore } from "@reduxjs/toolkit";
import recordingsSlice from "./states/recordingsSlice";
import authorsSlice from "./states/authorsSlice";
import audioSlice from "./states/audioPlayerSlice";
import userSlice from "./states/userSlice";

const store = configureStore({
  reducer: {
    recordings: recordingsSlice,
    authors: authorsSlice,
    audio: audioSlice,
    user:userSlice
  },
});

export default store;