import { configureStore } from "@reduxjs/toolkit";
import recordingsSlice from "./states/recordingsSlice";
import audioSlice from "./states/audioPlayerSlice";

export default configureStore({
    reducer: {
        recordings: recordingsSlice,
        audio:audioSlice
    }
})
