import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecordings,
  fetchRecordDetails,
  fetchCategory,
  fetchRecordingsByCategory
} from "./recordingsActions";
import axios from "axios";

const initialState = {
  title: "Recordings",
  recordings: [],
  recordDetails: {},
  category: "jazz",
  error: null,
  status: "idle",
};

const recordingsSlice = createSlice({
  name: "recordingsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecordings.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(fetchRecordings.fulfilled, (state, action) => {
        state.status = "Success";
        state.recordings = action.payload;
      })
      .addCase(fetchRecordings.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
          return;
        }
        state.status = "Failed!";
        state.error = action.payload;
      }),
      builder
        .addCase(fetchRecordDetails.pending, (state) => {
          state.status = "Loading...";
        })
        .addCase(fetchRecordDetails.fulfilled, (state, action) => {
          state.status = "Success";
          state.recordDetails = action.payload;
        })
        .addCase(fetchRecordDetails.rejected, (state, action) => {
          if (axios.isCancel(action.payload)) {
            return;
          }
          state.status = "Failed!";
          state.error = action.payload;
        }),
        builder
        .addCase(fetchRecordingsByCategory.pending, (state) => {
          state.status = "Loading...";
        })
        .addCase(fetchRecordingsByCategory.fulfilled, (state, action) => {
          state.status = "Success";
          state.recordings = action.payload;
        })
        .addCase(fetchRecordingsByCategory.rejected, (state, action) => {
          if (axios.isCancel(action.payload)) {
            return;
          }
          state.status = "Failed!";
          state.error = action.payload;
        }),
      builder
        .addCase(fetchCategory.pending, (state) => {
          state.status = "Loading...";
        })
        .addCase(fetchCategory.fulfilled, (state, action) => {
          state.status = "Success";
          state.category = action.payload;
        })
        .addCase(fetchCategory.rejected, (state, action) => {
          if (axios.isCancel(action.payload)) {
            return;
          }
          state.status = "Failed!";
          state.error = action.payload;
        });
  },
});

export default recordingsSlice.reducer;
