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
