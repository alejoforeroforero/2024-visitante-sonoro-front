import { createSlice } from "@reduxjs/toolkit";
import { login, signup, signout } from "./userActions";

import axios from "axios";

const initialState = {
  info: null,
  token:null,
  isLogin: false,
  signingUp: true,
  error: null,
  message: "",
  status: "idle",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.signingUp = !state.signingUp;
    },
    autoSignin: (state, action) =>{
      state.token = localStorage.getItem('token')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.message = action.payload.data.message;
        state.status = action.payload.data.success;
        if (action.payload.data.success) {
          state.info = action.payload.data.user;
          state.token = action.payload.data.token;
          localStorage.setItem('token', action.payload.data.token);
        }
      })
      .addCase(signup.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
          return;
        }
        state.status = "Failed!";
        state.error = action.payload;
      }),
      builder
        .addCase(login.pending, (state) => {
          state.status = "Loading...";
        })
        .addCase(login.fulfilled, (state, action) => {
          state.message = action.payload.data.message;
          state.status = action.payload.data.success;
          if (action.payload.data.success) {
            state.info = action.payload.data.user;
            state.token = action.payload.data.token;
            localStorage.setItem('token', action.payload.data.token);
          }
        })
        .addCase(login.rejected, (state, action) => {
          if (axios.isCancel(action.payload)) {
            return;
          }
          state.status = "Failed!";
          state.error = action.payload;
        }),
      builder
        .addCase(signout.pending, (state) => {
          state.status = "Loading...";
        })
        .addCase(signout.fulfilled, (state, action) => {
          state.message = action.payload.data.message;
          state.status = action.payload.data.success;
          if (action.payload.data.success) {

            state.info = null;
            state.token = null;
            localStorage.removeItem('token');
          }
        })
        .addCase(signout.rejected, (state, action) => {
          if (axios.isCancel(action.payload)) {
            return;
          }
          state.status = "Failed!";
          state.error = action.payload;
        });
  },
});

export const { changeMode, autoSignin } = userSlice.actions;
export default userSlice.reducer;
