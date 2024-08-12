import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  signup,
  signout,
  getUserInfo,
  saveFavorite,
  deleteFavorite,
} from "./userActions";

import axios from "axios";

const initialState = {
  firstClick: false,
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
    setFirstClick: (state, action) => {
      state.firstClick = action.payload;
    },
    authUser: (state, action) => {
      state.isAuthorized = action.payload;
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
        state.status = "succeeded";
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
          state.status = "succeeded";
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
          state.data = null;
          state.isAuthorized = false;
        })
        .addCase(signout.rejected, (state, action) => {
          state.loading = false;
          state.user = null;
          state.error = action.payload;
        }),
      builder
        .addCase(saveFavorite.pending, (state) => {
          state.status = "loading";
        })
        .addCase(saveFavorite.fulfilled, (state, action) => {
          state.status = "succeeded";
        })
        .addCase(saveFavorite.rejected, (state, action) => {
          state.status = "failed";
        }),
      builder
        .addCase(deleteFavorite.pending, (state) => {
          state.status = "loading";
        })
        .addCase(deleteFavorite.fulfilled, (state, action) => {
          state.status = "succeeded";
        })
        .addCase(deleteFavorite.rejected, (state, action) => {
          state.status = "failed";
        });
  },
});

export const { changeMode, autoSignin, authUser, setFirstClick } =
  userSlice.actions;
export default userSlice.reducer;
