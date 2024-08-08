import { visitanteApi } from "@/api/visitante.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  try {
    const response = await visitanteApi.get("auth/user/");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
});

export const signup = createAsyncThunk(
  "visitante/signup",
  async (userData, { rejectWithValue }) => {
    const info = {
      username: userData.email,
      email: userData.email,
      password: userData.password,
    };

    try {
      const response = await visitanteApi.post("auth/register/", info, {
        withCredentials: true,
      });
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }
      alert(response.data.message);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk("visitante/login", async (dataObj) => {
  try {
    const response = await visitanteApi.post("auth/token/", dataObj.user, {
      withCredentials: true,
    });

    if (!response.data.success) {
      dataObj.callback(response);
    } else {
      dataObj.callback(response);
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async (data) => {
    const token = data.token;
    const response = await visitanteApi.post("auth/google-signin/", {
      token,
    });
    data.callback();
    return response.data;
  }
);

export const signout = createAsyncThunk(
  "visitante/signout",
  async (callback) => {
    try {
      const res = await visitanteApi.post("auth/logout/");
      callback(res);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (dataObj, { rejectWithValue }) => {
    try {
      const response = await visitanteApi.put("auth/user/", dataObj.data);
      dataObj.callback();
    } catch (error) {
      dataObj.callback(error);
    }
  }
);

export const saveFavorite = createAsyncThunk(
  "user/savefavorite",
  async (dataObj, { rejectWithValue }) => {
    try {
      const response = await visitanteApi.post("auth/favorites/", dataObj.data);
      dataObj.callback(false, response);
    } catch (error) {
      dataObj.callback(true, error);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "user/deleteFavorite",
  async (dataObj, { rejectWithValue }) => {
    try {
      const response = await visitanteApi.delete(`auth/favorites/`, {
        data: {
          record_id: dataObj.data["record_id"],
        },
      });
      dataObj.callback(false, response);
    } catch (error) {
      dataObj.callback(true, error);
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  "profile/uploadProfileImage",
  async (data, { getState, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profile_picture", data.file);

      const response = await visitanteApi.post(
        "auth/update-profile-picture/",
        formData
      );

      if (response.data && response.data.profile_picture) {
        //return response.data.profile_picture;
        data.callback();
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        return rejectWithValue("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        return rejectWithValue(error.message);
      }
    }
  }
);
