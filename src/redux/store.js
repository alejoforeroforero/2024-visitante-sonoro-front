import { configureStore } from "@reduxjs/toolkit";
import recordingsSlice from "./states/recordingsSlice";
import authorsSlice from "./states/authorsSlice";
import audioSlice from "./states/audioPlayerSlice";

export default configureStore({
  reducer: {
    recordings: recordingsSlice,
    authors: authorsSlice,
    audio: audioSlice,
  },
});
