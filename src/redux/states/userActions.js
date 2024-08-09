import { visitanteApi } from "@/api/visitante.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk("visitante/signup", async (dataObj) => {
  const info = {
    username: dataObj.user.email,
    email: dataObj.user.email,
    password: dataObj.user.password,
  };

  try {
    const response = await visitanteApi.post("auth/register/", info);
    dataObj.callback(false, response.data);
  } catch (error) {
    dataObj.callback(true, error.response.data);
  }
});

export const login = createAsyncThunk("visitante/login", async (dataObj) => {
  try {
    const response = await visitanteApi.post("auth/token/", dataObj.user);
    dataObj.callback(false, response.data);
  } catch (error) {
    let data;

    if (error.response.data.message) {
      data = error.response.data;
    } else {
      data = {
        message: "La contraseña es incorrecta",
      };
    }

    dataObj.callback(true, data);
  }
});

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async (data) => {
    try {
      const token = data.token;
      const response = await visitanteApi.post("auth/google-signin/", {
        token,
      });
      data.callback(false, response.data);
    } catch (error) {
      const res = {
        message:
          error.response.data.error ||
          "Se produjo un inconveniente al iniciar sesión",
      };

      data.callback(true, res);
    }
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

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  try {
    const response = await visitanteApi.get("auth/user/");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
});

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
  async (dataObj) => {
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
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("profile_picture", data.file);

      const response = await visitanteApi.post(
        "auth/update-profile-picture/",
        formData
      );

      data.callback(false, response.data);
    } catch (error) {
      console.log(error);
      const res = {
        message: 'Lo sentimos, se ha producido un error inesperado en el sistema. Por seguridad, serás redirigido a la página de autorización'
      }
      data.callback(true, res);
    }
  }
);
