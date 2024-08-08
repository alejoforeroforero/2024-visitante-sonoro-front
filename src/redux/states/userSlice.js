import { createSlice } from "@reduxjs/toolkit";
import { login, signup, signout, getUserInfo } from "./userActions";

import axios from "axios";

const initialState = {
  firstClick:false,
  data: null,
  googleUser: false,
  isAuthorized: null,
  loading: false,
  error: null,
  successMessage: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.signingUp = !state.signingUp;
    },
    setFirstClick:(state, action) =>{
      state.firstClick = action.payload;
    },
    authUser: (state, action) => {
      state.isAuthorized = action.payload;
      if(!action.payload){
        state.data = null;
      }
    },
    autoSignin: (state, action) => {
      state.token = localStorage.getItem("token");
    },
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
          localStorage.setItem("token", action.payload.data.token);
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
          // if(action.payload.success){
          //   state.isAuthorized = true;
          // } 
        })
        .addCase(login.rejected, (state, action) => {
          if (axios.isCancel(action.payload)) {
            return;
          }
          state.status = "Failed!";
          state.error = action.payload;
        }),
      builder
        .addCase(getUserInfo.pending, (state) => {
          state.status = "loading";
        })
        .addCase(getUserInfo.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.data = action.payload?.data;
        })
        .addCase(getUserInfo.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }),
      builder
        .addCase(signout.pending, (state) => {
          state.loading = true;
        })
        .addCase(signout.fulfilled, (state) => {
          state.loading = false;
          state.user = null;
          state.successMessage = "Logout successful!";
        })
        .addCase(signout.rejected, (state, action) => {
          state.loading = false;
          state.user = null;
          state.error = action.payload;
        });
  },
});

export const { changeMode, autoSignin, authUser, setFirstClick } = userSlice.actions;
export default userSlice.reducer;
