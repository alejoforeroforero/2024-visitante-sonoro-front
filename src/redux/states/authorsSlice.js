import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthors } from "./authorsActions";
import { fetchAuthorDetails } from "./authorsActions";
import axios from "axios";

const initialState = {
  title: "",
  description: "",
  authors: [],
  authorDetails: {},
  error: null,
  status: "idle",
};

const authorsSlice = createSlice({
  name: "authorsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.status = "Success";
        state.authors = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
          return;
        }
        state.status = "Failed!";
        state.error = action.payload;
      }),
      builder
        .addCase(fetchAuthorDetails.pending, (state) => {
          state.status = "Loading...";
        })
        .addCase(fetchAuthorDetails.fulfilled, (state, action) => {
          state.status = "Success";
          state.authorDetails = action.payload;
        })
        .addCase(fetchAuthorDetails.rejected, (state, action) => {
          if (axios.isCancel(action.payload)) {
            return;
          }
          state.status = "Failed!";
          state.error = action.payload;
        });
  },
});

export default authorsSlice.reducer;
