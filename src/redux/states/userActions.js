import { visitanteApi } from "@/api/visitante.api";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const signup = createAsyncThunk("visitante/signup", async (data) => {
  try {
    const res = await visitanteApi.post("api/signup/", data);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
});

export const login = createAsyncThunk("visitante/login", async (data) => {
  try {
    const res = await visitanteApi.post("api/signin/", data);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
});

export const loginWithGoogle = ()=> {
  debugger;
  // dispatch({ type: LOGIN_REQUEST });
  // try {
  //   const response = await visitanteApi.post("/api/google-login", {
  //     token: credentialResponse.credential,
  //   });
  //   const { token } = response.data;
  //   localStorage.setItem("token", token);
  //   dispatch({
  //     type: LOGIN_SUCCESS,
  //     payload: jwt_decode(token),
  //   });
  // } catch (error) {
  //   dispatch({
  //     type: LOGIN_FAILURE,
  //     payload: error.response
  //       ? error.response.data.message
  //       : "An error occurred during Google login",
  //   });
  // }
};

export const signout = createAsyncThunk("visitante/signout", async (data) => {
  try {
    const response = await visitanteApi.post(
      "api/signout/",
      {},
      {
        headers: {
          Authorization: `Token ${data}`, // Set the token in the header
        },
      }
    );

    return { error: null, data: response.data };
  } catch (error) {
    console.error("Error during logout:", error);
    // Handle error (e.g., show error message to user)
  }
});
